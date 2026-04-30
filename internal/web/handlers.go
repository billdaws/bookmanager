package web

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"strings"

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
	mux.HandleFunc("GET /library/new", handleLibraryNew())
	mux.HandleFunc("POST /library", handleCreateLibrary(store, bridge, poller))
	mux.HandleFunc("GET /library/{id}", handleLibrary(store))
	mux.HandleFunc("GET /library/{id}/events", handleLibraryEvents(store, bridge))
	mux.HandleFunc("GET /library/{id}/delete", handleLibraryDeleteConfirm(store))
	mux.HandleFunc("POST /library/{id}/delete", handleLibraryDelete(store))
	mux.HandleFunc("POST /library/{id}/book/{bookID}", handleUpdateBook(store))
	mux.HandleFunc("GET /library/{id}/book/{bookID}/send", handleBookSendPage(store))
	mux.HandleFunc("POST /library/{id}/book/{bookID}/send", handleBookSend(store, sender))
	mux.HandleFunc("GET /recipients", handleRecipients(store))
	mux.HandleFunc("GET /recipients/new", handleRecipientNew())
	mux.HandleFunc("POST /recipients", handleCreateRecipient(store))
	mux.HandleFunc("POST /recipients/{id}/delete", handleDeleteRecipient(store))
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServerFS(staticSub)))
	return nil
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
