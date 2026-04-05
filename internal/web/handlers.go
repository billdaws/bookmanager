package web

import (
	gosql "database/sql"
	"embed"
	"fmt"
	"html/template"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/billdaws/bookmanager/internal/scanner"
	"github.com/billdaws/bookmanager/internal/storage/db"
)

//go:embed templates
var templateFS embed.FS

//go:embed static
var staticFS embed.FS

// Register wires up all routes on mux.
func Register(mux *http.ServeMux, database *gosql.DB, bridge *events.EventBridge) error {
	tmpl, err := template.ParseFS(templateFS, "templates/*.html")
	if err != nil {
		return fmt.Errorf("parse templates: %w", err)
	}

	staticSub, err := fs.Sub(staticFS, "static")
	if err != nil {
		return fmt.Errorf("static fs: %w", err)
	}

	mux.HandleFunc("GET /", handleIndex(database, tmpl))
	mux.HandleFunc("GET /library/new", handleLibraryNew(tmpl))
	mux.HandleFunc("POST /library", handleCreateLibrary(database, tmpl, bridge))
	mux.HandleFunc("GET /library/{id}", handleLibrary(database, tmpl))
	mux.HandleFunc("GET /library/{id}/events", handleLibraryEvents(database, bridge, tmpl))
	mux.HandleFunc("GET /library/{id}/delete", handleLibraryDeleteConfirm(database, tmpl))
	mux.HandleFunc("POST /library/{id}/delete", handleLibraryDelete(database, tmpl))
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServerFS(staticSub)))
	return nil
}

type indexPageData struct {
	Libraries []db.Library
}

type setupPageData struct {
	Error     string
	Name      string
	Directory string
}

type libraryPageData struct {
	Library   *db.Library
	Books     []db.Book
	SyncError string
}

func handleIndex(database *gosql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libs, err := db.ListLibraries(database)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if err := tmpl.ExecuteTemplate(w, "index", indexPageData{Libraries: libs}); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	}
}

func handleLibraryNew(tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := tmpl.ExecuteTemplate(w, "setup", setupPageData{}); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	}
}

func handleCreateLibrary(database *gosql.DB, tmpl *template.Template, bridge *events.EventBridge) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		name := strings.TrimSpace(r.FormValue("name"))
		dir := strings.TrimSpace(r.FormValue("directory"))

		renderError := func(msg string) {
			w.WriteHeader(http.StatusUnprocessableEntity)
			tmpl.ExecuteTemplate(w, "setup", setupPageData{Error: msg, Name: name, Directory: dir})
		}

		if name == "" {
			renderError("Library name is required.")
			return
		}
		if dir == "" {
			renderError("Directory path is required.")
			return
		}

		info, err := os.Stat(dir)
		if err != nil || !info.IsDir() {
			renderError("Directory does not exist or is not a directory.")
			return
		}

		filenames, err := scanner.ScanDirectory(dir)
		if err != nil {
			http.Error(w, "could not scan directory", http.StatusInternalServerError)
			return
		}

		id, err := db.CreateLibraryWithBooks(database, name, dir, filenames)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		bridge.Publish(events.TopicLibraryCreated, &db.Library{ID: id, Name: name, Directory: dir})
		http.Redirect(w, r, "/library/"+id, http.StatusSeeOther)
	}
}

type confirmDeletePageData struct {
	Library *db.Library
	Error   string
}

func handleLibraryDeleteConfirm(database *gosql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		lib, err := db.GetLibraryByID(database, r.PathValue("id"))
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}
		tmpl.ExecuteTemplate(w, "confirm-delete", confirmDeletePageData{Library: lib})
	}
}

func handleLibraryDelete(database *gosql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := db.GetLibraryByID(database, id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		if r.FormValue("name") != lib.Name {
			w.WriteHeader(http.StatusUnprocessableEntity)
			tmpl.ExecuteTemplate(w, "confirm-delete", confirmDeletePageData{
				Library: lib,
				Error:   "Name does not match. Please try again.",
			})
			return
		}

		if _, err := db.DeleteLibrary(database, id); err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}

func handleLibraryEvents(database *gosql.DB, bridge *events.EventBridge, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := db.GetLibraryByID(database, id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		log.Printf("SSE connect: library %s (%s)", lib.Name, lib.ID)
		defer log.Printf("SSE disconnect: library %s (%s)", lib.Name, lib.ID)

		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("X-Accel-Buffering", "no")

		ch := make(chan string, 1)
		subName := fmt.Sprintf("sse-%p", ch)

		unsub := bridge.Subscribe(events.TopicLibraryBooksChanged(id), subName, func(e events.Event) error {
			books, err := db.ListBooks(database, id)
			if err != nil {
				return err
			}
			var buf strings.Builder
			if err := tmpl.ExecuteTemplate(&buf, "book-list", books); err != nil {
				return err
			}
			select {
			case ch <- buf.String():
			default:
			}
			return nil
		})
		defer unsub()

		for {
			select {
			case <-r.Context().Done():
				return
			case html := <-ch:
				writeSSEFrame(w, "books-updated", html)
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

func handleLibrary(database *gosql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := db.GetLibraryByID(database, id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		data := libraryPageData{Library: lib}

		if err := db.SyncLibrary(database, lib); err != nil {
			data.SyncError = fmt.Sprintf("Could not sync library: %v", err)
		}

		data.Books, err = db.ListBooks(database, id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if err := tmpl.ExecuteTemplate(w, "library", data); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	}
}
