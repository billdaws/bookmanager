-- +goose Up
CREATE TABLE recipients (
    id         TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    email_enc  TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- +goose Down
DROP TABLE recipients;
