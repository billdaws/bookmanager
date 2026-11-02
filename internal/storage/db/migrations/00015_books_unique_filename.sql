-- +goose Up
-- Remove duplicate (library_id, filename) rows, keeping the earliest discovered.
DELETE FROM books
WHERE rowid NOT IN (
    SELECT MIN(rowid) FROM books GROUP BY library_id, filename
);

-- Prevent future duplicates.
CREATE UNIQUE INDEX books_library_filename ON books(library_id, filename);

-- +goose Down
DROP INDEX IF EXISTS books_library_filename;
