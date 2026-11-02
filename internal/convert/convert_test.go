package convert_test

import (
	"bytes"
	"encoding/binary"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/billdaws/bookmanager/internal/convert"
	"github.com/billdaws/epub"
)

// exthExtra is an additional EXTH record to include in buildTestMOBI.
type exthExtra struct {
	typ  uint32
	data []byte
}

// buildTestMOBI constructs a minimal valid MOBI file in memory with no
// compression and a single text record containing html.
// extras allows injecting additional EXTH records beyond the author record.
func buildTestMOBI(title, author, html string, extras ...exthExtra) []byte {
	// EXTH block.
	var exthRecords bytes.Buffer
	recordCount := uint32(0)
	writeExthRecord := func(typ uint32, data []byte) {
		recordCount++
		binary.Write(&exthRecords, binary.BigEndian, typ)
		binary.Write(&exthRecords, binary.BigEndian, uint32(8+len(data)))
		exthRecords.Write(data)
	}
	if author != "" {
		writeExthRecord(100, []byte(author))
	}
	for _, e := range extras {
		writeExthRecord(e.typ, e.data)
	}
	// Pad the records block to 4-byte boundary once, after all records.
	for exthRecords.Len()%4 != 0 {
		exthRecords.WriteByte(0)
	}
	var exthBlock bytes.Buffer
	exthBlock.WriteString("EXTH")
	binary.Write(&exthBlock, binary.BigEndian, uint32(12+exthRecords.Len()))
	binary.Write(&exthBlock, binary.BigEndian, recordCount)
	exthBlock.Write(exthRecords.Bytes())

	fullName := []byte(title)

	// MOBI header (232 bytes).
	const mobiHeaderLen = uint32(232)
	var mobiHdr bytes.Buffer
	mobiHdr.WriteString("MOBI")
	binary.Write(&mobiHdr, binary.BigEndian, mobiHeaderLen)
	binary.Write(&mobiHdr, binary.BigEndian, uint32(2))          // type: book
	binary.Write(&mobiHdr, binary.BigEndian, uint32(65001))      // UTF-8
	binary.Write(&mobiHdr, binary.BigEndian, uint32(12345))      // uid
	binary.Write(&mobiHdr, binary.BigEndian, uint32(6))          // version
	mobiHdr.Write(make([]byte, 40))                              // unused index fields
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0xFFFFFFFF)) // firstNonBookIndex
	fullNameOffset := uint32(16) + mobiHeaderLen + uint32(exthBlock.Len())
	binary.Write(&mobiHdr, binary.BigEndian, fullNameOffset)
	binary.Write(&mobiHdr, binary.BigEndian, uint32(len(fullName)))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // locale
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // inputLanguage
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // outputLanguage
	binary.Write(&mobiHdr, binary.BigEndian, uint32(6))          // minVersion
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0xFFFFFFFF)) // firstImageRecord
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // huffman offset
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // huffman count
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // huffman table offset
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))          // huffman table length
	exthFlagVal := uint32(0)
	if recordCount > 0 {
		exthFlagVal = 0x40
	}
	binary.Write(&mobiHdr, binary.BigEndian, exthFlagVal)
	mobiHdr.Write(make([]byte, int(mobiHeaderLen)-mobiHdr.Len()))

	// Record 0.
	var rec0 bytes.Buffer
	binary.Write(&rec0, binary.BigEndian, uint16(1))         // compression: none
	binary.Write(&rec0, binary.BigEndian, uint16(0))         // unused
	binary.Write(&rec0, binary.BigEndian, uint32(len(html))) // text length
	binary.Write(&rec0, binary.BigEndian, uint16(1))         // text record count
	binary.Write(&rec0, binary.BigEndian, uint16(4096))      // record size
	binary.Write(&rec0, binary.BigEndian, uint16(0))         // encryption: none
	binary.Write(&rec0, binary.BigEndian, uint16(0))         // unused
	rec0.Write(mobiHdr.Bytes())
	rec0.Write(exthBlock.Bytes())
	rec0.Write(fullName)

	// PalmDB container (2 records: rec0 + rec1 HTML).
	const numRecords = uint16(2)
	palmHeaderSize := 78 + int(numRecords)*8
	rec0Offset := uint32(palmHeaderSize)
	rec1Offset := rec0Offset + uint32(rec0.Len())

	var file bytes.Buffer
	name := make([]byte, 32)
	copy(name, title)
	file.Write(name)
	file.Write(make([]byte, 4))  // attributes + version
	file.Write(make([]byte, 12)) // creation/modification/backup times
	file.Write(make([]byte, 12)) // modNum + appInfo + sortInfo
	file.WriteString("BOOK")
	file.WriteString("MOBI")
	file.Write(make([]byte, 8)) // uid seed + next record list
	binary.Write(&file, binary.BigEndian, numRecords)
	binary.Write(&file, binary.BigEndian, rec0Offset)
	binary.Write(&file, binary.BigEndian, uint32(0))
	binary.Write(&file, binary.BigEndian, rec1Offset)
	binary.Write(&file, binary.BigEndian, uint32(1))
	file.Write(rec0.Bytes())
	file.WriteString(html)

	return file.Bytes()
}

func convertToEPUBBytes(t *testing.T, srcPath string) []byte {
	t.Helper()
	var buf bytes.Buffer
	if err := convert.MobiToEpub(srcPath, &buf); err != nil {
		t.Fatalf("MobiToEpub: %v", err)
	}
	return buf.Bytes()
}

func writeTempFile(t *testing.T, data []byte, pattern string) string {
	t.Helper()
	f, err := os.CreateTemp(t.TempDir(), pattern)
	if err != nil {
		t.Fatalf("create temp file: %v", err)
	}
	if _, err := f.Write(data); err != nil {
		f.Close()
		t.Fatalf("write temp file: %v", err)
	}
	f.Close()
	return f.Name()
}

// buildTestMOBIWithImages is like buildTestMOBI but appends image records after
// the text record and sets firstImageRecord accordingly. Each image is raw bytes
// (must start with a recognised magic to be detected by the mobi package).
func buildTestMOBIWithImages(title, author, html string, images [][]byte, extras ...exthExtra) []byte {
	// Build EXTH records first so we know the full EXTH block size.
	var exthRecords bytes.Buffer
	recordCount := uint32(0)
	writeExthRecord := func(typ uint32, data []byte) {
		recordCount++
		binary.Write(&exthRecords, binary.BigEndian, typ)
		binary.Write(&exthRecords, binary.BigEndian, uint32(8+len(data)))
		exthRecords.Write(data)
	}
	if author != "" {
		writeExthRecord(100, []byte(author))
	}
	for _, e := range extras {
		writeExthRecord(e.typ, e.data)
	}
	// Pad the records block to a 4-byte boundary (applied once, after all records).
	for exthRecords.Len()%4 != 0 {
		exthRecords.WriteByte(0)
	}
	var exthBlock bytes.Buffer
	exthBlock.WriteString("EXTH")
	binary.Write(&exthBlock, binary.BigEndian, uint32(12+exthRecords.Len()))
	binary.Write(&exthBlock, binary.BigEndian, recordCount)
	exthBlock.Write(exthRecords.Bytes())

	fullName := []byte(title)
	const mobiHeaderLen = uint32(232)

	// firstImageRecord = 2 (record 0 = header, record 1 = text, record 2+ = images)
	firstImageRecord := uint32(0xFFFFFFFF)
	if len(images) > 0 {
		firstImageRecord = 2
	}

	var mobiHdr bytes.Buffer
	mobiHdr.WriteString("MOBI")
	binary.Write(&mobiHdr, binary.BigEndian, mobiHeaderLen)
	binary.Write(&mobiHdr, binary.BigEndian, uint32(2))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(65001))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(12345))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(6))
	mobiHdr.Write(make([]byte, 40))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0xFFFFFFFF))
	fullNameOffset := uint32(16) + mobiHeaderLen + uint32(exthBlock.Len())
	binary.Write(&mobiHdr, binary.BigEndian, fullNameOffset)
	binary.Write(&mobiHdr, binary.BigEndian, uint32(len(fullName)))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(6))
	binary.Write(&mobiHdr, binary.BigEndian, firstImageRecord)
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	binary.Write(&mobiHdr, binary.BigEndian, uint32(0))
	exthFlagVal := uint32(0)
	if recordCount > 0 {
		exthFlagVal = 0x40
	}
	binary.Write(&mobiHdr, binary.BigEndian, exthFlagVal)
	mobiHdr.Write(make([]byte, int(mobiHeaderLen)-mobiHdr.Len()))

	var rec0 bytes.Buffer
	binary.Write(&rec0, binary.BigEndian, uint16(1))
	binary.Write(&rec0, binary.BigEndian, uint16(0))
	binary.Write(&rec0, binary.BigEndian, uint32(len(html)))
	binary.Write(&rec0, binary.BigEndian, uint16(1))
	binary.Write(&rec0, binary.BigEndian, uint16(4096))
	binary.Write(&rec0, binary.BigEndian, uint16(0))
	binary.Write(&rec0, binary.BigEndian, uint16(0))
	rec0.Write(mobiHdr.Bytes())
	rec0.Write(exthBlock.Bytes())
	rec0.Write(fullName)

	numRecords := uint16(2 + len(images))
	palmHeaderSize := 78 + int(numRecords)*8
	rec0Offset := uint32(palmHeaderSize)
	rec1Offset := rec0Offset + uint32(rec0.Len())
	imgOffsets := make([]uint32, len(images))
	cur := rec1Offset + uint32(len(html))
	for i, img := range images {
		imgOffsets[i] = cur
		cur += uint32(len(img))
	}

	var file bytes.Buffer
	name := make([]byte, 32)
	copy(name, title)
	file.Write(name)
	file.Write(make([]byte, 4))
	file.Write(make([]byte, 12))
	file.Write(make([]byte, 12))
	file.WriteString("BOOK")
	file.WriteString("MOBI")
	file.Write(make([]byte, 8))
	binary.Write(&file, binary.BigEndian, numRecords)
	binary.Write(&file, binary.BigEndian, rec0Offset)
	binary.Write(&file, binary.BigEndian, uint32(0))
	binary.Write(&file, binary.BigEndian, rec1Offset)
	binary.Write(&file, binary.BigEndian, uint32(1))
	for i, off := range imgOffsets {
		binary.Write(&file, binary.BigEndian, off)
		binary.Write(&file, binary.BigEndian, uint32(i+2))
	}
	file.Write(rec0.Bytes())
	file.WriteString(html)
	for _, img := range images {
		file.Write(img)
	}
	return file.Bytes()
}

func TestMobiToEpub_Valid(t *testing.T) {
	mobiData := buildTestMOBI("Test Book", "Alice Author", "<html><body><p>Hello, world.</p></body></html>")
	mobiPath := writeTempFile(t, mobiData, "test-*.mobi")

	epubData := convertToEPUBBytes(t, mobiPath)
	epubPath := writeTempFile(t, epubData, "test-*.epub")

	pkg, err := epub.OpenPackage(epubPath)
	if err != nil {
		t.Fatalf("OpenPackage: %v", err)
	}

	if vs := epub.Validate(pkg); len(vs) > 0 {
		for _, v := range vs {
			t.Errorf("epub violation %s: %s", v.Code, v.Message)
		}
	}

	if pkg.Metadata.Title != "Test Book" {
		t.Errorf("Title = %q, want %q", pkg.Metadata.Title, "Test Book")
	}
	if len(pkg.Metadata.Authors) == 0 || pkg.Metadata.Authors[0] != "Alice Author" {
		t.Errorf("Authors = %v, want [Alice Author]", pkg.Metadata.Authors)
	}
	if len(pkg.Spine) == 0 {
		t.Error("Spine is empty")
	}
}

func TestMobiToEpub_SplitChapters(t *testing.T) {
	html := "<html><body><h1>Chapter 1</h1><p>One.</p><mbp:pagebreak/><h1>Chapter 2</h1><p>Two.</p><mbp:pagebreak/><h1>Chapter 3</h1><p>Three.</p></body></html>"
	mobiData := buildTestMOBI("Split Book", "", html)
	mobiPath := writeTempFile(t, mobiData, "test-*.mobi")

	epubData := convertToEPUBBytes(t, mobiPath)
	epubPath := writeTempFile(t, epubData, "test-*.epub")

	pkg, err := epub.OpenPackage(epubPath)
	if err != nil {
		t.Fatalf("OpenPackage: %v", err)
	}
	if len(pkg.Spine) != 3 {
		t.Errorf("Spine len = %d, want 3", len(pkg.Spine))
	}
}

func TestMobiToEpub_CleanHTML(t *testing.T) {
	html := `<html><body><p aid="A1" cid="C1"><a href="#ch1" filepos="00042">link</a> text</p><mbp:pagebreak/></body></html>`
	mobiData := buildTestMOBI("Clean Book", "", html)
	mobiPath := writeTempFile(t, mobiData, "test-*.mobi")

	epubData := convertToEPUBBytes(t, mobiPath)
	epubBytes := string(epubData)

	for _, forbidden := range []string{`aid="`, `cid="`, `filepos="`, `<mbp:pagebreak`} {
		if strings.Contains(epubBytes, forbidden) {
			t.Errorf("EPUB still contains MOBI artifact %q", forbidden)
		}
	}
}

func TestMobiToEpub_Metadata(t *testing.T) {
	mobiData := buildTestMOBI("Meta Book", "Author", "<html><body><p>text</p></body></html>",
		exthExtra{typ: 524, data: []byte("fr")},
		exthExtra{typ: 101, data: []byte("Acme Publishing")},
		exthExtra{typ: 106, data: []byte("2001-04-15")},
	)
	mobiPath := writeTempFile(t, mobiData, "test-*.mobi")

	epubData := convertToEPUBBytes(t, mobiPath)
	epubPath := writeTempFile(t, epubData, "test-*.epub")

	pkg, err := epub.OpenPackage(epubPath)
	if err != nil {
		t.Fatalf("OpenPackage: %v", err)
	}
	if pkg.Metadata.Language != "fr" {
		t.Errorf("Language = %q, want %q", pkg.Metadata.Language, "fr")
	}
	if pkg.Metadata.PublicationDate != "2001-04-15" {
		t.Errorf("PublicationDate = %q, want %q", pkg.Metadata.PublicationDate, "2001-04-15")
	}
}

func TestMobiToEpub_Cover(t *testing.T) {
	// Minimal JPEG magic bytes used as the cover image record.
	jpegMagic := []byte{0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 'J', 'F', 'I', 'F', 0x00}
	// EXTH 201 value = 2 (absolute PalmDB record index of the image).
	coverIndexBytes := make([]byte, 4)
	binary.BigEndian.PutUint32(coverIndexBytes, 2)
	mobiData := buildTestMOBIWithImages(
		"Cover Book", "", "<html><body><p>text</p></body></html>",
		[][]byte{jpegMagic},
		exthExtra{typ: 201, data: coverIndexBytes},
	)
	mobiPath := writeTempFile(t, mobiData, "test-*.mobi")

	epubData := convertToEPUBBytes(t, mobiPath)
	epubPath := writeTempFile(t, epubData, "test-*.epub")

	pkg, err := epub.OpenPackage(epubPath)
	if err != nil {
		t.Fatalf("OpenPackage: %v", err)
	}
	if pkg.Cover == nil {
		t.Fatal("Cover is nil, want a cover item")
	}
}

// TestMobiToEpub_RealFiles validates conversion of any .mobi/.azw/.azw3 files
// placed in testdata/ (gitignored). Skips if the directory is empty.
func TestMobiToEpub_RealFiles(t *testing.T) {
	var paths []string
	for _, pat := range []string{"../../testdata/*.mobi", "../../testdata/*.azw", "../../testdata/*.azw3"} {
		matches, _ := filepath.Glob(pat)
		paths = append(paths, matches...)
	}
	if len(paths) == 0 {
		t.Skip("no .mobi/.azw/.azw3 files in testdata/ — add one to run this test")
	}

	for _, path := range paths {
		t.Run(filepath.Base(path), func(t *testing.T) {
			epubData := convertToEPUBBytes(t, path)

			stem := strings.TrimSuffix(path, filepath.Ext(path))
			epubPath := stem + ".epub"
			if err := os.WriteFile(epubPath, epubData, 0o644); err != nil {
				t.Fatalf("write epub: %v", err)
			}
			t.Logf("epub written to: %s", epubPath)

			checkEPUBReadable(t, epubPath)

			pkg, err := epub.OpenPackage(epubPath)
			if err != nil {
				t.Fatalf("OpenPackage: %v", err)
			}

			if vs := epub.Validate(pkg); len(vs) > 0 {
				for _, v := range vs {
					t.Errorf("epub violation %s: %s", v.Code, v.Message)
				}
			}

			t.Logf("title:          %s", pkg.Metadata.Title)
			t.Logf("authors:        %v", pkg.Metadata.Authors)
			t.Logf("spine items:    %d", len(pkg.Spine))
			t.Logf("manifest items: %d", len(pkg.Manifest))
		})
	}
}
