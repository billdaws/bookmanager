package db

import (
	"context"
	"database/sql"
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"reflect"
	"sort"
	"strings"

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
	ID              string
	Filename        string
	Title           string `metadata:"sync"`
	Authors         string `metadata:"sync"` // semicolon-delimited, in document order
	PublicationDate string `metadata:"sync"` // "YYYY-MM-DD" or "YYYY"; empty if absent
}

// Store is the SQLite-backed data store. Callers that need to accept any
// implementation should define their own interface at the point of use.
type Store struct {
	db *sql.DB
}

// NewStore returns a Store backed by db.
func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
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

	if err := insertBooks(ctx, tx, libraryID, dir, filenames); err != nil {
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

	if err := insertBooks(ctx, tx, libraryID, dir, filesToAdd); err != nil {
		return err
	}

	if len(bookIDsToRemove) > 0 {
		placeholders := strings.Repeat("?,", len(bookIDsToRemove))
		placeholders = placeholders[:len(placeholders)-1]
		args := make([]any, len(bookIDsToRemove))
		for i, id := range bookIDsToRemove {
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
		`SELECT id, filename, COALESCE(title, ''), COALESCE(authors, ''), COALESCE(publication_date, '')
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
		if err := rows.Scan(&b.ID, &b.Filename, &b.Title, &b.Authors, &b.PublicationDate); err != nil {
			return nil, err
		}
		books = append(books, b)
	}
	return books, rows.Err()
}

// BackfillMetadata re-extracts metadata for books in the library whose
// metadata_sync record is missing or was produced with a different columns set
// than the current one. Fields listed in manual_overrides are skipped.
// It returns true if any book's metadata was updated.
func (s *Store) BackfillMetadata(ctx context.Context, libraryID, dir string) (bool, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT b.id, b.filename, COALESCE(ms.manual_overrides, '{}')
		FROM books b
		LEFT JOIN metadata_sync ms ON ms.book_id = b.id
		WHERE b.library_id = ?
		  AND (ms.book_id IS NULL OR ms.columns_attempted != ?)`,
		libraryID, currentColumnsKey,
	)
	if err != nil {
		return false, err
	}
	defer rows.Close()

	type bookRef struct{ id, filename, manualOverrides string }
	var stale []bookRef
	for rows.Next() {
		var r bookRef
		if err := rows.Scan(&r.id, &r.filename, &r.manualOverrides); err != nil {
			return false, err
		}
		stale = append(stale, r)
	}
	if err := rows.Err(); err != nil {
		return false, err
	}

	updated := false
	for _, r := range stale {
		var overrides map[string]bool
		if err := json.Unmarshal([]byte(r.manualOverrides), &overrides); err != nil {
			overrides = map[string]bool{}
		}

		title, authors, pubDate := extractMetadata(filepath.Join(dir, r.filename))

		var sets []string
		var args []any
		if !overrides["title"] {
			sets = append(sets, "title = ?")
			args = append(args, nilIfEmpty(title))
		}
		if !overrides["authors"] {
			sets = append(sets, "authors = ?")
			args = append(args, nilIfEmpty(authors))
		}
		if !overrides["publication_date"] {
			sets = append(sets, "publication_date = ?")
			args = append(args, nilIfEmpty(pubDate))
		}
		if len(sets) > 0 {
			args = append(args, r.id)
			if _, err := s.db.ExecContext(ctx,
				"UPDATE books SET "+strings.Join(sets, ", ")+" WHERE id = ?",
				args...,
			); err != nil {
				return false, fmt.Errorf("backfill metadata for %s: %w", r.filename, err)
			}
		}

		if _, err := s.db.ExecContext(ctx, `
			INSERT INTO metadata_sync (book_id, columns_attempted, manual_overrides)
			VALUES (?, ?, '{}')
			ON CONFLICT(book_id) DO UPDATE SET
				columns_attempted = excluded.columns_attempted,
				attempted_at      = strftime('%Y-%m-%dT%H:%M:%SZ', 'now'),
				manual_overrides  = manual_overrides`,
			r.id, currentColumnsKey,
		); err != nil {
			return false, fmt.Errorf("update metadata_sync for %s: %w", r.filename, err)
		}

		if (!overrides["title"] && title != "") || (!overrides["authors"] && authors != "") {
			updated = true
		}
	}
	return updated, nil
}

// GetBook returns the book with the given ID belonging to libraryID, or nil if
// not found.
func (s *Store) GetBook(ctx context.Context, libraryID, bookID string) (*Book, error) {
	row := s.db.QueryRowContext(ctx,
		`SELECT id, filename, COALESCE(title, ''), COALESCE(authors, ''), COALESCE(publication_date, '')
		 FROM books WHERE id = ? AND library_id = ?`,
		bookID, libraryID,
	)
	var b Book
	if err := row.Scan(&b.ID, &b.Filename, &b.Title, &b.Authors, &b.PublicationDate); err == sql.ErrNoRows {
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

// insertBooks inserts all filenames, extracting epub metadata where available,
// and records a metadata_sync entry for each book. It is a no-op if filenames
// is empty.
func insertBooks(ctx context.Context, q dbtx, libraryID, dir string, filenames []string) error {
	if len(filenames) == 0 {
		return nil
	}

	type bookRow struct {
		id       string
		filename string
		title    string
		authors  string
		pubDate  string
	}
	rows := make([]bookRow, len(filenames))
	for i, fn := range filenames {
		title, authors, pubDate := extractMetadata(filepath.Join(dir, fn))
		rows[i] = bookRow{uuid.New().String(), fn, title, authors, pubDate}
	}

	bookPlaceholders := make([]string, len(rows))
	bookArgs := make([]any, 0, len(rows)*6)
	syncPlaceholders := make([]string, len(rows))
	syncArgs := make([]any, 0, len(rows)*2)
	for i, r := range rows {
		bookPlaceholders[i] = "(?, ?, ?, ?, ?, ?)"
		bookArgs = append(bookArgs, r.id, libraryID, r.filename, nilIfEmpty(r.title), nilIfEmpty(r.authors), nilIfEmpty(r.pubDate))
		syncPlaceholders[i] = "(?, ?)"
		syncArgs = append(syncArgs, r.id, currentColumnsKey)
	}

	if _, err := q.ExecContext(ctx,
		"INSERT INTO books (id, library_id, filename, title, authors, publication_date) VALUES "+strings.Join(bookPlaceholders, ", "),
		bookArgs...,
	); err != nil {
		return fmt.Errorf("insert books: %w", err)
	}
	if _, err := q.ExecContext(ctx,
		"INSERT INTO metadata_sync (book_id, columns_attempted) VALUES "+strings.Join(syncPlaceholders, ", "),
		syncArgs...,
	); err != nil {
		return fmt.Errorf("insert metadata_sync: %w", err)
	}
	return nil
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

func nilIfEmpty(s string) any {
	if s == "" {
		return nil
	}
	return s
}

func extractMetadata(path string) (title, authors, publicationDate string) {
	switch strings.ToLower(filepath.Ext(path)) {
	case ".epub":
		return extractEpubMetadata(path)
	case ".pdf":
		return extractPDFMetadata(path)
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

func extractEpubMetadata(path string) (title, authors, publicationDate string) {
	if strings.ToLower(filepath.Ext(path)) != ".epub" {
		return
	}
	pkg, err := epub.OpenPackage(path)
	if err != nil {
		return
	}
	title = pkg.Metadata.Title
	authors = strings.Join(pkg.Metadata.Authors, "; ")
	publicationDate = pkg.Metadata.PublicationDate
	return
}
