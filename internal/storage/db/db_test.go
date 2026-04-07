package db

import (
	"context"
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

// TestInsertBooks_RecordsMetadataSync verifies that inserting books also
// creates a metadata_sync row stamped with the current columns key.
func TestInsertBooks_RecordsMetadataSync(t *testing.T) {
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

	got := metadataSyncColumns(t, s, books[0].ID)
	if got != currentColumnsKey {
		t.Errorf("columns_attempted = %q, want %q", got, currentColumnsKey)
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

	// Simulate a previously-extracted column set by dropping the last column,
	// as if a new metadata field was added since this book was last processed.
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
