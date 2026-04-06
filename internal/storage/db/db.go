package db

import (
	"context"
	"database/sql"
	"embed"
	"fmt"
	"io/fs"
	"path/filepath"
	"strings"

	"github.com/billdaws/bookmanager/internal/scanner"
	"github.com/billdaws/epub"
	"github.com/google/uuid"
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
	Title           string
	Authors         string // semicolon-delimited, in document order
	PublicationDate string // "YYYY-MM-DD" or "YYYY"; empty if absent
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

// insertBooks inserts all filenames in a single INSERT statement, extracting
// epub metadata for .epub files. It is a no-op if filenames is empty.
func insertBooks(ctx context.Context, q dbtx, libraryID, dir string, filenames []string) error {
	if len(filenames) == 0 {
		return nil
	}

	placeholders := make([]string, len(filenames))
	args := make([]any, 0, len(filenames)*6)
	for i, filename := range filenames {
		placeholders[i] = "(?, ?, ?, ?, ?, ?)"
		title, authors, pubDate := extractEpubMetadata(filepath.Join(dir, filename))
		args = append(args, uuid.New().String(), libraryID, filename, nilIfEmpty(title), nilIfEmpty(authors), nilIfEmpty(pubDate))
	}

	query := "INSERT INTO books (id, library_id, filename, title, authors, publication_date) VALUES " + strings.Join(placeholders, ", ")
	if _, err := q.ExecContext(ctx, query, args...); err != nil {
		return fmt.Errorf("insert books: %w", err)
	}
	return nil
}

func nilIfEmpty(s string) any {
	if s == "" {
		return nil
	}
	return s
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
