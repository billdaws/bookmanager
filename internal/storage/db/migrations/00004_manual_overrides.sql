-- +goose Up
ALTER TABLE metadata_sync ADD COLUMN manual_overrides TEXT NOT NULL DEFAULT '{}';

-- +goose Down
ALTER TABLE metadata_sync DROP COLUMN manual_overrides;
