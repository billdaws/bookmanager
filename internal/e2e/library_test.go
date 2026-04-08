//go:build e2e

package e2e

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// TestCreateLibrary navigates through the UI to create a library and verifies
// it appears on the index page.
func TestCreateLibrary(t *testing.T) {
	t.Parallel()
	base := newServer(t)
	page := newPage(t)
	dir := t.TempDir()

	// Index page starts empty.
	page.MustNavigate(base + "/")
	page.MustElementR("p", "No libraries yet")

	// Click "Add library" → navigates to /library/new.
	wait := page.MustWaitNavigation()
	page.MustElement(`a[href="/library/new"]`).MustClick()
	wait()

	// Fill and submit the setup form. The form uses hx-post; after a 303
	// redirect HTMX swaps the body with the library page.
	page.MustElement("#name").MustInput("Test Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()

	// Wait for the library page: it has a "← All libraries" back-link that
	// the setup page does not.
	page.MustElement(`a[href="/"]`)

	if got := page.MustElement("h1").MustText(); got != "Test Library" {
		t.Errorf("h1 = %q, want %q", got, "Test Library")
	}

	// Navigate to index — library should now be listed.
	page.MustNavigate(base + "/")
	page.MustElementR("a", "Test Library")
}

// TestDisplaysBooks creates a library whose directory already contains books
// and verifies each book filename appears in the list on the library page.
func TestDisplaysBooks(t *testing.T) {
	t.Parallel()
	base := newServer(t)
	page := newPage(t)
	dir := symlinkTestdata(t)

	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("My Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`a[href="/"]`) // wait for library page

	entries, err := os.ReadDir("testdata/raw")
	if err != nil {
		t.Fatalf("read testdata/raw: %v", err)
	}
	var wantRows int
	for _, e := range entries {
		if !e.IsDir() {
			wantRows++
		}
	}
	rows := page.MustElements("#book-list tbody tr")
	if got := len(rows); got != wantRows {
		t.Errorf("got %d book rows, want %d", got, wantRows)
	}
}

// TestPollerUpdatesBookList verifies that the filesystem poller detects changes
// to a library directory and the SSE-driven book list updates in the browser
// without a page reload.
func TestPollerUpdatesBookList(t *testing.T) {
	t.Parallel()
	base := newServerWithPoller(t, 100*time.Millisecond)
	page := newPage(t)
	dir := t.TempDir()

	// Create an empty library.
	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("Live Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`a[href="/"]`) // wait for library page

	page.MustElementR("td", "No books found.")

	// Add a book — the poller picks it up and pushes an SSE update.
	src, err := filepath.Abs("testdata/raw/yellow-wallpaper.epub")
	if err != nil {
		t.Fatal(err)
	}
	dst := filepath.Join(dir, "yellow-wallpaper.epub")
	if err := os.Symlink(src, dst); err != nil {
		t.Fatalf("symlink: %v", err)
	}
	// Wait for the SSE update to replace the empty state with the book entry.
	page.MustWait(`() => !document.querySelector('#book-list').textContent.includes('No books found.')`)

	// Remove the book — the poller notices and pushes another update.
	if err := os.Remove(dst); err != nil {
		t.Fatalf("remove: %v", err)
	}
	page.MustElementR("td", "No books found.")
}

// TestQueryFilter creates a library with books and verifies that the search
// DSL filters the book list server-side.
func TestQueryFilter(t *testing.T) {
	t.Parallel()
	base := newServer(t)
	page := newPage(t)
	dir := symlinkTestdata(t)

	// Create a library with all test books.
	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("Filter Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`a[href="/"]`) // wait for library page

	// Extract the library ID from the delete link, since the HTMX form swap
	// does not update the browser URL bar.
	deleteHref := page.MustElement(`a[href$="/delete"]`).MustAttribute("href")
	if deleteHref == nil {
		t.Fatal("delete link has no href")
	}
	// *deleteHref = "/library/{id}/delete" → strip suffix then take last segment
	libID := libraryIDFromURL(strings.TrimSuffix(*deleteHref, "/delete"))

	// Navigate with a filename: query — only yellow-wallpaper should appear.
	page.MustNavigate(base + "/library/" + libID + "?q=filename:yellow-wallpaper")
	page.MustElement("#book-list") // wait for render

	rows := page.MustElements("#book-list tbody tr")
	if got := len(rows); got != 1 {
		t.Errorf("got %d rows, want 1", got)
	}

	// An invalid query shows all books and an error message.
	page.MustNavigate(base + "/library/" + libID + "?q=tolkien%20OR%20hobbit")
	page.MustElementR("p", "unexpected token")

	entries, err := os.ReadDir("testdata/raw")
	if err != nil {
		t.Fatalf("read testdata/raw: %v", err)
	}
	rows = page.MustElements("#book-list tbody tr")
	if got, want := len(rows), len(entries); got != want {
		t.Errorf("got %d rows on error query, want %d (all books)", got, want)
	}
}

// TestEditBookMetadata opens the edit sheet for a book, updates its title, and
// verifies the change appears in the book list after save.
func TestEditBookMetadata(t *testing.T) {
	t.Parallel()
	base := newServer(t)
	page := newPage(t)
	dir := symlinkTestdata(t)

	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("Edit Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`a[href="/"]`) // wait for library page

	// Wait for the page to fully load (including module scripts) before using sheets.
	page.MustWait(`() => document.readyState === "complete"`)
	page.MustWait(`() => typeof window.tui?.dialog?.toggle === "function"`)

	// Click the edit icon button for the first book. The trigger span is
	// display:contents (no bounding box), so click the button inside it.
	page.MustElement(`[data-tui-dialog-trigger] button`).MustClick()

	// Wait for the sheet to be open before interacting with it.
	page.MustWait(`() => document.querySelector('[data-tui-dialog-open="true"]') !== null`)
	titleInput := page.MustElement(`[data-tui-dialog-open="true"] input[name="title"]`)
	authorsInput := page.MustElement(`[data-tui-dialog-open="true"] input[name="authors"]`)

	// Replace whatever values are there with custom ones. Both must be set so
	// bookDisplayLabel renders "Authors - Title" rather than falling back to filename.
	titleInput.MustSelectAllText()
	titleInput.MustInput("My Custom Title")
	authorsInput.MustSelectAllText()
	authorsInput.MustInput("Test Author")

	// Submit the form → POST → 303 → library page.
	wait := page.MustWaitNavigation()
	page.MustElement(`[data-tui-dialog-open="true"] button[type="submit"]`).MustClick()
	wait()

	// The custom title should appear in the book list label ("Test Author - My Custom Title").
	page.MustElementR("#book-list", "My Custom Title")
}

// libraryIDFromURL extracts the library ID from a URL of the form /library/{id}[?...].
func libraryIDFromURL(u string) string {
	// strip query string first
	if i := strings.IndexByte(u, '?'); i >= 0 {
		u = u[:i]
	}
	parts := strings.Split(strings.TrimRight(u, "/"), "/")
	return parts[len(parts)-1]
}

// TestDeleteLibrary creates a library via the UI and then deletes it through
// the confirmation flow, verifying it is gone from the index afterwards.
func TestDeleteLibrary(t *testing.T) {
	t.Parallel()
	base := newServer(t)
	page := newPage(t)
	dir := t.TempDir()

	// Create a library via the setup form.
	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("Doomed Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`a[href="/"]`) // wait for library page

	// Open the settings dropdown, then click "Delete library" → navigates to the confirmation page.
	page.MustElement(`details summary`).MustClick()
	wait := page.MustWaitNavigation()
	page.MustElement(`a[href$="/delete"]`).MustClick()
	wait()

	// Type the library name and confirm deletion.
	page.MustElement(`input[name="name"]`).MustInput("Doomed Library")

	// Submit the delete form → POST → 303 → index.
	wait = page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Should be back on the index with no libraries.
	page.MustElementR("p", "No libraries yet")
}

// TestMetadataBackfill verifies that the background metadata poller re-extracts
// and publishes metadata for books whose sync key is stale. The stale state is
// set up before the server starts, and the poller is started only after the
// browser has confirmed the no-metadata (filename-only) state, making the test
// distinct from the initial-insertion path.
func TestMetadataBackfill(t *testing.T) {
	t.Parallel()
	dir := symlinkTestdata(t)
	base, libID, files, startPoller := newServerWithStaleBooks(t, dir)
	if len(files) == 0 {
		t.Fatal("no test fixtures in testdata/raw")
	}
	page := newPage(t)

	// Navigate to the library page. Books have cleared metadata, so they render
	// as filenames only.
	page.MustNavigate(base + "/library/" + libID)
	page.MustElementR("td", files[0])

	// Start the metadata poller now that the stale state is confirmed in the
	// browser. It will detect the stale key, re-extract metadata, and push an
	// SSE update that replaces filename labels with author/title labels.
	startPoller()

	// The first book's filename disappears from the list once its metadata is
	// restored — bookDisplayLabel switches to "Author - Title (year)" format.
	page.MustWait(fmt.Sprintf(
		`() => !document.querySelector('#book-list').textContent.includes(%q)`,
		files[0],
	))
}
