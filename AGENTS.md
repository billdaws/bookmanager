# Agent Guidelines

## Go

- Do not use CGo. Prefer pure-Go libraries for all dependencies.
  - SQLite: use `modernc.org/sqlite` (pure Go), not `github.com/mattn/go-sqlite3` (CGo).
