-- +goose Up
ALTER TABLE comicvine_issue_metadata ADD COLUMN issue_name TEXT NOT NULL DEFAULT '';

-- +goose Down
ALTER TABLE comicvine_issue_metadata DROP COLUMN issue_name;
