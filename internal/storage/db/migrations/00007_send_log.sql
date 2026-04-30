-- +goose Up
CREATE TABLE send_log (
    id           TEXT PRIMARY KEY,
    recipient_id TEXT NOT NULL REFERENCES recipients(id) ON DELETE CASCADE,
    book_id      TEXT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    sent_at      DATETIME NOT NULL DEFAULT (datetime('now')),
    status       TEXT NOT NULL,
    error        TEXT
);

-- +goose Down
DROP TABLE send_log;
