-- +goose Up
CREATE TABLE series (
    id            TEXT PRIMARY KEY,
    library_id    TEXT NOT NULL REFERENCES library(id) ON DELETE CASCADE,
    name          TEXT NOT NULL,
    cover_book_id TEXT REFERENCES books(id) ON DELETE SET NULL,
    created_at    DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX series_library_id ON series(library_id);
CREATE UNIQUE INDEX series_library_name ON series(library_id, name);

ALTER TABLE books ADD COLUMN series_id      TEXT REFERENCES series(id) ON DELETE SET NULL;
ALTER TABLE books ADD COLUMN series_index   INTEGER;
ALTER TABLE books ADD COLUMN series_display TEXT;
CREATE INDEX books_series_id ON books(series_id);

-- +goose Down
DROP INDEX IF EXISTS books_series_id;
ALTER TABLE books DROP COLUMN series_display;
ALTER TABLE books DROP COLUMN series_index;
ALTER TABLE books DROP COLUMN series_id;
DROP INDEX IF EXISTS series_library_name;
DROP INDEX IF EXISTS series_library_id;
DROP TABLE series;
