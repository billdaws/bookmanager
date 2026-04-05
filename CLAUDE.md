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

## E2E tests

- E2E tests live in `internal/e2e/` and are gated behind the `e2e` build tag — they are excluded from `go test ./...`.
- Run them locally with `nix run .#test-e2e` (builds and runs `Dockerfile.e2e`, which installs Chromium). In CI they run directly against the pre-installed `google-chrome` on the `ubuntu-latest` runner.
- Each test calls `t.Parallel()` — the shared `rod.Browser` is safe for concurrent use across pages.
- Each test gets its own isolated server via `newServer(t)` (fresh `httptest.Server` + in-memory SQLite DB) and its own browser tab via `newPage(t)`.
- Use `page.MustWaitNavigation()` (subscribe before the click, call the returned func after) for actions that trigger full-page navigation. Do not use `page.MustWaitLoad()` after a click — it resolves immediately if `document.readyState` is already `"complete"` and will return before the navigation finishes.
- Use `page.MustElementR(selector, pattern)` to assert page content — it retries until the element appears, which is the correct way to wait for rendered content.

### Testdata fixtures

- Real book files live in `internal/e2e/testdata/raw/` and are committed to VCS.
- Tests must not use that directory directly. Call `symlinkTestdata(t)` to get a fresh `t.TempDir()` populated with symlinks to the raw fixtures — this gives each test an isolated directory without copying large files.
