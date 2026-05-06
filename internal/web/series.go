package web

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

type seriesPageData struct {
	Library    *storage.Library
	Series     *storage.Series
	Books      []storage.Book
	AllSeries  []storage.SeriesSummary
	BookCount  int
	NextCursor string // empty = no more pages
}

func handleSeries(store libraryStore) http.HandlerFunc {
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

		cursor, err := storage.DecodeCursor(r.URL.Query().Get("cursor"))
		if err != nil {
			cursor = storage.BookCursor{}
		}

		pg, err := store.ListSeriesBooks(r.Context(), seriesID, cursor, 0)
		if err != nil {
			if r.Context().Err() != nil {
				return
			}
			log.Printf("handleSeries: ListSeriesBooks(%s) error: %v", seriesID, err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		allSeries, _, err := store.ListSeriesPage(r.Context(), libraryID, storage.SeriesCursor{}, 0)
		if err != nil {
			if r.Context().Err() != nil {
				return
			}
			log.Printf("handleSeries: ListSeriesPage(%s) error: %v", libraryID, err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		data := seriesPageData{
			Library:   lib,
			Series:    series,
			Books:     pg.Books,
			AllSeries: allSeries,
		}
		if pg.HasMore {
			data.NextCursor = pg.NextCursor.Encode()
		}

		if err := SeriesPage(data).Render(r.Context(), w); err != nil {
			log.Printf("handleSeries: render error: %v", err)
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleSeriesEvents(store libraryStore, bridge *events.EventBridge) http.HandlerFunc {
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

		log.Printf("SSE connect: series %s (%s)", series.Name, series.ID)
		defer log.Printf("SSE disconnect: series %s (%s)", series.Name, series.ID)

		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("X-Accel-Buffering", "no")

		ch := make(chan string, 1)
		subName := fmt.Sprintf("sse-series-%p", ch)

		ctx := r.Context()
		unsub := bridge.Subscribe(events.TopicLibraryBooksChanged(libraryID), subName, func(e events.Event) error {
			pg, err := store.ListSeriesBooks(ctx, seriesID, storage.BookCursor{}, 0)
			if err != nil {
				return err
			}
			allSeries, _, err := store.ListSeriesPage(ctx, libraryID, storage.SeriesCursor{}, 0)
			if err != nil {
				return err
			}
			nextCursor := ""
			if pg.HasMore {
				nextCursor = pg.NextCursor.Encode()
			}
			var buf strings.Builder
			if err := SeriesBooksFragment(libraryID, seriesID, pg.Books, allSeries, nextCursor).Render(ctx, &buf); err != nil {
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
