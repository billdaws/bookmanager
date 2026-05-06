package db

import (
	"context"
	"fmt"
	"strings"

	"github.com/billdaws/bookmanager/internal/query"
)

// LibraryItem is either a SeriesSummary or a standalone Book.
// Exactly one of Series and Book is non-nil.
type LibraryItem struct {
	Kind   string         // "series" or "book"
	Series *SeriesSummary // non-nil when Kind == "series"
	Book   *Book          // non-nil when Kind == "book"
}

// LibraryItemsPage is the result of a paginated library items query.
type LibraryItemsPage struct {
	Items      []LibraryItem
	NextCursor ReadableCursor
	HasMore    bool
}

// ListLibraryItems returns at most limit items (series and standalone books)
// for the given library, sorted case-insensitively by (sort_key, kind, id),
// starting after cursor. Series are always included; filter applies only to
// books.
func (s *Store) ListLibraryItems(ctx context.Context, libraryID string, cursor ReadableCursor, filter query.Expr, limit int) (LibraryItemsPage, error) {
	if limit <= 0 {
		limit = defaultPageLimit
	}

	var whereParts []string
	var args []any

	whereParts = append(whereParts, "library_id = ?")
	args = append(args, libraryID)

	if cursor.SortKey != "" || cursor.Kind != "" || cursor.ID != "" {
		whereParts = append(whereParts,
			"(sort_key > ? OR (sort_key = ? AND kind > ?) OR (sort_key = ? AND kind = ? AND id > ?))")
		args = append(args,
			cursor.SortKey,
			cursor.SortKey, cursor.Kind,
			cursor.SortKey, cursor.Kind, cursor.ID)
	}

	if filter != nil {
		clause, filterArgs := query.ToSQL(filter)
		if clause != "" {
			whereParts = append(whereParts, "(kind = 'series' OR "+clause+")")
			args = append(args, filterArgs...)
		}
	}

	where := "WHERE " + strings.Join(whereParts, " AND ")
	args = append(args, limit+1)

	rows, err := s.db.QueryContext(ctx, fmt.Sprintf(`
		SELECT kind, id, sort_key, display_name, cover_book_id, book_count,
		       filename, title, authors, publication_date, cover_path
		FROM library_items
		%s
		ORDER BY sort_key, kind, id
		LIMIT ?`, where), args...)
	if err != nil {
		return LibraryItemsPage{}, fmt.Errorf("list library items: %w", err)
	}
	defer rows.Close()

	type rawRow struct {
		kind        string
		id          string
		sortKey     string
		displayName string
		coverBookID string
		bookCount   int
		filename    string
		title       string
		authors     string
		pubDate     string
		coverPath   string
	}

	var raws []rawRow
	for rows.Next() {
		var r rawRow
		if err := rows.Scan(
			&r.kind, &r.id, &r.sortKey, &r.displayName, &r.coverBookID, &r.bookCount,
			&r.filename, &r.title, &r.authors, &r.pubDate, &r.coverPath,
		); err != nil {
			return LibraryItemsPage{}, err
		}
		raws = append(raws, r)
	}
	if err := rows.Err(); err != nil {
		return LibraryItemsPage{}, err
	}

	var pg LibraryItemsPage
	if len(raws) > limit {
		pg.HasMore = true
		raws = raws[:limit]
	}
	if pg.HasMore && len(raws) > 0 {
		last := raws[len(raws)-1]
		pg.NextCursor = ReadableCursor{SortKey: last.sortKey, Kind: last.kind, ID: last.id}
	}

	// Collect series summaries (in order) and track their positions in items.
	summaries := make([]SeriesSummary, 0)
	summaryPos := make([]int, 0) // index in items slice for each summary

	items := make([]LibraryItem, len(raws))
	for i, r := range raws {
		if r.kind == "series" {
			summaries = append(summaries, SeriesSummary{
				Series:    Series{ID: r.id, LibraryID: libraryID, Name: r.displayName, CoverBookID: r.coverBookID},
				BookCount: r.bookCount,
			})
			summaryPos = append(summaryPos, i)
		} else {
			b := Book{
				ID:              r.id,
				Filename:        r.filename,
				Title:           r.title,
				Authors:         r.authors,
				PublicationDate: r.pubDate,
				CoverPath:       r.coverPath,
			}
			items[i] = LibraryItem{Kind: "book", Book: &b}
		}
	}

	if err := s.attachCoverBooks(ctx, summaries); err != nil {
		return LibraryItemsPage{}, err
	}

	for i, pos := range summaryPos {
		ss := summaries[i]
		items[pos] = LibraryItem{Kind: "series", Series: &ss}
	}

	pg.Items = items
	return pg, nil
}
