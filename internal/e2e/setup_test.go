//go:build e2e

package e2e

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"

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

// newServerWithPoller is like newServer but also starts the library poller
// with the given poll interval. Use this for tests that exercise real-time
// book list updates via SSE.
func newServerWithPoller(t *testing.T, interval time.Duration) string {
	t.Helper()

	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	t.Cleanup(func() { database.Close() })

	store := storage.NewStore(database)
	bridge := events.NewEventBridge(nil)

	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(cancel)

	poller := events.NewLibraryPoller(store, bridge, interval, nil)
	poller.Register(ctx)

	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return srv.URL
}

// symlinkTestdata creates a temp dir and symlinks every file from testdata/raw
// into it, giving each test an isolated copy of the shared book fixtures.
func symlinkTestdata(t *testing.T) string {
	t.Helper()
	dir := t.TempDir()
	entries, err := os.ReadDir("testdata/raw")
	if err != nil {
		t.Fatalf("read testdata/raw: %v", err)
	}
	for _, e := range entries {
		if e.IsDir() {
			continue
		}
		src, err := filepath.Abs(filepath.Join("testdata/raw", e.Name()))
		if err != nil {
			t.Fatalf("abs path for %s: %v", e.Name(), err)
		}
		if err := os.Symlink(src, filepath.Join(dir, e.Name())); err != nil {
			t.Fatalf("symlink %s: %v", e.Name(), err)
		}
	}
	return dir
}
