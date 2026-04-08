package db

import (
	"context"
	"encoding/json"
	"strings"
	"testing"
)

func openTestStore(t *testing.T) *Store {
	t.Helper()
	db, err := OpenDB(":memory:")
	if err != nil {
		t.Fatalf("OpenDB: %v", err)
	}
	t.Cleanup(func() { db.Close() })
	return NewStore(db)
}

// metadataSyncColumns reads the columns_attempted value from metadata_sync for
// a given book, or returns "" if no row exists.
func metadataSyncColumns(t *testing.T, s *Store, bookID string) string {
	t.Helper()
	var cols string
	err := s.db.QueryRowContext(context.Background(),
		`SELECT columns_attempted FROM metadata_sync WHERE book_id = ?`, bookID,
	).Scan(&cols)
	if err != nil {
		return ""
	}
	return cols
}

// TestInsertBooksWithoutMetadata_NoSyncRow verifies that the deferred insert
// path used by CreateLibraryWithBooks does not create a metadata_sync row —
// MetadataPoller picks up books via the missing row on its next tick.
func TestInsertBooksWithoutMetadata_NoSyncRow(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	id, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}

	books, err := s.ListBooks(context.Background(), id)
	if err != nil {
		t.Fatal(err)
	}
	if len(books) != 1 {
		t.Fatalf("expected 1 book, got %d", len(books))
	}

	if got := metadataSyncColumns(t, s, books[0].ID); got != "" {
		t.Errorf("expected no metadata_sync row after deferred insert, got columns_attempted = %q", got)
	}
}

// TestBackfillMetadata_SkipsUpToDate verifies that books already stamped with
// the current columns key are not reprocessed.
func TestBackfillMetadata_SkipsUpToDate(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	id, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}

	// First pass stamps the metadata_sync row.
	if _, err := s.BackfillMetadata(context.Background(), id, dir); err != nil {
		t.Fatal(err)
	}

	// Second pass should find nothing to do.
	updated, err := s.BackfillMetadata(context.Background(), id, dir)
	if err != nil {
		t.Fatal(err)
	}
	if updated {
		t.Error("BackfillMetadata returned true for up-to-date books")
	}
}

// TestBackfillMetadata_ReprocessesStaleColumns simulates adding a new
// extractable column by stamping a book with an old columns key, then verifies
// that BackfillMetadata picks it up and updates metadata_sync.
func TestBackfillMetadata_ReprocessesStaleColumns(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	id, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}

	books, err := s.ListBooks(context.Background(), id)
	if err != nil {
		t.Fatal(err)
	}

	// Run an initial backfill to stamp the sync row, then simulate a stale
	// columns key by dropping the last column as if a new metadata field was
	// added since this book was last processed.
	if _, err := s.BackfillMetadata(context.Background(), id, dir); err != nil {
		t.Fatal(err)
	}

	cols := strings.Split(currentColumnsKey, ",")
	oldKey := strings.Join(cols[:len(cols)-1], ",")
	if _, err := s.db.ExecContext(context.Background(),
		`UPDATE metadata_sync SET columns_attempted = ? WHERE book_id = ?`,
		oldKey, books[0].ID,
	); err != nil {
		t.Fatal(err)
	}

	if got := metadataSyncColumns(t, s, books[0].ID); got != oldKey {
		t.Fatalf("setup failed: columns_attempted = %q, want %q", got, oldKey)
	}

	_, err = s.BackfillMetadata(context.Background(), id, dir)
	if err != nil {
		t.Fatal(err)
	}

	// metadata_sync should now be stamped with the current key.
	if got := metadataSyncColumns(t, s, books[0].ID); got != currentColumnsKey {
		t.Errorf("after backfill: columns_attempted = %q, want %q", got, currentColumnsKey)
	}
}

// TestBackfillMetadata_NoPriorSyncRow verifies that books with no metadata_sync
// row (pre-migration books) are picked up by BackfillMetadata.
func TestBackfillMetadata_NoPriorSyncRow(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	id, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}

	books, err := s.ListBooks(context.Background(), id)
	if err != nil {
		t.Fatal(err)
	}

	// Remove the metadata_sync row to simulate a pre-migration book.
	if _, err := s.db.ExecContext(context.Background(),
		`DELETE FROM metadata_sync WHERE book_id = ?`, books[0].ID,
	); err != nil {
		t.Fatal(err)
	}

	if got := metadataSyncColumns(t, s, books[0].ID); got != "" {
		t.Fatalf("setup failed: expected no metadata_sync row, got %q", got)
	}

	_, err = s.BackfillMetadata(context.Background(), id, dir)
	if err != nil {
		t.Fatal(err)
	}

	if got := metadataSyncColumns(t, s, books[0].ID); got != currentColumnsKey {
		t.Errorf("after backfill: columns_attempted = %q, want %q", got, currentColumnsKey)
	}
}

// TestBackfillMetadata_DeleteCascades verifies that deleting a book also
// removes its metadata_sync row.
func TestBackfillMetadata_DeleteCascades(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	id, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}

	books, err := s.ListBooks(context.Background(), id)
	if err != nil {
		t.Fatal(err)
	}
	bookID := books[0].ID

	if _, err := s.DeleteLibrary(context.Background(), id); err != nil {
		t.Fatal(err)
	}

	if got := metadataSyncColumns(t, s, bookID); got != "" {
		t.Errorf("expected metadata_sync row to be deleted, got %q", got)
	}
}

// manualOverrides reads the manual_overrides JSON from metadata_sync for a
// given book and returns it as a map. Returns an empty map if no row exists.
func manualOverrides(t *testing.T, s *Store, bookID string) map[string]bool {
	t.Helper()
	var raw string
	err := s.db.QueryRowContext(context.Background(),
		`SELECT manual_overrides FROM metadata_sync WHERE book_id = ?`, bookID,
	).Scan(&raw)
	if err != nil {
		return map[string]bool{}
	}
	var m map[string]bool
	if err := json.Unmarshal([]byte(raw), &m); err != nil {
		t.Fatalf("unmarshal manual_overrides %q: %v", raw, err)
	}
	return m
}

// TestUpdateBookMetadata_SetsManualOverrides verifies that updating a book with
// non-empty fields records those fields as manual overrides, and that empty
// fields are absent from the override set.
func TestUpdateBookMetadata_SetsManualOverrides(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	libID, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}
	books, err := s.ListBooks(context.Background(), libID)
	if err != nil {
		t.Fatal(err)
	}
	bookID := books[0].ID

	if err := s.UpdateBookMetadata(context.Background(), bookID, "My Title", "", ""); err != nil {
		t.Fatal(err)
	}

	overrides := manualOverrides(t, s, bookID)
	if !overrides["title"] {
		t.Error("expected title to be a manual override")
	}
	if overrides["authors"] {
		t.Error("expected authors not to be a manual override")
	}
	if overrides["publication_date"] {
		t.Error("expected publication_date not to be a manual override")
	}
}

// TestBackfillMetadata_RespectsManualOverrides verifies that BackfillMetadata
// does not overwrite fields listed in manual_overrides.
func TestBackfillMetadata_RespectsManualOverrides(t *testing.T) {
	s := openTestStore(t)
	dir := t.TempDir()

	libID, err := s.CreateLibraryWithBooks(context.Background(), "Lib", dir, []string{"book.epub"})
	if err != nil {
		t.Fatal(err)
	}
	books, err := s.ListBooks(context.Background(), libID)
	if err != nil {
		t.Fatal(err)
	}
	bookID := books[0].ID

	// Manually set the title; leave authors for auto-extraction.
	if err := s.UpdateBookMetadata(context.Background(), bookID, "Locked Title", "", ""); err != nil {
		t.Fatal(err)
	}

	// Force the book to be considered stale so backfill runs.
	if _, err := s.db.ExecContext(context.Background(),
		`UPDATE metadata_sync SET columns_attempted = 'stale' WHERE book_id = ?`, bookID,
	); err != nil {
		t.Fatal(err)
	}

	if _, err := s.BackfillMetadata(context.Background(), libID, dir); err != nil {
		t.Fatal(err)
	}

	updated, err := s.ListBooks(context.Background(), libID)
	if err != nil {
		t.Fatal(err)
	}
	if updated[0].Title != "Locked Title" {
		t.Errorf("title = %q, want %q (manual override should be preserved)", updated[0].Title, "Locked Title")
	}
}
