package web

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"strings"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/templui/templui/utils"
)

//go:embed static
var staticFS embed.FS

// Register wires up all routes on mux.
func Register(mux *http.ServeMux, store libraryStore, bridge *events.EventBridge) error {
	staticSub, err := fs.Sub(staticFS, "static")
	if err != nil {
		return fmt.Errorf("static fs: %w", err)
	}

	utils.SetupScriptRoutes(mux, false)

	mux.HandleFunc("GET /", handleIndex(store))
	mux.HandleFunc("GET /library/new", handleLibraryNew())
	mux.HandleFunc("POST /library", handleCreateLibrary(store, bridge))
	mux.HandleFunc("GET /library/{id}", handleLibrary(store))
	mux.HandleFunc("GET /library/{id}/events", handleLibraryEvents(store, bridge))
	mux.HandleFunc("GET /library/{id}/delete", handleLibraryDeleteConfirm(store))
	mux.HandleFunc("POST /library/{id}/delete", handleLibraryDelete(store))
	mux.HandleFunc("POST /library/{id}/book/{bookID}", handleUpdateBook(store))
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
