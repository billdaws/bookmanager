package web

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

// assertMaxTime fails the benchmark if the average time per operation exceeds
// max. Call it immediately after the benchmark loop. Thresholds are set at
// ~5× the measured values on an Apple M2 Max; adjust if CI hardware is slower.
func assertMaxTime(b *testing.B, max time.Duration) {
	b.Helper()
	perOp := b.Elapsed() / time.Duration(b.N)
	if perOp > max {
		b.Errorf("too slow: %v/op, threshold %v/op", perOp, max)
	}
}

// makeSyntheticBooks returns n Book values with plausible metadata.
func makeSyntheticBooks(n int) []storage.Book {
	books := make([]storage.Book, n)
	for i := range n {
		books[i] = storage.Book{
			ID:              fmt.Sprintf("id-%05d", i),
			Filename:        fmt.Sprintf("book-%05d.epub", i),
			Title:           fmt.Sprintf("The %d-th Book", i),
			Authors:         fmt.Sprintf("Author %d", i%100),
			PublicationDate: fmt.Sprintf("%d", 1900+i%124),
		}
	}
	return books
}

// BenchmarkApplyQuery measures the in-memory query filter across several
// query shapes against 10 000 books.
func BenchmarkApplyQuery(b *testing.B) {
	books := makeSyntheticBooks(10000)
	cases := []struct {
		name  string
		query string
		max   time.Duration
	}{
		{"empty", "", 20 * time.Nanosecond},
		{"bare_word", "Author", 5 * time.Millisecond},
		{"field_title", "title:Book", 4 * time.Millisecond},
		{"field_filename", "filename:book-00001", 2 * time.Millisecond},
		{"no_match", "title:ZZZnonexistent", 4 * time.Millisecond},
	}
	for _, tc := range cases {
		b.Run(tc.name, func(b *testing.B) {
			b.ReportAllocs()
			for b.Loop() {
				out, _ := applyQuery(books, tc.query)
				_ = out
			}
			assertMaxTime(b, tc.max)
		})
	}
}

// openBenchDB opens an in-memory SQLite database and registers cleanup.
// Suitable for single-goroutine benchmarks only — see openBenchDBFile for
// concurrent use.
func openBenchDB(b *testing.B) *storage.Store {
	b.Helper()
	database, err := storage.OpenDB(":memory:")
	if err != nil {
		b.Fatalf("open bench db: %v", err)
	}
	b.Cleanup(func() { database.Close() })
	return storage.NewStore(database)
}

// openBenchDBFile opens a file-based SQLite database. Required for concurrent
// benchmarks: SQLite :memory: databases are per-connection, so parallel
// goroutines would each see an empty database.
func openBenchDBFile(b *testing.B) *storage.Store {
	b.Helper()
	database, err := storage.OpenDB(filepath.Join(b.TempDir(), "bench.db"))
	if err != nil {
		b.Fatalf("open bench db: %v", err)
	}
	b.Cleanup(func() { database.Close() })
	return storage.NewStore(database)
}

// seedBenchLibrary inserts n books into a fresh in-memory store, using dir as
// the library's directory path (must already contain matching empty files so
// that SyncLibrary finds no diffs on each handler call).
func seedBenchLibrary(b *testing.B, store *storage.Store, n int, dir string) string {
	b.Helper()
	filenames := make([]string, n)
	for i := range n {
		filenames[i] = fmt.Sprintf("book-%05d.epub", i)
	}
	id, err := store.CreateLibraryWithBooks(context.Background(), "Bench Lib", dir, filenames)
	if err != nil {
		b.Fatalf("seed library: %v", err)
	}
	return id
}

// touchBenchFiles creates n empty files in dir whose names match the filenames
// used by seedBenchLibrary, so that SyncLibrary is a no-op during benchmarks.
func touchBenchFiles(b *testing.B, dir string, n int) {
	b.Helper()
	for i := range n {
		name := filepath.Join(dir, fmt.Sprintf("book-%05d.epub", i))
		if err := os.WriteFile(name, nil, 0o644); err != nil {
			b.Fatalf("create bench file: %v", err)
		}
	}
}

// BenchmarkHandleLibrary measures a full GET /library/{id} round-trip —
// including SyncLibrary (no-op because disk matches DB), ListBooks, applyQuery
// (empty query), and template rendering — for libraries of increasing size.
func BenchmarkHandleLibrary(b *testing.B) {
	for _, tc := range []struct {
		n   int
		max time.Duration
	}{
		{100, 20 * time.Millisecond},
		{1000, 110 * time.Millisecond},
		{10000, 900 * time.Millisecond},
	} {
		b.Run(fmt.Sprintf("%d_books", tc.n), func(b *testing.B) {
			dir := b.TempDir()
			touchBenchFiles(b, dir, tc.n)
			store := openBenchDB(b)
			id := seedBenchLibrary(b, store, tc.n, dir)
			handler := handleLibrary(store)

			b.ResetTimer()
			b.ReportAllocs()
			for b.Loop() {
				req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
				req.SetPathValue("id", id)
				w := httptest.NewRecorder()
				handler(w, req)
				if w.Code != http.StatusOK {
					b.Fatalf("unexpected status %d", w.Code)
				}
			}
			assertMaxTime(b, tc.max)
		})
	}
}

// BenchmarkHandleLibraryConcurrent measures the library handler under parallel
// load with 10 000 books, exercising SQLite WAL-mode concurrent reads and the
// Go template renderer.
func BenchmarkHandleLibraryConcurrent(b *testing.B) {
	const n = 10000
	dir := b.TempDir()
	touchBenchFiles(b, dir, n)
	store := openBenchDBFile(b)
	id := seedBenchLibrary(b, store, n, dir)
	handler := handleLibrary(store)

	b.ResetTimer()
	b.ReportAllocs()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			req := httptest.NewRequest(http.MethodGet, "/library/"+id, nil)
			req.SetPathValue("id", id)
			w := httptest.NewRecorder()
			handler(w, req)
			if w.Code != http.StatusOK {
				b.Fatalf("unexpected status %d", w.Code)
			}
		}
	})
	assertMaxTime(b, 800*time.Millisecond)
}
