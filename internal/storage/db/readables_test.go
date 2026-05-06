package db

import (
	"context"
	"testing"

	"github.com/billdaws/bookmanager/internal/query"
)

// setupReadablesLibrary creates a library with the given book filenames and
// series (by name). Returns the library ID and a map of series name → series ID.
func setupReadablesLibrary(t *testing.T, s *Store, filenames []string, seriesNames []string) (libID string, seriesIDs map[string]string) {
	t.Helper()
	ctx := context.Background()

	libID, err := s.CreateLibraryWithBooks(ctx, "Test", t.TempDir(), filenames)
	if err != nil {
		t.Fatalf("CreateLibraryWithBooks: %v", err)
	}

	seriesIDs = make(map[string]string)
	for _, name := range seriesNames {
		sid, err := s.UpsertSeries(ctx, libID, name)
		if err != nil {
			t.Fatalf("UpsertSeries(%q): %v", name, err)
		}
		seriesIDs[name] = sid
	}
	return libID, seriesIDs
}

func TestListLibraryItems_AlphabeticalOrder(t *testing.T) {
	s := openTestStore(t)
	ctx := context.Background()

	libID, _ := setupReadablesLibrary(t, s,
		[]string{"apple.epub", "mango.epub", "zebra.epub"},
		[]string{"Banana Series", "Kiwi Series"},
	)

	pg, err := s.ListLibraryItems(ctx, libID, ReadableCursor{}, nil, 0)
	if err != nil {
		t.Fatalf("ListLibraryItems: %v", err)
	}
	if pg.HasMore {
		t.Error("unexpected HasMore")
	}

	// Expected order (case-insensitive): apple, banana series, kiwi series, mango, zebra
	wantKinds := []string{"book", "series", "series", "book", "book"}
	wantNames := []string{"apple.epub", "Banana Series", "Kiwi Series", "mango.epub", "zebra.epub"}

	if got := len(pg.Items); got != len(wantKinds) {
		t.Fatalf("items count: got %d, want %d", got, len(wantKinds))
	}
	for i, item := range pg.Items {
		if item.Kind != wantKinds[i] {
			t.Errorf("item[%d] kind: got %q, want %q", i, item.Kind, wantKinds[i])
		}
		var name string
		if item.Kind == "series" {
			name = item.Series.Name
		} else {
			name = item.Book.Filename
		}
		if name != wantNames[i] {
			t.Errorf("item[%d] name: got %q, want %q", i, name, wantNames[i])
		}
	}
}

func TestListLibraryItems_CaseInsensitiveSort(t *testing.T) {
	s := openTestStore(t)
	ctx := context.Background()

	// Series "my series" (lowercase) should sort among books starting with 'm',
	// not after all books because of ASCII ordering.
	libID, _ := setupReadablesLibrary(t, s,
		[]string{"alpha.epub", "zulu.epub"},
		[]string{"my series"},
	)

	pg, err := s.ListLibraryItems(ctx, libID, ReadableCursor{}, nil, 0)
	if err != nil {
		t.Fatalf("ListLibraryItems: %v", err)
	}

	// Expected: alpha, my series, zulu
	if len(pg.Items) != 3 {
		t.Fatalf("items count: got %d, want 3", len(pg.Items))
	}
	if pg.Items[0].Kind != "book" || pg.Items[0].Book.Filename != "alpha.epub" {
		t.Errorf("item[0]: got %+v", pg.Items[0])
	}
	if pg.Items[1].Kind != "series" || pg.Items[1].Series.Name != "my series" {
		t.Errorf("item[1]: got %+v", pg.Items[1])
	}
	if pg.Items[2].Kind != "book" || pg.Items[2].Book.Filename != "zulu.epub" {
		t.Errorf("item[2]: got %+v", pg.Items[2])
	}
}

func TestListLibraryItems_Pagination(t *testing.T) {
	s := openTestStore(t)
	ctx := context.Background()

	libID, _ := setupReadablesLibrary(t, s,
		[]string{"a.epub", "b.epub", "c.epub", "d.epub"},
		[]string{"Z Series"},
	)

	// Page 1: limit 2
	pg1, err := s.ListLibraryItems(ctx, libID, ReadableCursor{}, nil, 2)
	if err != nil {
		t.Fatalf("page 1: %v", err)
	}
	if !pg1.HasMore {
		t.Error("page 1: expected HasMore=true")
	}
	if len(pg1.Items) != 2 {
		t.Fatalf("page 1: got %d items, want 2", len(pg1.Items))
	}
	// a.epub, b.epub
	if pg1.Items[0].Book.Filename != "a.epub" {
		t.Errorf("page 1 item[0]: got %q", pg1.Items[0].Book.Filename)
	}
	if pg1.Items[1].Book.Filename != "b.epub" {
		t.Errorf("page 1 item[1]: got %q", pg1.Items[1].Book.Filename)
	}

	// Page 2
	pg2, err := s.ListLibraryItems(ctx, libID, pg1.NextCursor, nil, 2)
	if err != nil {
		t.Fatalf("page 2: %v", err)
	}
	if !pg2.HasMore {
		t.Error("page 2: expected HasMore=true")
	}
	if len(pg2.Items) != 2 {
		t.Fatalf("page 2: got %d items, want 2", len(pg2.Items))
	}
	// c.epub, d.epub
	if pg2.Items[0].Book.Filename != "c.epub" {
		t.Errorf("page 2 item[0]: got %q", pg2.Items[0].Book.Filename)
	}

	// Page 3: should have Z Series only, no duplicates
	pg3, err := s.ListLibraryItems(ctx, libID, pg2.NextCursor, nil, 2)
	if err != nil {
		t.Fatalf("page 3: %v", err)
	}
	if pg3.HasMore {
		t.Error("page 3: unexpected HasMore")
	}
	if len(pg3.Items) != 1 {
		t.Fatalf("page 3: got %d items, want 1", len(pg3.Items))
	}
	if pg3.Items[0].Kind != "series" || pg3.Items[0].Series.Name != "Z Series" {
		t.Errorf("page 3 item[0]: got %+v", pg3.Items[0])
	}
}

func TestListLibraryItems_Filter(t *testing.T) {
	s := openTestStore(t)
	ctx := context.Background()

	libID, _ := setupReadablesLibrary(t, s,
		[]string{"tolkien-hobbit.epub", "tolkien-lotr.epub", "king-it.epub"},
		[]string{"Tolkien Collection"},
	)

	filter, err := query.Parse("tolkien")
	if err != nil {
		t.Fatalf("parse: %v", err)
	}

	pg, err := s.ListLibraryItems(ctx, libID, ReadableCursor{}, filter, 0)
	if err != nil {
		t.Fatalf("ListLibraryItems: %v", err)
	}

	// Should include: Tolkien Collection (series, always shown), tolkien-hobbit.epub, tolkien-lotr.epub
	// Should exclude: king-it.epub (no match)
	if len(pg.Items) != 3 {
		t.Fatalf("filtered count: got %d, want 3", len(pg.Items))
	}
	// Series comes first alphabetically (T < t but LOWER makes them equal prefix, series sorts before books at same key)
	kinds := make([]string, len(pg.Items))
	for i, item := range pg.Items {
		kinds[i] = item.Kind
	}
	// There should be exactly 1 series and 2 books
	var nSeries, nBooks int
	for _, item := range pg.Items {
		if item.Kind == "series" {
			nSeries++
		} else {
			nBooks++
		}
	}
	if nSeries != 1 {
		t.Errorf("series count: got %d, want 1", nSeries)
	}
	if nBooks != 2 {
		t.Errorf("book count: got %d, want 2", nBooks)
	}
}

func TestListLibraryItems_BooksInSeriesExcluded(t *testing.T) {
	s := openTestStore(t)
	ctx := context.Background()

	libID, seriesIDs := setupReadablesLibrary(t, s,
		[]string{"book-a.epub", "book-b.epub"},
		[]string{"My Series"},
	)

	// Assign book-a to the series
	books, err := s.ListBooks(ctx, libID)
	if err != nil {
		t.Fatalf("ListBooks: %v", err)
	}
	var bookAID string
	for _, b := range books {
		if b.Filename == "book-a.epub" {
			bookAID = b.ID
		}
	}
	if err := s.BatchAssignBooksToSeries(ctx, seriesIDs["My Series"], []string{bookAID}); err != nil {
		t.Fatalf("BatchAssignBooksToSeries: %v", err)
	}

	pg, err := s.ListLibraryItems(ctx, libID, ReadableCursor{}, nil, 0)
	if err != nil {
		t.Fatalf("ListLibraryItems: %v", err)
	}

	// book-a is in series → excluded from standalone books
	// Expect: book-b.epub (standalone), My Series (series card) — alphabetical: b < m
	if len(pg.Items) != 2 {
		t.Fatalf("items count: got %d, want 2", len(pg.Items))
	}
	if pg.Items[0].Kind != "book" || pg.Items[0].Book.Filename != "book-b.epub" {
		t.Errorf("item[0]: %+v", pg.Items[0])
	}
	if pg.Items[1].Kind != "series" || pg.Items[1].Series.Name != "My Series" {
		t.Errorf("item[1]: %+v", pg.Items[1])
	}
}
