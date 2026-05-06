//go:build e2e

package e2e

import (
	"strings"
	"testing"
)

// TestCreateSeriesFromLibraryPage clicks the "New series" link in the library
// header, creates a series, and verifies the series card appears in the library grid.
func TestCreateSeriesFromLibraryPage(t *testing.T) {
	t.Parallel()
	base := newServer(t)
	page := newPage(t)
	dir := t.TempDir()

	// Create an empty library via the UI.
	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("Manage Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`#book-list`)

	// Extract library ID from the delete link.
	deleteHref := page.MustElement(`a[href$="/delete"]`).MustAttribute("href")
	if deleteHref == nil {
		t.Fatal("delete link has no href")
	}
	libID := libraryIDFromURL(strings.TrimSuffix(*deleteHref, "/delete"))

	// Click the standalone "New series" link in the header.
	wait := page.MustWaitNavigation()
	page.MustElement(`a[href$="/series/new"]`).MustClick()
	wait()

	// Fill in the series name and submit.
	page.MustElementR("h1", "New series")
	page.MustElement(`input[name="name"]`).MustInput("The Proust Series")
	wait = page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Should land on the add-books page for the new series.
	page.MustElementR("h1", `Add books to "The Proust Series"`)

	// Navigate back to the library page — series card should be visible.
	page.MustNavigate(base + "/library/" + libID)
	page.MustElementR(`#book-list a[href*="/series/"]`, "The Proust Series")
}

// TestAddBooksToSeries navigates to the add-books page, selects books, submits,
// and verifies the series detail page shows those books and the count badge updates.
func TestAddBooksToSeries(t *testing.T) {
	t.Parallel()
	// Start with 5 standalone books and an empty series.
	ss := newServerWithSeriesLibrary(t, "Classics", 0, 5)
	page := newPage(t)

	// Navigate directly to the add-books page.
	page.MustNavigate(ss.base + "/library/" + ss.libID + "/series/" + ss.seriesID + "/add")
	page.MustElementR("h1", `Add books to "Classics"`)

	// Select the first two books. sr-only checkboxes are 1×1px so label clicks
	// are unreliable in headless Chromium; call .click() via JavaScript instead.
	// Use a regular function (not an arrow function) so rod's callFunctionOn
	// correctly binds this to the checkbox element.
	checkboxes := page.MustElements(`input[name="book_id"]`)
	if len(checkboxes) < 2 {
		t.Fatalf("expected at least 2 books on add page, got %d", len(checkboxes))
	}
	checkboxes[0].MustEval(`function() { this.click() }`)
	checkboxes[1].MustEval(`function() { this.click() }`)

	// Submit and wait for navigation to the series detail page.
	wait := page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Series detail page shows 2 books.
	// Guard: #series-book-list only exists on the series detail page, not on the
	// add-books page. Waiting for it ensures we didn't land on the wrong page due
	// to a parallel test's navigation resolving our MustWaitNavigation subscription.
	page.MustElement(`#series-book-list`)
	page.MustElementR("h1", "Classics")
	books := page.MustElements(`#series-book-list [data-book-id]`)
	if got := len(books); got != 2 {
		t.Errorf("series book count: got %d, want 2", got)
	}

	// Library page series card badge shows 2.
	page.MustNavigate(ss.base + "/library/" + ss.libID)
	page.MustElementR(`#book-list a[href*="/series/"] span`, "2")
}

// TestAddBooksSearch verifies that the search filter on the add-books page
// reduces the visible books to matching ones, and that selecting and submitting
// one of them adds it to the series.
func TestAddBooksSearch(t *testing.T) {
	t.Parallel()
	// Start with 5 standalone books (standalone-001.epub … standalone-005.epub)
	// and an empty series.
	ss := newServerWithSeriesLibrary(t, "Filtered Series", 0, 5)
	page := newPage(t)

	// Navigate directly to the filtered add-books page.
	// Only standalone-001.epub should match the filename filter.
	addURL := ss.base + "/library/" + ss.libID + "/series/" + ss.seriesID + "/add"
	page.MustNavigate(addURL + "?q=filename%3Astandalone-001")
	page.MustElementR("h1", `Add books to "Filtered Series"`)

	// Only the matching book should be visible.
	checkboxes := page.MustElements(`input[name="book_id"]`)
	if got := len(checkboxes); got != 1 {
		t.Fatalf("filtered book count: got %d, want 1", got)
	}

	// Select it. sr-only checkboxes are 1×1px so label clicks are unreliable
	// in headless Chromium; call .click() via JavaScript instead.
	// Use a regular function (not an arrow function) so rod's callFunctionOn
	// correctly binds this to the checkbox element.
	checkboxes[0].MustEval(`function() { this.click() }`)

	// Submit and wait for navigation to the series detail page.
	wait := page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Series detail page shows the one book.
	// Guard: #series-book-list only exists on the series detail page, not on the
	// add-books page. Waiting for it ensures we didn't land on the wrong page due
	// to a parallel test's navigation resolving our MustWaitNavigation subscription.
	page.MustElement(`#series-book-list`)
	page.MustElementR("h1", "Filtered Series")
	books := page.MustElements(`#series-book-list [data-book-id]`)
	if got := len(books); got != 1 {
		t.Errorf("series book count after filtered add: got %d, want 1", got)
	}

	// Library page series card badge shows 1.
	page.MustNavigate(ss.base + "/library/" + ss.libID)
	page.MustElementR(`#book-list a[href*="/series/"] span`, "1")
}
