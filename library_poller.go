package main

import (
	"context"
	"database/sql"
	"time"
)

// LibraryPoller watches a library's directory by polling on a fixed interval.
// When the set of book files changes, it syncs the database and publishes a
// topicLibraryBooksChanged event.
type LibraryPoller struct {
	db       *sql.DB
	bridge   *EventBridge
	interval time.Duration
	onError  func(lib *Library, err error)
}

// NewLibraryPoller creates a LibraryPoller. onError is called when a poll
// cycle fails; pass nil to drop errors silently.
func NewLibraryPoller(db *sql.DB, bridge *EventBridge, interval time.Duration, onError func(*Library, error)) *LibraryPoller {
	return &LibraryPoller{db: db, bridge: bridge, interval: interval, onError: onError}
}

// Register subscribes to TopicLibraryCreated so that newly created libraries
// are automatically polled. ctx controls the lifetime of all pollers started
// this way.
func (p *LibraryPoller) Register(ctx context.Context) {
	p.bridge.Subscribe(TopicLibraryCreated, "library-poller", func(e Event) error {
		p.Start(ctx, e.Payload.(*Library))
		return nil
	})
}

// Start begins polling lib's directory in a background goroutine.
// The goroutine exits when ctx is cancelled.
func (p *LibraryPoller) Start(ctx context.Context, lib *Library) {
	go p.poll(ctx, lib)
}

func (p *LibraryPoller) errorf(lib *Library, err error) {
	if p.onError != nil {
		p.onError(lib, err)
	}
}

func (p *LibraryPoller) poll(ctx context.Context, lib *Library) {
	books, err := listBooks(p.db, lib.ID)
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
			if err := syncLibrary(p.db, lib); err != nil {
				p.errorf(lib, err)
				continue
			}
			books, err := listBooks(p.db, lib.ID)
			if err != nil {
				p.errorf(lib, err)
				continue
			}
			added, removed := diffBooks(lastBooks, books)
			if len(added) > 0 || len(removed) > 0 {
				lastBooks = books
				p.bridge.Publish(topicLibraryBooksChanged(lib.ID), LibraryBooksChangedPayload{
					Added:   added,
					Removed: removed,
				})
			}
		}
	}
}

func diffBooks(oldBooks, newBooks []Book) (added, removed []Book) {
	oldSet := make(map[string]Book, len(oldBooks))
	for _, b := range oldBooks {
		oldSet[b.Filename] = b
	}
	newSet := make(map[string]Book, len(newBooks))
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
