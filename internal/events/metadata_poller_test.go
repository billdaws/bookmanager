package events

import (
	"context"
	"testing"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// mockMetadataStore implements metadataStore for testing.
type mockMetadataStore struct {
	libs     []storage.Library
	backfill func(ctx context.Context, libraryID, dir string) (bool, error)
}

func (m *mockMetadataStore) ListLibraries(ctx context.Context) ([]storage.Library, error) {
	return m.libs, nil
}

func (m *mockMetadataStore) BackfillMetadata(ctx context.Context, libraryID, dir string) (bool, error) {
	return m.backfill(ctx, libraryID, dir)
}

// TestMetadataPoller_PublishesWhenUpdated verifies that a TopicLibraryBooksChanged
// event is published when BackfillMetadata reports that metadata changed.
func TestMetadataPoller_PublishesWhenUpdated(t *testing.T) {
	bridge := NewEventBridge(nil)

	lib := storage.Library{ID: "lib-1", Name: "Test", Directory: "/books"}
	store := &mockMetadataStore{
		libs: []storage.Library{lib},
		backfill: func(_ context.Context, _ string, _ string) (bool, error) {
			return true, nil // metadata was updated
		},
	}

	received := make(chan struct{}, 1)
	bridge.Subscribe(TopicLibraryBooksChanged(lib.ID), "test", func(e Event) error {
		received <- struct{}{}
		return nil
	})

	poller := NewMetadataPoller(store, bridge, time.Hour)
	go poller.Run(t.Context())

	select {
	case <-received:
		// pass
	case <-time.After(2 * time.Second):
		t.Error("timeout: expected TopicLibraryBooksChanged after metadata update")
	}
}

// TestMetadataPoller_NoPublishWhenUnchanged verifies that no event is published
// when BackfillMetadata reports nothing changed.
func TestMetadataPoller_NoPublishWhenUnchanged(t *testing.T) {
	bridge := NewEventBridge(nil)

	lib := storage.Library{ID: "lib-1", Name: "Test", Directory: "/books"}
	store := &mockMetadataStore{
		libs: []storage.Library{lib},
		backfill: func(_ context.Context, _ string, _ string) (bool, error) {
			return false, nil // nothing changed
		},
	}

	received := make(chan struct{}, 1)
	bridge.Subscribe(TopicLibraryBooksChanged(lib.ID), "test", func(e Event) error {
		received <- struct{}{}
		return nil
	})

	poller := NewMetadataPoller(store, bridge, time.Hour)
	go poller.Run(t.Context())

	// Give the initial runOnce time to complete.
	time.Sleep(50 * time.Millisecond)

	select {
	case <-received:
		t.Error("unexpected TopicLibraryBooksChanged when nothing changed")
	default:
		// pass
	}
}
