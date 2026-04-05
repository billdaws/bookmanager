package events

import (
	"context"
	"database/sql"
	"os"
	"path/filepath"
	"testing"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// testPollInterval is short so tests complete in a few poll cycles (~40–60ms
// in the happy path). The 2s timeout in each test is a failure guard only.
const testPollInterval = 20 * time.Millisecond

func setupTestDB(t *testing.T) *sql.DB {
	t.Helper()
	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("setupTestDB: %v", err)
	}
	t.Cleanup(func() { database.Close() })
	return database
}

func touch(t *testing.T, dir, name string) {
	t.Helper()
	f, err := os.Create(filepath.Join(dir, name))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()
}

func setupPoller(t *testing.T) (*LibraryPoller, *EventBridge, *storage.Store) {
	t.Helper()
	bridge := NewEventBridge(nil)
	store := storage.NewStore(setupTestDB(t))
	poller := NewLibraryPoller(store, bridge, testPollInterval, nil)
	return poller, bridge, store
}

// TestLibraryPoller_PublishesOnNewFile checks that adding a file to disk
// triggers a books.changed event containing the new file.
func TestLibraryPoller_PublishesOnNewFile(t *testing.T) {
	t.Parallel()
	poller, bridge, store := setupPoller(t)

	dir := t.TempDir()
	touch(t, dir, "existing.epub")

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, []string{"existing.epub"})
	if err != nil {
		t.Fatal(err)
	}
	lib, _ := store.GetLibraryByID(context.Background(), id)

	received := make(chan LibraryBooksChangedPayload, 1)
	bridge.Subscribe(TopicLibraryBooksChanged(id), "test", func(e Event) error {
		received <- e.Payload.(LibraryBooksChangedPayload)
		return nil
	})

	ctx := t.Context()
	poller.Start(ctx, lib)

	touch(t, dir, "new.epub")

	select {
	case delta := <-received:
		if !containsFilename(delta.Added, "new.epub") {
			t.Errorf("expected new.epub in Added, got %v", filenames(delta.Added))
		}
		if len(delta.Removed) != 0 {
			t.Errorf("expected no Removed, got %v", filenames(delta.Removed))
		}
	case <-time.After(2 * time.Second):
		t.Error("timeout waiting for books.changed event")
	}
}

// TestLibraryPoller_PublishesOnRemovedFile checks that removing a file from
// disk triggers a books.changed event without that file.
func TestLibraryPoller_PublishesOnRemovedFile(t *testing.T) {
	t.Parallel()
	poller, bridge, store := setupPoller(t)

	dir := t.TempDir()
	touch(t, dir, "keep.epub")
	touch(t, dir, "gone.epub")

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, []string{"keep.epub", "gone.epub"})
	if err != nil {
		t.Fatal(err)
	}
	lib, _ := store.GetLibraryByID(context.Background(), id)

	received := make(chan LibraryBooksChangedPayload, 1)
	bridge.Subscribe(TopicLibraryBooksChanged(id), "test", func(e Event) error {
		received <- e.Payload.(LibraryBooksChangedPayload)
		return nil
	})

	ctx := t.Context()
	poller.Start(ctx, lib)

	if err := os.Remove(filepath.Join(dir, "gone.epub")); err != nil {
		t.Fatal(err)
	}

	select {
	case delta := <-received:
		if !containsFilename(delta.Removed, "gone.epub") {
			t.Errorf("expected gone.epub in Removed, got %v", filenames(delta.Removed))
		}
		if len(delta.Added) != 0 {
			t.Errorf("expected no Added, got %v", filenames(delta.Added))
		}
	case <-time.After(2 * time.Second):
		t.Error("timeout waiting for books.changed event")
	}
}

// TestLibraryPoller_NoPublishWhenUnchanged checks that no event is published
// when the directory contents have not changed.
// This test intentionally sleeps for several poll cycles.
func TestLibraryPoller_NoPublishWhenUnchanged(t *testing.T) {
	t.Parallel()
	poller, bridge, store := setupPoller(t)

	dir := t.TempDir()
	touch(t, dir, "book.epub")

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}
	lib, _ := store.GetLibraryByID(context.Background(), id)

	received := make(chan struct{}, 1)
	bridge.Subscribe(TopicLibraryBooksChanged(id), "test", func(e Event) error {
		received <- struct{}{}
		return nil
	})

	ctx := t.Context()
	poller.Start(ctx, lib)

	time.Sleep(5 * testPollInterval)

	select {
	case <-received:
		t.Error("unexpected event when nothing changed")
	default:
	}
}

// TestLibraryPoller_StartsOnLibraryCreated checks that publishing a
// TopicLibraryCreated event causes the poller to start watching that library.
func TestLibraryPoller_StartsOnLibraryCreated(t *testing.T) {
	t.Parallel()
	poller, bridge, store := setupPoller(t)

	ctx := t.Context()
	poller.Register(ctx)

	dir := t.TempDir()
	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, nil)
	if err != nil {
		t.Fatal(err)
	}
	lib, _ := store.GetLibraryByID(context.Background(), id)

	received := make(chan LibraryBooksChangedPayload, 1)
	bridge.Subscribe(TopicLibraryBooksChanged(id), "test", func(e Event) error {
		received <- e.Payload.(LibraryBooksChangedPayload)
		return nil
	})

	bridge.Publish(TopicLibraryCreated, lib)

	touch(t, dir, "new.epub")

	select {
	case delta := <-received:
		if !containsFilename(delta.Added, "new.epub") {
			t.Errorf("expected new.epub in Added, got %v", filenames(delta.Added))
		}
	case <-time.After(2 * time.Second):
		t.Error("timeout: poller was not started by library.created event")
	}
}

// TestLibraryPoller_ReportsErrorOnBadDirectory checks that a sync failure
// (e.g. directory removed) is forwarded to the onError callback.
func TestLibraryPoller_ReportsErrorOnBadDirectory(t *testing.T) {
	t.Parallel()

	bridge := NewEventBridge(nil)
	errCh := make(chan error, 1)
	store := storage.NewStore(setupTestDB(t))
	poller := NewLibraryPoller(store, bridge, testPollInterval, func(lib *storage.Library, err error) {
		select {
		case errCh <- err:
		default:
		}
	})

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", "/no/such/path", nil)
	if err != nil {
		t.Fatal(err)
	}
	lib, _ := store.GetLibraryByID(context.Background(), id)

	poller.Start(t.Context(), lib)

	select {
	case err := <-errCh:
		if err == nil {
			t.Error("expected non-nil error")
		}
	case <-time.After(2 * time.Second):
		t.Error("timeout waiting for error callback")
	}
}

func containsFilename(books []storage.Book, name string) bool {
	for _, b := range books {
		if b.Filename == name {
			return true
		}
	}
	return false
}

func filenames(books []storage.Book) []string {
	names := make([]string, len(books))
	for i, b := range books {
		names[i] = b.Filename
	}
	return names
}
