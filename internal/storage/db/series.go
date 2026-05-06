package db

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

// SeriesSummary is a Series with its aggregate book count and the cover book.
type SeriesSummary struct {
	Series
	BookCount int
	CoverBook *Book // nil if no cover has been assigned or the book has no cover image
}

// UpsertSeries returns the ID of the series with the given name in the given
// library, creating it if it does not already exist.
func (s *Store) UpsertSeries(ctx context.Context, libraryID, name string) (string, error) {
	var id string
	err := s.db.QueryRowContext(ctx,
		"SELECT id FROM series WHERE library_id = ? AND name = ?",
		libraryID, name,
	).Scan(&id)
	if err == nil {
		return id, nil
	}
	if err != sql.ErrNoRows {
		return "", fmt.Errorf("lookup series: %w", err)
	}
	id = uuid.New().String()
	_, err = s.db.ExecContext(ctx,
		"INSERT INTO series (id, library_id, name) VALUES (?, ?, ?)",
		id, libraryID, name,
	)
	if err != nil {
		return "", fmt.Errorf("insert series: %w", err)
	}
	return id, nil
}

// GetSeriesByID returns the series with the given ID belonging to libraryID,
// or nil if not found.
func (s *Store) GetSeriesByID(ctx context.Context, libraryID, seriesID string) (*Series, error) {
	row := s.db.QueryRowContext(ctx,
		"SELECT id, library_id, name, COALESCE(cover_book_id,''), created_at FROM series WHERE id = ? AND library_id = ?",
		seriesID, libraryID,
	)
	var sr Series
	var createdAt string
	if err := row.Scan(&sr.ID, &sr.LibraryID, &sr.Name, &sr.CoverBookID, &createdAt); err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, fmt.Errorf("get series: %w", err)
	}
	sr.CreatedAt, _ = time.Parse("2006-01-02T15:04:05Z", createdAt)
	return &sr, nil
}

// AssignBookToSeries sets the series fields on a book. If the book has a cover
// image and its series_index is lower than the current cover book's index (or
// the series has no cover book yet), series.cover_book_id is updated.
func (s *Store) AssignBookToSeries(ctx context.Context, bookID, seriesID string, index *int, display string) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if index != nil {
		_, err = tx.ExecContext(ctx,
			"UPDATE books SET series_id = ?, series_index = ?, series_display = ? WHERE id = ?",
			seriesID, *index, nilIfEmpty(display), bookID,
		)
	} else {
		_, err = tx.ExecContext(ctx,
			"UPDATE books SET series_id = ?, series_index = NULL, series_display = ? WHERE id = ?",
			seriesID, nilIfEmpty(display), bookID,
		)
	}
	if err != nil {
		return fmt.Errorf("assign book to series: %w", err)
	}

	// Update cover_book_id when this book has a cover image and is the
	// lowest-indexed entry seen so far. series_index NULL is treated as
	// the highest possible value so explicit indexes always win.
	_, err = tx.ExecContext(ctx, `
		UPDATE series SET cover_book_id = ?
		WHERE id = ?
		  AND EXISTS (
		    SELECT 1 FROM books WHERE id = ? AND cover_path IS NOT NULL AND cover_path != ''
		  )
		  AND (
		    cover_book_id IS NULL
		    OR COALESCE((SELECT series_index FROM books WHERE id = ?), 9999999)
		       <= COALESCE((SELECT series_index FROM books WHERE id = cover_book_id), 9999999)
		  )`,
		bookID, seriesID, bookID, bookID,
	)
	if err != nil {
		return fmt.Errorf("update series cover: %w", err)
	}

	return tx.Commit()
}

// ListSeriesPage returns at most limit series for the given library ordered by
// (name, id), starting after cursor. Each entry includes a book count and the
// cover book (if one has been assigned).
func (s *Store) ListSeriesPage(ctx context.Context, libraryID string, cursor SeriesCursor, limit int) ([]SeriesSummary, SeriesCursor, error) {
	if limit <= 0 {
		limit = defaultPageLimit
	}

	var whereParts []string
	var args []any

	whereParts = append(whereParts, "s.library_id = ?")
	args = append(args, libraryID)

	if cursor.Name != "" || cursor.ID != "" {
		whereParts = append(whereParts, "(s.name, s.id) > (?, ?)")
		args = append(args, cursor.Name, cursor.ID)
	}

	where := "WHERE " + strings.Join(whereParts, " AND ")
	args = append(args, limit+1)

	rows, err := s.db.QueryContext(ctx, fmt.Sprintf(`
		SELECT s.id, s.library_id, s.name, COALESCE(s.cover_book_id,''), s.created_at,
		       COUNT(b.id) AS book_count
		FROM series s
		LEFT JOIN books b ON b.series_id = s.id
		%s
		GROUP BY s.id
		ORDER BY s.name, s.id
		LIMIT ?`, where), args...)
	if err != nil {
		return nil, SeriesCursor{}, fmt.Errorf("list series page: %w", err)
	}
	defer rows.Close()

	var summaries []SeriesSummary
	for rows.Next() {
		var ss SeriesSummary
		var createdAt string
		if err := rows.Scan(&ss.ID, &ss.LibraryID, &ss.Name, &ss.CoverBookID, &createdAt, &ss.BookCount); err != nil {
			return nil, SeriesCursor{}, err
		}
		ss.CreatedAt, _ = time.Parse("2006-01-02T15:04:05Z", createdAt)
		summaries = append(summaries, ss)
	}
	if err := rows.Err(); err != nil {
		return nil, SeriesCursor{}, err
	}

	var nextCursor SeriesCursor
	hasMore := len(summaries) > limit
	if hasMore {
		summaries = summaries[:limit]
	}
	if hasMore && len(summaries) > 0 {
		last := summaries[len(summaries)-1]
		nextCursor = SeriesCursor{Name: last.Name, ID: last.ID}
	}

	// Fetch cover books in a single query.
	if err := s.attachCoverBooks(ctx, summaries); err != nil {
		return nil, SeriesCursor{}, err
	}

	return summaries, nextCursor, nil
}

// attachCoverBooks fetches the cover book for each summary that has a
// CoverBookID set, using a single IN query.
func (s *Store) attachCoverBooks(ctx context.Context, summaries []SeriesSummary) error {
	var ids []string
	idx := make(map[string][]int) // bookID → positions in summaries
	for i, ss := range summaries {
		if ss.CoverBookID != "" {
			ids = append(ids, ss.CoverBookID)
			idx[ss.CoverBookID] = append(idx[ss.CoverBookID], i)
		}
	}
	if len(ids) == 0 {
		return nil
	}

	placeholders := strings.Repeat("?,", len(ids))
	placeholders = placeholders[:len(placeholders)-1]
	args := make([]any, len(ids))
	for i, id := range ids {
		args[i] = id
	}

	rows, err := s.db.QueryContext(ctx,
		"SELECT "+bookColumns+" FROM books WHERE id IN ("+placeholders+")",
		args...,
	)
	if err != nil {
		return fmt.Errorf("fetch cover books: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		b, err := scanBook(rows)
		if err != nil {
			return err
		}
		bc := b
		for _, i := range idx[b.ID] {
			summaries[i].CoverBook = &bc
		}
	}
	return rows.Err()
}

// BatchAssignBooksToSeries assigns bookIDs to seriesID in a single transaction,
// clearing any existing series_index and series_display values. After updating
// the books it sets series.cover_book_id to the first book in the series that
// has a cover image (ordered by id), but only when no cover has been assigned yet.
func (s *Store) BatchAssignBooksToSeries(ctx context.Context, seriesID string, bookIDs []string) error {
	if len(bookIDs) == 0 {
		return nil
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	for _, chunk := range chunkSlice(bookIDs, insertBatchSize) {
		placeholders := strings.Repeat("?,", len(chunk))
		placeholders = placeholders[:len(placeholders)-1]
		args := make([]any, 1+len(chunk))
		args[0] = seriesID
		for i, id := range chunk {
			args[i+1] = id
		}
		if _, err := tx.ExecContext(ctx,
			"UPDATE books SET series_id = ?, series_index = NULL, series_display = NULL WHERE id IN ("+placeholders+")",
			args...,
		); err != nil {
			return fmt.Errorf("batch assign books: %w", err)
		}
	}

	// Set cover_book_id to the first book with a cover image, if none is set.
	if _, err := tx.ExecContext(ctx, `
		UPDATE series SET cover_book_id = (
			SELECT id FROM books
			WHERE series_id = ? AND cover_path IS NOT NULL AND cover_path != ''
			ORDER BY id LIMIT 1
		)
		WHERE id = ? AND cover_book_id IS NULL`,
		seriesID, seriesID,
	); err != nil {
		return fmt.Errorf("update series cover: %w", err)
	}

	return tx.Commit()
}

// RemoveBookFromSeries clears the series assignment on a book.
func (s *Store) RemoveBookFromSeries(ctx context.Context, bookID string) error {
	_, err := s.db.ExecContext(ctx,
		"UPDATE books SET series_id=NULL, series_index=NULL, series_display=NULL WHERE id=?",
		bookID,
	)
	return err
}

// ListSeriesBooks returns a paginated list of books belonging to seriesID,
// ordered by (series_index, id).
func (s *Store) ListSeriesBooks(ctx context.Context, seriesID string, cursor BookCursor, limit int) (BooksPage, error) {
	if limit <= 0 {
		limit = defaultPageLimit
	}

	var whereParts []string
	var args []any

	whereParts = append(whereParts, "series_id = ?")
	args = append(args, seriesID)

	if cursor.Filename != "" || cursor.ID != "" {
		whereParts = append(whereParts, "(COALESCE(series_index, 9999999), id) > (?, ?)")
		args = append(args, cursor.Filename, cursor.ID) // cursor.Filename reused as the index string
	}

	where := "WHERE " + strings.Join(whereParts, " AND ")
	args = append(args, limit+1)

	rows, err := s.db.QueryContext(ctx, fmt.Sprintf(`
		SELECT `+bookColumns+`
		FROM books
		%s
		ORDER BY COALESCE(series_index, 9999999), id
		LIMIT ?`, where), args...)
	if err != nil {
		return BooksPage{}, fmt.Errorf("list series books: %w", err)
	}
	defer rows.Close()

	var books []Book
	for rows.Next() {
		b, err := scanBook(rows)
		if err != nil {
			return BooksPage{}, err
		}
		books = append(books, b)
	}
	if err := rows.Err(); err != nil {
		return BooksPage{}, err
	}

	var pg BooksPage
	if len(books) > limit {
		pg.HasMore = true
		books = books[:limit]
	}
	pg.Books = books
	if pg.HasMore && len(books) > 0 {
		last := books[len(books)-1]
		// Encode the series_index as the "filename" field so we can reuse BookCursor.
		idxStr := ""
		if last.SeriesIndex != nil {
			idxStr = fmt.Sprintf("%d", *last.SeriesIndex)
		} else {
			idxStr = "9999999"
		}
		pg.NextCursor = BookCursor{Filename: idxStr, ID: last.ID}
	}
	return pg, nil
}
