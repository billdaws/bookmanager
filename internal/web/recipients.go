package web

import (
	"context"
	"log"
	"net/http"
	"strings"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// recipientStore is the subset of storage.Store used by recipient handlers.
type recipientStore interface {
	CreateRecipient(ctx context.Context, name, email string) (storage.Recipient, error)
	ListRecipients(ctx context.Context) ([]storage.Recipient, error)
	DeleteRecipient(ctx context.Context, id string) error
}

func handleRecipients(store recipientStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		recipients, err := store.ListRecipients(r.Context())
		if err != nil {
			log.Printf("handleRecipients: ListRecipients error: %v", err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if err := RecipientsPage(recipients).Render(r.Context(), w); err != nil {
			log.Printf("handleRecipients: render error: %v", err)
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleRecipientNew() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := RecipientNewPage(recipientNewPageData{}).Render(r.Context(), w); err != nil {
			http.Error(w, "render error", http.StatusInternalServerError)
		}
	}
}

func handleCreateRecipient(store recipientStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		name := strings.TrimSpace(r.FormValue("name"))
		email := strings.TrimSpace(r.FormValue("email"))

		renderError := func(msg string) {
			w.WriteHeader(http.StatusUnprocessableEntity)
			RecipientNewPage(recipientNewPageData{Error: msg, Name: name, Email: email}).Render(r.Context(), w)
		}

		if name == "" {
			renderError("Name is required.")
			return
		}
		if email == "" {
			renderError("Email address is required.")
			return
		}

		if _, err := store.CreateRecipient(r.Context(), name, email); err != nil {
			log.Printf("handleCreateRecipient: CreateRecipient error: %v", err)
			renderError("Could not save recipient. Check that the encryption key is configured.")
			return
		}

		http.Redirect(w, r, "/recipients", http.StatusSeeOther)
	}
}

func handleDeleteRecipient(store recipientStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		if err := store.DeleteRecipient(r.Context(), id); err != nil {
			log.Printf("handleDeleteRecipient: DeleteRecipient(%s) error: %v", id, err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		http.Redirect(w, r, "/recipients", http.StatusSeeOther)
	}
}
