package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/billdaws/bookmanager/internal/email"
	"github.com/billdaws/bookmanager/internal/events"
	storage "github.com/billdaws/bookmanager/internal/storage/db"
	"github.com/billdaws/bookmanager/internal/web"
	"github.com/codingconcepts/env"
)

type config struct {
	Port             string        `env:"BOOKMANAGER_PORT" default:"47832"`
	Host             string        `env:"BOOKMANAGER_HOST" default:"localhost"`
	TLSEnabled       bool          `env:"BOOKMANAGER_TLS_ENABLED" default:"false"`
	DBPath           string        `env:"BOOKMANAGER_DB" default:"bookmanager.db"`
	SyncInterval     time.Duration `env:"BOOKMANAGER_SYNC_INTERVAL" default:"10s"`
	MetadataInterval time.Duration `env:"BOOKMANAGER_METADATA_INTERVAL" default:"24h"`
	ResendAPIKey     string        `env:"BOOKMANAGER_RESEND_API_KEY"`
	FromEmail        string        `env:"BOOKMANAGER_FROM_EMAIL"`
	EncryptionKey    string        `env:"BOOKMANAGER_ENCRYPTION_KEY"`
}

func main() {
	var cfg config
	if err := env.Set(&cfg); err != nil {
		log.Fatalf("config: %v", err)
	}

	database, err := storage.OpenDB(cfg.DBPath)
	if err != nil {
		log.Fatalf("database: %v", err)
	}
	defer database.Close()

	store := storage.NewStore(database)
	if cfg.EncryptionKey != "" {
		if err := store.SetEncryptionKey(cfg.EncryptionKey); err != nil {
			log.Fatalf("encryption key: %v", err)
		}
	}

	bridge := events.NewEventBridge(func(t events.Topic, name string, err error) {
		log.Printf("event error [%s/%s]: %v", t, name, err)
	})

	poller := events.NewLibraryPoller(store, bridge, cfg.SyncInterval, func(lib *storage.Library, err error) {
		log.Printf("poller error [%s]: %v", lib.Name, err)
	})

	ctx := context.Background()
	poller.Register(ctx)

	metadataPoller := events.NewMetadataPoller(store, bridge, cfg.MetadataInterval)
	go metadataPoller.Run(ctx)

	libs, err := store.ListLibraries(ctx)
	if err != nil {
		log.Fatalf("list libraries: %v", err)
	}
	for _, lib := range libs {
		poller.Start(ctx, &lib)
	}

	emailSvc := email.NewResendSender(cfg.ResendAPIKey, cfg.FromEmail)

	mux := http.NewServeMux()
	if err := web.Register(mux, store, bridge, metadataPoller, emailSvc); err != nil {
		log.Fatalf("web: %v", err)
	}

	scheme := "http"
	if cfg.TLSEnabled {
		scheme = "https"
	}
	log.Printf("Listening on %s://%s:%s", scheme, cfg.Host, cfg.Port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), mux))
}
