# Agent Guidelines

## Public repository

This is a public repository. Never commit secrets, credentials, API keys, tokens, personal file-system paths, or any other sensitive information.

## Go

- Do not use CGo. Prefer pure-Go libraries for all dependencies.
  - SQLite: use `modernc.org/sqlite` (pure Go), not `github.com/mattn/go-sqlite3` (CGo).
