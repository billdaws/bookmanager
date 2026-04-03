package main

import (
	"database/sql"
	"embed"
	"fmt"

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

func libraryExists(db *sql.DB) (bool, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM library").Scan(&count)
	return count > 0, err
}

func getLibrary(db *sql.DB) (*Library, error) {
	row := db.QueryRow("SELECT id, name, directory FROM library LIMIT 1")
	var l Library
	err := row.Scan(&l.ID, &l.Name, &l.Directory)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &l, err
}

func createLibraryWithBooks(db *sql.DB, name, dir string, filenames []string) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	libraryID := uuid.New().String()
	_, err = tx.Exec(
		"INSERT INTO library (id, name, directory) VALUES (?, ?, ?)",
		libraryID, name, dir,
	)
	if err != nil {
		return fmt.Errorf("insert library: %w", err)
	}

	for _, filename := range filenames {
		_, err = tx.Exec(
			"INSERT INTO books (id, library_id, filename) VALUES (?, ?, ?)",
			uuid.New().String(), libraryID, filename,
		)
		if err != nil {
			return fmt.Errorf("insert book %q: %w", filename, err)
		}
	}

	return tx.Commit()
}

func listBooks(db *sql.DB) ([]Book, error) {
	rows, err := db.Query("SELECT id, filename FROM books ORDER BY filename")
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
