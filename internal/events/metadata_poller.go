package events

import (
	"context"
	"log"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// metadataStore is the subset of db.Store methods used by MetadataPoller.
type metadataStore interface {
	ListLibraries(ctx context.Context) ([]storage.Library, error)
	BackfillMetadata(ctx context.Context, libraryID, dir string) (bool, error)
}

// MetadataPoller runs periodic metadata backfill across all libraries.
// On each cycle it finds books whose metadata_sync record is missing or was
// produced with a different extractable-columns set than the current code, and
// re-extracts their metadata. When a library's books change it publishes a
// TopicLibraryBooksChanged event so connected browsers refresh.
type MetadataPoller struct {
	store    metadataStore
	bridge   *EventBridge
	interval time.Duration
}

// NewMetadataPoller creates a MetadataPoller that runs every interval.
func NewMetadataPoller(store metadataStore, bridge *EventBridge, interval time.Duration) *MetadataPoller {
	return &MetadataPoller{store: store, bridge: bridge, interval: interval}
}

// Run executes an immediate backfill pass and then repeats every interval.
// It blocks until ctx is cancelled.
func (p *MetadataPoller) Run(ctx context.Context) {
	p.runOnce(ctx)

	ticker := time.NewTicker(p.interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			p.runOnce(ctx)
		}
	}
}

func (p *MetadataPoller) runOnce(ctx context.Context) {
	libs, err := p.store.ListLibraries(ctx)
	if err != nil {
		log.Printf("metadata poller: list libraries: %v", err)
		return
	}
	for _, lib := range libs {
		updated, err := p.store.BackfillMetadata(ctx, lib.ID, lib.Directory)
		if err != nil {
			log.Printf("metadata poller: backfill %q: %v", lib.Name, err)
			continue
		}
		if updated {
			log.Printf("metadata poller: updated metadata for library %q", lib.Name)
			p.bridge.Publish(TopicLibraryBooksChanged(lib.ID), nil)
		}
	}
}
