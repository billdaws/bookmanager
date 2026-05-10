package events

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"path/filepath"
	"strconv"
	"time"

	"github.com/billdaws/bookmanager/internal/comicvine"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	cv "github.com/billdaws/comicvine"
)

type comicvineClient interface {
	SearchVolumes(query string) cv.VolumeSearcher
	GetIssues(volumeID int) cv.IssueSearcher
}

type comicvineStore interface {
	ListComicsNeedingSeriesDetection(ctx context.Context) ([]storage.ComicBookRef, error)
	GetComicVineCache(ctx context.Context, resource, key string, ttl time.Duration) (*storage.CachedResponse, error)
	SetComicVineCache(ctx context.Context, resource, key, body string) error
	UpsertSeries(ctx context.Context, libraryID, name string) (string, error)
	UpsertComicVineVolumeMetadata(ctx context.Context, seriesID string, volumeID int) error
	UpsertComicVineIssueMetadata(ctx context.Context, bookID string, issueID int, name string, creators []string) error
	GetComicVineVolumeID(ctx context.Context, seriesID string) (int, bool, error)
	AssignBookToSeries(ctx context.Context, bookID, seriesID string, index *int, display string) error
	MarkComicForReview(ctx context.Context, bookID, searchTerm string) error
}

// ComicVinePoller periodically looks up series information for unassigned
// comic books (.cbz/.cbr) and groups them into series via ComicVine.
type ComicVinePoller struct {
	store    comicvineStore
	client   comicvineClient // nil → poller is disabled
	bridge   *EventBridge
	interval time.Duration
	trigger  chan struct{}

	// SearchCacheTTL and IssueCacheTTL control how long cached API responses
	// are reused before the API is queried again.
	SearchCacheTTL time.Duration
	IssueCacheTTL  time.Duration
}

// NewComicVinePoller creates a ComicVinePoller. When client is nil the poller
// is disabled and Run returns immediately.
func NewComicVinePoller(store comicvineStore, client comicvineClient, bridge *EventBridge, interval time.Duration) *ComicVinePoller {
	return &ComicVinePoller{
		store:          store,
		client:         client,
		bridge:         bridge,
		interval:       interval,
		trigger:        make(chan struct{}, 1),
		SearchCacheTTL: cv.DefaultSearchCacheTTL,
		IssueCacheTTL:  cv.DefaultIssueCacheTTL,
	}
}

// RunNow schedules an immediate pass without waiting for the next ticker tick.
// Safe to call from any goroutine.
func (p *ComicVinePoller) RunNow() {
	select {
	case p.trigger <- struct{}{}:
	default:
	}
}

// Run executes an immediate pass and then repeats every interval.
// It blocks until ctx is cancelled. When client is nil it returns immediately.
func (p *ComicVinePoller) Run(ctx context.Context) {
	if p.client == nil {
		return
	}
	p.runOnce(ctx)

	ticker := time.NewTicker(p.interval)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-p.trigger:
			p.runOnce(ctx)
		case <-ticker.C:
			p.runOnce(ctx)
		}
	}
}

// searchResult pairs a ComicVine search query with the best matching volume
// and its confidence score.
type searchResult struct {
	Query  string
	Volume cv.Volume
	Score  float64
}

func (p *ComicVinePoller) runOnce(ctx context.Context) {
	comics, err := p.store.ListComicsNeedingSeriesDetection(ctx)
	if err != nil {
		log.Printf("comicvine poller: list comics: %v", err)
		return
	}
	if len(comics) == 0 {
		return
	}

	log.Printf("comicvine poller: processing %d comic(s)", len(comics))
	changed := make(map[string]bool)
	for _, comic := range comics {
		assigned, err := p.processComicWithConfidence(ctx, comic)
		if err != nil {
			log.Printf("comicvine poller: process %q: %v", comic.Filename, err)
			continue
		}
		if assigned {
			changed[comic.LibraryID] = true
		}
	}

	for libraryID := range changed {
		p.bridge.Publish(TopicLibraryBooksChanged(libraryID), nil)
	}
}

// processComicWithConfidence builds candidate ComicVine queries from the
// filename and parent directory, scores the top result from each, and either
// auto-assigns the book (high confidence) or queues it for user review (low
// confidence). It returns true when the book was auto-assigned.
func (p *ComicVinePoller) processComicWithConfidence(ctx context.Context, comic storage.ComicBookRef) (bool, error) {
	base := filepath.Base(comic.Filename)
	seriesName, issueNum, ok := comicvine.ParseComicFilename(base)
	dirName := filepath.Base(filepath.Dir(comic.Filename))

	if !ok {
		// No issue number in the filename. Try the stripped filename as a
		// series-name query (handles graphic novels like "From Hell.cbz").
		stripped := comicvine.StripAnnotations(base)
		if stripped == "" || dirName == "." {
			log.Printf("comicvine poller: skip %q (filename not parseable)", comic.Filename)
			// Mark for review so the comic is not retried on every poller pass.
			// The user can dismiss it or assign it manually from the review page.
			if err := p.store.MarkComicForReview(ctx, comic.ID, stripped); err != nil {
				log.Printf("comicvine poller: mark %q for review: %v", comic.Filename, err)
			} else {
				p.bridge.Publish(TopicLibraryBooksChanged(comic.LibraryID), nil)
			}
			return false, nil
		}
		seriesName = stripped
		issueNum = 0
		ok = true
	}

	queries := []string{seriesName}
	if dirName != "." && dirName != "" && dirName != seriesName {
		queries = append(queries, dirName)
	}

	var candidates []searchResult
	for _, q := range queries {
		volumes, err := p.CachedSearchVolumes(ctx, q)
		if err != nil {
			log.Printf("comicvine poller: search %q: %v", q, err)
			continue
		}
		if len(volumes) == 0 {
			continue
		}
		score := comicvine.Score(q, volumes[0].Name)
		candidates = append(candidates, searchResult{Query: q, Volume: volumes[0], Score: score})
	}

	if len(candidates) == 0 {
		log.Printf("comicvine poller: no volumes found for %q", comic.Filename)
		return false, nil
	}

	best := candidates[0]
	for _, c := range candidates[1:] {
		if c.Score > best.Score {
			best = c
		}
	}

	log.Printf("comicvine poller: %q → best query=%q vol=%q score=%.2f", comic.Filename, best.Query, best.Volume.Name, best.Score)

	if best.Score >= comicvine.AutoAssignThreshold {
		var issuePtr *int
		if issueNum > 0 {
			issuePtr = &issueNum
		}
		if err := p.processComic(ctx, comic, best.Volume, issuePtr); err != nil {
			return false, err
		}
		return true, nil
	}

	log.Printf("comicvine poller: low confidence (%.2f < %.2f), queuing %q for review", best.Score, comicvine.AutoAssignThreshold, comic.Filename)
	if err := p.store.MarkComicForReview(ctx, comic.ID, best.Query); err != nil {
		return false, fmt.Errorf("mark for review: %w", err)
	}
	p.bridge.Publish(TopicLibraryBooksChanged(comic.LibraryID), nil)
	return false, nil
}

// processComic assigns a book to a ComicVine volume. When issueNum is non-nil
// the book is indexed by issue number and issue metadata is looked up; when nil
// the book is assigned to the series without issue-specific metadata (suitable
// for single-volume collected editions).
func (p *ComicVinePoller) processComic(ctx context.Context, comic storage.ComicBookRef, vol cv.Volume, issueNum *int) error {
	log.Printf("comicvine poller: assigning volume id=%d name=%q to %q", vol.ID, vol.Name, comic.Filename)

	seriesID, err := p.store.UpsertSeries(ctx, comic.LibraryID, vol.Name)
	if err != nil {
		return fmt.Errorf("upsert series: %w", err)
	}

	if err := p.store.UpsertComicVineVolumeMetadata(ctx, seriesID, vol.ID); err != nil {
		return fmt.Errorf("upsert volume metadata: %w", err)
	}

	display := ""
	if issueNum != nil {
		display = fmt.Sprintf("#%d", *issueNum)
	}
	if err := p.store.AssignBookToSeries(ctx, comic.ID, seriesID, issueNum, display); err != nil {
		return fmt.Errorf("assign book to series: %w", err)
	}

	if issueNum == nil {
		return nil
	}

	issues, err := p.CachedGetIssues(ctx, vol.ID)
	if err != nil {
		return fmt.Errorf("get issues: %w", err)
	}

	for _, issue := range issues {
		n, err := strconv.Atoi(issue.IssueNumber)
		if err != nil {
			continue
		}
		if n == *issueNum {
			creators := personCreditsToNames(issue.PersonCredits)
			if err := p.store.UpsertComicVineIssueMetadata(ctx, comic.ID, issue.ID, issue.Name, creators); err != nil {
				log.Printf("comicvine poller: upsert issue metadata for %q: %v", comic.Filename, err)
			}
			break
		}
	}

	return nil
}

// personCreditsToNames extracts unique creator names from a slice of person
// credits, preserving order.
func personCreditsToNames(credits []cv.PersonCredit) []string {
	seen := make(map[string]bool, len(credits))
	var names []string
	for _, c := range credits {
		if c.Name != "" && !seen[c.Name] {
			seen[c.Name] = true
			names = append(names, c.Name)
		}
	}
	return names
}

// CachedSearchVolumes returns the cached ComicVine volume search results for
// query, fetching from the API when the cache is absent or expired.
func (p *ComicVinePoller) CachedSearchVolumes(ctx context.Context, query string) ([]cv.Volume, error) {
	cached, err := p.store.GetComicVineCache(ctx, "search", query, p.SearchCacheTTL)
	if err != nil {
		return nil, err
	}
	if cached != nil {
		var volumes []cv.Volume
		if err := json.Unmarshal([]byte(cached.Body), &volumes); err != nil {
			return nil, fmt.Errorf("unmarshal cached volumes: %w", err)
		}
		return volumes, nil
	}

	volumes, err := p.client.SearchVolumes(query).Fields(cv.FieldID, cv.FieldName).Do(ctx)
	if err != nil {
		return nil, err
	}

	b, err := json.Marshal(volumes)
	if err != nil {
		return nil, fmt.Errorf("marshal volumes: %w", err)
	}
	if err := p.store.SetComicVineCache(ctx, "search", query, string(b)); err != nil {
		log.Printf("comicvine poller: cache search %q: %v", query, err)
	}
	return volumes, nil
}

// CachedGetIssues returns the cached ComicVine issues for volumeID, fetching
// from the API when the cache is absent or expired.
func (p *ComicVinePoller) CachedGetIssues(ctx context.Context, volumeID int) ([]cv.Issue, error) {
	key := strconv.Itoa(volumeID)
	cached, err := p.store.GetComicVineCache(ctx, "issues", key, p.IssueCacheTTL)
	if err != nil {
		return nil, err
	}
	if cached != nil {
		var issues []cv.Issue
		if err := json.Unmarshal([]byte(cached.Body), &issues); err != nil {
			return nil, fmt.Errorf("unmarshal cached issues: %w", err)
		}
		return issues, nil
	}

	issues, err := p.client.GetIssues(volumeID).Fields(cv.FieldID, cv.FieldVolume, cv.FieldIssueNumber, cv.FieldName, cv.FieldPersonCredits).Do(ctx)
	if err != nil {
		return nil, err
	}

	b, err := json.Marshal(issues)
	if err != nil {
		return nil, fmt.Errorf("marshal issues: %w", err)
	}
	if err := p.store.SetComicVineCache(ctx, "issues", key, string(b)); err != nil {
		log.Printf("comicvine poller: cache issues for volume %d: %v", volumeID, err)
	}
	return issues, nil
}
