# Bookmanager

> **Work in progress.** Bookmanager is under active development and not yet ready for production use.

A self-hosted web application for managing a local digital book library. Point it at directories containing books, and it will scan, track, and display them — extracting metadata automatically and keeping the library up to date as files change.

## Features

- **Auto-scanning** — watches directories for EPUB, PDF, MOBI, AZW, AZW3, CBZ, and CBR files
- **Metadata extraction** — pulls title, author, and publication date from EPUB and PDF files
- **Manual overrides** — edit any book's metadata directly in the UI
- **Search and filter** — query DSL for filtering books by title, author, and more
- **Real-time updates** — library view refreshes automatically via Server-Sent Events (SSE)
- **Multiple libraries** — manage separate libraries, each pointing to its own directory

## Installation

### Build from source

Requires Go 1.24+.

```bash
git clone https://github.com/billdaws/bookmanager
cd bookmanager
go build -o bookmanager ./cmd/bookmanager
```

### NixOS

A NixOS module is included in the Nix flake:

```nix
{
  inputs.bookmanager.url = "github:billdaws/bookmanager";

  outputs = { nixpkgs, bookmanager, ... }: {
    nixosConfigurations.myhost = nixpkgs.lib.nixosSystem {
      modules = [
        bookmanager.nixosModules.default
        {
          services.bookmanager = {
            enable = true;
            port = 47832;
          };
        }
      ];
    };
  };
}
```

## Usage

```bash
./bookmanager
```

Then open `http://localhost:47832` in your browser. From there, create a library by entering the path to a directory containing book files.

## Configuration

All configuration is via environment variables:

| Variable                        | Default          | Description                                       |
| ------------------------------- | ---------------- | ------------------------------------------------- |
| `BOOKMANAGER_HOST`              | `localhost`      | Host to bind to                                   |
| `BOOKMANAGER_PORT`              | `47832`          | Port to listen on                                 |
| `BOOKMANAGER_DB`                | `bookmanager.db` | Path to the SQLite database file                  |
| `BOOKMANAGER_TLS_ENABLED`       | `false`          | Enable TLS                                        |
| `BOOKMANAGER_SYNC_INTERVAL`     | `10s`            | How often to poll library directories for changes |
| `BOOKMANAGER_METADATA_INTERVAL` | `24h`            | How often to backfill missing metadata            |

## Development

### Prerequisites

The dev environment is managed with [Nix](https://nixos.org/). With Nix installed:

```bash
nix develop
```

This provides Go, Templ, Tailwind CSS, Air (live reload), Goose, and all other tools.

### First-time setup

```bash
make setup       # configure git hooks
make generate    # generate templ files
make build-css   # build Tailwind CSS
```

### Running locally

```bash
air              # starts the server with live reload
```

### Making changes

- **Templates** — edit `.templ` files in `internal/web/`, then run `make generate` (or `templ generate ./internal/web/`). Commit both the `.templ` source and the generated `*_templ.go` files.
- **CSS** — edit `internal/web/static/input.css`, then run `make build-css`. For hot-reload, run `tailwindcss -i internal/web/static/input.css -o internal/web/static/app.css --watch` alongside `air`.
- **Database schema** — add a new SQL migration file under `internal/storage/db/migrations/`.

## Testing

```bash
# Unit tests
make test

# Unit tests with race detector
make test-race

# End-to-end tests (requires Docker)
make test-e2e

# Benchmarks
make bench
```

## Tech stack

- **Go** — backend, pure Go (no CGo)
- **SQLite** (`modernc.org/sqlite`) — storage
- **Templ** — type-safe HTML templates
- **HTMX** — dynamic interactions
- **Tailwind CSS v4** + **TemplUI** — styling and components
- **Server-Sent Events** — real-time library updates
- **Nix** — reproducible dev environment and NixOS deployment
