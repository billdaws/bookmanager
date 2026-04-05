package web

import (
	"context"
	"html/template"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

func setupTestStore(t *testing.T) *storage.Store {
	t.Helper()
	database, err := storage.OpenDB(":memory:")
	if err != nil {
		t.Fatalf("setupTestStore: %v", err)
	}
	t.Cleanup(func() { database.Close() })
	return storage.NewStore(database)
}

func setupTestTemplates(t *testing.T) *template.Template {
	t.Helper()
	tmpl, err := template.ParseFS(templateFS, "templates/*.html")
	if err != nil {
		t.Fatalf("parse templates: %v", err)
	}
	return tmpl
}

func touch(t *testing.T, dir, name string) {
	t.Helper()
	f, err := os.Create(filepath.Join(dir, name))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()
}

// TestGetIndex_NoLibraries checks that the homepage lists no libraries when none exist.
func TestGetIndex_NoLibraries(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	w := httptest.NewRecorder()
	handleIndex(store, tmpl)(w, req)

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
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	if _, err := store.CreateLibraryWithBooks(context.Background(), "Sci-Fi", "/books/scifi", nil); err != nil {
		t.Fatal(err)
	}
	if _, err := store.CreateLibraryWithBooks(context.Background(), "History", "/books/history", nil); err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	w := httptest.NewRecorder()
	handleIndex(store, tmpl)(w, req)

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
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	touch(t, dir, "one.epub")
	touch(t, dir, "two.pdf")

	form := url.Values{"name": {"My Lib"}, "directory": {dir}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(store, tmpl, events.NewEventBridge(nil))(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusSeeOther {
		t.Errorf("status = %d, want 303", res.StatusCode)
	}
	loc := res.Header.Get("Location")
	if !strings.HasPrefix(loc, "/library/") {
		t.Errorf("Location = %q, want /library/{id}", loc)
	}

	libs, err := store.ListLibraries(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(libs) != 1 {
		t.Errorf("expected 1 library, got %d", len(libs))
	}
	books, err := store.ListBooks(context.Background(), libs[0].ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(books) != 2 {
		t.Errorf("expected 2 books, got %d", len(books))
	}
}

// TestPostLibrary_MissingName checks that an empty name returns 422.
func TestPostLibrary_MissingName(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {""}, "directory": {t.TempDir()}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(store, tmpl, events.NewEventBridge(nil))(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
	if !strings.Contains(w.Body.String(), "name") {
		t.Error("expected error mentioning name")
	}
}

// TestPostLibrary_BadDirectory checks that a non-existent path returns 422.
func TestPostLibrary_BadDirectory(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {"Lib"}, "directory": {"/does/not/exist"}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(store, tmpl, events.NewEventBridge(nil))(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
}

// TestPostLibrary_FileNotDir checks that a path pointing to a file returns 422.
func TestPostLibrary_FileNotDir(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	path := filepath.Join(dir, "notadir.epub")
	f, _ := os.Create(path)
	f.Close()

	form := url.Values{"name": {"Lib"}, "directory": {path}}
	req := httptest.NewRequest(http.MethodPost, "/library", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	w := httptest.NewRecorder()
	handleCreateLibrary(store, tmpl, events.NewEventBridge(nil))(w, req)

	if w.Result().StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}
}

// TestGetLibrary checks that a library's book list is rendered correctly.
func TestGetLibrary(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	touch(t, dir, "a.epub")
	touch(t, dir, "b.pdf")

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, []string{"a.epub", "b.pdf"})
	if err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibrary(store, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	body := w.Body.String()
	if !strings.Contains(body, "a.epub") || !strings.Contains(body, "b.pdf") {
		t.Errorf("expected book filenames in body, got:\n%s", body)
	}
}

// TestGetLibrary_SyncsNewFiles checks that files added to disk appear when the library is viewed.
func TestGetLibrary_SyncsNewFiles(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	touch(t, dir, "existing.epub")

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, []string{"existing.epub"})
	if err != nil {
		t.Fatal(err)
	}

	// Add a new file to disk after initial library creation.
	touch(t, dir, "new.epub")

	req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibrary(store, tmpl)(w, req)

	if !strings.Contains(w.Body.String(), "new.epub") {
		t.Error("expected new.epub to appear after sync")
	}
}

// TestGetLibrary_SyncsRemovedFiles checks that files deleted from disk disappear when the library is viewed.
func TestGetLibrary_SyncsRemovedFiles(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	dir := t.TempDir()
	touch(t, dir, "keep.epub")
	touch(t, dir, "gone.epub")

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, []string{"keep.epub", "gone.epub"})
	if err != nil {
		t.Fatal(err)
	}

	// Remove a file from disk.
	if err := os.Remove(filepath.Join(dir, "gone.epub")); err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibrary(store, tmpl)(w, req)

	body := w.Body.String()
	if strings.Contains(body, "gone.epub") {
		t.Error("expected gone.epub to be removed after sync")
	}
	if !strings.Contains(body, "keep.epub") {
		t.Error("expected keep.epub to still be present")
	}
}

// TestGetLibrary_SyncError checks that a missing directory shows existing books with a warning.
func TestGetLibrary_SyncError(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", "/no/such/path", []string{"a.epub"})
	if err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibrary(store, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	body := w.Body.String()
	if !strings.Contains(body, "a.epub") {
		t.Error("expected existing books to still be shown")
	}
	if !strings.Contains(body, "sync") {
		t.Error("expected a sync error message")
	}
}

// TestGetLibrary_NotFound checks that an unknown ID returns 404.
func TestGetLibrary_NotFound(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	req := httptest.NewRequest(http.MethodGet, "/library/nonexistent", nil)
	req.SetPathValue("id", "nonexistent")
	w := httptest.NewRecorder()
	handleLibrary(store, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want 404", w.Result().StatusCode)
	}
}

// TestGetLibraryDeleteConfirm checks that the confirmation page renders with the library name.
func TestGetLibraryDeleteConfirm(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	id, err := store.CreateLibraryWithBooks(context.Background(), "Doomed Library", t.TempDir(), nil)
	if err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/library/"+id+"/delete", nil)
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibraryDeleteConfirm(store, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", res.StatusCode)
	}
	if !strings.Contains(w.Body.String(), "Doomed Library") {
		t.Error("expected library name in confirmation page")
	}
}

// TestGetLibraryDeleteConfirm_NotFound checks that an unknown ID returns 404.
func TestGetLibraryDeleteConfirm_NotFound(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	req := httptest.NewRequest(http.MethodGet, "/library/nonexistent/delete", nil)
	req.SetPathValue("id", "nonexistent")
	w := httptest.NewRecorder()
	handleLibraryDeleteConfirm(store, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want 404", w.Result().StatusCode)
	}
}

// TestPostLibraryDelete_CorrectName checks that typing the correct name deletes the library.
func TestPostLibraryDelete_CorrectName(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Library", t.TempDir(), []string{"a.epub"})
	if err != nil {
		t.Fatal(err)
	}

	form := url.Values{"name": {"My Library"}}
	req := httptest.NewRequest(http.MethodPost, "/library/"+id+"/delete", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibraryDelete(store, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusSeeOther {
		t.Errorf("status = %d, want 303", res.StatusCode)
	}
	if res.Header.Get("Location") != "/" {
		t.Errorf("Location = %q, want /", res.Header.Get("Location"))
	}

	libs, err := store.ListLibraries(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(libs) != 0 {
		t.Errorf("expected library to be deleted, got %d", len(libs))
	}
	books, err := store.ListBooks(context.Background(), id)
	if err != nil {
		t.Fatal(err)
	}
	if len(books) != 0 {
		t.Errorf("expected books to be deleted, got %d", len(books))
	}
}

// TestPostLibraryDelete_WrongName checks that a mismatched name returns 422.
func TestPostLibraryDelete_WrongName(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	id, err := store.CreateLibraryWithBooks(context.Background(), "My Library", t.TempDir(), nil)
	if err != nil {
		t.Fatal(err)
	}

	form := url.Values{"name": {"wrong name"}}
	req := httptest.NewRequest(http.MethodPost, "/library/"+id+"/delete", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetPathValue("id", id)
	w := httptest.NewRecorder()
	handleLibraryDelete(store, tmpl)(w, req)

	res := w.Result()
	if res.StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("status = %d, want 422", w.Result().StatusCode)
	}

	libs, err := store.ListLibraries(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(libs) != 1 {
		t.Error("library should not have been deleted")
	}
}

// TestPostLibraryDelete_NotFound checks that an unknown ID returns 404.
func TestPostLibraryDelete_NotFound(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)

	form := url.Values{"name": {"anything"}}
	req := httptest.NewRequest(http.MethodPost, "/library/nonexistent/delete", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetPathValue("id", "nonexistent")
	w := httptest.NewRecorder()
	handleLibraryDelete(store, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want 404", w.Result().StatusCode)
	}
}

// TestHandleLibraryEvents_NotFound checks that an unknown library ID returns 404.
func TestHandleLibraryEvents_NotFound(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)
	bridge := events.NewEventBridge(nil)

	req := httptest.NewRequest(http.MethodGet, "/library/nonexistent/events", nil)
	req.SetPathValue("id", "nonexistent")
	w := httptest.NewRecorder()

	handleLibraryEvents(store, bridge, tmpl)(w, req)

	if w.Result().StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want 404", w.Result().StatusCode)
	}
}

// TestHandleLibraryEvents_ReceivesFrame checks that a browser receives an SSE frame
// when a books-changed event is published for that library.
func TestHandleLibraryEvents_ReceivesFrame(t *testing.T) {
	store := setupTestStore(t)
	tmpl := setupTestTemplates(t)
	bridge := events.NewEventBridge(nil)

	dir := t.TempDir()
	id, err := store.CreateLibraryWithBooks(context.Background(), "My Lib", dir, nil)
	if err != nil {
		t.Fatal(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	req := httptest.NewRequest(http.MethodGet, "/library/"+id+"/events", nil)
	req.SetPathValue("id", id)
	req = req.WithContext(ctx)
	w := httptest.NewRecorder()

	handlerDone := make(chan struct{})
	go func() {
		defer close(handlerDone)
		handleLibraryEvents(store, bridge, tmpl)(w, req)
	}()

	time.Sleep(20 * time.Millisecond)

	bridge.Publish(events.TopicLibraryBooksChanged(id), events.LibraryBooksChangedPayload{
		Added: []storage.Book{{ID: "1", Filename: "new.epub"}},
	})

	time.Sleep(20 * time.Millisecond)

	cancel()
	<-handlerDone

	body := w.Body.String()
	if !strings.Contains(body, "event: books-updated") {
		t.Errorf("expected SSE frame, got:\n%q", body)
	}
}
