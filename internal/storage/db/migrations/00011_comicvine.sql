-- +goose Up
CREATE TABLE comicvine_volume_metadata (
    series_id TEXT PRIMARY KEY REFERENCES series(id) ON DELETE CASCADE,
    volume_id INTEGER NOT NULL
);

CREATE TABLE comicvine_issue_metadata (
    book_id  TEXT PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE,
    issue_id INTEGER NOT NULL
);

CREATE TABLE comicvine_cache (
    resource   TEXT     NOT NULL,
    key        TEXT     NOT NULL,
    body       TEXT     NOT NULL,
    fetched_at DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    PRIMARY KEY (resource, key)
);

-- +goose Down
DROP TABLE comicvine_cache;
DROP TABLE comicvine_issue_metadata;
DROP TABLE comicvine_volume_metadata;
