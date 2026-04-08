package web

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/billdaws/bookmanager/internal/events"
	"github.com/billdaws/bookmanager/internal/query"
	"github.com/billdaws/bookmanager/internal/scanner"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// libraryStore is the subset of storage.Store methods used by the library handlers.
type libraryStore interface {
	ListLibraries(ctx context.Context) ([]storage.Library, error)
	GetLibraryByID(ctx context.Context, id string) (*storage.Library, error)
	CreateLibraryWithBooks(ctx context.Context, name, dir string, filenames []string) (string, error)
	UpdateBooks(ctx context.Context, libraryID, dir string, filesToAdd []string, bookIDsToRemove []string) error
	DeleteLibrary(ctx context.Context, id string) (bool, error)
	ListBooks(ctx context.Context, libraryID string) ([]storage.Book, error)
	GetBook(ctx context.Context, libraryID, bookID string) (*storage.Book, error)
	UpdateBookMetadata(ctx context.Context, bookID, title, authors, pubDate string) error
}

type indexPageData struct {
	Libraries []storage.Library
}

type setupPageData struct {
	Error     string
	Name      string
	Directory string
}

type libraryPageData struct {
	Library    *storage.Library
	Books      []storage.Book
	SyncError  string
	Query      string
	QueryError string
}

type confirmDeletePageData struct {
	Library *storage.Library
	Error   string
}

func bookDisplayLabel(b storage.Book) string {
	if b.Title == "" || b.Authors == "" {
		return b.Filename
	}
	if len(b.PublicationDate) >= 4 {
		return b.Authors + " - " + b.Title + " (" + b.PublicationDate[:4] + ")"
	}
	return b.Authors + " - " + b.Title
}

func bookYear(b storage.Book) string {
	if len(b.PublicationDate) >= 4 {
		return b.PublicationDate[:4]
	}
	return b.PublicationDate
}

// applyQuery filters books by the raw query string and returns the filtered
// list plus any parse error message. On parse error the unfiltered list is
// returned so the user still sees results.
func applyQuery(books []storage.Book, rawQuery string) ([]storage.Book, string) {
	if rawQuery == "" {
		return books, ""
	}
	expr, err := query.Parse(rawQuery)
	if err != nil {
		return books, err.Error()
	}
	out := make([]storage.Book, 0, len(books))
	for _, b := range books {
		if query.Match(expr, query.Fields{
			Title:    b.Title,
			Authors:  b.Authors,
			Year:     bookYear(b),
			Filename: b.Filename,
		}) {
			out = append(out, b)
		}
	}
	return out, ""
}

func handleIndex(store libraryStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libs, err := store.ListLibraries(r.Context())
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if err := IndexPage(indexPageData{Libraries: libs}).Render(r.Context(), w); err != nil {
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleLibraryNew() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := SetupPage(setupPageData{}).Render(r.Context(), w); err != nil {
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleCreateLibrary(store libraryStore, bridge *events.EventBridge, metadataJob metadataPoller) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("handleCreateLibrary: received %s %s", r.Method, r.URL)

		if err := r.ParseForm(); err != nil {
			log.Printf("handleCreateLibrary: ParseForm error: %v", err)
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		name := strings.TrimSpace(r.FormValue("name"))
		dir := strings.TrimSpace(r.FormValue("directory"))
		log.Printf("handleCreateLibrary: name=%q dir=%q", name, dir)

		renderError := func(msg string) {
			log.Printf("handleCreateLibrary: rendering error: %s", msg)
			SetupPage(setupPageData{Error: msg, Name: name, Directory: dir}).Render(r.Context(), w)
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
		if err != nil {
			log.Printf("handleCreateLibrary: os.Stat(%q) error: %v", dir, err)
			renderError("Directory does not exist or is not a directory.")
			return
		}
		if !info.IsDir() {
			log.Printf("handleCreateLibrary: %q is not a directory", dir)
			renderError("Directory does not exist or is not a directory.")
			return
		}

		filenames, err := scanner.ScanDirectory(dir)
		if err != nil {
			log.Printf("handleCreateLibrary: ScanDirectory error: %v", err)
			http.Error(w, "could not scan directory", http.StatusInternalServerError)
			return
		}
		log.Printf("handleCreateLibrary: scanned %d files", len(filenames))

		id, err := store.CreateLibraryWithBooks(r.Context(), name, dir, filenames)
		if err != nil {
			log.Printf("handleCreateLibrary: CreateLibraryWithBooks error: %v", err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		log.Printf("handleCreateLibrary: created library id=%s", id)

		bridge.Publish(events.TopicLibraryCreated, &storage.Library{ID: id, Name: name, Directory: dir})
		metadataJob.RunNow()
		http.Redirect(w, r, "/library/"+id, http.StatusSeeOther)
	}
}

func handleLibraryDeleteConfirm(store libraryStore) http.HandlerFunc {
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
		ConfirmDeletePage(confirmDeletePageData{Library: lib}).Render(r.Context(), w)
	}
}

func handleLibraryDelete(store libraryStore) http.HandlerFunc {
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
			ConfirmDeletePage(confirmDeletePageData{
				Library: lib,
				Error:   "Name does not match. Please try again.",
			}).Render(r.Context(), w)
			return
		}

		if _, err := store.DeleteLibrary(r.Context(), id); err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}

func handleLibraryEvents(store libraryStore, bridge *events.EventBridge) http.HandlerFunc {
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
		rawQuery := r.URL.Query().Get("q")

		ctx := r.Context()
		unsub := bridge.Subscribe(events.TopicLibraryBooksChanged(id), subName, func(e events.Event) error {
			books, err := store.ListBooks(ctx, id)
			if err != nil {
				return err
			}
			books, _ = applyQuery(books, rawQuery)
			var buf strings.Builder
			if err := BookList(id, books).Render(ctx, &buf); err != nil {
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

func handleLibrary(store libraryStore) http.HandlerFunc {
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

		data := libraryPageData{Library: lib, Query: r.URL.Query().Get("q")}

		if err := storage.SyncLibrary(r.Context(), store, lib); err != nil {
			data.SyncError = fmt.Sprintf("Could not sync library: %v", err)
		}

		books, err := store.ListBooks(r.Context(), id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		data.Books, data.QueryError = applyQuery(books, data.Query)

		if err := LibraryPage(data).Render(r.Context(), w); err != nil {
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleUpdateBook(store libraryStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")
		bookID := r.PathValue("bookID")

		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		title := strings.TrimSpace(r.FormValue("title"))
		authors := strings.TrimSpace(r.FormValue("authors"))
		pubDate := strings.TrimSpace(r.FormValue("publication_date"))

		book, err := store.GetBook(r.Context(), libraryID, bookID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if book == nil {
			http.NotFound(w, r)
			return
		}

		if err := store.UpdateBookMetadata(r.Context(), bookID, title, authors, pubDate); err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/library/"+libraryID, http.StatusSeeOther)
	}
}
