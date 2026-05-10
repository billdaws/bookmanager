// Package pdfinfo extracts document metadata from PDF files by reading only
// the Info dictionary, without loading the full object graph.
package pdfinfo

import (
	"bytes"
	"compress/zlib"
	"encoding/binary"
	"fmt"
	"io"
	"strconv"
	"strings"

	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/model"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/types"
)

// Info holds document metadata extracted from a PDF's Info dictionary.
type Info struct {
	Title        string
	Author       string
	Subject      string
	Keywords     string
	Creator      string
	Producer     string
	CreationDate string
	ModDate      string
}

// ReadInfo reads PDF metadata from rs without dereferencing the full object
// graph. It seeks to the cross-reference table, resolves only the /Info
// dictionary object, and decodes its string fields. Returns a zero-value Info
// on any error.
func ReadInfo(rs io.ReadSeeker) (Info, error) {
	size, err := rs.Seek(0, io.SeekEnd)
	if err != nil {
		return Info{}, err
	}

	startxref, err := findStartXRef(rs, size)
	if err != nil {
		return Info{}, err
	}

	offsets, trailerDict, err := buildOffsetTable(rs, startxref)
	if err != nil {
		return Info{}, err
	}

	infoRef, ok := trailerDict["Info"]
	if !ok {
		return Info{}, nil
	}
	ir, ok := infoRef.(types.IndirectRef)
	if !ok {
		return Info{}, nil
	}

	objOffset, ok := offsets[int(ir.ObjectNumber)]
	if !ok {
		return Info{}, nil
	}

	dict, err := readDictAt(rs, objOffset)
	if err != nil {
		return Info{}, err
	}

	return infoFromDict(dict), nil
}

// findStartXRef scans the last 1 KB of the file for the startxref keyword and
// returns the byte offset it points to.
func findStartXRef(rs io.ReadSeeker, size int64) (int64, error) {
	const scanSize = 1024
	start := size - scanSize
	if start < 0 {
		start = 0
	}
	if _, err := rs.Seek(start, io.SeekStart); err != nil {
		return 0, err
	}
	buf := make([]byte, size-start)
	if _, err := io.ReadFull(rs, buf); err != nil {
		return 0, err
	}

	idx := bytes.LastIndex(buf, []byte("startxref"))
	if idx < 0 {
		return 0, fmt.Errorf("pdfinfo: startxref not found")
	}

	rest := strings.TrimSpace(string(buf[idx+len("startxref"):]))
	// Take just the first token (the offset), ignore any trailing content.
	tok := strings.Fields(rest)
	if len(tok) == 0 {
		return 0, fmt.Errorf("pdfinfo: malformed startxref")
	}
	offset, err := strconv.ParseInt(tok[0], 10, 64)
	if err != nil {
		return 0, fmt.Errorf("pdfinfo: malformed startxref: %w", err)
	}
	return offset, nil
}

// buildOffsetTable parses XRef sections starting at startxref, following
// /Prev chains, and returns a map from object number to file offset along
// with the merged trailer dictionary.
func buildOffsetTable(rs io.ReadSeeker, startxref int64) (map[int]int64, types.Dict, error) {
	offsets := make(map[int]int64)
	trailer := types.Dict{}
	visited := make(map[int64]bool)

	offset := startxref
	for offset >= 0 && !visited[offset] {
		visited[offset] = true

		if _, err := rs.Seek(offset, io.SeekStart); err != nil {
			return nil, nil, err
		}

		// Peek at what's here: "xref" keyword → traditional table,
		// otherwise assume an XRef stream object.
		peek := make([]byte, 4)
		if _, err := io.ReadFull(rs, peek); err != nil {
			return nil, nil, err
		}

		var err error
		var prev int64
		if string(peek) == "xref" {
			prev, err = parseTraditionalXRef(rs, offset, offsets, trailer)
		} else {
			prev, err = parseXRefStream(rs, offset, offsets, trailer)
		}
		if err != nil {
			return nil, nil, err
		}

		offset = prev
	}

	return offsets, trailer, nil
}

// parseTraditionalXRef parses a traditional xref table + trailer dict at
// xrefOffset. It populates offsets for any objects not already present
// (later sections take priority over earlier ones in a chain), merges new
// trailer keys, and returns the /Prev offset (-1 if none).
func parseTraditionalXRef(rs io.ReadSeeker, _ int64, offsets map[int]int64, trailer types.Dict) (int64, error) {
	// Seek past "xref" (already consumed the 4-byte peek).
	// rs is positioned right after the 4-byte peek; we need to skip the
	// rest of the "xref" line.
	all, err := readUntilTrailerKeyword(rs)
	if err != nil {
		return -1, err
	}

	lines := splitLines(all)
	i := 0
	for i < len(lines) {
		line := strings.TrimSpace(lines[i])
		if line == "" {
			i++
			continue
		}
		if line == "trailer" {
			break
		}

		// Subsection header: "startObj count"
		fields := strings.Fields(line)
		if len(fields) != 2 {
			i++
			continue
		}
		startObj, err1 := strconv.Atoi(fields[0])
		count, err2 := strconv.Atoi(fields[1])
		if err1 != nil || err2 != nil {
			i++
			continue
		}
		i++

		for j := 0; j < count && i < len(lines); j++ {
			entry := strings.Fields(strings.TrimSpace(lines[i]))
			i++
			if len(entry) < 3 {
				continue
			}
			byteOffset, err := strconv.ParseInt(entry[0], 10, 64)
			if err != nil {
				continue
			}
			useFlag := entry[2]
			objNr := startObj + j
			if useFlag == "n" {
				if _, exists := offsets[objNr]; !exists {
					offsets[objNr] = byteOffset
				}
			}
		}
	}

	// Parse trailer dict from remaining lines.
	rest := strings.Join(lines[i:], "\n")
	rest = strings.TrimPrefix(rest, "trailer")
	rest = strings.TrimSpace(rest)

	d, err := parseDictString(rest)
	if err != nil {
		return -1, err
	}
	mergeTrailer(trailer, d)

	return prevOffset(d), nil
}

// parseXRefStream parses a PDF 1.5+ cross-reference stream object at offset.
// rs is positioned 4 bytes in (past the initial peek). We re-seek to offset
// and read the whole object.
func parseXRefStream(rs io.ReadSeeker, offset int64, offsets map[int]int64, trailer types.Dict) (int64, error) {
	if _, err := rs.Seek(offset, io.SeekStart); err != nil {
		return -1, err
	}

	// Read enough to get the stream dict and locate "stream\r\n" or "stream\n".
	// XRef streams are typically compact; read up to 64 KB.
	const maxHeader = 65536
	buf := make([]byte, maxHeader)
	n, err := rs.Read(buf)
	if err != nil && err != io.EOF {
		return -1, err
	}
	buf = buf[:n]

	// Skip the object header "N G obj".
	streamIdx := bytes.Index(buf, []byte("stream"))
	if streamIdx < 0 {
		return -1, fmt.Errorf("pdfinfo: xref stream: 'stream' keyword not found")
	}

	headerStr := string(buf[:streamIdx])
	dictStart := strings.Index(headerStr, "<<")
	if dictStart < 0 {
		return -1, fmt.Errorf("pdfinfo: xref stream: dict not found")
	}

	d, err := parseDictString(headerStr[dictStart:])
	if err != nil {
		return -1, err
	}
	mergeTrailer(trailer, d)

	// Locate the stream body start (after "stream\n" or "stream\r\n").
	bodyStart := streamIdx + len("stream")
	if bodyStart < len(buf) && buf[bodyStart] == '\r' {
		bodyStart++
	}
	if bodyStart < len(buf) && buf[bodyStart] == '\n' {
		bodyStart++
	}

	// Determine stream length from /Length entry.
	length, err := intFromDict(d, "Length")
	if err != nil {
		return -1, fmt.Errorf("pdfinfo: xref stream: missing /Length")
	}

	streamData := buf[bodyStart:]
	if int64(len(streamData)) < length {
		// Need more data.
		extra := make([]byte, length-int64(len(streamData)))
		if _, err := io.ReadFull(rs, extra); err != nil {
			return -1, err
		}
		streamData = append(streamData, extra...)
	}
	streamData = streamData[:length]

	// Decompress if /Filter is FlateDecode (the only filter used for XRef streams).
	filter, _ := d["Filter"]
	if filter != nil {
		fname := ""
		switch v := filter.(type) {
		case types.Name:
			fname = string(v)
		case types.Array:
			if len(v) > 0 {
				if n, ok := v[0].(types.Name); ok {
					fname = string(n)
				}
			}
		}
		if fname == "FlateDecode" {
			r, err := zlib.NewReader(bytes.NewReader(streamData))
			if err != nil {
				return -1, fmt.Errorf("pdfinfo: xref stream zlib: %w", err)
			}
			streamData, err = io.ReadAll(r)
			r.Close()
			if err != nil {
				return -1, fmt.Errorf("pdfinfo: xref stream zlib read: %w", err)
			}
		}
	}

	// Parse the W (widths) array: [w1 w2 w3] bytes per field.
	wArr, err := intArrayFromDict(d, "W")
	if err != nil || len(wArr) != 3 {
		return -1, fmt.Errorf("pdfinfo: xref stream: invalid /W")
	}
	w1, w2, w3 := int(wArr[0]), int(wArr[1]), int(wArr[2])
	entrySize := w1 + w2 + w3
	if entrySize == 0 {
		return -1, fmt.Errorf("pdfinfo: xref stream: zero entry size")
	}

	// Parse /Index array (defaults to [0 Size]).
	index, _ := intArrayFromDict(d, "Index")
	if len(index) == 0 {
		sz, _ := intFromDict(d, "Size")
		index = []int64{0, sz}
	}

	pos := 0
	for k := 0; k+1 < len(index); k += 2 {
		startObj := int(index[k])
		count := int(index[k+1])
		for j := 0; j < count; j++ {
			if pos+entrySize > len(streamData) {
				break
			}
			entry := streamData[pos : pos+entrySize]
			pos += entrySize

			fieldType := readUintBytes(entry[0:w1])
			if w1 == 0 {
				fieldType = 1 // default
			}
			field2 := readUintBytes(entry[w1 : w1+w2])
			// field3 (generation) not needed.

			objNr := startObj + j
			if fieldType == 1 { // in-use, field2 = offset
				if _, exists := offsets[objNr]; !exists {
					offsets[objNr] = int64(field2)
				}
			}
			// type 2 = compressed in object stream — we'd need to read the
			// object stream to get it. For the Info dict this is uncommon;
			// skip for now.
		}
	}

	return prevOffset(d), nil
}

// readDictAt seeks to offset, skips the object header (N G obj), reads bytes
// until the matching ">>" close, and parses the result as a PDF Dict.
func readDictAt(rs io.ReadSeeker, offset int64) (types.Dict, error) {
	if _, err := rs.Seek(offset, io.SeekStart); err != nil {
		return nil, err
	}

	const maxObj = 16384
	buf := make([]byte, maxObj)
	n, err := rs.Read(buf)
	if err != nil && err != io.EOF {
		return nil, err
	}
	s := string(buf[:n])

	// Strip object header "N G obj".
	objIdx := strings.Index(s, "obj")
	if objIdx < 0 {
		return nil, fmt.Errorf("pdfinfo: object header not found at offset %d", offset)
	}
	s = strings.TrimSpace(s[objIdx+3:])

	return parseDictString(s)
}

// parseDictString wraps pdfcpu's model.ParseObject to parse a dict from a
// raw string starting with "<<".
func parseDictString(s string) (types.Dict, error) {
	s = strings.TrimSpace(s)
	obj, err := model.ParseObject(&s)
	if err != nil {
		return nil, err
	}
	d, ok := obj.(types.Dict)
	if !ok {
		return nil, fmt.Errorf("pdfinfo: expected dict, got %T", obj)
	}
	return d, nil
}

// infoFromDict extracts string metadata fields from an Info dict.
func infoFromDict(d types.Dict) Info {
	return Info{
		Title:        stringField(d, "Title"),
		Author:       stringField(d, "Author"),
		Subject:      stringField(d, "Subject"),
		Keywords:     stringField(d, "Keywords"),
		Creator:      stringField(d, "Creator"),
		Producer:     stringField(d, "Producer"),
		CreationDate: stringField(d, "CreationDate"),
		ModDate:      stringField(d, "ModDate"),
	}
}

func stringField(d types.Dict, key string) string {
	v, ok := d[key]
	if !ok {
		return ""
	}
	s, err := types.StringOrHexLiteral(v)
	if err != nil || s == nil {
		return ""
	}
	return *s
}

// mergeTrailer copies keys from src into dst only if not already present
// (the most recent XRef section wins in a /Prev chain).
func mergeTrailer(dst, src types.Dict) {
	for k, v := range src {
		if _, exists := dst[k]; !exists {
			dst[k] = v
		}
	}
}

// prevOffset returns the /Prev offset from a trailer dict, or -1.
func prevOffset(d types.Dict) int64 {
	v, ok := d["Prev"]
	if !ok {
		return -1
	}
	switch n := v.(type) {
	case types.Integer:
		return int64(n)
	case types.Float:
		return int64(n)
	}
	return -1
}

// intFromDict extracts an integer value from a Dict by key.
func intFromDict(d types.Dict, key string) (int64, error) {
	v, ok := d[key]
	if !ok {
		return 0, fmt.Errorf("pdfinfo: key %q not found", key)
	}
	switch n := v.(type) {
	case types.Integer:
		return int64(n), nil
	case types.Float:
		return int64(n), nil
	}
	return 0, fmt.Errorf("pdfinfo: key %q is not a number", key)
}

// intArrayFromDict extracts a []int64 from a Dict array entry.
func intArrayFromDict(d types.Dict, key string) ([]int64, error) {
	v, ok := d[key]
	if !ok {
		return nil, fmt.Errorf("pdfinfo: key %q not found", key)
	}
	arr, ok := v.(types.Array)
	if !ok {
		return nil, fmt.Errorf("pdfinfo: key %q is not an array", key)
	}
	out := make([]int64, len(arr))
	for i, el := range arr {
		switch n := el.(type) {
		case types.Integer:
			out[i] = int64(n)
		case types.Float:
			out[i] = int64(n)
		default:
			return nil, fmt.Errorf("pdfinfo: array element %d is not a number", i)
		}
	}
	return out, nil
}

// readUintBytes interprets a big-endian byte slice as an unsigned integer.
func readUintBytes(b []byte) uint64 {
	switch len(b) {
	case 0:
		return 0
	case 1:
		return uint64(b[0])
	case 2:
		return uint64(binary.BigEndian.Uint16(b))
	case 4:
		return uint64(binary.BigEndian.Uint32(b))
	case 8:
		return binary.BigEndian.Uint64(b)
	default:
		var v uint64
		for _, c := range b {
			v = (v << 8) | uint64(c)
		}
		return v
	}
}

// readUntilTrailerKeyword reads lines from rs until it encounters the
// "trailer" keyword or EOF, returning everything read as a single string.
// This is used after the "xref" keyword has already been consumed.
func readUntilTrailerKeyword(rs io.ReadSeeker) (string, error) {
	const maxXRef = 512 * 1024 // 512 KB ought to cover any XRef section
	buf := make([]byte, maxXRef)
	n, err := rs.Read(buf)
	if err != nil && err != io.EOF {
		return "", err
	}
	return string(buf[:n]), nil
}

// splitLines splits s on "\r\n", "\r", or "\n".
func splitLines(s string) []string {
	s = strings.ReplaceAll(s, "\r\n", "\n")
	s = strings.ReplaceAll(s, "\r", "\n")
	return strings.Split(s, "\n")
}
