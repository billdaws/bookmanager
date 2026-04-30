//go:build e2e

package e2e

import (
	"testing"
)

func TestRecipientsEmptyState(t *testing.T) {
	t.Parallel()

	url := newServer(t)
	page := newPage(t)

	page.MustNavigate(url + "/recipients")
	page.MustElementR("p", "No recipients yet")
}

func TestRecipientsAddAndList(t *testing.T) {
	t.Parallel()

	url := newServer(t)
	page := newPage(t)

	page.MustNavigate(url + "/recipients/new")

	page.MustElement(`input[name="name"]`).MustInput("Alice")
	page.MustElement(`input[name="email"]`).MustInput("alice@example.com")

	wait := page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	page.MustElementR("span", "Alice")
	page.MustElementR("span", "alice@example.com")
}

func TestRecipientsDelete(t *testing.T) {
	t.Parallel()

	url := newServer(t)
	page := newPage(t)

	// Add a recipient
	page.MustNavigate(url + "/recipients/new")
	page.MustElement(`input[name="name"]`).MustInput("Bob")
	page.MustElement(`input[name="email"]`).MustInput("bob@example.com")
	wait := page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Verify it appears
	page.MustElementR("span", "Bob")

	// Delete it
	wait = page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Verify empty state
	page.MustElementR("p", "No recipients yet")
}
