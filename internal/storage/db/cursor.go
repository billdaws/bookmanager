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

// ReadableCursor is an opaque, base64-encoded JSON cursor for the unified
// library items listing (series + standalone books). It encodes the sort_key,
// kind ("series" or "book"), and id of the last-returned item.
type ReadableCursor struct{ SortKey, Kind, ID string }

// Encode returns the base64-encoded JSON representation of c.
func (c ReadableCursor) Encode() string {
	b, _ := json.Marshal(c)
	return base64.RawURLEncoding.EncodeToString(b)
}

// DecodeReadableCursor decodes a cursor string previously produced by ReadableCursor.Encode.
// Returns a zero-value ReadableCursor for an empty string.
func DecodeReadableCursor(s string) (ReadableCursor, error) {
	if s == "" {
		return ReadableCursor{}, nil
	}
	b, err := base64.RawURLEncoding.DecodeString(s)
	if err != nil {
		return ReadableCursor{}, fmt.Errorf("decode readable cursor: %w", err)
	}
	var c ReadableCursor
	if err := json.Unmarshal(b, &c); err != nil {
		return ReadableCursor{}, fmt.Errorf("unmarshal readable cursor: %w", err)
	}
	return c, nil
}

// SeriesCursor is an opaque, base64-encoded JSON cursor encoding (name, id).
type SeriesCursor struct{ Name, ID string }

// Encode returns the base64-encoded JSON representation of c.
func (c SeriesCursor) Encode() string {
	b, _ := json.Marshal(c)
	return base64.RawURLEncoding.EncodeToString(b)
}

// DecodeSeriesCursor decodes a cursor string previously produced by SeriesCursor.Encode.
// Returns a zero-value SeriesCursor for an empty string.
func DecodeSeriesCursor(s string) (SeriesCursor, error) {
	if s == "" {
		return SeriesCursor{}, nil
	}
	b, err := base64.RawURLEncoding.DecodeString(s)
	if err != nil {
		return SeriesCursor{}, fmt.Errorf("decode series cursor: %w", err)
	}
	var c SeriesCursor
	if err := json.Unmarshal(b, &c); err != nil {
		return SeriesCursor{}, fmt.Errorf("unmarshal series cursor: %w", err)
	}
	return c, nil
}
