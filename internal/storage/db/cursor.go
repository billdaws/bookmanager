package db

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
)

// BookCursor is an opaque, base64-encoded JSON cursor encoding (filename, id).
// Encodes the last-seen row so the next query can continue from there.
type BookCursor struct{ Filename, ID string }

// Encode returns the base64-encoded JSON representation of c.
func (c BookCursor) Encode() string {
	b, _ := json.Marshal(c)
	return base64.RawURLEncoding.EncodeToString(b)
}

// DecodeCursor decodes a cursor string previously produced by Encode.
// Returns a zero-value BookCursor for an empty string.
func DecodeCursor(s string) (BookCursor, error) {
	if s == "" {
		return BookCursor{}, nil
	}
	b, err := base64.RawURLEncoding.DecodeString(s)
	if err != nil {
		return BookCursor{}, fmt.Errorf("decode cursor: %w", err)
	}
	var c BookCursor
	if err := json.Unmarshal(b, &c); err != nil {
		return BookCursor{}, fmt.Errorf("unmarshal cursor: %w", err)
	}
	return c, nil
}
