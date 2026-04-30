package db

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/google/uuid"
)

// Recipient is a named email recipient stored with an encrypted email address.
type Recipient struct {
	ID        string
	Name      string
	Email     string
	CreatedAt time.Time
}

// SendLogEntry records a book send attempt.
type SendLogEntry struct {
	ID          string
	RecipientID string
	BookID      string
	SentAt      time.Time
	Status      string
	Error       string
}

// SetEncryptionKey configures the AES-256-GCM key used to encrypt and decrypt
// recipient email addresses. key must be a hex-encoded 32-byte value (as
// produced by `openssl rand -hex 32`). Returns an error if the key is invalid.
func (s *Store) SetEncryptionKey(hexKey string) error {
	b, err := hex.DecodeString(hexKey)
	if err != nil {
		return fmt.Errorf("decode encryption key: %w", err)
	}
	if len(b) != 32 {
		return fmt.Errorf("encryption key must be 32 bytes, got %d", len(b))
	}
	s.encKey = b
	return nil
}

func (s *Store) encryptEmail(email string) (string, error) {
	if s.encKey == nil {
		return "", errors.New("encryption key not set")
	}
	block, err := aes.NewCipher(s.encKey)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}
	ciphertext := gcm.Seal(nonce, nonce, []byte(email), nil)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

func (s *Store) decryptEmail(enc string) (string, error) {
	if s.encKey == nil {
		return "", errors.New("encryption key not set")
	}
	data, err := base64.StdEncoding.DecodeString(enc)
	if err != nil {
		return "", fmt.Errorf("base64 decode: %w", err)
	}
	block, err := aes.NewCipher(s.encKey)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	if len(data) < gcm.NonceSize() {
		return "", errors.New("ciphertext too short")
	}
	nonce, ciphertext := data[:gcm.NonceSize()], data[gcm.NonceSize():]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("decrypt: %w", err)
	}
	return string(plaintext), nil
}

// CreateRecipient inserts a new recipient with an encrypted email address.
func (s *Store) CreateRecipient(ctx context.Context, name, email string) (Recipient, error) {
	enc, err := s.encryptEmail(email)
	if err != nil {
		return Recipient{}, fmt.Errorf("encrypt email: %w", err)
	}
	id := uuid.New().String()
	_, err = s.db.ExecContext(ctx,
		"INSERT INTO recipients (id, name, email_enc) VALUES (?, ?, ?)",
		id, name, enc,
	)
	if err != nil {
		return Recipient{}, fmt.Errorf("insert recipient: %w", err)
	}
	return s.GetRecipient(ctx, id)
}

// ListRecipients returns all recipients with decrypted email addresses.
func (s *Store) ListRecipients(ctx context.Context) ([]Recipient, error) {
	rows, err := s.db.QueryContext(ctx,
		"SELECT id, name, email_enc, created_at FROM recipients ORDER BY name",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []Recipient
	for rows.Next() {
		var r Recipient
		var enc string
		var createdAt string
		if err := rows.Scan(&r.ID, &r.Name, &enc, &createdAt); err != nil {
			return nil, err
		}
		r.CreatedAt, _ = time.Parse("2006-01-02T15:04:05Z", createdAt)
		r.Email, err = s.decryptEmail(enc)
		if err != nil {
			return nil, fmt.Errorf("decrypt email for recipient %s: %w", r.ID, err)
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

// GetRecipient returns a single recipient by ID with a decrypted email address.
func (s *Store) GetRecipient(ctx context.Context, id string) (Recipient, error) {
	var r Recipient
	var enc string
	var createdAt string
	err := s.db.QueryRowContext(ctx,
		"SELECT id, name, email_enc, created_at FROM recipients WHERE id = ?", id,
	).Scan(&r.ID, &r.Name, &enc, &createdAt)
	if errors.Is(err, sql.ErrNoRows) {
		return Recipient{}, fmt.Errorf("recipient not found")
	}
	if err != nil {
		return Recipient{}, err
	}
	r.CreatedAt, _ = time.Parse("2006-01-02T15:04:05Z", createdAt)
	r.Email, err = s.decryptEmail(enc)
	if err != nil {
		return Recipient{}, fmt.Errorf("decrypt email: %w", err)
	}
	return r, nil
}

// DeleteRecipient removes a recipient and cascades to their send_log entries.
func (s *Store) DeleteRecipient(ctx context.Context, id string) error {
	_, err := s.db.ExecContext(ctx, "DELETE FROM recipients WHERE id = ?", id)
	return err
}

// LogSend records a book send attempt in send_log.
func (s *Store) LogSend(ctx context.Context, recipientID, bookID, status, errMsg string) error {
	_, err := s.db.ExecContext(ctx,
		"INSERT INTO send_log (id, recipient_id, book_id, status, error) VALUES (?, ?, ?, ?, ?)",
		uuid.New().String(), recipientID, bookID, status, nilIfEmpty(errMsg),
	)
	return err
}
