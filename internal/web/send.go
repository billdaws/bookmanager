package web

import (
	"context"
	"log"
	"net/http"
	"os"
	"path/filepath"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// sendStore is the subset of storage.Store used by send handlers (beyond what
// libraryStore and recipientStore already cover).
type sendStore interface {
	GetRecipient(ctx context.Context, id string) (storage.Recipient, error)
	LogSend(ctx context.Context, recipientID, bookID, status, errMsg string) error
}

// bookSendStore combines the methods needed by the send page handlers.
type bookSendStore interface {
	libraryStore
	recipientStore
	sendStore
}

func handleBookSendPage(store bookSendStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")
		bookID := r.PathValue("bookID")

		book, err := store.GetBook(r.Context(), libraryID, bookID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if book == nil {
			http.NotFound(w, r)
			return
		}

		recipients, err := store.ListRecipients(r.Context())
		if err != nil {
			log.Printf("handleBookSendPage: ListRecipients error: %v", err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if err := BookSendPage(bookSendPageData{
			LibraryID:  libraryID,
			Book:       book,
			Recipients: recipients,
		}).Render(r.Context(), w); err != nil {
			log.Printf("handleBookSendPage: render error: %v", err)
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleBookSend(store bookSendStore, sender emailSender) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libraryID := r.PathValue("id")
		bookID := r.PathValue("bookID")

		lib, err := store.GetLibraryByID(r.Context(), libraryID)
		if err != nil || lib == nil {
			http.Error(w, "library not found", http.StatusNotFound)
			return
		}

		book, err := store.GetBook(r.Context(), libraryID, bookID)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if book == nil {
			http.NotFound(w, r)
			return
		}

		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		recipientIDs := r.Form["recipient_id"]
		if len(recipientIDs) == 0 {
			http.Redirect(w, r, "/library/"+libraryID+"/book/"+bookID+"/send", http.StatusSeeOther)
			return
		}

		bookPath := filepath.Join(lib.Directory, book.Filename)
		bookTitle := book.Title
		if bookTitle == "" {
			bookTitle = book.Filename
		}

		var fileSize int64
		if info, err := os.Stat(bookPath); err == nil {
			fileSize = info.Size()
		}

		log.Printf("handleBookSend: sending book %s (%d bytes) to %d recipient(s)", bookID, fileSize, len(recipientIDs))

		for _, recipientID := range recipientIDs {
			recipient, err := store.GetRecipient(r.Context(), recipientID)
			if err != nil {
				log.Printf("handleBookSend: GetRecipient(%s) error: %v", recipientID, err)
				continue
			}

			sendErr := sender.SendBook(r.Context(), recipient.Email, recipient.Name, bookTitle, bookPath)
			status := "sent"
			errMsg := ""
			if sendErr != nil {
				log.Printf("handleBookSend: SendBook to recipient %s error: %v", recipientID, sendErr)
				status = "failed"
				errMsg = sendErr.Error()
			} else {
				log.Printf("handleBookSend: sent book %s (%d bytes) to recipient %s", bookID, fileSize, recipientID)
			}

			if logErr := store.LogSend(r.Context(), recipientID, bookID, status, errMsg); logErr != nil {
				log.Printf("handleBookSend: LogSend error: %v", logErr)
			}
		}

		http.Redirect(w, r, "/library/"+libraryID, http.StatusSeeOther)
	}
}
