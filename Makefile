.PHONY: setup generate build-css test test-race test-e2e bench upgrade-htmx generate-diagrams

setup:
	git config core.hooksPath .githooks

generate:
	templ generate ./internal/web/

build-css:
	TEMPLUI_PATH="$$(GOWORK=off go list -m -f '{{.Dir}}' github.com/templui/templui)" && \
	printf '@source "%s/components/**/*.templ";\n' "$$TEMPLUI_PATH" \
	  > internal/web/static/sources.generated.css
	tailwindcss -i internal/web/static/input.css -o internal/web/static/app.css --minify

test:
	go test ./...

test-race:
	go test -race ./...

bench:
	go test -bench=. -benchmem -count=3 ./internal/storage/db/ ./internal/web/

bench-ci: ## GOMAXPROCS=2 matches the GitHub Actions ubuntu-latest runner (2 vCPUs)
	GOMAXPROCS=2 go test -bench=. -benchmem -run='^$' -count=1 ./internal/storage/db/ ./internal/web/

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
