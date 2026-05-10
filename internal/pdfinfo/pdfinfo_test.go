package pdfinfo

import (
	"bytes"
	"compress/zlib"
	"encoding/binary"
	"fmt"
	"strings"
	"testing"
)

// pdfBuilder assembles a minimal valid PDF in memory, tracking byte offsets
// so the xref table is accurate.
type pdfBuilder struct {
	buf     bytes.Buffer
	offsets []int64 // offsets[i] = byte offset of object i (0 = free head)
}

func (p *pdfBuilder) writef(format string, args ...any) {
	fmt.Fprintf(&p.buf, format, args...)
}

func (p *pdfBuilder) beginObj(n int) {
	for len(p.offsets) <= n {
		p.offsets = append(p.offsets, 0)
	}
	p.offsets[n] = int64(p.buf.Len())
	fmt.Fprintf(&p.buf, "%d 0 obj\n", n)
}

func (p *pdfBuilder) endObj() { p.buf.WriteString("endobj\n\n") }

func (p *pdfBuilder) writeXRefAndTrailer(infoObjNum int) {
	xrefOffset := int64(p.buf.Len())
	count := len(p.offsets)
	fmt.Fprintf(&p.buf, "xref\n0 %d\n", count)
	for i, off := range p.offsets {
		if i == 0 {
			p.buf.WriteString("0000000000 65535 f \r\n")
		} else {
			fmt.Fprintf(&p.buf, "%010d 00000 n \r\n", off)
		}
	}
	fmt.Fprintf(&p.buf, "trailer\n<< /Size %d /Root 1 0 R /Info %d 0 R >>\nstartxref\n%d\n%%%%EOF\n",
		count, infoObjNum, xrefOffset)
}

func buildPDF(title, author, subject, keywords, creator, producer, creationDate, modDate string) []byte {
	p := &pdfBuilder{}
	p.offsets = make([]int64, 1) // slot 0 = free head

	p.buf.WriteString("%PDF-1.4\n")

	// Object 1: Catalog
	p.beginObj(1)
	p.writef("<< /Type /Catalog /Pages 2 0 R >>\n")
	p.endObj()

	// Object 2: Pages
	p.beginObj(2)
	p.writef("<< /Type /Pages /Kids [] /Count 0 >>\n")
	p.endObj()

	// Object 3: Info dict
	p.beginObj(3)
	p.buf.WriteString("<<")
	writeInfoEntry := func(key, val string) {
		if val != "" {
			fmt.Fprintf(&p.buf, " /%s (%s)", key, val)
		}
	}
	writeInfoEntry("Title", title)
	writeInfoEntry("Author", author)
	writeInfoEntry("Subject", subject)
	writeInfoEntry("Keywords", keywords)
	writeInfoEntry("Creator", creator)
	writeInfoEntry("Producer", producer)
	writeInfoEntry("CreationDate", creationDate)
	writeInfoEntry("ModDate", modDate)
	p.buf.WriteString(" >>\n")
	p.endObj()

	p.writeXRefAndTrailer(3)
	return p.buf.Bytes()
}

func TestReadInfo_TraditionalXRef(t *testing.T) {
	pdf := buildPDF(
		"My Great Book",
		"Jane Doe",
		"A subject",
		"keyword1, keyword2",
		"Test Creator",
		"Test Producer",
		"D:20230615120000Z",
		"D:20230616130000Z",
	)

	info, err := ReadInfo(bytes.NewReader(pdf))
	if err != nil {
		t.Fatalf("ReadInfo: %v", err)
	}

	check := func(field, got, want string) {
		t.Helper()
		if got != want {
			t.Errorf("%s: got %q, want %q", field, got, want)
		}
	}

	check("Title", info.Title, "My Great Book")
	check("Author", info.Author, "Jane Doe")
	check("Subject", info.Subject, "A subject")
	check("Keywords", info.Keywords, "keyword1, keyword2")
	check("Creator", info.Creator, "Test Creator")
	check("Producer", info.Producer, "Test Producer")
	check("CreationDate", info.CreationDate, "D:20230615120000Z")
	check("ModDate", info.ModDate, "D:20230616130000Z")
}

func TestReadInfo_NoInfoDict(t *testing.T) {
	// PDF with no /Info entry in the trailer.
	p := &pdfBuilder{}
	p.offsets = make([]int64, 1)
	p.buf.WriteString("%PDF-1.4\n")
	p.beginObj(1)
	p.writef("<< /Type /Catalog /Pages 2 0 R >>\n")
	p.endObj()
	p.beginObj(2)
	p.writef("<< /Type /Pages /Kids [] /Count 0 >>\n")
	p.endObj()

	xrefOffset := int64(p.buf.Len())
	fmt.Fprintf(&p.buf, "xref\n0 3\n")
	p.buf.WriteString("0000000000 65535 f \r\n")
	for _, off := range p.offsets[1:] {
		fmt.Fprintf(&p.buf, "%010d 00000 n \r\n", off)
	}
	fmt.Fprintf(&p.buf, "trailer\n<< /Size 3 /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n", xrefOffset)

	info, err := ReadInfo(bytes.NewReader(p.buf.Bytes()))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if info.Title != "" || info.Author != "" {
		t.Errorf("expected empty info, got %+v", info)
	}
}

func TestReadInfo_XRefStream(t *testing.T) {
	// Build a PDF 1.5 with an XRef stream instead of a traditional xref table.
	// Objects: 1=Catalog, 2=Pages, 3=Info, 4=XRef stream itself.
	var body bytes.Buffer
	body.WriteString("%PDF-1.5\n")

	offsets := map[int]int64{}

	offsets[1] = int64(body.Len())
	body.WriteString("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n\n")

	offsets[2] = int64(body.Len())
	body.WriteString("2 0 obj\n<< /Type /Pages /Kids [] /Count 0 >>\nendobj\n\n")

	offsets[3] = int64(body.Len())
	body.WriteString("3 0 obj\n<< /Title (XRef Stream Title) /Author (Stream Author) >>\nendobj\n\n")

	// Build the XRef stream data.
	// Entry format W=[1 4 2]: type(1) offset(4) generation(2)
	// Objects 0..4, index [0 5]
	//   0: free     → type=0
	//   1..3: in-use → type=1, offset=offsets[n], gen=0
	//   4: the xref stream object itself — offset will be set below
	const (
		w1 = 1
		w2 = 4
		w3 = 2
	)
	_ = w1 + w2 + w3 // entrySize, kept for documentation

	// We'll fill object 4's offset after we know where it starts.
	// Placeholder; we'll patch it after computing position.
	xrefObjOffset := int64(body.Len())
	offsets[4] = xrefObjOffset

	var streamBuf bytes.Buffer
	writeEntry := func(typ uint8, offset uint32, gen uint16) {
		streamBuf.WriteByte(typ)
		var b [4]byte
		binary.BigEndian.PutUint32(b[:], offset)
		streamBuf.Write(b[:])
		var g [2]byte
		binary.BigEndian.PutUint16(g[:], gen)
		streamBuf.Write(g[:])
	}

	writeEntry(0, 0, 65535) // obj 0: free
	writeEntry(1, uint32(offsets[1]), 0)
	writeEntry(1, uint32(offsets[2]), 0)
	writeEntry(1, uint32(offsets[3]), 0)
	writeEntry(1, uint32(xrefObjOffset), 0) // obj 4: self-referential

	// Compress.
	var compressed bytes.Buffer
	zw := zlib.NewWriter(&compressed)
	zw.Write(streamBuf.Bytes())
	zw.Close()

	streamData := compressed.Bytes()

	// Assemble the XRef stream object.
	dictStr := fmt.Sprintf(
		"<< /Type /XRef /Size 5 /W [%d %d %d] /Index [0 5] /Root 1 0 R /Info 3 0 R /Filter /FlateDecode /Length %d >>",
		w1, w2, w3, len(streamData),
	)

	fmt.Fprintf(&body, "4 0 obj\n%s\nstream\n", dictStr)
	body.Write(streamData)
	body.WriteString("\nendstream\nendobj\n\n")

	fmt.Fprintf(&body, "startxref\n%d\n%%%%EOF\n", xrefObjOffset)

	info, err := ReadInfo(bytes.NewReader(body.Bytes()))
	if err != nil {
		t.Fatalf("ReadInfo (xref stream): %v", err)
	}
	if info.Title != "XRef Stream Title" {
		t.Errorf("Title: got %q, want %q", info.Title, "XRef Stream Title")
	}
	if info.Author != "Stream Author" {
		t.Errorf("Author: got %q, want %q", info.Author, "Stream Author")
	}
}

func TestReadInfo_PrevChain(t *testing.T) {
	// Two xref sections: first update adds the Info dict (obj 3),
	// original has Catalog+Pages. The /Prev chain should be followed.
	//
	// Original section: objects 1, 2.
	// Incremental update: object 3 (Info) added, new trailer with /Prev.

	var body bytes.Buffer
	body.WriteString("%PDF-1.4\n")

	offsets := map[int]int64{}

	offsets[1] = int64(body.Len())
	body.WriteString("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n\n")

	offsets[2] = int64(body.Len())
	body.WriteString("2 0 obj\n<< /Type /Pages /Kids [] /Count 0 >>\nendobj\n\n")

	// Original xref + trailer (no /Info).
	origXRefOffset := int64(body.Len())
	fmt.Fprintf(&body, "xref\n0 3\n")
	body.WriteString("0000000000 65535 f \r\n")
	fmt.Fprintf(&body, "%010d 00000 n \r\n", offsets[1])
	fmt.Fprintf(&body, "%010d 00000 n \r\n", offsets[2])
	fmt.Fprintf(&body, "trailer\n<< /Size 3 /Root 1 0 R >>\nstartxref\n0\n")

	// Incremental update: obj 3 = Info dict.
	offsets[3] = int64(body.Len())
	body.WriteString("3 0 obj\n<< /Title (Prev Chain Title) /Author (Prev Author) >>\nendobj\n\n")

	// Second xref section, references /Prev.
	newXRefOffset := int64(body.Len())
	fmt.Fprintf(&body, "xref\n3 1\n")
	fmt.Fprintf(&body, "%010d 00000 n \r\n", offsets[3])
	fmt.Fprintf(&body, "trailer\n<< /Size 4 /Root 1 0 R /Info 3 0 R /Prev %d >>\nstartxref\n%d\n%%%%EOF\n",
		origXRefOffset, newXRefOffset)

	info, err := ReadInfo(bytes.NewReader(body.Bytes()))
	if err != nil {
		t.Fatalf("ReadInfo (/Prev chain): %v", err)
	}
	if info.Title != "Prev Chain Title" {
		t.Errorf("Title: got %q, want %q", info.Title, "Prev Chain Title")
	}
	if info.Author != "Prev Author" {
		t.Errorf("Author: got %q, want %q", info.Author, "Prev Author")
	}
}

func TestReadInfo_EmptyStrings(t *testing.T) {
	// Corrupt PDF — ReadInfo should return empty Info, not panic.
	_, err := ReadInfo(strings.NewReader("not a pdf"))
	// Error is acceptable; panic is not.
	_ = err
}
