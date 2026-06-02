-- +goose Up
ALTER TABLE comicvine_series_review ADD COLUMN dismissed INTEGER NOT NULL DEFAULT 0;

-- +goose Down
-- SQLite does not support DROP COLUMN on older versions; recreate without it.
CREATE TABLE comicvine_series_review_new (
    book_id     TEXT PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE,
    search_term TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
INSERT INTO comicvine_series_review_new SELECT book_id, search_term, created_at FROM comicvine_series_review;
DROP TABLE comicvine_series_review;
ALTER TABLE comicvine_series_review_new RENAME TO comicvine_series_review;
