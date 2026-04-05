# Event Bridge Implementation Plan

## Goal

Introduce a central event bridge so that file system changes (books added/removed)
are reactively pushed to the browser via SSE, without coupling producers to consumers.

## Architecture

### Event Bridge (`event_bridge.go`)

Central pub/sub router. No knowledge of producers or consumers.

```go
type Event struct {
    Topic   string
    Payload any
}

type Handler func(Event)

type EventBridge struct { ... }

func NewEventBridge() *EventBridge
func (b *EventBridge) Subscribe(topic string, h Handler) (unsubscribe func())
func (b *EventBridge) Publish(topic string, payload any)
```

- **Thread-safety:** `Publish` and `Subscribe`/unsubscribe may be called concurrently
  from any goroutine. The subscriber map must be protected by a `sync.RWMutex`:
  `RLock` during publish (read-only fan-out), `Lock` during subscribe/unsubscribe.
- **Fan-out:** all subscribers on a topic receive every event. Each handler is
  dispatched in its own goroutine so one slow or blocked subscriber cannot stall
  others or the publisher.
- **Non-blocking delivery:** each subscriber owns a buffered channel (cap 1). The
  handler goroutine sends to the channel with a `select/default` — if the channel
  is full the event is dropped for that subscriber rather than blocking.
- `Subscribe` returns an unsubscribe func; caller is responsible for cleanup.

### Library Poller (`library_poller.go`)

One goroutine per library. Polls directory on a configurable interval.

On each tick:
1. Call `syncLibrary(db, lib)` — diffs disk vs DB, applies changes in one transaction.
2. Call `listBooks(db, lib.ID)` — get current state.
3. Compare to last known state (set of filenames).
4. If changed → `bridge.Publish("library.{id}.books.changed", []Book{...})`.

Also subscribes to `library.created` so newly created libraries are picked up
without passing the poller into every handler.

```go
type LibraryPoller struct { ... }

func NewLibraryPoller(db *sql.DB, bridge *EventBridge, interval time.Duration) *LibraryPoller
func (p *LibraryPoller) Start(ctx context.Context, lib *Library)
// Subscribe is called once during setup to register the library.created handler:
func (p *LibraryPoller) Register()
```

**Note:** Starting with polling only. `fsnotify` integration is a future enhancement
that can be layered in as an additional producer publishing to the same topics.

### SSE Handler (consumer, in `handlers.go`)

`GET /library/{id}/events`

On connect:
1. Look up library by ID; 404 if not found.
2. Create a `chan string` (cap 1) — this is the subscriber's delivery channel.
3. Subscribe to `library.{id}.books.changed`. The handler renders the `book-list`
   partial and sends to the channel with `select/default` (non-blocking drop if
   the previous update hasn't been flushed yet).
4. Loop: read from channel → write SSE frame → flush.
5. On `r.Context().Done()` (browser disconnect) → unsubscribe, return.

Multiple browser tabs on the same library each get their own subscription and
channel — fan-out is handled by the bridge, not the handler.

SSE frame format:
```
event: books-updated
data: <line 1 of HTML>
data: <line 2 of HTML>
[blank line]
```

The `book-list` partial template is rendered server-side and sent as the data payload.

### Book List Partial (`templates/book_list.html`)

Extracted from `library.html` so the same template is used for both:
- Initial page render (via `{{template "book-list" .Books}}` in `library.html`)
- SSE updates (rendered into a string buffer and sent as an SSE frame)

```html
{{define "book-list"}}
<ul id="book-list">
{{range .}}
    <li>{{.Filename}}</li>
{{else}}
    <li>No books found.</li>
{{end}}
</ul>
{{end}}
```

### `library.html` changes

- Replace inline book list with `{{template "book-list" .Books}}`
- Add `EventSource` script:

```html
<script>
const source = new EventSource('/library/{{.Library.ID}}/events');
source.addEventListener('books-updated', function(e) {
    document.getElementById('book-list').outerHTML = e.data;
});
window.addEventListener('beforeunload', () => source.close());
</script>
```

## Topics

| Topic | Payload | Producer | Consumer |
|---|---|---|---|
| `library.{id}.books.changed` | `[]Book` | `LibraryPoller` | SSE handler |
| `library.created` | `*Library` | `handleCreateLibrary` | `LibraryPoller` |

## Files

| File | Status | Notes |
|---|---|---|
| `event_bridge.go` | **New** | |
| `event_bridge_test.go` | **New** | Unit tests for pub/sub |
| `library_poller.go` | **New** | |
| `library_poller_test.go` | **New** | Poller unit tests with short interval |
| `templates/book_list.html` | **New** | Extracted partial |
| `handlers.go` | **Modify** | Add `handleLibraryEvents` |
| `handlers_test.go` | **Modify** | Add SSE handler tests |
| `main.go` | **Modify** | `BOOKMANAGER_SYNC_INTERVAL` config, bridge + poller init, `library.created` publish, SSE route |
| `templates/library.html` | **Modify** | Use partial, add EventSource script |

## `main.go` wiring

```go
cfg.SyncInterval  // time.Duration, env: BOOKMANAGER_SYNC_INTERVAL, default: 10s

bridge := NewEventBridge()
poller := NewLibraryPoller(db, bridge, cfg.SyncInterval)
poller.Register() // subscribes to library.created

ctx := context.Background() // TODO: tie to graceful shutdown signal
libs, _ := listLibraries(db)
for _, lib := range libs {
    lib := lib
    poller.Start(ctx, &lib)
}

mux.HandleFunc("GET /library/{id}/events", handleLibraryEvents(db, bridge, tmpl))
```

When `handleCreateLibrary` succeeds, publish:
```go
bridge.Publish("library.created", lib)
```

## Implementation Order (TDD)

1. `event_bridge.go` + `event_bridge_test.go`
2. `library_poller.go` + `library_poller_test.go`
3. `templates/book_list.html`
4. `handlers.go` — `handleLibraryEvents` (test first)
5. `templates/library.html` — partial + EventSource
6. `main.go` — wiring

## Future: fsnotify integration

`fsnotify` can be added later as a second producer alongside the poller:
- Works on local filesystems where OS events are reliable
- Falls back to polling for network-mounted paths
- Both publish to the same `library.{id}.books.changed` topic
- No consumer changes required

A `LibraryWatcher` struct wrapping `fsnotify.Watcher` would be the natural home for this.
