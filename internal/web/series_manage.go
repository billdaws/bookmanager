package web

import (
	"log"
	"net/http"
	"strings"

	"github.com/billdaws/bookmanager/internal/query"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

type seriesNewPageData struct {
	Library *storage.Library
	Error   string
	Name    string
}

type seriesAddBooksPageData struct {
	Library    *storage.Library
	Series     *storage.Series
	Books      []storage.Book
	NextCursor string
	Query      string
}

func handleSeriesNew(store libraryStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")

		lib, err := store.GetLibraryByID(r.Context(), libraryID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		if err := SeriesNewPage(seriesNewPageData{Library: lib}).Render(r.Context(), w); err != nil {
			log.Printf("handleSeriesNew: render error: %v", err)
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleCreateSeries(store libraryStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")

		lib, err := store.GetLibraryByID(r.Context(), libraryID)
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

		name := strings.TrimSpace(r.FormValue("name"))
		if name == "" {
			w.WriteHeader(http.StatusUnprocessableEntity)
			SeriesNewPage(seriesNewPageData{
				Library: lib,
				Error:   "Series name is required.",
			}).Render(r.Context(), w)
			return
		}

		seriesID, err := store.UpsertSeries(r.Context(), libraryID, name)
		if err != nil {
			log.Printf("handleCreateSeries: UpsertSeries error: %v", err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/library/"+libraryID+"/series/"+seriesID+"/add", http.StatusSeeOther)
	}
}

func handleSeriesAddBooks(store libraryStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")
		seriesID := r.PathValue("seriesID")

		lib, err := store.GetLibraryByID(r.Context(), libraryID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		series, err := store.GetSeriesByID(r.Context(), libraryID, seriesID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if series == nil {
			http.NotFound(w, r)
			return
		}

		rawQuery := r.URL.Query().Get("q")
		cursor, err := storage.DecodeCursor(r.URL.Query().Get("cursor"))
		if err != nil {
			cursor = storage.BookCursor{}
		}

		var filter query.Expr
		if rawQuery != "" {
			filter, err = query.Parse(rawQuery)
			if err != nil {
				filter = nil
			}
		}

		pg, err := store.ListBooksPage(r.Context(), storage.ListBooksParams{
			LibraryID:       libraryID,
			Cursor:          cursor,
			Filter:          filter,
			ExcludeSeriesID: seriesID,
		})
		if err != nil {
			if r.Context().Err() != nil {
				return
			}
			log.Printf("handleSeriesAddBooks: ListBooksPage error: %v", err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		data := seriesAddBooksPageData{
			Library: lib,
			Series:  series,
			Books:   pg.Books,
			Query:   rawQuery,
		}
		if pg.HasMore {
			data.NextCursor = pg.NextCursor.Encode()
		}

		if err := SeriesAddBooksPage(data).Render(r.Context(), w); err != nil {
			log.Printf("handleSeriesAddBooks: render error: %v", err)
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleSeriesAddBooksPost(store libraryStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")
		seriesID := r.PathValue("seriesID")

		lib, err := store.GetLibraryByID(r.Context(), libraryID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		series, err := store.GetSeriesByID(r.Context(), libraryID, seriesID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if series == nil {
			http.NotFound(w, r)
			return
		}

		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		bookIDs := r.Form["book_id"]
		if len(bookIDs) > 0 {
			if err := store.BatchAssignBooksToSeries(r.Context(), seriesID, bookIDs); err != nil {
				log.Printf("handleSeriesAddBooksPost: BatchAssignBooksToSeries error: %v", err)
				http.Error(w, "database error", http.StatusInternalServerError)
				return
			}
		}

		http.Redirect(w, r, "/library/"+libraryID+"/series/"+seriesID, http.StatusSeeOther)
	}
}
