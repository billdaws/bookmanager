package main

import (
	"database/sql"
	"embed"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/pressly/goose/v3"
	_ "modernc.org/sqlite"
)

//go:embed migrations
var migrationsFS embed.FS

type Library struct {
	ID        string
	Name      string
	Directory string
}

type Book struct {
	ID       string
	Filename string
}

func openDB(path string) (*sql.DB, error) {
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

	goose.SetBaseFS(migrationsFS)
	goose.SetLogger(goose.NopLogger())
	if err := goose.SetDialect("sqlite3"); err != nil {
		return nil, fmt.Errorf("goose dialect: %w", err)
	}
	if err := goose.Up(db, "migrations"); err != nil {
		return nil, fmt.Errorf("goose up: %w", err)
	}

	return db, nil
}

func listLibraries(db *sql.DB) ([]Library, error) {
	rows, err := db.Query("SELECT id, name, directory FROM library ORDER BY name")
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

func getLibraryByID(db *sql.DB, id string) (*Library, error) {
	row := db.QueryRow("SELECT id, name, directory FROM library WHERE id = ?", id)
	var l Library
	err := row.Scan(&l.ID, &l.Name, &l.Directory)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &l, err
}

func createLibraryWithBooks(db *sql.DB, name, dir string, filenames []string) (string, error) {
	tx, err := db.Begin()
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	libraryID := uuid.New().String()
	_, err = tx.Exec(
		"INSERT INTO library (id, name, directory) VALUES (?, ?, ?)",
		libraryID, name, dir,
	)
	if err != nil {
		return "", fmt.Errorf("insert library: %w", err)
	}

	if err := insertBooks(tx, libraryID, filenames); err != nil {
		return "", err
	}

	return libraryID, tx.Commit()
}

// insertBooks inserts all filenames in a single INSERT statement.
// It is a no-op if filenames is empty.
func insertBooks(tx *sql.Tx, libraryID string, filenames []string) error {
	if len(filenames) == 0 {
		return nil
	}

	placeholders := make([]string, len(filenames))
	args := make([]any, 0, len(filenames)*3)
	for i, filename := range filenames {
		placeholders[i] = "(?, ?, ?)"
		args = append(args, uuid.New().String(), libraryID, filename)
	}

	query := "INSERT INTO books (id, library_id, filename) VALUES " + strings.Join(placeholders, ", ")
	if _, err := tx.Exec(query, args...); err != nil {
		return fmt.Errorf("insert books: %w", err)
	}
	return nil
}

func syncLibrary(db *sql.DB, lib *Library) error {
	filenames, err := scanDirectory(lib.Directory)
	if err != nil {
		return err
	}

	books, err := listBooks(db, lib.ID)
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

	var toRemove []any
	for filename, id := range inDB {
		if !onDisk[filename] {
			toRemove = append(toRemove, id)
		}
	}

	if len(toAdd) == 0 && len(toRemove) == 0 {
		return nil
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if err := insertBooks(tx, lib.ID, toAdd); err != nil {
		return err
	}

	if len(toRemove) > 0 {
		placeholders := strings.Repeat("?,", len(toRemove))
		placeholders = placeholders[:len(placeholders)-1] // trim trailing comma
		query := "DELETE FROM books WHERE id IN (" + placeholders + ")"
		if _, err := tx.Exec(query, toRemove...); err != nil {
			return fmt.Errorf("delete books: %w", err)
		}
	}

	return tx.Commit()
}

func deleteLibrary(db *sql.DB, id string) (bool, error) {
	tx, err := db.Begin()
	if err != nil {
		return false, err
	}
	defer tx.Rollback()

	// Check existence before deleting.
	var count int
	if err := tx.QueryRow("SELECT COUNT(*) FROM library WHERE id = ?", id).Scan(&count); err != nil {
		return false, err
	}
	if count == 0 {
		return false, nil
	}

	// Delete books first to satisfy the foreign key constraint.
	if _, err := tx.Exec("DELETE FROM books WHERE library_id = ?", id); err != nil {
		return false, fmt.Errorf("delete books: %w", err)
	}

	if _, err := tx.Exec("DELETE FROM library WHERE id = ?", id); err != nil {
		return false, fmt.Errorf("delete library: %w", err)
	}

	return true, tx.Commit()
}

func listBooks(db *sql.DB, libraryID string) ([]Book, error) {
	rows, err := db.Query(
		"SELECT id, filename FROM books WHERE library_id = ? ORDER BY filename",
		libraryID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []Book
	for rows.Next() {
		var b Book
		if err := rows.Scan(&b.ID, &b.Filename); err != nil {
			return nil, err
		}
		books = append(books, b)
	}
	return books, rows.Err()
}
