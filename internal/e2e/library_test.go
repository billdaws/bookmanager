//go:build e2e

package e2e

import (
	"testing"
)

// TestCreateLibrary navigates through the UI to create a library and verifies
// it appears on the index page.
func TestCreateLibrary(t *testing.T) {
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

// TestDeleteLibrary creates a library via the UI and then deletes it through
// the confirmation flow, verifying it is gone from the index afterwards.
func TestDeleteLibrary(t *testing.T) {
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
