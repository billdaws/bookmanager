package web

import (
	"embed"
	"fmt"
	"html/template"
	"io/fs"
	"net/http"
	"strings"

	"github.com/billdaws/bookmanager/internal/events"
)

//go:embed templates
var templateFS embed.FS

//go:embed static
var staticFS embed.FS

// Register wires up all routes on mux.
func Register(mux *http.ServeMux, store libraryStore, bridge *events.EventBridge) error {
	tmpl, err := template.ParseFS(templateFS, "templates/*.html")
	if err != nil {
		return fmt.Errorf("parse templates: %w", err)
	}

	staticSub, err := fs.Sub(staticFS, "static")
	if err != nil {
		return fmt.Errorf("static fs: %w", err)
	}

	mux.HandleFunc("GET /", handleIndex(store, tmpl))
	mux.HandleFunc("GET /library/new", handleLibraryNew(tmpl))
	mux.HandleFunc("POST /library", handleCreateLibrary(store, tmpl, bridge))
	mux.HandleFunc("GET /library/{id}", handleLibrary(store, tmpl))
	mux.HandleFunc("GET /library/{id}/events", handleLibraryEvents(store, bridge, tmpl))
	mux.HandleFunc("GET /library/{id}/delete", handleLibraryDeleteConfirm(store, tmpl))
	mux.HandleFunc("POST /library/{id}/delete", handleLibraryDelete(store, tmpl))
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
