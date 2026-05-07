package db

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"
)

// CachedResponse holds a cached API response body and when it was fetched.
type CachedResponse struct {
	Body      string
	FetchedAt time.Time
}

// ComicBookRef holds the fields needed by the ComicVine poller to process a comic.
type ComicBookRef struct {
	ID        string
	LibraryID string
	Filename  string
}

// GetComicVineCache returns the cached response for (resource, key) if it
// exists and was fetched within ttl. Returns nil if absent or expired.
func (s *Store) GetComicVineCache(ctx context.Context, resource, key string, ttl time.Duration) (*CachedResponse, error) {
	var body, fetchedAt string
	err := s.db.QueryRowContext(ctx,
		"SELECT body, fetched_at FROM comicvine_cache WHERE resource = ? AND key = ?",
		resource, key,
	).Scan(&body, &fetchedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get comicvine cache: %w", err)
	}
	t, err := time.Parse("2006-01-02T15:04:05Z", fetchedAt)
	if err != nil {
		return nil, fmt.Errorf("parse fetched_at: %w", err)
	}
	if time.Since(t) > ttl {
		return nil, nil
	}
	return &CachedResponse{Body: body, FetchedAt: t}, nil
}

// SetComicVineCache writes (or replaces) a cached response for (resource, key).
func (s *Store) SetComicVineCache(ctx context.Context, resource, key, body string) error {
	_, err := s.db.ExecContext(ctx, `
		INSERT INTO comicvine_cache (resource, key, body)
		VALUES (?, ?, ?)
		ON CONFLICT (resource, key) DO UPDATE
		  SET body = excluded.body,
		      fetched_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')`,
		resource, key, body,
	)
	if err != nil {
		return fmt.Errorf("set comicvine cache: %w", err)
	}
	return nil
}

// UpsertComicVineVolumeMetadata records the ComicVine volume ID for a series.
func (s *Store) UpsertComicVineVolumeMetadata(ctx context.Context, seriesID string, volumeID int) error {
	_, err := s.db.ExecContext(ctx, `
		INSERT INTO comicvine_volume_metadata (series_id, volume_id)
		VALUES (?, ?)
		ON CONFLICT (series_id) DO UPDATE SET volume_id = excluded.volume_id`,
		seriesID, volumeID,
	)
	if err != nil {
		return fmt.Errorf("upsert comicvine volume metadata: %w", err)
	}
	return nil
}

// UpsertComicVineIssueMetadata records the ComicVine issue ID and name for a
// book. When name is non-empty it is also written to books.title so the UI
// can display it as a human-readable label. When creators is non-empty the
// names are joined with ";" and written to books.authors.
func (s *Store) UpsertComicVineIssueMetadata(ctx context.Context, bookID string, issueID int, name string, creators []string) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin tx: %w", err)
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx, `
		INSERT INTO comicvine_issue_metadata (book_id, issue_id, issue_name)
		VALUES (?, ?, ?)
		ON CONFLICT (book_id) DO UPDATE
		  SET issue_id   = excluded.issue_id,
		      issue_name = excluded.issue_name`,
		bookID, issueID, name,
	)
	if err != nil {
		return fmt.Errorf("upsert comicvine issue metadata: %w", err)
	}

	if name != "" {
		if _, err = tx.ExecContext(ctx, `UPDATE books SET title = ? WHERE id = ?`, name, bookID); err != nil {
			return fmt.Errorf("set book title from issue name: %w", err)
		}
	}

	if len(creators) > 0 {
		authorsVal := strings.Join(creators, ";")
		if _, err = tx.ExecContext(ctx, `UPDATE books SET authors = ? WHERE id = ?`, authorsVal, bookID); err != nil {
			return fmt.Errorf("set book authors from person credits: %w", err)
		}
	}

	return tx.Commit()
}

// GetComicVineVolumeID returns the ComicVine volume ID recorded for a series,
// and whether a row was found.
func (s *Store) GetComicVineVolumeID(ctx context.Context, seriesID string) (int, bool, error) {
	var volumeID int
	err := s.db.QueryRowContext(ctx,
		"SELECT volume_id FROM comicvine_volume_metadata WHERE series_id = ?",
		seriesID,
	).Scan(&volumeID)
	if err == sql.ErrNoRows {
		return 0, false, nil
	}
	if err != nil {
		return 0, false, fmt.Errorf("get comicvine volume id: %w", err)
	}
	return volumeID, true, nil
}

// ListComicsNeedingSeriesDetection returns all .cbz/.cbr books that have not
// yet been assigned to a series and are not already in the review queue.
func (s *Store) ListComicsNeedingSeriesDetection(ctx context.Context) ([]ComicBookRef, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT id, library_id, filename FROM books
		WHERE series_id IS NULL
		  AND (LOWER(filename) LIKE '%.cbz' OR LOWER(filename) LIKE '%.cbr')
		  AND id NOT IN (SELECT book_id FROM comicvine_series_review)`)
	if err != nil {
		return nil, fmt.Errorf("list comics needing series detection: %w", err)
	}
	defer rows.Close()

	var comics []ComicBookRef
	for rows.Next() {
		var c ComicBookRef
		if err := rows.Scan(&c.ID, &c.LibraryID, &c.Filename); err != nil {
			return nil, fmt.Errorf("scan comic book ref: %w", err)
		}
		comics = append(comics, c)
	}
	return comics, rows.Err()
}

// ComicReviewRef holds the fields needed to present a low-confidence comic to
// the user for series selection.
type ComicReviewRef struct {
	BookID     string
	LibraryID  string
	Filename   string
	SearchTerm string
}

// MarkComicForReview records that a book could not be confidently matched to a
// ComicVine volume and should be presented to the user for manual selection.
func (s *Store) MarkComicForReview(ctx context.Context, bookID, searchTerm string) error {
	_, err := s.db.ExecContext(ctx, `
		INSERT INTO comicvine_series_review (book_id, search_term)
		VALUES (?, ?)
		ON CONFLICT (book_id) DO UPDATE SET search_term = excluded.search_term`,
		bookID, searchTerm,
	)
	if err != nil {
		return fmt.Errorf("mark comic for review: %w", err)
	}
	return nil
}

// ListComicsInReviewQueue returns all books in a library that are queued for
// manual ComicVine series selection.
func (s *Store) ListComicsInReviewQueue(ctx context.Context, libraryID string) ([]ComicReviewRef, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT b.id, b.library_id, b.filename, r.search_term
		FROM comicvine_series_review r
		JOIN books b ON b.id = r.book_id
		WHERE b.library_id = ?
		ORDER BY r.created_at ASC`,
		libraryID,
	)
	if err != nil {
		return nil, fmt.Errorf("list comics in review queue: %w", err)
	}
	defer rows.Close()

	var refs []ComicReviewRef
	for rows.Next() {
		var r ComicReviewRef
		if err := rows.Scan(&r.BookID, &r.LibraryID, &r.Filename, &r.SearchTerm); err != nil {
			return nil, fmt.Errorf("scan comic review ref: %w", err)
		}
		refs = append(refs, r)
	}
	return refs, rows.Err()
}

// CountComicsInReviewQueue returns how many books in a library are awaiting
// manual series selection.
func (s *Store) CountComicsInReviewQueue(ctx context.Context, libraryID string) (int, error) {
	var n int
	err := s.db.QueryRowContext(ctx, `
		SELECT COUNT(*) FROM comicvine_series_review r
		JOIN books b ON b.id = r.book_id
		WHERE b.library_id = ?`,
		libraryID,
	).Scan(&n)
	if err != nil {
		return 0, fmt.Errorf("count comics in review queue: %w", err)
	}
	return n, nil
}

// RemoveComicFromReview deletes a book's entry from the review queue, typically
// after the user has selected a series or dismissed the prompt.
func (s *Store) RemoveComicFromReview(ctx context.Context, bookID string) error {
	_, err := s.db.ExecContext(ctx,
		"DELETE FROM comicvine_series_review WHERE book_id = ?",
		bookID,
	)
	if err != nil {
		return fmt.Errorf("remove comic from review: %w", err)
	}
	return nil
}
