-- +goose Up
CREATE TABLE metadata_sync (
    book_id         TEXT PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE,
    columns_attempted TEXT NOT NULL,
    attempted_at    DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- +goose Down
DROP TABLE metadata_sync;
