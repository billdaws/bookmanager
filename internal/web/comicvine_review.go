package web

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"sort"
	"strconv"
	"time"

	cv "github.com/billdaws/comicvine"

	"github.com/billdaws/bookmanager/internal/comicvine"
	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// comicvineReviewStore is the subset of storage.Store used by the review handlers.
type comicvineReviewStore interface {
	GetLibraryByID(ctx context.Context, id string) (*storage.Library, error)
	GetBook(ctx context.Context, libraryID, bookID string) (*storage.Book, error)
	ListComicsInReviewQueue(ctx context.Context, libraryID string) ([]storage.ComicReviewRef, error)
	RemoveComicFromReview(ctx context.Context, bookID string) error
	DismissComicFromReview(ctx context.Context, bookID string) error
	UpsertSeries(ctx context.Context, libraryID, name string) (string, error)
	UpsertComicVineVolumeMetadata(ctx context.Context, seriesID string, volumeID int) error
	UpsertComicVineIssueMetadata(ctx context.Context, bookID string, issueID int, name string, creators []string) error
	AssignBookToSeries(ctx context.Context, bookID, seriesID string, index *int, display string) error
	GetComicVineCache(ctx context.Context, resource, key string, ttl time.Duration) (*storage.CachedResponse, error)
}

// comicvineReviewAssigner exposes the ComicVine poller's cached API calls to
// the review handler so it can run the assignment pipeline.
type comicvineReviewAssigner interface {
	CachedSearchVolumes(ctx context.Context, query string) ([]cv.Volume, error)
	CachedGetIssues(ctx context.Context, volumeID int) ([]cv.Issue, error)
}

// ReviewCandidate is a ComicVine volume candidate with a confidence score.
type ReviewCandidate struct {
	Volume cv.Volume
	Score  float64
}

// ReviewItem holds all the data needed to render one pending review entry.
type ReviewItem struct {
	Book       storage.Book
	SearchTerm string
	Candidates []ReviewCandidate // sorted by score descending
}

type reviewPageData struct {
	Library *storage.Library
	Items   []ReviewItem
}

func handleComicReview(store comicvineReviewStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := store.GetLibraryByID(r.Context(), id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		refs, err := store.ListComicsInReviewQueue(r.Context(), id)
		if err != nil {
			log.Printf("handleComicReview: ListComicsInReviewQueue(%s): %v", id, err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		items := make([]ReviewItem, 0, len(refs))
		for _, ref := range refs {
			book, err := store.GetBook(r.Context(), id, ref.BookID)
			if err != nil || book == nil {
				continue
			}

			candidates := loadCandidatesFromCache(r.Context(), store, ref.SearchTerm)
			items = append(items, ReviewItem{
				Book:       *book,
				SearchTerm: ref.SearchTerm,
				Candidates: candidates,
			})
		}

		if err := ComicReviewPage(reviewPageData{Library: lib, Items: items}).Render(r.Context(), w); err != nil {
			log.Printf("handleComicReview: render: %v", err)
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleComicReviewPost(store comicvineReviewStore, cvReview comicvineReviewAssigner, bridge *events.EventBridge) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")
		bookID := r.PathValue("bookID")

		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		lib, err := store.GetLibraryByID(r.Context(), libraryID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		book, err := store.GetBook(r.Context(), libraryID, bookID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if book == nil {
			http.NotFound(w, r)
			return
		}

		// Dismiss without assigning.
		if r.FormValue("dismiss") == "1" {
			if err := store.DismissComicFromReview(r.Context(), bookID); err != nil {
				log.Printf("handleComicReviewPost: DismissComicFromReview(%s): %v", bookID, err)
				http.Error(w, "database error", http.StatusInternalServerError)
				return
			}
			bridge.Publish(events.TopicLibraryBooksChanged(libraryID), nil)
			http.Redirect(w, r, "/library/"+libraryID+"/review", http.StatusSeeOther)
			return
		}

		volumeIDStr := r.FormValue("volume_id")
		volumeID, err := strconv.Atoi(volumeIDStr)
		if err != nil || volumeID <= 0 {
			http.Error(w, "invalid volume_id", http.StatusBadRequest)
			return
		}

		// Fetch the cached search results to find the chosen volume.
		refs, err := store.ListComicsInReviewQueue(r.Context(), libraryID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		searchTerm := ""
		for _, ref := range refs {
			if ref.BookID == bookID {
				searchTerm = ref.SearchTerm
				break
			}
		}
		if searchTerm == "" {
			http.Error(w, "book not in review queue", http.StatusBadRequest)
			return
		}

		candidates := loadCandidatesFromCache(r.Context(), store, searchTerm)
		var chosenVol *cv.Volume
		for _, c := range candidates {
			if c.Volume.ID == volumeID {
				v := c.Volume
				chosenVol = &v
				break
			}
		}
		if chosenVol == nil {
			http.Error(w, "volume not found in cached candidates", http.StatusBadRequest)
			return
		}

		if err := assignReviewedComic(r.Context(), store, cvReview, libraryID, bookID, book, *chosenVol); err != nil {
			log.Printf("handleComicReviewPost: assign %s: %v", bookID, err)
			http.Error(w, "assignment failed", http.StatusInternalServerError)
			return
		}

		if err := store.RemoveComicFromReview(r.Context(), bookID); err != nil {
			log.Printf("handleComicReviewPost: RemoveComicFromReview(%s): %v", bookID, err)
		}

		bridge.Publish(events.TopicLibraryBooksChanged(libraryID), nil)
		http.Redirect(w, r, "/library/"+libraryID+"/review", http.StatusSeeOther)
	}
}

// assignReviewedComic runs the full ComicVine assignment pipeline for a
// user-selected volume. The issue number is re-parsed from the book's filename.
func assignReviewedComic(ctx context.Context, store comicvineReviewStore, cvReview comicvineReviewAssigner, libraryID, bookID string, book *storage.Book, vol cv.Volume) error {
	seriesID, err := store.UpsertSeries(ctx, libraryID, vol.Name)
	if err != nil {
		return fmt.Errorf("upsert series: %w", err)
	}

	if err := store.UpsertComicVineVolumeMetadata(ctx, seriesID, vol.ID); err != nil {
		return fmt.Errorf("upsert volume metadata: %w", err)
	}

	issues, err := cvReview.CachedGetIssues(ctx, vol.ID)
	if err != nil {
		return fmt.Errorf("get issues: %w", err)
	}

	_, issueNum, hasParsed := comicvine.ParseComicFilename(filepath.Base(book.Filename))
	display := ""
	var idxPtr *int
	if hasParsed {
		display = fmt.Sprintf("#%d", issueNum)
		idxPtr = &issueNum
	}

	if err := store.AssignBookToSeries(ctx, bookID, seriesID, idxPtr, display); err != nil {
		return fmt.Errorf("assign book: %w", err)
	}

	if hasParsed {
		for _, issue := range issues {
			n, err := strconv.Atoi(issue.IssueNumber)
			if err != nil {
				continue
			}
			if n == issueNum {
				var creators []string
				for _, c := range issue.PersonCredits {
					if c.Name != "" {
						creators = append(creators, c.Name)
					}
				}
				if err := store.UpsertComicVineIssueMetadata(ctx, bookID, issue.ID, issue.Name, creators); err != nil {
					log.Printf("assignReviewedComic: upsert issue metadata: %v", err)
				}
				break
			}
		}
	}

	return nil
}

// loadCandidatesFromCache decodes cached ComicVine search results for
// searchTerm, scores each volume, and returns them sorted by score descending.
func loadCandidatesFromCache(ctx context.Context, store comicvineReviewStore, searchTerm string) []ReviewCandidate {
	cached, err := store.GetComicVineCache(ctx, "search", searchTerm, 365*24*time.Hour)
	if err != nil || cached == nil {
		return nil
	}
	var volumes []cv.Volume
	if err := json.Unmarshal([]byte(cached.Body), &volumes); err != nil {
		return nil
	}

	const maxCandidates = 5
	if len(volumes) > maxCandidates {
		volumes = volumes[:maxCandidates]
	}

	candidates := make([]ReviewCandidate, len(volumes))
	for i, vol := range volumes {
		candidates[i] = ReviewCandidate{
			Volume: vol,
			Score:  comicvine.Score(searchTerm, vol.Name),
		}
	}
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i].Score > candidates[j].Score
	})
	return candidates
}
