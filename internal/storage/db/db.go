package db

import (
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
	"sort"
	"strings"
	"sync"

	"github.com/billdaws/bookmanager/internal/scanner"
	"github.com/billdaws/epub"
	"github.com/google/uuid"
	"github.com/pdfcpu/pdfcpu/pkg/api"
	pdfmodel "github.com/pdfcpu/pdfcpu/pkg/pdfcpu/model"
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

type Book struct {
	ID              string `db:"id"`
	Filename        string `db:"filename"`
	Title           string `db:"title"            metadata:"sync"`
	Authors         string `db:"authors"          metadata:"sync"` // semicolon-delimited, in document order
	PublicationDate string `db:"publication_date" metadata:"sync"` // "YYYY-MM-DD" or "YYYY"; empty if absent
	CoverPath       string `db:"cover_path"       metadata:"sync"` // path within EPUB zip to cover image; empty if absent
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
		`SELECT id, filename, COALESCE(title, ''), COALESCE(authors, ''), COALESCE(publication_date, ''), COALESCE(cover_path, '')
		 FROM books WHERE library_id = ? ORDER BY filename`,
		libraryID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []Book
	for rows.Next() {
		var b Book
		if err := rows.Scan(&b.ID, &b.Filename, &b.Title, &b.Authors, &b.PublicationDate, &b.CoverPath); err != nil {
			return nil, err
		}
		books = append(books, b)
	}
	return books, rows.Err()
}

// BackfillMetadata re-extracts metadata for books in the library whose
// metadata_sync record is missing or was produced with a different columns set
// than the current one. Fields listed in manual_overrides are skipped.
// It returns the number of books processed (0 if everything was already up to date).
func (s *Store) BackfillMetadata(ctx context.Context, libraryID, dir string) (int, error) {
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

	// Extract metadata for all stale books in parallel, bounded by metadataBatchSize.
	// A semaphore keeps the pipeline full without the idle time at batch boundaries.
	results := make([]extractedBook, len(stale))
	sem := make(chan struct{}, s.metadataBatchSize)
	var wg sync.WaitGroup
	for i, r := range stale {
		wg.Add(1)
		sem <- struct{}{}
		go func(i int, r bookRef) {
			defer wg.Done()
			defer func() { <-sem }()
			log.Printf("metadata backfill: [%d/%d] %s", i+1, len(stale), r.filename)
			var overrides map[string]bool
			if err := json.Unmarshal([]byte(r.manualOverrides), &overrides); err != nil {
				overrides = map[string]bool{}
			}
			title, authors, pubDate, coverPath := extractMetadata(filepath.Join(dir, r.filename))
			results[i] = extractedBook{r, title, authors, pubDate, coverPath, overrides}
		}(i, r)
	}
	wg.Wait()

	// Write all results in a single transaction to avoid per-row WAL commit
	// overhead. Each book is wrapped in a savepoint so a failing write skips
	// that book without rolling back the rest.
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return 0, fmt.Errorf("begin backfill transaction: %w", err)
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
		return 0, fmt.Errorf("prepare metadata_sync upsert: %w", err)
	}
	defer upsertStmt.Close()

	written := 0
	for i, res := range results {
		sp := fmt.Sprintf("backfill_%d", i)
		if _, err := tx.ExecContext(ctx, "SAVEPOINT "+sp); err != nil {
			return 0, fmt.Errorf("savepoint for %s: %w", res.filename, err)
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
			if _, err := tx.ExecContext(ctx, "ROLLBACK TO SAVEPOINT "+sp); err != nil {
				return 0, fmt.Errorf("rollback savepoint for %s: %w", res.filename, err)
			}
			if _, err := tx.ExecContext(ctx, "RELEASE SAVEPOINT "+sp); err != nil {
				return 0, fmt.Errorf("release savepoint for %s: %w", res.filename, err)
			}
			continue
		}

		if _, err := tx.ExecContext(ctx, "RELEASE SAVEPOINT "+sp); err != nil {
			return 0, fmt.Errorf("release savepoint for %s: %w", res.filename, err)
		}
		written++
	}

	if err := tx.Commit(); err != nil {
		return 0, fmt.Errorf("commit metadata backfill: %w", err)
	}
	return written, nil
}

// GetBook returns the book with the given ID belonging to libraryID, or nil if
// not found.
func (s *Store) GetBook(ctx context.Context, libraryID, bookID string) (*Book, error) {
	row := s.db.QueryRowContext(ctx,
		`SELECT id, filename, COALESCE(title, ''), COALESCE(authors, ''), COALESCE(publication_date, ''), COALESCE(cover_path, '')
		 FROM books WHERE id = ? AND library_id = ?`,
		bookID, libraryID,
	)
	var b Book
	if err := row.Scan(&b.ID, &b.Filename, &b.Title, &b.Authors, &b.PublicationDate, &b.CoverPath); err == sql.ErrNoRows {
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
	}
	return
}

func extractPDFMetadata(path string) (title, author string, _ string) {
	f, err := os.Open(path)
	if err != nil {
		return
	}
	defer f.Close()

	conf := pdfmodel.NewDefaultConfiguration()
	conf.ValidationMode = pdfmodel.ValidationRelaxed
	info, err := api.PDFInfo(f, path, nil, false, conf)
	if err != nil {
		return
	}
	return info.Title, info.Author, ""
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
