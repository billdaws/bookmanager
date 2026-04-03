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

func TestGetIndex_NoLibrary(t *testing.T) {
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
	if !strings.Contains(body, `action="/setup"`) {
		t.Error("expected setup form in body")
	}
	if strings.Contains(body, "<ul>") {
		t.Error("did not expect book list in body")
	}
}

func TestGetIndex_WithLibrary(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	if err := createLibraryWithBooks(db, "My Books", "/books", []string{"a.epub", "b.pdf"}); err != nil {
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
	if strings.Contains(body, `action="/setup"`) {
		t.Error("did not expect setup form")
	}
	if !strings.Contains(body, "a.epub") || !strings.Contains(body, "b.pdf") {
		t.Errorf("expected book filenames in body, got:\n%s", body)
	}
}

func TestPostSetup_Valid(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	touch(t, dir, "one.epub")
	touch(t, dir, "two.pdf")

	form := url.Values{"name": {"My Lib"}, "directory": {dir}}
	req := httptest.NewRequest(http.MethodPost, "/setup", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleSetup(db, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusSeeOther {
		t.Errorf("status = %d, want 303", res.StatusCode)
	}
	if res.Header.Get("Location") != "/" {
		t.Errorf("Location = %q, want /", res.Header.Get("Location"))
	}

	exists, err := libraryExists(db)
	if err != nil || !exists {
		t.Errorf("expected library row in DB, err=%v exists=%v", err, exists)
	}
	books, err := listBooks(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(books) != 2 {
		t.Errorf("expected 2 books, got %d", len(books))
	}
}

func TestPostSetup_MissingName(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {""}, "directory": {t.TempDir()}}
	req := httptest.NewRequest(http.MethodPost, "/setup", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleSetup(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
	if !strings.Contains(w.Body.String(), "name") {
		t.Error("expected error mentioning name")
	}
}

func TestPostSetup_BadDirectory(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {"Lib"}, "directory": {"/does/not/exist"}}
	req := httptest.NewRequest(http.MethodPost, "/setup", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleSetup(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
}

func TestPostSetup_FileNotDir(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	path := filepath.Join(dir, "notadir.epub")
	f, _ := os.Create(path)
	f.Close()

	form := url.Values{"name": {"Lib"}, "directory": {path}}
	req := httptest.NewRequest(http.MethodPost, "/setup", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleSetup(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
}

func TestPostSetup_AlreadyConfigured(t *testing.T) {
	db := setupTestDB(t)
	tmpl := setupTestTemplates(t)

	if err := createLibraryWithBooks(db, "Existing", t.TempDir(), nil); err != nil {
		t.Fatal(err)
	}

	form := url.Values{"name": {"Another"}, "directory": {t.TempDir()}}
	req := httptest.NewRequest(http.MethodPost, "/setup", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleSetup(db, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusConflict {
		t.Errorf("status = %d, want 409", w.Result().StatusCode)
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
