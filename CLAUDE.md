# Bookmanager

## UI conventions

- For actions (adding, deleting, submitting), use `<button>` elements, not `<a>` links.

## Code comments

- Comments are for human readers, not agents. Don't write things like "Use X instead of Y" or "Prefer Z" — put that guidance in CLAUDE.md instead.

## Event topics

- Always use the topic constructor functions (`topicLibraryBooksChanged`, etc.) rather than raw strings when publishing or subscribing.
