package main

import (
	"embed"
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/codingconcepts/env"
)

//go:embed templates
var templateFS embed.FS

type config struct {
	Port       string `env:"BOOKMANAGER_PORT" default:"47832"`
	Host       string `env:"BOOKMANAGER_HOST" default:"localhost"`
	TLSEnabled bool   `env:"BOOKMANAGER_TLS_ENABLED" default:"false"`
}

func main() {
	var cfg config
	if err := env.Set(&cfg); err != nil {
		log.Fatalf("config: %v", err)
	}

	tmpl := template.Must(template.ParseFS(templateFS, "templates/index.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if err := tmpl.Execute(w, nil); err != nil {
			http.Error(w, "template error", http.StatusInternalServerError)
		}
	})

	scheme := "http"
	if cfg.TLSEnabled {
		scheme = "https"
	}
	log.Printf("Listening on %s://%s:%s", scheme, cfg.Host, cfg.Port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), nil))
}
