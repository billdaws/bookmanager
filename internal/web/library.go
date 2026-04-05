package web

import (
	"context"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/billdaws/bookmanager/internal/scanner"
	"github.com/billdaws/bookmanager/internal/storage/db"
)

// libraryStore is the subset of db.Store methods used by the library handlers.
type libraryStore interface {
	ListLibraries(ctx context.Context) ([]db.Library, error)
	GetLibraryByID(ctx context.Context, id string) (*db.Library, error)
	CreateLibraryWithBooks(ctx context.Context, name, dir string, filenames []string) (string, error)
	UpdateBooks(ctx context.Context, libraryID string, filesToAdd []string, bookIDsToRemove []string) error
	DeleteLibrary(ctx context.Context, id string) (bool, error)
	ListBooks(ctx context.Context, libraryID string) ([]db.Book, error)
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

type confirmDeletePageData struct {
	Library *db.Library
	Error   string
}

func handleIndex(store libraryStore, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libs, err := store.ListLibraries(r.Context())
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

func handleCreateLibrary(store libraryStore, tmpl *template.Template, bridge *events.EventBridge) http.HandlerFunc {
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

		id, err := store.CreateLibraryWithBooks(r.Context(), name, dir, filenames)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		bridge.Publish(events.TopicLibraryCreated, &db.Library{ID: id, Name: name, Directory: dir})
		http.Redirect(w, r, "/library/"+id, http.StatusSeeOther)
	}
}

func handleLibraryDeleteConfirm(store libraryStore, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		lib, err := store.GetLibraryByID(r.Context(), r.PathValue("id"))
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

func handleLibraryDelete(store libraryStore, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := store.GetLibraryByID(r.Context(), id)
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

		if _, err := store.DeleteLibrary(r.Context(), id); err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}

func handleLibraryEvents(store libraryStore, bridge *events.EventBridge, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := store.GetLibraryByID(r.Context(), id)
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

		ctx := r.Context()
		unsub := bridge.Subscribe(events.TopicLibraryBooksChanged(id), subName, func(e events.Event) error {
			books, err := store.ListBooks(ctx, id)
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

func handleLibrary(store libraryStore, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := store.GetLibraryByID(r.Context(), id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		data := libraryPageData{Library: lib}

		if err := db.SyncLibrary(r.Context(), store, lib); err != nil {
			data.SyncError = fmt.Sprintf("Could not sync library: %v", err)
		}

		data.Books, err = store.ListBooks(r.Context(), id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if err := tmpl.ExecuteTemplate(w, "library", data); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	}
}
