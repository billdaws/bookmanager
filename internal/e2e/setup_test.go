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
	"github.com/billdaws/bookmanager/internal/scanner"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
)

var browser *rod.Browser

type noopPoller struct{}

func (noopPoller) RunNow() {}

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
	if err := web.Register(mux, store, bridge, noopPoller{}); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return srv.URL
}

func newPage(t *testing.T) *rod.Page {
	t.Helper()
	page := browser.MustPage("").Timeout(15 * time.Second)
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
	if err := web.Register(mux, store, bridge, noopPoller{}); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return srv.URL
}

// newServerWithStaleBooks creates a server pre-loaded with a library whose books
// have had their extracted metadata cleared and their metadata_sync key stamped
// as stale. It returns the server URL, the library ID, the scanned filenames,
// and a startPoller func the test calls once it has confirmed the stale state
// is visible in the browser. Splitting server creation from poller startup
// eliminates the race between the initial page render and the first poller tick.
func newServerWithStaleBooks(t *testing.T, dir string) (string, string, []string, func()) {
	t.Helper()

	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	t.Cleanup(func() { database.Close() })

	store := storage.NewStore(database)
	bridge := events.NewEventBridge(nil)
	ctx := context.Background()

	files, err := scanner.ScanDirectory(dir)
	if err != nil {
		t.Fatalf("scan directory: %v", err)
	}
	libID, err := store.CreateLibraryWithBooks(ctx, "Backfill Library", dir, files)
	if err != nil {
		t.Fatalf("create library: %v", err)
	}

	// Run an initial backfill to stamp metadata_sync rows, then mark them stale
	// and clear extracted fields to simulate books whose columns key is outdated.
	if _, err := store.BackfillMetadata(ctx, libID, dir); err != nil {
		t.Fatalf("initial backfill: %v", err)
	}
	if _, err := database.ExecContext(ctx,
		`UPDATE metadata_sync SET columns_attempted = 'stale'
		  WHERE book_id IN (SELECT id FROM books WHERE library_id = ?)`, libID,
	); err != nil {
		t.Fatalf("stamp stale key: %v", err)
	}
	if _, err := database.ExecContext(ctx,
		`UPDATE books SET title = NULL, authors = NULL, publication_date = NULL
		  WHERE library_id = ?`, libID,
	); err != nil {
		t.Fatalf("clear metadata: %v", err)
	}

	metaPoller := events.NewMetadataPoller(store, bridge, 100*time.Millisecond)

	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge, metaPoller); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	startPoller := func() {
		pollerCtx, cancel := context.WithCancel(context.Background())
		t.Cleanup(cancel)
		go metaPoller.Run(pollerCtx)
	}

	return srv.URL, libID, files, startPoller
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
