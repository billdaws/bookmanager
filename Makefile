.PHONY: setup generate build-css test test-race test-e2e upgrade-htmx generate-diagrams

setup:
	git config core.hooksPath .githooks

generate:
	templ generate ./internal/web/

build-css:
	tailwindcss -i internal/web/static/input.css -o internal/web/static/app.css --minify

test:
	go test ./...

test-race:
	go test -race ./...

test-e2e:
	docker build -t bookmanager-e2e -f Dockerfile.e2e .
	docker run --rm bookmanager-e2e

upgrade-htmx:
	$(eval version := $(shell curl -fsSL https://registry.npmjs.org/htmx.org/latest | jq -r '.version'))
	@echo "Downloading htmx $(version)..."
	curl -fsSL "https://cdn.jsdelivr.net/npm/htmx.org@$(version)/dist/htmx.min.js" \
	  -o static/htmx.min.js
	@echo "htmx $(version) → static/htmx.min.js"

generate-diagrams:
	docker build -t bookmanager-diagrams -f Dockerfile.diagrams .
	docker run --rm -v $(PWD)/docs:/app/docs bookmanager-diagrams
