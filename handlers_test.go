package main

import (
	"database/sql"
	"html/template"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func setupTestDB(t *testing.T) *sql.DB {
	t.Helper()
	db, err := openDB(":memory:")
	if err != nil {
		t.Fatalf("setupTestDB: %v", err)
	}
	t.Cleanup(func() { db.Close() })
	return db
}

func setupTestTemplates(t *testing.T) *template.Template {
	t.Helper()
	tmpl, err := template.ParseFS(templateFS, "templates/*.html")
	if err != nil {
		t.Fatalf("parse templates: %v", err)
	}
	return tmpl
}

// TestGetIndex_NoLibraries checks that the homepage lists no libraries when none exist.
func TestGetIndex_NoLibraries(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	w := httptest.NewRecorder()
	handleIndex(db, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	body := w.Body.String()
	if !strings.Contains(body, "No libraries") {
		t.Errorf("expected empty state message, got:\n%s", body)
	}
}

// TestGetIndex_WithLibraries checks that all libraries appear on the homepage.
func TestGetIndex_WithLibraries(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	if _, err := createLibraryWithBooks(db, "Sci-Fi", "/books/scifi", nil); err != nil {
		t.Fatal(err)
	}
	if _, err := createLibraryWithBooks(db, "History", "/books/history", nil); err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	w := httptest.NewRecorder()
	handleIndex(db, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	body := w.Body.String()
	if !strings.Contains(body, "Sci-Fi") || !strings.Contains(body, "History") {
		t.Errorf("expected both library names in body, got:\n%s", body)
	}
}

// TestGetLibraryNew checks that the creation form is served.
func TestGetLibraryNew(t *testing.T) {
	tmpl := setupTestTemplates(t)

	req := httptest.NewRequest(http.MethodGet, "/library/new", nil)
	w := httptest.NewRecorder()
	handleLibraryNew(tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	if !strings.Contains(w.Body.String(), `action="/library"`) {
		t.Error("expected form with action=/library")
	}
}

// TestPostLibrary_Valid checks that a valid submission creates a library and redirects.
func TestPostLibrary_Valid(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	touch(t, dir, "one.epub")
	touch(t, dir, "two.pdf")

	form := url.Values{"name": {"My Lib"}, "directory": {dir}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(db, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusSeeOther {
		t.Errorf("status = %d, want 303", res.StatusCode)
	}
	loc := res.Header.Get("Location")
	if !strings.HasPrefix(loc, "/library/") {
		t.Errorf("Location = %q, want /library/{id}", loc)
	}

	libs, err := listLibraries(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(libs) != 1 {
		t.Errorf("expected 1 library, got %d", len(libs))
	}
	books, err := listBooks(db, libs[0].ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(books) != 2 {
		t.Errorf("expected 2 books, got %d", len(books))
	}
}

// TestPostLibrary_MissingName checks that an empty name returns 422.
func TestPostLibrary_MissingName(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {""}, "directory": {t.TempDir()}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
	if !strings.Contains(w.Body.String(), "name") {
		t.Error("expected error mentioning name")
	}
}

// TestPostLibrary_BadDirectory checks that a non-existent path returns 422.
func TestPostLibrary_BadDirectory(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {"Lib"}, "directory": {"/does/not/exist"}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
}

// TestPostLibrary_FileNotDir checks that a path pointing to a file returns 422.
func TestPostLibrary_FileNotDir(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	path := filepath.Join(dir, "notadir.epub")
	f, _ := os.Create(path)
	f.Close()

	form := url.Values{"name": {"Lib"}, "directory": {path}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
}

// TestGetLibrary checks that a library's book list is rendered correctly.
func TestGetLibrary(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	id, err := createLibraryWithBooks(db, "My Lib", "/books", []string{"a.epub", "b.pdf"})
	if err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibrary(db, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	body := w.Body.String()
	if !strings.Contains(body, "a.epub") || !strings.Contains(body, "b.pdf") {
		t.Errorf("expected book filenames in body, got:\n%s", body)
	}
}

// TestGetLibrary_NotFound checks that an unknown ID returns 404.
func TestGetLibrary_NotFound(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	req := httptest.NewRequest(http.MethodGet, "/library/nonexistent", nil)
	req.SetPathValue("id", "nonexistent")
	w := httptest.NewRecorder()
	handleLibrary(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want 404", w.Result().StatusCode)
	}
}

func touch(t *testing.T, dir, name string) {
	t.Helper()
	f, err := os.Create(filepath.Join(dir, name))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()
}
