package main

import (
	"database/sql"
	"html/template"
	"net/http"
	"os"
	"strings"
)

type setupPageData struct {
	Error     string
	Name      string
	Directory string
}

type libraryPageData struct {
	Library *Library
	Books   []Book
}

func handleIndex(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		exists, err := libraryExists(db)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if !exists {
			if err := tmpl.ExecuteTemplate(w, "setup", setupPageData{}); err != nil {
				http.Error(w, "template error", http.StatusInternalServerError)
			}
			return
		}

		lib, err := getLibrary(db)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		books, err := listBooks(db)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if err := tmpl.ExecuteTemplate(w, "library", libraryPageData{Library: lib, Books: books}); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	}
}

func handleSetup(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
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

		exists, err := libraryExists(db)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if exists {
			http.Error(w, "library already configured", http.StatusConflict)
			return
		}

		filenames, err := scanDirectory(dir)
		if err != nil {
			http.Error(w, "could not scan directory", http.StatusInternalServerError)
			return
		}

		if err := createLibraryWithBooks(db, name, dir, filenames); err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}
