package events

import (
	"context"
	"log"
	"sync"
	"sync/atomic"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// metadataStore is the subset of db.Store methods used by MetadataPoller.
type metadataStore interface {
	ListLibraries(ctx context.Context) ([]storage.Library, error)
	BackfillMetadata(ctx context.Context, libraryID, dir string, onExtracted func()) (int, error)
	CountBooksNeedingMetadata(ctx context.Context) (int, error)
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
	trigger  chan struct{}

	seq       atomic.Uint64
	mu        sync.Mutex
	running   bool
	completed int
	total     int
}

// Status returns the current job state. Safe to call from any goroutine.
func (p *MetadataPoller) Status() (running bool, completed, total int) {
	p.mu.Lock()
	defer p.mu.Unlock()
	return p.running, p.completed, p.total
}

// NewMetadataPoller creates a MetadataPoller that runs every interval.
func NewMetadataPoller(store metadataStore, bridge *EventBridge, interval time.Duration) *MetadataPoller {
	return &MetadataPoller{store: store, bridge: bridge, interval: interval, trigger: make(chan struct{}, 1)}
}

// RunNow schedules an immediate backfill pass without waiting for the next
// ticker tick. It is safe to call from any goroutine.
func (p *MetadataPoller) RunNow() {
	select {
	case p.trigger <- struct{}{}:
	default: // a pass is already pending; no need to queue another
	}
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
		case <-p.trigger:
			p.runOnce(ctx)
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
	if len(libs) == 0 {
		return
	}

	total, err := p.store.CountBooksNeedingMetadata(ctx)
	if err != nil {
		log.Printf("metadata poller: count stale books: %v", err)
		return
	}
	if total == 0 {
		return
	}

	func() {
		p.mu.Lock()
		defer p.mu.Unlock()
		p.running = true
		p.completed = 0
		p.total = total
	}()
	p.bridge.Publish(TopicMetadataJobStatus, MetadataJobStatusPayload{Seq: p.seq.Add(1), Running: true, Completed: 0, Total: total})

	log.Printf("metadata poller: starting pass over %d librar%s", len(libs), map[bool]string{true: "y", false: "ies"}[len(libs) == 1])
	start := time.Now()
	for _, lib := range libs {
		log.Printf("metadata poller: backfilling %q (%s)", lib.Name, lib.Directory)
		libStart := time.Now()
		onExtracted := func() {
			var completed int
			func() {
				p.mu.Lock()
				defer p.mu.Unlock()
				p.completed++
				completed = p.completed
			}()
			p.bridge.Publish(TopicMetadataJobStatus, MetadataJobStatusPayload{Seq: p.seq.Add(1), Running: true, Completed: completed, Total: total})
		}
		n, err := p.store.BackfillMetadata(ctx, lib.ID, lib.Directory, onExtracted)
		if err != nil {
			log.Printf("metadata poller: backfill %q: %v", lib.Name, err)
			continue
		}
		log.Printf("metadata poller: library %q: processed %d book(s) in %s", lib.Name, n, time.Since(libStart).Round(time.Millisecond))
		if n > 0 {
			p.bridge.Publish(TopicLibraryBooksChanged(lib.ID), nil)
		}
	}
	log.Printf("metadata poller: pass complete in %s", time.Since(start).Round(time.Millisecond))

	func() {
		p.mu.Lock()
		defer p.mu.Unlock()
		p.running = false
	}()
	p.bridge.Publish(TopicMetadataJobStatus, MetadataJobStatusPayload{Seq: p.seq.Add(1), Running: false, Completed: total, Total: total})
}
