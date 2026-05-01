-- +goose Up
ALTER TABLE books ADD COLUMN cover_path TEXT;

-- +goose Down
ALTER TABLE books DROP COLUMN cover_path;
