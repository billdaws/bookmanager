//go:build e2e

package e2e

import (
	"context"
	"io"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/billdaws/bookmanager/internal/scanner"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
)

// serverWithLibrary holds the URL and store for a running test server.
type serverWithLibrary struct {
	URL   string
	LibID string
	Store *storage.Store
}

// newServerWithMetadataPoller creates a server pre-loaded with the books in dir,
// runs a full metadata backfill, and returns the server URL, library ID, and store.
func newServerWithMetadataPoller(t *testing.T, dir string) serverWithLibrary {
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
	bridge := events.NewEventBridge(nil)
	ctx := context.Background()

	files, err := scanner.ScanDirectory(dir)
	if err != nil {
		t.Fatalf("scan directory: %v", err)
	}
	libID, err := store.CreateLibraryWithBooks(ctx, "Comics Library", dir, files)
	if err != nil {
		t.Fatalf("create library: %v", err)
	}

	if _, err := store.BackfillMetadata(ctx, libID, dir, nil); err != nil {
		t.Fatalf("backfill metadata: %v", err)
	}

	metaPoller := events.NewMetadataPoller(store, bridge, 100*time.Millisecond)

	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge, metaPoller, noopPoller{}, noopPoller{}, noopSender{}); err != nil {
		t.Fatalf("register: %v", err)
	}

	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)

	return serverWithLibrary{URL: srv.URL, LibID: libID, Store: store}
}

func TestCoverServedFromCBZ(t *testing.T) {
	t.Parallel()
	dir := symlinkTestdata(t)
	s := newServerWithMetadataPoller(t, dir)

	books, err := s.Store.ListBooks(context.Background(), s.LibID)
	if err != nil {
		t.Fatalf("list books: %v", err)
	}

	tested := 0
	for _, b := range books {
		if strings.ToLower(filepath.Ext(b.Filename)) != ".cbz" {
			continue
		}
		if b.CoverPath == "" {
			continue
		}
		url := s.URL + "/library/" + s.LibID + "/book/" + b.ID + "/cover"
		resp, err := http.Get(url) //nolint:noctx
		if err != nil {
			t.Fatalf("GET %s: %v", url, err)
		}
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("CBZ cover %s (%s): status %d, want 200", b.Filename, url, resp.StatusCode)
			continue
		}
		if ct := resp.Header.Get("Content-Type"); ct != "image/jpeg" {
			t.Errorf("CBZ cover %s: Content-Type = %q, want image/jpeg", b.Filename, ct)
		}
		if len(body) == 0 {
			t.Errorf("CBZ cover %s: body is empty", b.Filename)
		}
		tested++
	}
	if tested == 0 {
		t.Fatal("no CBZ books with covers found in testdata")
	}
}

func TestCoverServedFromCBR(t *testing.T) {
	t.Parallel()
	dir := symlinkTestdata(t)
	s := newServerWithMetadataPoller(t, dir)

	books, err := s.Store.ListBooks(context.Background(), s.LibID)
	if err != nil {
		t.Fatalf("list books: %v", err)
	}

	tested := 0
	for _, b := range books {
		if strings.ToLower(filepath.Ext(b.Filename)) != ".cbr" {
			continue
		}
		if b.CoverPath == "" {
			continue
		}
		url := s.URL + "/library/" + s.LibID + "/book/" + b.ID + "/cover"
		resp, err := http.Get(url) //nolint:noctx
		if err != nil {
			t.Fatalf("GET %s: %v", url, err)
		}
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("CBR cover %s (%s): status %d, want 200", b.Filename, url, resp.StatusCode)
			continue
		}
		if ct := resp.Header.Get("Content-Type"); ct != "image/jpeg" {
			t.Errorf("CBR cover %s: Content-Type = %q, want image/jpeg", b.Filename, ct)
		}
		if len(body) == 0 {
			t.Errorf("CBR cover %s: body is empty", b.Filename)
		}
		tested++
	}
	if tested == 0 {
		t.Fatal("no CBR books with covers found in testdata")
	}
}
