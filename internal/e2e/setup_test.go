//go:build e2e

package e2e

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
)

var browser *rod.Browser

func TestMain(m *testing.M) {
	bin := os.Getenv("CHROMIUM_BIN")
	if bin == "" {
		bin = "/usr/bin/chromium"
	}

	u := launcher.New().
		Bin(bin).
		NoSandbox(true).
		Headless(true).
		MustLaunch()

	browser = rod.New().ControlURL(u).MustConnect()
	defer browser.MustClose()

	os.Exit(m.Run())
}

func newServer(t *testing.T) string {
	t.Helper()

	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	t.Cleanup(func() { database.Close() })

	store := storage.NewStore(database)
	bridge := events.NewEventBridge(nil)

	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return srv.URL
}

func newPage(t *testing.T) *rod.Page {
	t.Helper()
	page := browser.MustPage("")
	t.Cleanup(func() { page.MustClose() })
	return page
}
