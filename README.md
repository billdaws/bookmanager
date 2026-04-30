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
- **Email delivery** — send books as email attachments to saved recipients, including Kindle addresses

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
| `BOOKMANAGER_RESEND_API_KEY`    | —                | API key for email delivery (optional)             |
| `BOOKMANAGER_FROM_EMAIL`        | —                | Sender address for outgoing emails                |
| `BOOKMANAGER_ENCRYPTION_KEY`    | —                | Hex-encoded 32-byte key for encrypting stored recipient addresses (generate with `openssl rand -hex 32`) |

## Email delivery

Bookmanager can send books directly to email addresses — useful for delivering to a Kindle or sharing with others.

### Setting up

1. Obtain an API key from your email provider and a verified sender address.
2. Set `BOOKMANAGER_RESEND_API_KEY` and `BOOKMANAGER_FROM_EMAIL` in your environment.
3. Generate an encryption key and set `BOOKMANAGER_ENCRYPTION_KEY`:
   ```bash
   openssl rand -hex 32
   ```

For local development, the included SOPS/age workflow keeps these secrets out of the repository — see [Managing secrets](#managing-secrets) below.

### Adding recipients

Navigate to **Recipients** in the nav bar to add named email addresses. Kindle addresses work the same as any other recipient — just add your `@kindle.com` address.

> **Kindle:** Amazon only accepts attachments from approved senders. Before sending to a Kindle address, add your `BOOKMANAGER_FROM_EMAIL` address to your [approved personal document email list](https://www.amazon.com/hz/mycd/preferences/myx#/home/settings/) in Amazon account settings.

### Sending a book

On any library page, click the send icon (→) on a book row. Select one or more recipients and click **Send**. The book file is attached and delivered immediately.

### Privacy

Recipient email addresses are encrypted at rest using AES-256-GCM with your `BOOKMANAGER_ENCRYPTION_KEY`. The key never leaves your server, and addresses are never stored in plaintext in the database.

## Managing secrets

For managing the API key, encryption key, and other sensitive values, Bookmanager supports [SOPS](https://github.com/getsops/sops) with [age](https://age-encryption.org/) encryption. This keeps secrets out of your shell history and environment files.

### First-time setup

```bash
# Generate an age key pair
age-keygen

# Copy the example config and fill in your public key
cp .sops.yaml.example .sops.yaml
# edit .sops.yaml — replace the placeholder with your age public key

# Create and edit your secrets file
make edit-secrets
# fill in values from secrets.sops.yaml.example
```

### Running with secrets loaded

```bash
make run        # build and run with secrets injected
make run-dev    # run with live reload (air) and secrets injected
```

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
