package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"net/http"
	"os"
	"strings"
)

type indexPageData struct {
	Libraries []Library
}

type setupPageData struct {
	Error     string
	Name      string
	Directory string
}

type libraryPageData struct {
	Library   *Library
	Books     []Book
	SyncError string
}

func handleIndex(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		libs, err := listLibraries(db)
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

func handleCreateLibrary(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
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

		filenames, err := scanDirectory(dir)
		if err != nil {
			http.Error(w, "could not scan directory", http.StatusInternalServerError)
			return
		}

		id, err := createLibraryWithBooks(db, name, dir, filenames)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/library/"+id, http.StatusSeeOther)
	}
}

type confirmDeletePageData struct {
	Library *Library
	Error   string
}

func handleLibraryDeleteConfirm(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		lib, err := getLibraryByID(db, r.PathValue("id"))
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

func handleLibraryDelete(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := getLibraryByID(db, id)
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

		if _, err := deleteLibrary(db, id); err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}

func handleLibrary(db *sql.DB, tmpl *template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		lib, err := getLibraryByID(db, id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if lib == nil {
			http.NotFound(w, r)
			return
		}

		data := libraryPageData{Library: lib}

		if err := syncLibrary(db, lib); err != nil {
			data.SyncError = fmt.Sprintf("Could not sync library: %v", err)
		}

		data.Books, err = listBooks(db, id)
		if err != nil {
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if err := tmpl.ExecuteTemplate(w, "library", data); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	}
}
