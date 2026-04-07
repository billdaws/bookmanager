package events

import (
	"context"
	"log"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// libraryStore is the subset of db.Store methods used by LibraryPoller.
type libraryStore interface {
	ListBooks(ctx context.Context, libraryID string) ([]storage.Book, error)
	UpdateBooks(ctx context.Context, libraryID, dir string, filesToAdd []string, bookIDsToRemove []string) error
	BackfillMetadata(ctx context.Context, libraryID, dir string) error
}

// LibraryPoller watches a library's directory by polling on a fixed interval.
// When the set of book files changes, it syncs the database and publishes a
// TopicLibraryBooksChanged event.
type LibraryPoller struct {
	store    libraryStore
	bridge   *EventBridge
	interval time.Duration
	onError  func(lib *storage.Library, err error)
}

// NewLibraryPoller creates a LibraryPoller. onError is called when a poll
// cycle fails; pass nil to drop errors silently.
func NewLibraryPoller(store libraryStore, bridge *EventBridge, interval time.Duration, onError func(*storage.Library, error)) *LibraryPoller {
	return &LibraryPoller{store: store, bridge: bridge, interval: interval, onError: onError}
}

// Register subscribes to TopicLibraryCreated so that newly created libraries
// are automatically polled. ctx controls the lifetime of all pollers started
// this way.
func (p *LibraryPoller) Register(ctx context.Context) {
	p.bridge.Subscribe(TopicLibraryCreated, "library-poller", func(e Event) error {
		p.Start(ctx, e.Payload.(*storage.Library))
		return nil
	})
}

// Start begins polling lib's directory in a background goroutine.
// The goroutine exits when ctx is cancelled.
func (p *LibraryPoller) Start(ctx context.Context, lib *storage.Library) {
	go p.poll(ctx, lib)
}

func (p *LibraryPoller) errorf(lib *storage.Library, err error) {
	if p.onError != nil {
		p.onError(lib, err)
	}
}

func (p *LibraryPoller) poll(ctx context.Context, lib *storage.Library) {
	books, err := p.store.ListBooks(ctx, lib.ID)
	if err != nil {
		p.errorf(lib, err)
	}
	lastBooks := books

	ticker := time.NewTicker(p.interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := storage.SyncLibrary(ctx, p.store, lib); err != nil {
				p.errorf(lib, err)
				continue
			}
			books, err := p.store.ListBooks(ctx, lib.ID)
			if err != nil {
				p.errorf(lib, err)
				continue
			}
			added, removed := diffBooks(lastBooks, books)
			if len(added) > 0 || len(removed) > 0 {
				lastBooks = books
				log.Printf("library [%s]: +%d -%d books", lib.Name, len(added), len(removed))
				p.bridge.Publish(TopicLibraryBooksChanged(lib.ID), LibraryBooksChangedPayload{
					Added:   added,
					Removed: removed,
				})
			}
		}
	}
}

func diffBooks(oldBooks, newBooks []storage.Book) (added, removed []storage.Book) {
	oldSet := make(map[string]storage.Book, len(oldBooks))
	for _, b := range oldBooks {
		oldSet[b.Filename] = b
	}
	newSet := make(map[string]storage.Book, len(newBooks))
	for _, b := range newBooks {
		newSet[b.Filename] = b
	}
	for filename, b := range newSet {
		if _, exists := oldSet[filename]; !exists {
			added = append(added, b)
		}
	}
	for filename, b := range oldSet {
		if _, exists := newSet[filename]; !exists {
			removed = append(removed, b)
		}
	}
	return
}
