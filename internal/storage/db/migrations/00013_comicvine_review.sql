-- +goose Up
CREATE TABLE comicvine_series_review (
    book_id     TEXT PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE,
    search_term TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- +goose Down
DROP TABLE comicvine_series_review;
