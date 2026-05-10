//go:build e2e

package e2e

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/billdaws/bookmanager/internal/scanner"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
	cv "github.com/billdaws/comicvine"
)

// newMockComicVineServer returns a test server that mimics the ComicVine API
// for the "Astounding Comics" fixture files (issues 1–6).
func newMockComicVineServer(t *testing.T) *httptest.Server {
	t.Helper()
	mux := http.NewServeMux()

	mux.HandleFunc("GET /search/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]any{
			"error": "OK",
			"results": []map[string]any{
				{"id": 1, "name": "Astounding Comics", "start_year": "1940"},
			},
		})
	})

	mux.HandleFunc("GET /issues/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		issues := make([]map[string]any, 6)
		for i := range 6 {
			issues[i] = map[string]any{
				"id":           100 + i + 1,
				"issue_number": strconv.Itoa(i + 1),
				"name":         "",
				"volume":       map[string]any{"id": 1},
			}
		}
		json.NewEncoder(w).Encode(map[string]any{
			"error":   "OK",
			"results": issues,
		})
	})

	return httptest.NewServer(mux)
}

// setupComicVineServer is the shared backend for comicvine server helpers.
// It creates a library from the given dir, starts a CV poller pointed at
// mockURL, and returns the server URL and library ID.
func setupComicVineServer(t *testing.T, mockURL, dir string) (string, string) {
	t.Helper()

	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	t.Cleanup(func() { database.Close() })

	store := storage.NewStore(database)
	if err := store.SetEncryptionKey(testEncryptionKey); err != nil {
		t.Fatalf("set encryption key: %v", err)
	}

	bridge := events.NewEventBridge(nil)

	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(cancel)

	files, err := scanner.ScanDirectory(dir)
	if err != nil {
		t.Fatalf("scan testdata: %v", err)
	}

	libID, err := store.CreateLibraryWithBooks(ctx, "Comics", dir, files)
	if err != nil {
		t.Fatalf("create library: %v", err)
	}

	// Use a tiny rate-limit interval so the test completes quickly.
	cvClient := cv.NewClientWithInterval(mockURL, "test-key", 1*time.Millisecond)
	cvPoller := events.NewComicVinePoller(store, cvClient, bridge, 50*time.Millisecond)
	go cvPoller.Run(ctx)

	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge, noopPoller{}, cvPoller, cvPoller, noopSender{}); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return srv.URL, libID
}

// newServerWithComicVine creates a test server pre-loaded with only the
// parseable comic fixtures (Astounding Comics 01–06) and a ComicVinePoller
// pointing at mockURL. Returns the server URL and the library ID.
func newServerWithComicVine(t *testing.T, mockURL string) (string, string) {
	t.Helper()
	return setupComicVineServer(t, mockURL, symlinkComicsOnly(t))
}

// newMockLowConfidenceComicVineServer returns a test server that always
// returns a volume whose name does not match any query, producing a low
// confidence score that sends books to the review queue.
func newMockLowConfidenceComicVineServer(t *testing.T) *httptest.Server {
	t.Helper()
	mux := http.NewServeMux()

	mux.HandleFunc("GET /search/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]any{
			"error": "OK",
			"results": []map[string]any{
				// "Unrelated Series" shares no tokens with "Astounding Comics"
				{"id": 99999, "name": "Unrelated Series", "start_year": "2000"},
			},
		})
	})

	mux.HandleFunc("GET /issues/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]any{
			"error":   "OK",
			"results": []map[string]any{},
		})
	})

	return httptest.NewServer(mux)
}

// newServerWithLowConfidenceCV creates a test server pre-loaded with only the
// parseable comic fixtures (Astounding Comics 01–06) and a ComicVinePoller
// pointing at the low-confidence mock.
func newServerWithLowConfidenceCV(t *testing.T) (string, string) {
	t.Helper()
	mockSrv := newMockLowConfidenceComicVineServer(t)
	t.Cleanup(mockSrv.Close)
	return setupComicVineServer(t, mockSrv.URL, symlinkComicsOnly(t))
}

// TestComicVinePollerAssignsSeries checks that after the CV poller runs the
// Astounding Comics books are grouped into a series visible in the library.
func TestComicVinePollerAssignsSeries(t *testing.T) {
	t.Parallel()

	mockSrv := newMockComicVineServer(t)
	defer mockSrv.Close()

	baseURL, libID := newServerWithComicVine(t, mockSrv.URL)
	page := newPage(t)

	page.MustNavigate(baseURL + "/library/" + libID)

	// The SSE connection updates the book list once the poller has run.
	// MustElementR retries until the element appears (up to the page timeout).
	page.MustElementR("#book-list", "Astounding Comics")

	// All 6 comics must be assigned — the series badge must show exactly 6.
	// If any comic was unexpectedly skipped this assertion will time out and fail.
	page.MustElementR(`#book-list a[href*="/series/"] span`, "6")
}

// TestComicVineSkipsUnparseable checks that a file without a recognisable
// issue number remains as a standalone book after the CV poller has run.
func TestComicVineSkipsUnparseable(t *testing.T) {
	t.Parallel()

	mockSrv := newMockComicVineServer(t)
	defer mockSrv.Close()

	// Use all testdata fixtures so not-a-series.cbz is present alongside the
	// parseable comics. newServerWithComicVine uses only parseable fixtures, so
	// we call setupComicVineServer directly with the full set.
	baseURL, libID := setupComicVineServer(t, mockSrv.URL, symlinkTestdata(t))
	page := newPage(t)

	page.MustNavigate(baseURL + "/library/" + libID)

	// Wait for the poller to have run (series must appear first).
	page.MustElementR("#book-list", "Astounding Comics")

	// "not-a-series" book must still be present as a standalone book.
	page.MustElementR("#book-list", "not-a-series")
}

// TestComicVineReviewQueue_ShowsBadgeAndPendingComic checks that when the CV
// poller cannot confidently match a series the library page shows a review
// badge, and navigating to /review lists the pending filename.
func TestComicVineReviewQueue_ShowsBadgeAndPendingComic(t *testing.T) {
	t.Parallel()

	baseURL, libID := newServerWithLowConfidenceCV(t)
	page := newPage(t)

	page.MustNavigate(baseURL + "/library/" + libID)

	// Wait until all 6 comics are queued for review. If any comic was skipped
	// instead of queued this assertion will time out and fail.
	page.MustElementR("body", "6 comic")

	// Navigate to the review page and confirm a book appears.
	waitNav := page.MustWaitNavigation()
	page.MustElement(`a[href*="/review"]`).MustClick()
	waitNav()

	page.MustElementR("body", `\.cbz|\.cbr`)

	// All 6 parseable comics must appear in the review queue.
	sections := page.MustElements("section")
	if got := len(sections); got != 6 {
		t.Errorf("review queue: got %d items, want 6", got)
	}
}

// TestComicVineReviewQueue_DismissRemoves checks that clicking Dismiss on the
// review page removes the book from the queue.
func TestComicVineReviewQueue_DismissRemoves(t *testing.T) {
	t.Parallel()

	baseURL, libID := newServerWithLowConfidenceCV(t)
	page := newPage(t)

	// Wait for all 6 comics to be queued for review.
	page.MustNavigate(baseURL + "/library/" + libID)
	page.MustElementR("body", "6 comic")

	// Navigate to the review page and verify all 6 are present.
	page.MustNavigate(baseURL + "/library/" + libID + "/review")
	page.MustElementR("body", `\.cbz|\.cbr`)
	sections := page.MustElements("section")
	if got := len(sections); got != 6 {
		t.Fatalf("review queue before dismiss: got %d items, want 6", got)
	}

	// Click the first Dismiss button.
	waitNav := page.MustWaitNavigation()
	page.MustElement(`form input[name="dismiss"]`).MustParent().MustElement(`button`).MustClick()
	waitNav()

	// After dismissing one, 5 items should remain.
	page.MustElementR("body", "Pending series review")
	sections = page.MustElements("section")
	if got := len(sections); got != 5 {
		t.Errorf("review queue after dismiss: got %d items, want 5", got)
	}
}
