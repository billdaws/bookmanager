package web

import (
	"context"
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"net/http"
	"strings"
	"sync"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/templui/templui/utils"
)

// emailSender sends a book file as an email attachment.
type emailSender interface {
	SendBook(ctx context.Context, toEmail, toName, bookTitle, bookPath string) error
}

//go:embed static
var staticFS embed.FS

// metadataPoller is the subset of events.MetadataPoller used by the web layer.
type metadataPoller interface {
	RunNow()
	Status() (running bool, completed, total int)
}

// allStores is the full set of storage methods used across all web handlers.
type allStores interface {
	libraryStore
	recipientStore
	sendStore
}

// Register wires up all routes on mux.
func Register(mux *http.ServeMux, store allStores, bridge *events.EventBridge, poller metadataPoller, sender emailSender) error {
	staticSub, err := fs.Sub(staticFS, "static")
	if err != nil {
		return fmt.Errorf("static fs: %w", err)
	}

	utils.SetupScriptRoutes(mux, false)

	mux.HandleFunc("GET /", handleIndex(store))
	mux.HandleFunc("GET /events", handleJobEvents(poller, bridge))
	mux.HandleFunc("GET /library/new", handleLibraryNew())
	mux.HandleFunc("POST /library", handleCreateLibrary(store, bridge, poller))
	mux.HandleFunc("GET /library/{id}", handleLibrary(store))
	mux.HandleFunc("GET /library/{id}/events", handleLibraryEvents(store, bridge))
	mux.HandleFunc("GET /library/{id}/delete", handleLibraryDeleteConfirm(store))
	mux.HandleFunc("POST /library/{id}/delete", handleLibraryDelete(store))
	mux.HandleFunc("POST /library/{id}/book/{bookID}", handleUpdateBook(store))
	mux.HandleFunc("GET /library/{id}/book/{bookID}/cover", handleBookCover(store))
	mux.HandleFunc("GET /library/{id}/book/{bookID}/send", handleBookSendPage(store))
	mux.HandleFunc("POST /library/{id}/book/{bookID}/send", handleBookSend(store, sender))
	mux.HandleFunc("GET /recipients", handleRecipients(store))
	mux.HandleFunc("GET /recipients/new", handleRecipientNew())
	mux.HandleFunc("POST /recipients", handleCreateRecipient(store))
	mux.HandleFunc("POST /recipients/{id}/delete", handleDeleteRecipient(store))
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServerFS(staticSub)))
	return nil
}

func handleJobEvents(poller metadataPoller, bridge *events.EventBridge) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("X-Accel-Buffering", "no")

		sendStatus := func(p events.MetadataJobStatusPayload) {
			b, _ := json.Marshal(map[string]any{
				"running":   p.Running,
				"completed": p.Completed,
				"total":     p.Total,
			})
			writeSSEFrame(w, "job-status", string(b))
		}

		// latest holds the most recent status; notify signals the send loop to
		// read it. Rapid events coalesce: the channel carries at most one pending
		// signal, but the value read is always the newest.
		//
		// EventBridge dispatches each handler in its own goroutine, so handler
		// calls for different publishes can run concurrently and out of order.
		// We use Seq to ensure a later-scheduled goroutine carrying an older
		// event cannot overwrite a newer value of latest.
		var mu sync.Mutex
		running, completed, total := poller.Status()
		latest := events.MetadataJobStatusPayload{Running: running, Completed: completed, Total: total}
		notify := make(chan struct{}, 1)
		notify <- struct{}{} // trigger immediate send of current state on connect

		subName := fmt.Sprintf("job-sse-%p", notify)
		unsub := bridge.Subscribe(events.TopicMetadataJobStatus, subName, func(e events.Event) error {
			p, ok := e.Payload.(events.MetadataJobStatusPayload)
			if !ok {
				return nil
			}
			mu.Lock()
			if p.Seq >= latest.Seq {
				latest = p
			}
			mu.Unlock()
			select {
			case notify <- struct{}{}:
			default:
			}
			return nil
		})
		defer unsub()

		for {
			select {
			case <-r.Context().Done():
				return
			case <-notify:
				mu.Lock()
				p := latest
				mu.Unlock()
				sendStatus(p)
			}
		}
	}
}

func writeSSEFrame(w http.ResponseWriter, eventName, html string) {
	for _, line := range strings.Split(strings.TrimRight(html, "\n"), "\n") {
		fmt.Fprintf(w, "data: %s\n", line)
	}
	fmt.Fprintf(w, "event: %s\n\n", eventName)
	if f, ok := w.(http.Flusher); ok {
		f.Flush()
	}
}
