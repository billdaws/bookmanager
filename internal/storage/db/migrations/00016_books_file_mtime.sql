-- +goose Up
-- Modification time of the book file when it was indexed (RFC 3339, UTC); NULL if unknown.
ALTER TABLE books ADD COLUMN file_mtime TEXT;

DROP VIEW library_items;
CREATE VIEW library_items AS
    SELECT
        'series'                     AS kind,
        s.library_id,
        s.id,
        LOWER(s.name)                AS sort_key,
        s.name                       AS display_name,
        COALESCE(s.cover_book_id,'') AS cover_book_id,
        (SELECT COUNT(*)
         FROM books b2
         WHERE b2.series_id = s.id)  AS book_count,
        ''                           AS filename,
        ''                           AS title,
        ''                           AS authors,
        ''                           AS publication_date,
        ''                           AS cover_path,
        ''                           AS file_mtime
    FROM series s

    UNION ALL

    SELECT
        'book'                        AS kind,
        b.library_id,
        b.id,
        LOWER(b.filename)             AS sort_key,
        b.filename                    AS display_name,
        ''                            AS cover_book_id,
        0                             AS book_count,
        b.filename,
        COALESCE(b.title,''),
        COALESCE(b.authors,''),
        COALESCE(b.publication_date,''),
        COALESCE(b.cover_path,''),
        COALESCE(b.file_mtime,'')
    FROM books b
    WHERE b.series_id IS NULL;

-- +goose Down
DROP VIEW library_items;
CREATE VIEW library_items AS
    SELECT
        'series'                     AS kind,
        s.library_id,
        s.id,
        LOWER(s.name)                AS sort_key,
        s.name                       AS display_name,
        COALESCE(s.cover_book_id,'') AS cover_book_id,
        (SELECT COUNT(*)
         FROM books b2
         WHERE b2.series_id = s.id)  AS book_count,
        ''                           AS filename,
        ''                           AS title,
        ''                           AS authors,
        ''                           AS publication_date,
        ''                           AS cover_path
    FROM series s

    UNION ALL

    SELECT
        'book'                        AS kind,
        b.library_id,
        b.id,
        LOWER(b.filename)             AS sort_key,
        b.filename                    AS display_name,
        ''                            AS cover_book_id,
        0                             AS book_count,
        b.filename,
        COALESCE(b.title,''),
        COALESCE(b.authors,''),
        COALESCE(b.publication_date,''),
        COALESCE(b.cover_path,'')
    FROM books b
    WHERE b.series_id IS NULL;
ALTER TABLE books DROP COLUMN file_mtime;
