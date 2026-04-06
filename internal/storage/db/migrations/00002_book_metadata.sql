-- +goose Up
ALTER TABLE books ADD COLUMN title TEXT;
ALTER TABLE books ADD COLUMN authors TEXT;
ALTER TABLE books ADD COLUMN publication_date TEXT;

-- +goose Down
ALTER TABLE books DROP COLUMN publication_date;
ALTER TABLE books DROP COLUMN authors;
ALTER TABLE books DROP COLUMN title;
