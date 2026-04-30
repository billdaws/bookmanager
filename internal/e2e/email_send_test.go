//go:build e2e

package e2e

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/billdaws/bookmanager/internal/email"
	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
)

// newServerWithEmail creates a test server wired with a real ResendSender
// using credentials from the environment.
func newServerWithEmail(t *testing.T) string {
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

	sender := email.NewResendSender(
		os.Getenv("BOOKMANAGER_RESEND_API_KEY"),
		os.Getenv("BOOKMANAGER_FROM_EMAIL"),
	)

	bridge := events.NewEventBridge(nil)
	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge, noopPoller{}, sender); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)
	return srv.URL
}

func TestSendBookToRecipient(t *testing.T) {
	if os.Getenv("BOOKMANAGER_RESEND_API_KEY") == "" {
		t.Skip("BOOKMANAGER_RESEND_API_KEY not set — skipping live email send test")
	}
	if os.Getenv("BOOKMANAGER_FROM_EMAIL") == "" {
		t.Skip("BOOKMANAGER_FROM_EMAIL not set — skipping live email send test")
	}
	toEmail := os.Getenv("BOOKMANAGER_TEST_TO_EMAIL")
	if toEmail == "" {
		t.Skip("BOOKMANAGER_TEST_TO_EMAIL not set — skipping live email send test")
	}

	t.Parallel()

	base := newServerWithEmail(t)
	page := newPage(t)
	dir := symlinkTestdata(t)

	// Add a recipient via the browser UI.
	page.MustNavigate(base + "/recipients/new")
	page.MustElement(`input[name="name"]`).MustInput("Test Recipient")
	page.MustElement(`input[name="email"]`).MustInput(toEmail)
	wait := page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Create a library with test books via the browser UI.
	page.MustNavigate(base + "/library/new")
	page.MustWaitLoad()
	page.MustElement("#name").MustInput("Send Test Library")
	page.MustElement("#directory").MustInput(dir)
	page.MustElement(`button[type="submit"]`).MustClick()
	page.MustElement(`#book-list`) // wait for library page

	// Wait for at least one book row with a send link, then click it.
	wait = page.MustWaitNavigation()
	page.MustElement(`a[href$="/send"]`).MustClick()
	wait()

	// On the send page: check the recipient checkbox and submit.
	page.MustElement(`input[name="recipient_id"]`).MustClick()
	wait = page.MustWaitNavigation()
	page.MustElement(`button[type="submit"]`).MustClick()
	wait()

	// Should be back on the library page.
	page.MustElementR("h1", "Send Test Library")
}
