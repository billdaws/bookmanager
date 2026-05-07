# ComicVine Series Matching

Bookmanager automatically identifies comic book series by querying the
[ComicVine](https://comicvine.gamespot.com/) database. This document explains
how matching works, when it happens automatically, and how to handle cases where
the software is not confident enough to act on its own.

## How comics are discovered

When you create a library Bookmanager scans the directory for `.cbz` and `.cbr`
files and records them as books. Books that have not yet been assigned to a
series are processed by the ComicVine poller, which runs immediately on library
creation and then on a configurable periodic interval.

## Signal extraction

For each unassigned comic the poller extracts two candidate series names:

1. **Filename parse** — the base filename is stripped of its extension, year
   annotations `(YYYY)`, and volume markers (`v2`), then the issue number is
   extracted using one of three patterns (in order of preference):
   - Explicit marker: `Batman #042.cbz` → series `"Batman"`, issue 42
   - Trailing two-or-more digit number: `Watchmen 01.cbr` → series
     `"Watchmen"`, issue 1
   - Single digit before a dash separator: `1963 1 - Mystery Inc.cbz` →
     series `"1963"`, issue 1

2. **Parent directory name** — the immediate parent directory is used as a
   second candidate. For example, the file at
   `Alan Moore/1963/Alan Moore's 1963 1 - Mystery Inc.cbz` yields `"1963"` as
   the directory candidate.

If the directory name equals the filename-parsed series name, only one query is
made. If the filename cannot be parsed (no issue number found), the file is
skipped entirely.

## ComicVine search and caching

Each candidate series name is searched on ComicVine. Results are cached locally
in the database so that subsequent poller runs do not repeat the same API calls.
The cache TTL is configurable; by default search results are reused for 30 days
and issue lists for 7 days.

## Confidence scoring

The top result returned by ComicVine for each candidate query is scored against
the query string using **Jaccard token-overlap similarity**:

```
tokenize(s) = lowercase, strip punctuation, split on whitespace

jaccard = |tokens(query) ∩ tokens(result_name)| / |tokens(query) ∪ tokens(result_name)|
bonus   = 0.4 if query and result_name are identical (case-insensitive), else 0
score   = min(jaccard + bonus, 1.0)
```

The candidate with the highest score across all queries is chosen as the winner.

### Worked example: `"Alan Moore's 1963 1 - Mystery Inc.cbz"`

| Query | Top ComicVine result | Jaccard | Bonus | Score |
|---|---|---|---|---|
| `"Alan Moore's 1963"` | `"Alan Moore's Glory"` | 0.50 | 0 | **0.50** |
| `"1963"` (directory) | `"1963"` | 1.00 | 0.40 | **1.00** (clamped) |

The directory query wins with a score of 1.00 — well above the auto-assign
threshold of **0.75**. The book is automatically assigned to the `"1963"` series.

### Another example: `"Batman 001.cbz"` in a flat directory

| Query | Top ComicVine result | Score |
|---|---|---|
| `"Batman"` | `"Batman"` | **1.00** |

Single query, exact match, auto-assigned.

## Auto-assign path

When the winning score is **≥ 0.75** the poller proceeds automatically:

1. Creates or finds the series by the ComicVine volume name.
2. Records the ComicVine volume ID for future reference.
3. Fetches issues for the volume (cached).
4. Assigns the book to the series with its issue number as the sort key.
5. If an issue name is found on ComicVine it is written to the book's title
   field so the UI can display it.
6. The library page refreshes via a server-sent event.

## Review queue

When the winning score is **< 0.75** the book is placed in the **review queue**
rather than auto-assigned. The library page shows a link:

> N comic(s) pending series review →

Clicking it opens the review page (`/library/{id}/review`), which lists each
pending comic along with up to five candidate ComicVine volumes drawn from the
cached search results. Each candidate shows its name, start year, publisher,
issue count, and match percentage.

### Picking a series

Click **Pick this series** next to the correct volume. The poller assignment
pipeline runs immediately: the book is assigned, issue metadata is written, and
the book disappears from the review queue.

### Dismissing

Click **Dismiss** to remove a book from the review queue without assigning it.
The book returns to the library as an unassigned standalone comic. It will not
be re-queued by the poller unless it is deleted and re-added.

## Debug tool

The `cvlookup` command-line tool (`make cv-lookup FILE=<path>`) runs the same
pipeline for a single file and prints confidence scores for every candidate
query, making it easy to see why a particular match was or was not selected:

```
file:     /library/1963/Alan Moore's 1963 1 - Mystery Inc.cbz
basename: Alan Moore's 1963 1 - Mystery Inc.cbz

parse:    series="Alan Moore's 1963"  issue=1
          directory candidate: "1963"

searching ComicVine for "Alan Moore's 1963"...
search:   10 result(s) returned, top 5:
→ id=20413    name="Alan Moore's Glory"   year=2001  ...

searching ComicVine for "1963"...
search:   5 result(s) returned, top 5:
→ id=5162     name="1963"                year=1993  ...

confidence scores:
  query="Alan Moore's 1963"   vol="Alan Moore's Glory"   score=0.50  [REVIEW QUEUE]
  query="1963"                vol="1963"                 score=1.00  [AUTO-ASSIGN] ← winner

decision: AUTO-ASSIGN (score=1.00)
          query="1963" → id=5162 "1963" (1993)
```
