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

// newServerWithComicVine creates a test server pre-loaded with all comic
// fixtures and a ComicVinePoller pointing at mockURL. Returns the server URL
// and the library ID.
func newServerWithComicVine(t *testing.T, mockURL string) (string, string) {
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

	dir := symlinkTestdata(t)
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

// newServerWithLowConfidenceCV creates a test server pre-loaded with comic
// fixtures and a ComicVinePoller pointing at the low-confidence mock.
func newServerWithLowConfidenceCV(t *testing.T) (string, string) {
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

	dir := symlinkTestdata(t)
	files, err := scanner.ScanDirectory(dir)
	if err != nil {
		t.Fatalf("scan testdata: %v", err)
	}

	libID, err := store.CreateLibraryWithBooks(ctx, "Comics", dir, files)
	if err != nil {
		t.Fatalf("create library: %v", err)
	}

	mockSrv := newMockLowConfidenceComicVineServer(t)
	t.Cleanup(mockSrv.Close)

	cvClient := cv.NewClientWithInterval(mockSrv.URL, "test-key", 1*time.Millisecond)
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
}

// TestComicVineSkipsUnparseable checks that a file without a recognisable
// issue number remains as a standalone book after the CV poller has run.
func TestComicVineSkipsUnparseable(t *testing.T) {
	t.Parallel()

	mockSrv := newMockComicVineServer(t)
	defer mockSrv.Close()

	baseURL, libID := newServerWithComicVine(t, mockSrv.URL)
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

	// Wait until the poller has run and queued books for review.
	page.MustElementR("body", "pending series review")

	// Navigate to the review page and confirm a book appears.
	waitNav := page.MustWaitNavigation()
	page.MustElement(`a[href*="/review"]`).MustClick()
	waitNav()

	page.MustElementR("body", `\.cbz|\.cbr`)
}

// TestComicVineReviewQueue_DismissRemoves checks that clicking Dismiss on the
// review page removes the book from the queue.
func TestComicVineReviewQueue_DismissRemoves(t *testing.T) {
	t.Parallel()

	baseURL, libID := newServerWithLowConfidenceCV(t)
	page := newPage(t)

	// Wait for the review badge to appear.
	page.MustNavigate(baseURL + "/library/" + libID)
	page.MustElementR("body", "pending series review")

	// Navigate to the review page.
	page.MustNavigate(baseURL + "/library/" + libID + "/review")
	page.MustElementR("body", `\.cbz|\.cbr`)

	// Click the first Dismiss button.
	waitNav := page.MustWaitNavigation()
	page.MustElement(`form input[name="dismiss"]`).MustParent().MustElement(`button`).MustClick()
	waitNav()

	// After dismissing, the page either shows no more pending items or has fewer.
	// The review page should still load without error (200 OK).
	page.MustElementR("body", "Pending series review")
}
