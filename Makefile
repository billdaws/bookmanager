.PHONY: setup generate build-css generate-testdata test test-race test-e2e bench upgrade-htmx generate-diagrams run run-dev edit-secrets reset-metadata-sync cv-lookup

DB ?= bookmanager.db

cv-lookup:
	@test -n "$(FILE)" || (echo "usage: make cv-lookup FILE=path/to/comic.cbz"; exit 1)
	go build -o /tmp/bookmanager-cvlookup ./cmd/cvlookup
	sops exec-env secrets.sops.yaml "/tmp/bookmanager-cvlookup '$(subst ','\'',$(FILE))'"

reset-metadata-sync:
	sqlite3 $(DB) "UPDATE metadata_sync SET columns_attempted = '';"

edit-secrets:
	sops secrets.sops.yaml

run:
	go build -o /tmp/bookmanager ./cmd/bookmanager && sops exec-env secrets.sops.yaml /tmp/bookmanager

run-dev:
	sops exec-env secrets.sops.yaml air

setup:
	git config core.hooksPath .githooks

generate:
	templ generate ./internal/web/

build-css:
	TEMPLUI_PATH="$$(GOWORK=off go list -m -f '{{.Dir}}' github.com/templui/templui)" && \
	printf '@source "%s/components/**/*.templ";\n' "$$TEMPLUI_PATH" \
	  > internal/web/static/sources.generated.css
	tailwindcss -i internal/web/static/input.css -o internal/web/static/app.css --minify

# Re-run and re-commit output if the fixture set changes.
generate-testdata:
	go run ./internal/e2e/testdata/generate/

test:
	go test -json ./... | gotestfmt

test-race:
	go test -race -json ./... | gotestfmt

bench:
	go test -bench=. -benchmem -count=3 ./internal/storage/db/ ./internal/web/

bench-ci: ## GOMAXPROCS=2 matches the GitHub Actions ubuntu-latest runner (2 vCPUs)
	GOMAXPROCS=2 go test -bench=. -benchmem -run='^$' -count=1 ./internal/storage/db/ ./internal/web/

test-e2e:
	docker build -t bookmanager-e2e -f Dockerfile.e2e .
	docker run --rm bookmanager-e2e | gotestfmt

upgrade-htmx:
	$(eval version := $(shell curl -fsSL https://registry.npmjs.org/htmx.org/latest | jq -r '.version'))
	@echo "Downloading htmx $(version)..."
	curl -fsSL "https://cdn.jsdelivr.net/npm/htmx.org@$(version)/dist/htmx.min.js" \
	  -o static/htmx.min.js
	@echo "htmx $(version) → static/htmx.min.js"

generate-diagrams:
	docker build -t bookmanager-diagrams -f Dockerfile.diagrams .
	docker run --rm -v $(PWD)/docs:/app/docs bookmanager-diagrams
