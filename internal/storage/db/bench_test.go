package db

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"testing"
	"time"
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

// epubFixture returns the absolute path to a real EPUB file in the repo's
// testdata directory. Go test binaries run with the package directory as CWD,
// so "../../../testdata/" reaches the repo root from internal/storage/db/.
func epubFixture(b *testing.B) string {
	b.Helper()
	abs, err := filepath.Abs("../../../testdata/A Random Walk Down Wall Street - Burton G. Malkiel.epub")
	if err != nil {
		b.Fatalf("resolve fixture path: %v", err)
	}
	if _, err := os.Stat(abs); err != nil {
		b.Skipf("fixture not found, skipping: %v", err)
	}
	return abs
}

// seedBenchDB opens an in-memory database and inserts n books into a single
// library. The filenames are synthetic; no files need to exist on disk.
func seedBenchDB(b *testing.B, n int) (*Store, string) {
	b.Helper()
	database, err := OpenDB(":memory:")
	if err != nil {
		b.Fatalf("open db: %v", err)
	}
	b.Cleanup(func() { database.Close() })

	filenames := make([]string, n)
	for i := range n {
		filenames[i] = fmt.Sprintf("book-%05d.epub", i)
	}

	store := NewStore(database)
	id, err := store.CreateLibraryWithBooks(context.Background(), "Bench Library", "/bench/lib", filenames)
	if err != nil {
		b.Fatalf("seed library: %v", err)
	}
	return store, id
}

// BenchmarkListBooks measures the time to fetch all books for libraries of
// increasing size.
func BenchmarkListBooks(b *testing.B) {
	for _, tc := range []struct {
		n   int
		max time.Duration
	}{
		{100, 500 * time.Microsecond},
		{1000, 4 * time.Millisecond},
		{10000, 40 * time.Millisecond},
	} {
		b.Run(fmt.Sprintf("%d_books", tc.n), func(b *testing.B) {
			store, id := seedBenchDB(b, tc.n)
			ctx := context.Background()
			b.ResetTimer()
			b.ReportAllocs()
			for b.Loop() {
				books, err := store.ListBooks(ctx, id)
				if err != nil {
					b.Fatal(err)
				}
				_ = books
			}
			assertMaxTime(b, tc.max)
		})
	}
}

// BenchmarkCreateLibraryWithBooks measures the cost of the initial bulk insert
// (which uses insertBooksWithoutMetadata — no file I/O).
func BenchmarkCreateLibraryWithBooks(b *testing.B) {
	for _, tc := range []struct {
		n   int
		max time.Duration
	}{
		{100, 10 * time.Millisecond},
		{1000, 70 * time.Millisecond},
		{10000, 650 * time.Millisecond},
	} {
		b.Run(fmt.Sprintf("%d_books", tc.n), func(b *testing.B) {
			filenames := make([]string, tc.n)
			for i := range tc.n {
				filenames[i] = fmt.Sprintf("book-%05d.epub", i)
			}
			b.ResetTimer()
			b.ReportAllocs()
			for b.Loop() {
				database, err := OpenDB(":memory:")
				if err != nil {
					b.Fatal(err)
				}
				store := NewStore(database)
				_, err = store.CreateLibraryWithBooks(context.Background(), "Bench", "/dir", filenames)
				if err != nil {
					b.Fatal(err)
				}
				database.Close()
			}
			assertMaxTime(b, tc.max)
		})
	}
}

// seedBenchDBFile opens a file-based database seeded with n books. Required for
// concurrent benchmarks: SQLite :memory: databases are per-connection, so
// parallel goroutines would each see an empty database.
func seedBenchDBFile(b *testing.B, n int) (*Store, string) {
	b.Helper()
	database, err := OpenDB(filepath.Join(b.TempDir(), "bench.db"))
	if err != nil {
		b.Fatalf("open db: %v", err)
	}
	b.Cleanup(func() { database.Close() })

	filenames := make([]string, n)
	for i := range n {
		filenames[i] = fmt.Sprintf("book-%05d.epub", i)
	}

	store := NewStore(database)
	id, err := store.CreateLibraryWithBooks(context.Background(), "Bench Library", "/bench/lib", filenames)
	if err != nil {
		b.Fatalf("seed library: %v", err)
	}
	return store, id
}

// BenchmarkExtractEpubMetadata measures the per-file cost of opening and
// parsing EPUB metadata. This is the hot path for insertBooksWithMetadata
// (filesystem poller incremental adds) and BackfillMetadata.
func BenchmarkExtractEpubMetadata(b *testing.B) {
	path := epubFixture(b)
	b.ReportAllocs()
	for b.Loop() {
		_, _, _, _ = extractEpubMetadata(path)
	}
	assertMaxTime(b, 1*time.Millisecond)
}

// BenchmarkBackfillMetadata measures the end-to-end cost of BackfillMetadata
// over libraries of increasing size. Each book is a symlink to the same real
// EPUB so the parser reads realistic file content. The metadata_sync table is
// cleared before each iteration so all books require processing every time.
func BenchmarkBackfillMetadata(b *testing.B) {
	src := epubFixture(b)
	ctx := context.Background()

	for _, tc := range []struct {
		n   int
		max time.Duration
	}{
		{10, 12 * time.Millisecond},
		{100, 120 * time.Millisecond},
		{1000, 1200 * time.Millisecond},
	} {
		b.Run(fmt.Sprintf("%d_books", tc.n), func(b *testing.B) {
			dir := b.TempDir()
			filenames := make([]string, tc.n)
			for i := range tc.n {
				fn := fmt.Sprintf("book-%04d.epub", i)
				if err := os.Symlink(src, filepath.Join(dir, fn)); err != nil {
					b.Fatalf("symlink: %v", err)
				}
				filenames[i] = fn
			}

			database, err := OpenDB(":memory:")
			if err != nil {
				b.Fatalf("open db: %v", err)
			}
			b.Cleanup(func() { database.Close() })
			store := NewStore(database)

			id, err := store.CreateLibraryWithBooks(ctx, "Bench", dir, filenames)
			if err != nil {
				b.Fatalf("seed library: %v", err)
			}

			b.ResetTimer()
			b.ReportAllocs()
			for b.Loop() {
				// Clear sync rows so every book needs reprocessing this iteration.
				b.StopTimer()
				if _, err := database.ExecContext(ctx, "DELETE FROM metadata_sync"); err != nil {
					b.Fatalf("clear metadata_sync: %v", err)
				}
				b.StartTimer()

				if _, err := store.BackfillMetadata(ctx, id, dir); err != nil {
					b.Fatal(err)
				}
			}
			assertMaxTime(b, tc.max)
		})
	}
}

// BenchmarkListBooks_Concurrent measures ListBooks under parallel read load,
// which exercises SQLite's WAL-mode concurrent reader behaviour.
func BenchmarkListBooks_Concurrent(b *testing.B) {
	store, id := seedBenchDBFile(b, 10000)
	ctx := context.Background()
	b.ResetTimer()
	b.ReportAllocs()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			books, err := store.ListBooks(ctx, id)
			if err != nil {
				b.Fatal(err)
			}
			_ = books
		}
	})
	assertMaxTime(b, 40*time.Millisecond)
}
