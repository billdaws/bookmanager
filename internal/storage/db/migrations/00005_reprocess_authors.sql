-- +goose Up
-- Clear columns_attempted for books without a manual authors override so that
-- the metadata poller re-extracts them with the normalizeAuthors fix.
-- Books with a manual authors override are left untouched.
UPDATE metadata_sync
SET columns_attempted = ''
WHERE JSON_EXTRACT(manual_overrides, '$.authors') IS NOT 1;

-- +goose Down
-- No meaningful rollback: the metadata poller will restore the key on next run.
