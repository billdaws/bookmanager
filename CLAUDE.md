# Bookmanager

## UI conventions

- For actions (adding, deleting, submitting), use `<button>` elements, not `<a>` links.

## Code comments

- Comments are for human readers, not agents. Don't write things like "Use X instead of Y" or "Prefer Z" — put that guidance in CLAUDE.md instead.

## Storage types and DTOs

- Types in `internal/storage` are storage types, not domain or API types. Don't add fields to them to satisfy template or handler needs — introduce a DTO layer when an API is added.

## Imports

- Import `internal/storage/db` with the alias `storage` (not `db` or `storagedb`).

## Event topics

- Always use the topic constructor functions (`topicLibraryBooksChanged`, etc.) rather than raw strings when publishing or subscribing.
