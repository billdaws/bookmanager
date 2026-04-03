package main

import (
	"embed"
	"fmt"
	"html/template"
	"io/fs"
	"log"
	"net/http"

	"github.com/codingconcepts/env"
)

//go:embed templates
var templateFS embed.FS

//go:embed static
var staticFS embed.FS

type config struct {
	Port       string `env:"BOOKMANAGER_PORT" default:"47832"`
	Host       string `env:"BOOKMANAGER_HOST" default:"localhost"`
	TLSEnabled bool   `env:"BOOKMANAGER_TLS_ENABLED" default:"false"`
	DBPath     string `env:"BOOKMANAGER_DB" default:"bookmanager.db"`
}

func main() {
	var cfg config
	if err := env.Set(&cfg); err != nil {
		log.Fatalf("config: %v", err)
	}

	db, err := openDB(cfg.DBPath)
	if err != nil {
		log.Fatalf("database: %v", err)
	}
	defer db.Close()

	tmpl := template.Must(template.ParseFS(templateFS, "templates/*.html"))

	staticSub, err := fs.Sub(staticFS, "static")
	if err != nil {
		log.Fatalf("static fs: %v", err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /", handleIndex(db, tmpl))
	mux.HandleFunc("GET /library/new", handleLibraryNew(tmpl))
	mux.HandleFunc("POST /library", handleCreateLibrary(db, tmpl))
	mux.HandleFunc("GET /library/{id}", handleLibrary(db, tmpl))
	mux.HandleFunc("GET /library/{id}/delete", handleLibraryDeleteConfirm(db, tmpl))
	mux.HandleFunc("POST /library/{id}/delete", handleLibraryDelete(db, tmpl))
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServerFS(staticSub)))

	scheme := "http"
	if cfg.TLSEnabled {
		scheme = "https"
	}
	log.Printf("Listening on %s://%s:%s", scheme, cfg.Host, cfg.Port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), mux))
}
