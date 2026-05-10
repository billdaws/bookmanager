package events

import (
	"context"
	"testing"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
	cv "github.com/billdaws/comicvine"
)

// mockVolumeSearcher implements cv.VolumeSearcher for testing.
type mockVolumeSearcher struct {
	fn func(ctx context.Context) ([]cv.Volume, error)
}

func (m *mockVolumeSearcher) Fields(_ ...cv.Field) cv.VolumeSearcher { return m }
func (m *mockVolumeSearcher) Do(ctx context.Context) ([]cv.Volume, error) {
	return m.fn(ctx)
}

// mockIssueSearcher implements cv.IssueSearcher for testing.
type mockIssueSearcher struct {
	fn func(ctx context.Context) ([]cv.Issue, error)
}

func (m *mockIssueSearcher) Fields(_ ...cv.Field) cv.IssueSearcher { return m }
func (m *mockIssueSearcher) Do(ctx context.Context) ([]cv.Issue, error) {
	return m.fn(ctx)
}

// mockCVClient implements comicvineClient for testing.
type mockCVClient struct {
	searchFn func(ctx context.Context, query string) ([]cv.Volume, error)
	issuesFn func(ctx context.Context, volumeID int) ([]cv.Issue, error)
	calls    int
}

func (m *mockCVClient) SearchVolumes(query string) cv.VolumeSearcher {
	m.calls++
	return &mockVolumeSearcher{fn: func(ctx context.Context) ([]cv.Volume, error) {
		return m.searchFn(ctx, query)
	}}
}

func (m *mockCVClient) GetIssues(volumeID int) cv.IssueSearcher {
	m.calls++
	return &mockIssueSearcher{fn: func(ctx context.Context) ([]cv.Issue, error) {
		return m.issuesFn(ctx, volumeID)
	}}
}

// mockCVStore implements comicvineStore for testing.
type mockCVStore struct {
	comics      []storage.ComicBookRef
	cache       map[string]string   // "resource:key" → body
	series      map[string]string   // name → id
	assigned    map[string]string   // bookID → seriesID
	issueIDs    map[string]int      // bookID → issueID
	volumes     map[string]int      // seriesID → volumeID
	reviewQueue map[string]string   // bookID → searchTerm
	creators    map[string][]string // bookID → creator names
}

func newMockCVStore(comics []storage.ComicBookRef) *mockCVStore {
	return &mockCVStore{
		comics:      comics,
		cache:       make(map[string]string),
		series:      make(map[string]string),
		assigned:    make(map[string]string),
		issueIDs:    make(map[string]int),
		volumes:     make(map[string]int),
		reviewQueue: make(map[string]string),
		creators:    make(map[string][]string),
	}
}

func (m *mockCVStore) ListComicsNeedingSeriesDetection(_ context.Context) ([]storage.ComicBookRef, error) {
	// Return only comics not yet assigned and not in the review queue.
	var out []storage.ComicBookRef
	for _, c := range m.comics {
		if m.assigned[c.ID] == "" && m.reviewQueue[c.ID] == "" {
			out = append(out, c)
		}
	}
	return out, nil
}

func (m *mockCVStore) MarkComicForReview(_ context.Context, bookID, searchTerm string) error {
	m.reviewQueue[bookID] = searchTerm
	return nil
}

func (m *mockCVStore) GetComicVineCache(_ context.Context, resource, key string, _ time.Duration) (*storage.CachedResponse, error) {
	k := resource + ":" + key
	if body, ok := m.cache[k]; ok {
		return &storage.CachedResponse{Body: body, FetchedAt: time.Now()}, nil
	}
	return nil, nil
}

func (m *mockCVStore) SetComicVineCache(_ context.Context, resource, key, body string) error {
	m.cache[resource+":"+key] = body
	return nil
}

func (m *mockCVStore) UpsertSeries(_ context.Context, _, name string) (string, error) {
	if id, ok := m.series[name]; ok {
		return id, nil
	}
	id := "series-" + name
	m.series[name] = id
	return id, nil
}

func (m *mockCVStore) UpsertComicVineVolumeMetadata(_ context.Context, seriesID string, volumeID int) error {
	m.volumes[seriesID] = volumeID
	return nil
}

func (m *mockCVStore) UpsertComicVineIssueMetadata(_ context.Context, bookID string, issueID int, _ string, creators []string) error {
	m.issueIDs[bookID] = issueID
	if len(creators) > 0 {
		m.creators[bookID] = creators
	}
	return nil
}

func (m *mockCVStore) GetComicVineVolumeID(_ context.Context, seriesID string) (int, bool, error) {
	id, ok := m.volumes[seriesID]
	return id, ok, nil
}

func (m *mockCVStore) AssignBookToSeries(_ context.Context, bookID, seriesID string, _ *int, _ string) error {
	m.assigned[bookID] = seriesID
	return nil
}

func TestComicVinePoller_NilClientNoOp(t *testing.T) {
	store := newMockCVStore(nil)
	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, nil, bridge, time.Hour)

	ctx, cancel := context.WithTimeout(t.Context(), 100*time.Millisecond)
	defer cancel()
	poller.Run(ctx) // must return promptly when client is nil
}

func TestComicVinePoller_AssignsSeries(t *testing.T) {
	// Filenames are relative paths as stored by the scanner.
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "Alan Moore/Astounding Comics/Astounding Comics 01.cbz"},
		{ID: "b2", LibraryID: "lib1", Filename: "Alan Moore/Astounding Comics/Astounding Comics 02.cbz"},
	}
	store := newMockCVStore(comics)

	client := &mockCVClient{
		searchFn: func(_ context.Context, _ string) ([]cv.Volume, error) {
			return []cv.Volume{{ID: 1, Name: "Astounding Comics"}}, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			return []cv.Issue{
				{ID: 101, VolumeID: 1, IssueNumber: "1"},
				{ID: 102, VolumeID: 1, IssueNumber: "2"},
			}, nil
		},
	}

	bridge := NewEventBridge(nil)
	received := make(chan struct{}, 1)
	bridge.Subscribe(TopicLibraryBooksChanged("lib1"), "test", func(e Event) error {
		received <- struct{}{}
		return nil
	})

	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	go poller.Run(t.Context())

	select {
	case <-received:
	case <-time.After(2 * time.Second):
		t.Fatal("timeout: expected TopicLibraryBooksChanged after comic series assignment")
	}

	if store.assigned["b1"] == "" {
		t.Error("book b1 was not assigned to a series")
	}
	if store.assigned["b2"] == "" {
		t.Error("book b2 was not assigned to a series")
	}
	if store.issueIDs["b1"] != 101 {
		t.Errorf("b1 issue ID = %d, want 101", store.issueIDs["b1"])
	}
	if store.issueIDs["b2"] != 102 {
		t.Errorf("b2 issue ID = %d, want 102", store.issueIDs["b2"])
	}
}

func TestComicVinePoller_SkipsUnparseable(t *testing.T) {
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "not-a-series.cbz"},
	}
	store := newMockCVStore(comics)

	var clientCalled bool
	client := &mockCVClient{
		searchFn: func(_ context.Context, _ string) ([]cv.Volume, error) {
			clientCalled = true
			return nil, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			return nil, nil
		},
	}

	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	poller.runOnce(t.Context())

	if clientCalled {
		t.Error("SearchVolumes was called for an unparseable filename")
	}
	if store.assigned["b1"] != "" {
		t.Error("unparseable book was assigned to a series")
	}
	// Unparseable comics are queued for review so they don't loop forever in
	// ListComicsNeedingSeriesDetection.
	if _, inReview := store.reviewQueue["b1"]; !inReview {
		t.Error("unparseable book was not queued for review")
	}
}

func TestComicVinePoller_UsesCache(t *testing.T) {
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "Astounding Comics 01.cbz"},
		{ID: "b2", LibraryID: "lib1", Filename: "Astounding Comics 02.cbz"},
	}
	store := newMockCVStore(comics)

	client := &mockCVClient{
		searchFn: func(_ context.Context, _ string) ([]cv.Volume, error) {
			return []cv.Volume{{ID: 1, Name: "Astounding Comics"}}, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			return []cv.Issue{
				{ID: 101, VolumeID: 1, IssueNumber: "1"},
				{ID: 102, VolumeID: 1, IssueNumber: "2"},
			}, nil
		},
	}

	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	poller.runOnce(t.Context())

	callsAfterFirst := client.calls

	// Reset assignments so the second runOnce has work to do.
	store.assigned = make(map[string]string)
	store.issueIDs = make(map[string]int)

	poller.runOnce(t.Context())

	if client.calls != callsAfterFirst {
		t.Errorf("client called %d extra time(s) on second run; cache should have been used",
			client.calls-callsAfterFirst)
	}
}

func TestComicVinePoller_NoIssueMatchStillAssignsSeries(t *testing.T) {
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "Astounding Comics 99.cbz"},
	}
	store := newMockCVStore(comics)

	client := &mockCVClient{
		searchFn: func(_ context.Context, _ string) ([]cv.Volume, error) {
			return []cv.Volume{{ID: 1, Name: "Astounding Comics"}}, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			// Only issues 1–3; no issue 99.
			return []cv.Issue{
				{ID: 101, VolumeID: 1, IssueNumber: "1"},
				{ID: 102, VolumeID: 1, IssueNumber: "2"},
			}, nil
		},
	}

	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	poller.runOnce(t.Context())

	if store.assigned["b1"] == "" {
		t.Error("book should be assigned to series even when no matching issue is found")
	}
	if store.issueIDs["b1"] != 0 {
		t.Error("issue metadata should not be set when no matching issue is found")
	}
}

func TestComicVinePoller_StoresPersonCredits(t *testing.T) {
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "Watchmen/Watchmen 01.cbz"},
	}
	store := newMockCVStore(comics)

	client := &mockCVClient{
		searchFn: func(_ context.Context, _ string) ([]cv.Volume, error) {
			return []cv.Volume{{ID: 1, Name: "Watchmen"}}, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			return []cv.Issue{{
				ID:          101,
				VolumeID:    1,
				IssueNumber: "1",
				Name:        "At Midnight, All the Agents...",
				PersonCredits: []cv.PersonCredit{
					{Name: "Alan Moore", Role: "Writer"},
					{Name: "Dave Gibbons", Role: "Penciler"},
				},
			}}, nil
		},
	}

	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	poller.runOnce(t.Context())

	if store.assigned["b1"] == "" {
		t.Fatal("book was not assigned to a series")
	}
	got := store.creators["b1"]
	if len(got) != 2 || got[0] != "Alan Moore" || got[1] != "Dave Gibbons" {
		t.Errorf("creators = %v, want [Alan Moore Dave Gibbons]", got)
	}
}

func TestComicVinePoller_LowConfidenceQueuesForReview(t *testing.T) {
	// "Alan Moore's 1963 1 - Mystery Inc.cbz" parses to series="Alan Moore's 1963".
	// The search returns "Alan Moore's Glory" — low confidence match.
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "Alan Moore's 1963 1 - Mystery Inc.cbz"},
	}
	store := newMockCVStore(comics)

	client := &mockCVClient{
		searchFn: func(_ context.Context, _ string) ([]cv.Volume, error) {
			return []cv.Volume{{ID: 20413, Name: "Alan Moore's Glory"}}, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			return nil, nil
		},
	}

	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	poller.runOnce(t.Context())

	if store.assigned["b1"] != "" {
		t.Error("low-confidence book should not be auto-assigned")
	}
	if store.reviewQueue["b1"] == "" {
		t.Error("low-confidence book should be queued for review")
	}
}

func TestComicVinePoller_DirectoryQueryWins(t *testing.T) {
	// Filename gives "Alan Moore's 1963" (low confidence against any result).
	// Directory "1963" gives an exact match → auto-assigned.
	comics := []storage.ComicBookRef{
		{ID: "b1", LibraryID: "lib1", Filename: "1963/Alan Moore's 1963 1 - Mystery Inc.cbz"},
	}
	store := newMockCVStore(comics)

	client := &mockCVClient{
		searchFn: func(_ context.Context, query string) ([]cv.Volume, error) {
			switch query {
			case "Alan Moore's 1963":
				return []cv.Volume{{ID: 20413, Name: "Alan Moore's Glory"}}, nil
			case "1963":
				return []cv.Volume{{ID: 5162, Name: "1963"}}, nil
			}
			return nil, nil
		},
		issuesFn: func(_ context.Context, _ int) ([]cv.Issue, error) {
			return []cv.Issue{{ID: 999, VolumeID: 5162, IssueNumber: "1", Name: "Mystery Inc."}}, nil
		},
	}

	bridge := NewEventBridge(nil)
	poller := NewComicVinePoller(store, client, bridge, time.Hour)
	poller.runOnce(t.Context())

	if store.assigned["b1"] == "" {
		t.Error("book should be auto-assigned when directory query wins with high confidence")
	}
	if store.reviewQueue["b1"] != "" {
		t.Error("high-confidence book should not be queued for review")
	}
	seriesID := store.assigned["b1"]
	if store.volumes[seriesID] != 5162 {
		t.Errorf("expected volume ID 5162 (from directory query), got %d", store.volumes[seriesID])
	}
}
