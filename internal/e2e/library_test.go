//go:build e2e

package e2e

import (
	"os"
	"path/filepath"
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

	// Click "Add library" → GET form navigates to /library/new.
	wait := page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
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
	for _, e := range entries {
		if !e.IsDir() {
			page.MustElementR("li", e.Name())
		}
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

	page.MustElementR("li", "No books found.")

	// Add a book — the poller picks it up and pushes an SSE update.
	src, err := filepath.Abs("testdata/raw/wuthering-heights.epub")
	if err != nil {
		t.Fatal(err)
	}
	dst := filepath.Join(dir, "wuthering-heights.epub")
	if err := os.Symlink(src, dst); err != nil {
		t.Fatalf("symlink: %v", err)
	}
	page.MustElementR("li", "wuthering-heights.epub")

	// Remove the book — the poller notices and pushes another update.
	if err := os.Remove(dst); err != nil {
		t.Fatalf("remove: %v", err)
	}
	page.MustElementR("li", "No books found.")
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

	// Click "Delete library" → GET form navigates to the confirmation page.
	wait := page.MustWaitNavigation()
	page.MustElement(`form[action$="/delete"] button[type="submit"]`).MustClick()
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
