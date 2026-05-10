package db

import (
	"archive/zip"
	"context"
	"database/sql"
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"reflect"
	"slices"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/billdaws/bookmanager/internal/pdfinfo"
	"github.com/billdaws/bookmanager/internal/query"
	"github.com/billdaws/bookmanager/internal/scanner"
	"github.com/billdaws/epub"
	"github.com/google/uuid"
	"github.com/nwaples/rardecode"
	"github.com/pressly/goose/v3"
	_ "modernc.org/sqlite"
)

//go:embed migrations
var migrationsFS embed.FS

// dbtx is satisfied by both *sql.DB and *sql.Tx, allowing query helpers
// to work within or outside a transaction.
type dbtx interface {
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
	QueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)
	QueryRowContext(ctx context.Context, query string, args ...any) *sql.Row
}

type Library struct {
	ID        string
	Name      string
	Directory string
}

type Series struct {
	ID          string
	LibraryID   string
	Name        string
	CoverBookID string // empty if no cover book has been assigned yet
	CreatedAt   time.Time
}

type Book struct {
	ID              string `db:"id"`
	Filename        string `db:"filename"`
	Title           string `db:"title"            metadata:"sync"`
	Authors         string `db:"authors"          metadata:"sync"` // semicolon-delimited, in document order
	PublicationDate string `db:"publication_date" metadata:"sync"` // "YYYY-MM-DD" or "YYYY"; empty if absent
	CoverPath       string `db:"cover_path"       metadata:"sync"` // path within EPUB zip to cover image; empty if absent
	SeriesID        string // empty if not in a series
	SeriesIndex     *int   // nil if not in a series or index not set
	SeriesDisplay   string // human-readable label (e.g. "Vol. 1"); empty if not set
}

// Store is the SQLite-backed data store. Callers that need to accept any
// implementation should define their own interface at the point of use.
type Store struct {
	db                *sql.DB
	encKey            []byte // AES-256-GCM key for encrypting recipient email addresses
	metadataBatchSize int
}

// NewStore returns a Store backed by db.
func NewStore(db *sql.DB) *Store {
	return &Store{db: db, metadataBatchSize: 25}
}

// SetMetadataBatchSize sets how many books are processed in parallel during
// metadata backfill. Values less than 1 are ignored.
func (s *Store) SetMetadataBatchSize(n int) {
	if n > 0 {
		s.metadataBatchSize = n
	}
}

// extractableColumns is derived from Book fields tagged `metadata:"sync"`.
// Adding or removing that tag is enough to change which columns are tracked;
// the metadata poller will reprocess any book whose stored key no longer matches.
var extractableColumns = func() []string {
	var cols []string
	for f := range reflect.TypeFor[Book]().Fields() {
		if f.Tag.Get("metadata") == "sync" {
			cols = append(cols, toSnakeCase(f.Name))
		}
	}
	sort.Strings(cols)
	return cols
}()

// currentColumnsKey is the value stored in metadata_sync.columns_attempted.
var currentColumnsKey = strings.Join(extractableColumns, ",")

// bookColumns is the SELECT column list for all book queries. The column order
// must match scanBook.
const bookColumns = `id, filename, COALESCE(title,''), COALESCE(authors,''), COALESCE(publication_date,''), COALESCE(cover_path,''), COALESCE(series_id,''), series_index, COALESCE(series_display,'')`

// rowScanner is satisfied by both *sql.Row and *sql.Rows.
type rowScanner interface {
	Scan(dest ...any) error
}

// scanBook scans a row produced by a bookColumns SELECT into a Book.
func scanBook(rs rowScanner) (Book, error) {
	var b Book
	var seriesIdx sql.NullInt64
	if err := rs.Scan(
		&b.ID, &b.Filename, &b.Title, &b.Authors,
		&b.PublicationDate, &b.CoverPath,
		&b.SeriesID, &seriesIdx, &b.SeriesDisplay,
	); err != nil {
		return Book{}, err
	}
	if seriesIdx.Valid {
		v := int(seriesIdx.Int64)
		b.SeriesIndex = &v
	}
	return b, nil
}

// syncer is the subset of Store methods needed by SyncLibrary.
type syncer interface {
	ListBooks(ctx context.Context, libraryID string) ([]Book, error)
	UpdateBooks(ctx context.Context, libraryID, dir string, filesToAdd []string, bookIDsToRemove []string) error
}

func OpenDB(path string) (*sql.DB, error) {
	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}

	// Each :memory: connection is an independent database, so a pool would give
	// different goroutines different (empty) databases. A single connection
	// ensures everyone shares the same in-memory instance.
	if path == ":memory:" {
		db.SetMaxOpenConns(1)
	}

	if _, err := db.Exec("PRAGMA journal_mode=WAL"); err != nil {
		return nil, fmt.Errorf("wal: %w", err)
	}
	if _, err := db.Exec("PRAGMA foreign_keys=ON"); err != nil {
		return nil, fmt.Errorf("foreign keys: %w", err)
	}

	fsys, err := fs.Sub(migrationsFS, "migrations")
	if err != nil {
		return nil, fmt.Errorf("migrations fs: %w", err)
	}
	provider, err := goose.NewProvider(goose.DialectSQLite3, db, fsys,
		goose.WithLogger(goose.NopLogger()),
	)
	if err != nil {
		return nil, fmt.Errorf("goose provider: %w", err)
	}
	if _, err := provider.Up(context.Background()); err != nil {
		return nil, fmt.Errorf("goose up: %w", err)
	}

	return db, nil
}

func (s *Store) ListLibraries(ctx context.Context) ([]Library, error) {
	rows, err := s.db.QueryContext(ctx, "SELECT id, name, directory FROM library ORDER BY name")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var libs []Library
	for rows.Next() {
		var l Library
		if err := rows.Scan(&l.ID, &l.Name, &l.Directory); err != nil {
			return nil, err
		}
		libs = append(libs, l)
	}
	return libs, rows.Err()
}

func (s *Store) GetLibraryByID(ctx context.Context, id string) (*Library, error) {
	row := s.db.QueryRowContext(ctx, "SELECT id, name, directory FROM library WHERE id = ?", id)
	var l Library
	err := row.Scan(&l.ID, &l.Name, &l.Directory)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &l, err
}

func (s *Store) CreateLibraryWithBooks(ctx context.Context, name, dir string, filenames []string) (string, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	libraryID := uuid.New().String()
	_, err = tx.ExecContext(ctx,
		"INSERT INTO library (id, name, directory) VALUES (?, ?, ?)",
		libraryID, name, dir,
	)
	if err != nil {
		return "", fmt.Errorf("insert library: %w", err)
	}

	if err := insertBooksWithoutMetadata(ctx, tx, libraryID, filenames); err != nil {
		return "", err
	}

	return libraryID, tx.Commit()
}

func (s *Store) UpdateBooks(ctx context.Context, libraryID, dir string, filesToAdd []string, bookIDsToRemove []string) error {
	if len(filesToAdd) == 0 && len(bookIDsToRemove) == 0 {
		return nil
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if err := insertBooksWithMetadata(ctx, tx, libraryID, dir, filesToAdd); err != nil {
		return err
	}

	for _, chunk := range chunkSlice(bookIDsToRemove, insertBatchSize) {
		placeholders := strings.Repeat("?,", len(chunk))
		placeholders = placeholders[:len(placeholders)-1]
		args := make([]any, len(chunk))
		for i, id := range chunk {
			args[i] = id
		}
		if _, err := tx.ExecContext(ctx, "DELETE FROM books WHERE id IN ("+placeholders+")", args...); err != nil {
			return fmt.Errorf("delete books: %w", err)
		}
	}

	return tx.Commit()
}

func (s *Store) DeleteLibrary(ctx context.Context, id string) (bool, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return false, err
	}
	defer tx.Rollback()

	var count int
	if err := tx.QueryRowContext(ctx, "SELECT COUNT(*) FROM library WHERE id = ?", id).Scan(&count); err != nil {
		return false, err
	}
	if count == 0 {
		return false, nil
	}

	if _, err := tx.ExecContext(ctx, "DELETE FROM books WHERE library_id = ?", id); err != nil {
		return false, fmt.Errorf("delete books: %w", err)
	}

	if _, err := tx.ExecContext(ctx, "DELETE FROM library WHERE id = ?", id); err != nil {
		return false, fmt.Errorf("delete library: %w", err)
	}

	return true, tx.Commit()
}

func (s *Store) ListBooks(ctx context.Context, libraryID string) ([]Book, error) {
	rows, err := s.db.QueryContext(ctx,
		`SELECT `+bookColumns+` FROM books WHERE library_id = ? ORDER BY filename`,
		libraryID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []Book
	for rows.Next() {
		b, err := scanBook(rows)
		if err != nil {
			return nil, err
		}
		books = append(books, b)
	}
	return books, rows.Err()
}

// defaultPageLimit is the number of books returned per page by ListBooksPage.
const defaultPageLimit = 200

// ListBooksParams parameterises a paginated book query.
type ListBooksParams struct {
	LibraryID       string
	Cursor          BookCursor // zero value = first page
	Limit           int        // 0 → defaultPageLimit
	Filter          query.Expr // nil = no filter
	StandaloneOnly  bool       // when true, only books with no series_id are returned
	ExcludeSeriesID string     // when set, books already in this series are excluded
}

// BooksPage is the result of a paginated book query.
type BooksPage struct {
	Books      []Book
	NextCursor BookCursor
	HasMore    bool
}

// ListBooksPage returns at most Limit books for the given library, starting
// after Cursor. Fetch the next page by passing BooksPage.NextCursor as the
// Cursor for the subsequent call.
func (s *Store) ListBooksPage(ctx context.Context, p ListBooksParams) (BooksPage, error) {
	limit := p.Limit
	if limit <= 0 {
		limit = defaultPageLimit
	}

	var whereParts []string
	var args []any

	whereParts = append(whereParts, "library_id = ?")
	args = append(args, p.LibraryID)

	if p.StandaloneOnly {
		whereParts = append(whereParts, "series_id IS NULL")
	}

	if p.ExcludeSeriesID != "" {
		whereParts = append(whereParts, "(series_id IS NULL OR series_id != ?)")
		args = append(args, p.ExcludeSeriesID)
	}

	if p.Filter != nil {
		clause, filterArgs := query.ToSQL(p.Filter)
		if clause != "" {
			whereParts = append(whereParts, clause)
			args = append(args, filterArgs...)
		}
	}

	if p.Cursor.Filename != "" || p.Cursor.ID != "" {
		whereParts = append(whereParts, "(filename, id) > (?, ?)")
		args = append(args, p.Cursor.Filename, p.Cursor.ID)
	}

	where := "WHERE " + strings.Join(whereParts, " AND ")
	args = append(args, limit+1)

	rows, err := s.db.QueryContext(ctx, fmt.Sprintf(`
		SELECT `+bookColumns+`
		FROM books
		%s
		ORDER BY filename, id
		LIMIT ?`, where), args...)
	if err != nil {
		return BooksPage{}, err
	}
	defer rows.Close()

	var books []Book
	for rows.Next() {
		b, err := scanBook(rows)
		if err != nil {
			return BooksPage{}, err
		}
		books = append(books, b)
	}
	if err := rows.Err(); err != nil {
		return BooksPage{}, err
	}

	var pg BooksPage
	if len(books) > limit {
		pg.HasMore = true
		books = books[:limit]
	}
	pg.Books = books
	if pg.HasMore && len(books) > 0 {
		last := books[len(books)-1]
		pg.NextCursor = BookCursor{Filename: last.Filename, ID: last.ID}
	}
	return pg, nil
}

// CountBooksNeedingMetadata returns the total number of books across all libraries
// whose metadata_sync record is missing or stale.
func (s *Store) CountBooksNeedingMetadata(ctx context.Context) (int, error) {
	var n int
	err := s.db.QueryRowContext(ctx, `
		SELECT COUNT(*)
		FROM books b
		LEFT JOIN metadata_sync ms ON ms.book_id = b.id
		WHERE ms.book_id IS NULL OR ms.columns_attempted != ?`,
		currentColumnsKey,
	).Scan(&n)
	return n, err
}

// BackfillMetadata re-extracts metadata for books in the library whose
// metadata_sync record is missing or was produced with a different columns set
// than the current one. Fields listed in manual_overrides are skipped.
// It returns the number of books processed (0 if everything was already up to date).
// onExtracted, if non-nil, is called once per book immediately after its metadata
// is extracted and written to the database, allowing callers to track progress
// in real time.
func (s *Store) BackfillMetadata(ctx context.Context, libraryID, dir string, onExtracted func()) (int, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT b.id, b.filename, COALESCE(ms.manual_overrides, '{}')
		FROM books b
		LEFT JOIN metadata_sync ms ON ms.book_id = b.id
		WHERE b.library_id = ?
		  AND (ms.book_id IS NULL OR ms.columns_attempted != ?)`,
		libraryID, currentColumnsKey,
	)
	if err != nil {
		return 0, err
	}
	defer rows.Close()

	type bookRef struct{ id, filename, manualOverrides string }
	var stale []bookRef
	for rows.Next() {
		var r bookRef
		if err := rows.Scan(&r.id, &r.filename, &r.manualOverrides); err != nil {
			return 0, err
		}
		stale = append(stale, r)
	}
	if err := rows.Err(); err != nil {
		return 0, err
	}

	type extractedBook struct {
		bookRef
		title, authors, pubDate, coverPath string
		overrides                          map[string]bool
	}

	// Producer-consumer pipeline: extractor goroutines (bounded by metadataBatchSize)
	// send results to resultsCh; a writer goroutine collects them into batches and
	// flushes each batch in a single transaction. Both sides run concurrently so the
	// channel never backs up and memory usage stays bounded regardless of library size.
	resultsCh := make(chan extractedBook, s.metadataBatchSize)

	// Writer goroutine: accumulates up to metadataBatchSize results and writes each
	// batch in a single transaction with per-book savepoints for error isolation.
	// Batching amortises per-commit overhead; flushing incrementally means the DB is
	// updated well before all extraction is complete.
	writtenCh := make(chan int, 1)
	go func() {
		written := 0
		batch := make([]extractedBook, 0, s.metadataBatchSize)

		flush := func() {
			if len(batch) == 0 {
				return
			}
			tx, err := s.db.BeginTx(ctx, nil)
			if err != nil {
				log.Printf("metadata backfill: begin transaction: %v", err)
				for range batch {
					if onExtracted != nil {
						onExtracted()
					}
				}
				batch = batch[:0]
				return
			}
			defer tx.Rollback()

			upsertStmt, err := tx.PrepareContext(ctx, `
				INSERT INTO metadata_sync (book_id, columns_attempted, manual_overrides)
				VALUES (?, ?, '{}')
				ON CONFLICT(book_id) DO UPDATE SET
					columns_attempted = excluded.columns_attempted,
					attempted_at      = strftime('%Y-%m-%dT%H:%M:%SZ', 'now'),
					manual_overrides  = manual_overrides`)
			if err != nil {
				log.Printf("metadata backfill: prepare upsert: %v", err)
				for range batch {
					if onExtracted != nil {
						onExtracted()
					}
				}
				batch = batch[:0]
				return
			}
			defer upsertStmt.Close()

			for i, res := range batch {
				sp := fmt.Sprintf("backfill_%d", i)
				if _, err := tx.ExecContext(ctx, "SAVEPOINT "+sp); err != nil {
					log.Printf("metadata backfill: savepoint for %s: %v", res.filename, err)
					continue
				}

				writeErr := func() error {
					var sets []string
					var args []any
					if !res.overrides["title"] {
						sets = append(sets, "title = ?")
						args = append(args, nilIfEmpty(res.title))
					}
					if !res.overrides["authors"] {
						sets = append(sets, "authors = ?")
						args = append(args, nilIfEmpty(res.authors))
					}
					if !res.overrides["publication_date"] {
						sets = append(sets, "publication_date = ?")
						args = append(args, nilIfEmpty(res.pubDate))
					}
					if !res.overrides["cover_path"] {
						sets = append(sets, "cover_path = ?")
						args = append(args, nilIfEmpty(res.coverPath))
					}
					if len(sets) > 0 {
						args = append(args, res.id)
						if _, err := tx.ExecContext(ctx,
							"UPDATE books SET "+strings.Join(sets, ", ")+" WHERE id = ?",
							args...,
						); err != nil {
							return fmt.Errorf("update books: %w", err)
						}
					}
					if _, err := upsertStmt.ExecContext(ctx, res.id, currentColumnsKey); err != nil {
						return fmt.Errorf("update metadata_sync: %w", err)
					}
					return nil
				}()

				if writeErr != nil {
					log.Printf("metadata backfill: skipping %s: %v", res.filename, writeErr)
					tx.ExecContext(ctx, "ROLLBACK TO SAVEPOINT "+sp)
					tx.ExecContext(ctx, "RELEASE SAVEPOINT "+sp)
					continue
				}
				tx.ExecContext(ctx, "RELEASE SAVEPOINT "+sp)
				written++
			}

			if err := tx.Commit(); err != nil {
				log.Printf("metadata backfill: commit batch: %v", err)
			}

			for range batch {
				if onExtracted != nil {
					onExtracted()
				}
			}
			batch = batch[:0]
		}

		for res := range resultsCh {
			batch = append(batch, res)
			if len(batch) >= s.metadataBatchSize {
				flush()
			}
		}
		flush()
		writtenCh <- written
	}()

	// Extractor goroutines: extract metadata in parallel and feed resultsCh.
	var extractWg sync.WaitGroup
	sem := make(chan struct{}, s.metadataBatchSize)
	for i, r := range stale {
		extractWg.Add(1)
		sem <- struct{}{}
		go func(i int, r bookRef) {
			defer extractWg.Done()
			defer func() { <-sem }()
			log.Printf("metadata backfill: [%d/%d] %s", i+1, len(stale), r.filename)
			var overrides map[string]bool
			if err := json.Unmarshal([]byte(r.manualOverrides), &overrides); err != nil {
				overrides = map[string]bool{}
			}
			title, authors, pubDate, coverPath := extractMetadata(filepath.Join(dir, r.filename))
			resultsCh <- extractedBook{r, title, authors, pubDate, coverPath, overrides}
		}(i, r)
	}
	extractWg.Wait()
	close(resultsCh)

	return <-writtenCh, nil
}

// GetBook returns the book with the given ID belonging to libraryID, or nil if
// not found.
func (s *Store) GetBook(ctx context.Context, libraryID, bookID string) (*Book, error) {
	row := s.db.QueryRowContext(ctx,
		`SELECT `+bookColumns+` FROM books WHERE id = ? AND library_id = ?`,
		bookID, libraryID,
	)
	b, err := scanBook(row)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return &b, nil
}

// UpdateBookMetadata sets title, authors, and pubDate on a book and records
// non-empty fields as manual overrides so the backfill job will not overwrite
// them. Setting a field to empty releases its override.
func (s *Store) UpdateBookMetadata(ctx context.Context, bookID, title, authors, pubDate string) error {
	overrides := map[string]bool{}
	if title != "" {
		overrides["title"] = true
	}
	if authors != "" {
		overrides["authors"] = true
	}
	if pubDate != "" {
		overrides["publication_date"] = true
	}

	overridesJSON, err := json.Marshal(overrides)
	if err != nil {
		return fmt.Errorf("marshal overrides: %w", err)
	}

	if _, err := s.db.ExecContext(ctx,
		`UPDATE books SET title = ?, authors = ?, publication_date = ? WHERE id = ?`,
		nilIfEmpty(title), nilIfEmpty(authors), nilIfEmpty(pubDate), bookID,
	); err != nil {
		return fmt.Errorf("update book metadata: %w", err)
	}

	if _, err := s.db.ExecContext(ctx, `
		INSERT INTO metadata_sync (book_id, columns_attempted, manual_overrides)
		VALUES (?, '', ?)
		ON CONFLICT(book_id) DO UPDATE SET
			columns_attempted = '',
			attempted_at      = strftime('%Y-%m-%dT%H:%M:%SZ', 'now'),
			manual_overrides  = excluded.manual_overrides`,
		bookID, string(overridesJSON),
	); err != nil {
		return fmt.Errorf("update metadata_sync overrides: %w", err)
	}
	return nil
}

// SyncLibrary scans lib's directory and syncs the store to match.
func SyncLibrary(ctx context.Context, s syncer, lib *Library) error {
	filenames, err := scanner.ScanDirectory(lib.Directory)
	if err != nil {
		return err
	}

	books, err := s.ListBooks(ctx, lib.ID)
	if err != nil {
		return err
	}

	onDisk := make(map[string]bool, len(filenames))
	for _, f := range filenames {
		onDisk[f] = true
	}

	inDB := make(map[string]string, len(books)) // filename → id
	for _, b := range books {
		inDB[b.Filename] = b.ID
	}

	var toAdd []string
	for _, f := range filenames {
		if _, exists := inDB[f]; !exists {
			toAdd = append(toAdd, f)
		}
	}

	var toRemove []string
	for filename, id := range inDB {
		if !onDisk[filename] {
			toRemove = append(toRemove, id)
		}
	}

	return s.UpdateBooks(ctx, lib.ID, lib.Directory, toAdd, toRemove)
}

// insertBookRows is the shared core used by insertBooksWithMetadata and
// insertBooksWithoutMetadata. When stampMetadataSync is true it also inserts a
// metadata_sync entry for each row stamped with the current columns key.
// insertBatchSize is chosen so that the number of bound parameters per
// statement stays well within SQLite's SQLITE_MAX_VARIABLE_NUMBER limit
// (32 766). Books use 6 columns and metadata_sync uses 2, so 1 000 rows ×
// 6 = 6 000 parameters per batch — safely under the ceiling.
const insertBatchSize = 1000

func insertBookRows(ctx context.Context, q dbtx, libraryID string, rows []Book, stampMetadataSync bool) error {
	if len(rows) == 0 {
		return nil
	}

	for _, chunk := range chunkSlice(rows, insertBatchSize) {
		bookPlaceholders := make([]string, len(chunk))
		bookArgs := make([]any, 0, len(chunk)*7)
		for i, r := range chunk {
			bookPlaceholders[i] = "(?, ?, ?, ?, ?, ?, ?)"
			bookArgs = append(bookArgs, r.ID, libraryID, r.Filename, nilIfEmpty(r.Title), nilIfEmpty(r.Authors), nilIfEmpty(r.PublicationDate), nilIfEmpty(r.CoverPath))
		}
		if _, err := q.ExecContext(ctx,
			"INSERT INTO books (id, library_id, filename, title, authors, publication_date, cover_path) VALUES "+strings.Join(bookPlaceholders, ", "),
			bookArgs...,
		); err != nil {
			return fmt.Errorf("insert books: %w", err)
		}

		if stampMetadataSync {
			syncPlaceholders := make([]string, len(chunk))
			syncArgs := make([]any, 0, len(chunk)*2)
			for i, r := range chunk {
				syncPlaceholders[i] = "(?, ?)"
				syncArgs = append(syncArgs, r.ID, currentColumnsKey)
			}
			if _, err := q.ExecContext(ctx,
				"INSERT INTO metadata_sync (book_id, columns_attempted) VALUES "+strings.Join(syncPlaceholders, ", "),
				syncArgs...,
			); err != nil {
				return fmt.Errorf("insert metadata_sync: %w", err)
			}
		}
	}

	return nil
}

// insertBooksWithMetadata inserts filenames as books, extracting metadata for
// each file and recording a metadata_sync entry. Use this for small incremental
// additions (e.g. new files detected by the filesystem poller) where per-file
// I/O is acceptable. It is a no-op if filenames is empty.
func insertBooksWithMetadata(ctx context.Context, q dbtx, libraryID, dir string, filenames []string) error {
	rows := make([]Book, len(filenames))
	for i, fn := range filenames {
		title, authors, pubDate, coverPath := extractMetadata(filepath.Join(dir, fn))
		rows[i] = Book{ID: uuid.New().String(), Filename: fn, Title: title, Authors: authors, PublicationDate: pubDate, CoverPath: coverPath}
	}
	return insertBookRows(ctx, q, libraryID, rows, true)
}

// insertBooksWithoutMetadata inserts filenames as books with no metadata and no
// metadata_sync record. MetadataPoller picks them up on its next tick via the
// missing sync row. Use this for large initial imports where opening every file
// synchronously would block the request.
func insertBooksWithoutMetadata(ctx context.Context, q dbtx, libraryID string, filenames []string) error {
	rows := make([]Book, len(filenames))
	for i, fn := range filenames {
		rows[i] = Book{ID: uuid.New().String(), Filename: fn}
	}
	return insertBookRows(ctx, q, libraryID, rows, false)
}

// toSnakeCase converts a CamelCase identifier to snake_case (ASCII only).
func toSnakeCase(s string) string {
	var b strings.Builder
	for i, c := range s {
		if i > 0 && c >= 'A' && c <= 'Z' {
			b.WriteByte('_')
		}
		b.WriteRune(c)
	}
	return strings.ToLower(b.String())
}

// chunkSlice splits s into consecutive sub-slices of at most size elements.
func chunkSlice[T any](s []T, size int) [][]T {
	var chunks [][]T
	for i := 0; i < len(s); i += size {
		chunks = append(chunks, s[i:min(i+size, len(s))])
	}
	return chunks
}

func nilIfEmpty(s string) any {
	if s == "" {
		return nil
	}
	return s
}

func extractMetadata(path string) (title, authors, publicationDate, coverPath string) {
	switch strings.ToLower(filepath.Ext(path)) {
	case ".epub":
		return extractEpubMetadata(path)
	case ".pdf":
		title, authors, publicationDate = extractPDFMetadata(path)
	case ".cbz":
		coverPath = extractCBZCover(path)
	case ".cbr":
		coverPath = extractCBRCover(path)
	}
	return
}

func isImageFile(name string) bool {
	switch strings.ToLower(filepath.Ext(name)) {
	case ".jpg", ".jpeg", ".png", ".webp":
		return true
	}
	return false
}

func extractCBZCover(path string) string {
	zr, err := zip.OpenReader(path)
	if err != nil {
		return ""
	}
	defer zr.Close()
	var images []string
	for _, f := range zr.File {
		if isImageFile(f.Name) {
			images = append(images, f.Name)
		}
	}
	slices.Sort(images)
	if len(images) == 0 {
		return ""
	}
	return images[0]
}

func extractCBRCover(path string) string {
	rr, err := rardecode.OpenReader(path, "")
	if err != nil {
		return ""
	}
	defer rr.Close()
	var images []string
	for {
		hdr, err := rr.Next()
		if err != nil {
			break
		}
		if isImageFile(hdr.Name) {
			images = append(images, hdr.Name)
		}
	}
	slices.Sort(images)
	if len(images) == 0 {
		return ""
	}
	return images[0]
}

func extractPDFMetadata(path string) (title, author, publicationDate string) {
	f, err := os.Open(path)
	if err != nil {
		return
	}
	defer f.Close()

	info, err := pdfinfo.ReadInfo(f)
	if err != nil {
		return
	}
	return info.Title, info.Author, info.CreationDate
}

func extractEpubMetadata(path string) (title, authors, publicationDate, coverPath string) {
	if strings.ToLower(filepath.Ext(path)) != ".epub" {
		return
	}
	pkg, err := epub.OpenPackage(path)
	if err != nil {
		return
	}
	title = pkg.Metadata.Title
	authors = normalizeAuthors(pkg.Metadata.Authors)
	publicationDate = pkg.Metadata.PublicationDate
	if pkg.Cover != nil {
		coverPath = pkg.Cover.Href
	}
	return
}

// normalizeAuthors normalises dc:creator values and joins them with "; ".
// Some epub tools pack multiple authors into a single dc:creator element
// separated by semicolons, or leave a trailing semicolon on a single-author
// value. This splits each entry on ";", trims whitespace, discards empty
// parts, then joins the results.
func normalizeAuthors(creators []string) string {
	var parts []string
	for _, c := range creators {
		for part := range strings.SplitSeq(c, ";") {
			if v := strings.TrimSpace(part); v != "" {
				parts = append(parts, v)
			}
		}
	}
	return strings.Join(parts, "; ")
}
