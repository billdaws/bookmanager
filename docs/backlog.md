# Backlog

- pre-signed urls with S3
  - Only really needed when we're sending multiple, or large books, such that we exceed 
    the 25 MB attachment limit that some email providers like Gmail have.

- EPUB charset sanitization
  - See [epub-charset-fix.md](./epub-charset-fix.md)
  - We should add a concept of "actions" or "mutations" that allows users to apply
    sanitizations like this as they want, but probably not by default
    
- github pages site with docs etc.

- show file extension for EPUBs, PDFs, and MOBIs since books are often downloaded in packs that include multiple formats

## Series management

- No way to delete a series from the UI — inconvenient when a series is empty after all books are removed
- When removing a book from a series, the user is redirected to the library page instead of back to the series
- No bulk edit for books in a series (e.g. un-assign or re-assign multiple books at once)

## Bugs

