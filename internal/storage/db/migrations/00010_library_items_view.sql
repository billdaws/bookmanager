-- +goose Up
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

-- +goose Down
DROP VIEW library_items;
