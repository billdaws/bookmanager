-- +goose Up
CREATE TABLE library (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    directory    TEXT NOT NULL,
    created_at   DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE books (
    id            TEXT PRIMARY KEY,
    library_id    TEXT NOT NULL REFERENCES library(id),
    filename      TEXT NOT NULL,
    discovered_at DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- +goose Down
DROP TABLE books;
DROP TABLE library;
