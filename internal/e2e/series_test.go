//go:build e2e

package e2e

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
)

// seriesSetup holds everything needed by a series e2e test.
type seriesSetup struct {
	base     string // server base URL
	libID    string
	seriesID string
	store    *storage.Store
	database interface{ Close() error }
}

// newServerWithSeriesLibrary creates a server pre-loaded with a library that
// contains a series (with nSeriesBooks books) and nStandalone standalone books.
// Book files are empty .epub stubs; series books are assigned sequential
// series_index values 1…n. The cover book is the first one.
func newServerWithSeriesLibrary(t *testing.T, seriesName string, nSeriesBooks, nStandalone int) seriesSetup {
	t.Helper()

	dir := t.TempDir()
	var allFiles []string

	// Create series book files.
	for i := range nSeriesBooks {
		name := fmt.Sprintf("series-book-%03d.epub", i+1)
		if err := os.WriteFile(filepath.Join(dir, name), []byte{}, 0o644); err != nil {
			t.Fatalf("create series book file: %v", err)
		}
		allFiles = append(allFiles, name)
	}

	// Create standalone book files.
	for i := range nStandalone {
		name := fmt.Sprintf("standalone-%03d.epub", i+1)
		if err := os.WriteFile(filepath.Join(dir, name), []byte{}, 0o644); err != nil {
			t.Fatalf("create standalone book file: %v", err)
		}
		allFiles = append(allFiles, name)
	}

	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	t.Cleanup(func() { database.Close() })

	store := storage.NewStore(database)
	if err := store.SetEncryptionKey(testEncryptionKey); err != nil {
		t.Fatalf("set encryption key: %v", err)
	}

	ctx := context.Background()
	libID, err := store.CreateLibraryWithBooks(ctx, "Series Library", dir, allFiles)
	if err != nil {
		t.Fatalf("create library: %v", err)
	}

	seriesID, err := store.UpsertSeries(ctx, libID, seriesName)
	if err != nil {
		t.Fatalf("upsert series: %v", err)
	}

	// Fetch the book IDs for series book files and assign them in order.
	// Use ListBooks (no pagination) so all books are returned regardless of count.
	allBooks, err := store.ListBooks(ctx, libID)
	if err != nil {
		t.Fatalf("list books: %v", err)
	}
	seriesBooks := make(map[string]string) // filename → id
	for _, b := range allBooks {
		seriesBooks[b.Filename] = b.ID
	}

	for i := range nSeriesBooks {
		name := fmt.Sprintf("series-book-%03d.epub", i+1)
		bookID, ok := seriesBooks[name]
		if !ok {
			t.Fatalf("book not found: %s", name)
		}
		idx := i + 1
		display := fmt.Sprintf("Vol. %d", idx)
		if err := store.AssignBookToSeries(ctx, bookID, seriesID, &idx, display); err != nil {
			t.Fatalf("assign book to series: %v", err)
		}
	}

	bridge := events.NewEventBridge(nil)
	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge, noopPoller{}, noopPoller{}, noopPoller{}, noopSender{}); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return seriesSetup{
		base:     srv.URL,
		libID:    libID,
		seriesID: seriesID,
		store:    store,
		database: database,
	}
}

// TestSeriesCardShowsBookCount verifies that a library with series-assigned books
// shows a series card with the correct count badge, and that standalone books
// are visible alongside it.
func TestSeriesCardShowsBookCount(t *testing.T) {
	t.Parallel()
	ss := newServerWithSeriesLibrary(t, "The Proust Saga", 3, 2)
	page := newPage(t)

	page.MustNavigate(ss.base + "/library/" + ss.libID)
	page.MustElement(`#book-list`)

	// Series card appears with the correct count badge.
	page.MustElementR(`#book-list a[href*="/series/"]`, "The Proust Saga")
	page.MustElementR(`#book-list a[href*="/series/"] span`, "3")

	// Standalone books are also present.
	cards := page.MustElements(`#book-list [data-book-id]`)
	if got := len(cards); got != 2 {
		t.Errorf("standalone book cards: got %d, want 2", got)
	}
}

// TestSeriesDetailPageBooksInIndexOrder navigates to a series detail page and
// verifies that books appear in series_index order.
func TestSeriesDetailPageBooksInIndexOrder(t *testing.T) {
	t.Parallel()
	ss := newServerWithSeriesLibrary(t, "The Proust Saga", 3, 0)
	page := newPage(t)

	page.MustNavigate(ss.base + "/library/" + ss.libID)
	page.MustElement(`#book-list`)

	// Click the series card → navigates to series detail page.
	wait := page.MustWaitNavigation()
	page.MustElement(`#book-list a[href*="/series/"]`).MustClick()
	wait()

	// Series detail page renders series name as heading.
	page.MustElementR("h1", "The Proust Saga")

	// Books appear in series_index order (ascending by Vol. label).
	bookItems := page.MustElements(`#series-book-list [data-book-id]`)
	if got := len(bookItems); got != 3 {
		t.Errorf("series book cards: got %d, want 3", got)
	}

	// Verify the display labels appear in order by checking the page text contains
	// Vol. 1 before Vol. 2 before Vol. 3.
	html := page.MustElement(`#series-book-list`).MustHTML()
	vol1 := indexOf(html, "Vol. 1")
	vol2 := indexOf(html, "Vol. 2")
	vol3 := indexOf(html, "Vol. 3")
	if vol1 < 0 || vol2 < 0 || vol3 < 0 {
		t.Fatalf("series display labels missing in page HTML (vol1=%d vol2=%d vol3=%d)", vol1, vol2, vol3)
	}
	if !(vol1 < vol2 && vol2 < vol3) {
		t.Errorf("books not in index order: Vol.1 at %d, Vol.2 at %d, Vol.3 at %d", vol1, vol2, vol3)
	}
}

// TestSeriesDetailPagePagination verifies that a series with more than the
// default page limit shows a "Load more" link and that clicking it loads the
// next page of books.
func TestSeriesDetailPagePagination(t *testing.T) {
	t.Parallel()
	ss := newServerWithSeriesLibrary(t, "Mega Series", 210, 0)
	page := newPage(t)

	page.MustNavigate(ss.base + "/library/" + ss.libID + "/series/" + ss.seriesID)
	page.MustElement(`#series-book-list`)
	page.MustElementR("h1", "Mega Series")

	// First page has a Load more link.
	page.MustElement(`a[id="load-more"]`)

	// Click Load more → next page of books.
	wait := page.MustWaitNavigation()
	page.MustElement(`a[id="load-more"]`).MustClick()
	wait()

	// Second page should not have a Load more link (only 10 books remain).
	loadMore := page.MustElements(`a[id="load-more"]`)
	if got := len(loadMore); got != 0 {
		t.Errorf("Load more still present on last page (expected none), got %d", got)
	}

	// Still on the series page.
	page.MustElementR("h1", "Mega Series")
}

// TestLoadMoreAdvancesStandaloneBooksIndependently verifies that clicking
// "Load more" on a library page with both series and standalone books loads
// the next page of items correctly: the series card appears at its correct
// alphabetical position and is not duplicated on subsequent pages.
func TestLoadMoreAdvancesStandaloneBooksIndependently(t *testing.T) {
	t.Parallel()
	// "Alpha Series" sorts before "standalone-*.epub" (a < s), so it appears
	// on page 1 alongside the first batch of standalone books.
	ss := newServerWithSeriesLibrary(t, "Alpha Series", 3, 210)
	page := newPage(t)

	page.MustNavigate(ss.base + "/library/" + ss.libID)
	page.MustElement(`#book-list`)

	// First page: series card is visible at its alphabetical position.
	page.MustElementR(`#book-list a[href*="/series/"]`, "Alpha Series")
	// Load more link is present (210 standalone books exceed the page limit).
	page.MustElement(`a[id="load-more"]`)

	// Click Load more → next page of items.
	wait := page.MustWaitNavigation()
	page.MustElement(`a[id="load-more"]`).MustClick()
	wait()

	// Series card does NOT appear again — no duplication across pages.
	seriesCards := page.MustElements(`#book-list a[href*="/series/"]`)
	if got := len(seriesCards); got != 0 {
		t.Errorf("series card duplicated on page 2: got %d, want 0", got)
	}

	// Remaining standalone books are visible on this page.
	standaloneCards := page.MustElements(`#book-list [data-book-id]`)
	if got := len(standaloneCards); got == 0 {
		t.Error("no standalone book cards on page 2")
	}
}

// indexOf returns the byte offset of substr in s, or -1 if not found.
func indexOf(s, substr string) int {
	for i := range len(s) - len(substr) + 1 {
		if s[i:i+len(substr)] == substr {
			return i
		}
	}
	return -1
}
