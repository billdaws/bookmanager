package convert_test

import (
	"archive/zip"
	"encoding/xml"
	"fmt"
	"io"
	"regexp"
	"strings"
	"testing"
)

// checkEPUBReadable asserts that an EPUB at epubPath is structurally sound
// and contains readable text content. It checks:
//
//  1. The ZIP is openable and the mimetype entry is first, uncompressed,
//     and contains "application/epub+zip".
//  2. META-INF/container.xml is present and valid XML pointing to an OPF.
//  3. The OPF is present and valid XML.
//  4. Every file referenced in the OPF manifest exists inside the ZIP.
//  5. Every spine item contains non-empty visible text.
func checkEPUBReadable(t *testing.T, epubPath string) {
	t.Helper()

	zr, err := zip.OpenReader(epubPath)
	if err != nil {
		t.Fatalf("readability: cannot open ZIP: %v", err)
	}
	defer zr.Close()

	files := make(map[string]*zip.File, len(zr.File))
	for _, f := range zr.File {
		files[f.Name] = f
	}

	// 1. mimetype must be first entry, uncompressed, correct value.
	if len(zr.File) == 0 {
		t.Fatal("readability: ZIP is empty")
	}
	first := zr.File[0]
	if first.Name != "mimetype" {
		t.Errorf("readability: first ZIP entry is %q, want \"mimetype\"", first.Name)
	}
	if first.Method != zip.Store {
		t.Errorf("readability: mimetype entry is compressed (method %d), must be STORE", first.Method)
	}
	mt := must(readZipFile(first))
	if string(mt) != "application/epub+zip" {
		t.Errorf("readability: mimetype = %q, want \"application/epub+zip\"", mt)
	}

	// 2. container.xml must be valid XML and point to an OPF.
	containerFile, ok := files["META-INF/container.xml"]
	if !ok {
		t.Fatal("readability: META-INF/container.xml missing")
	}
	opfPath := parseContainerXML(t, must(readZipFile(containerFile)))
	if opfPath == "" {
		t.Fatal("readability: no OPF path found in container.xml")
	}

	// 3. OPF must be present and valid XML.
	opfFile, ok := files[opfPath]
	if !ok {
		t.Fatalf("readability: OPF %q missing from ZIP", opfPath)
	}
	opfData := must(readZipFile(opfFile))
	if err := xmlValid(opfData); err != nil {
		t.Fatalf("readability: OPF is not valid XML: %v", err)
	}

	// 4 & 5. All manifest items must exist; all spine items must have text.
	opfDir := zipDir(opfPath)
	manifest, manifestMediaType, spine := parseOPFManifestAndSpine(t, opfData)

	for id, href := range manifest {
		fullPath := opfDir + href
		f, ok := files[fullPath]
		if !ok {
			t.Errorf("readability: manifest item %q (href %q) missing from ZIP", id, fullPath)
			continue
		}

		mediaType := manifestMediaType[id]

		// EPUB 3 §3.1.1: .xhtml extension implies application/xhtml+xml; the
		// file must be valid XML so XML-based readers can parse it.
		if strings.HasSuffix(href, ".xhtml") && mediaType != "application/xhtml+xml" {
			t.Errorf("readability: %q uses .xhtml extension but has media-type %q (must be application/xhtml+xml)", fullPath, mediaType)
		}
		if mediaType == "application/xhtml+xml" {
			data := must(readZipFile(f))
			if err := xmlValid(data); err != nil {
				t.Errorf("readability: %q is application/xhtml+xml but not valid XML: %v", fullPath, err)
			}
		}
	}

	for _, idref := range spine {
		href, ok := manifest[idref]
		if !ok {
			continue // already caught by spine idref validation elsewhere
		}
		fullPath := opfDir + href
		f, ok := files[fullPath]
		if !ok {
			continue // already reported above
		}
		data := must(readZipFile(f))
		text := extractText(data)
		if strings.TrimSpace(text) == "" {
			t.Errorf("readability: spine item %q (%q) contains no visible text", idref, fullPath)
		}
	}
}

// parseContainerXML extracts the OPF root-file path from container.xml.
func parseContainerXML(t *testing.T, data []byte) string {
	t.Helper()
	type rootfile struct {
		FullPath  string `xml:"full-path,attr"`
		MediaType string `xml:"media-type,attr"`
	}
	type container struct {
		Rootfiles []rootfile `xml:"rootfiles>rootfile"`
	}
	var c container
	if err := xml.Unmarshal(data, &c); err != nil {
		t.Fatalf("readability: container.xml invalid XML: %v", err)
	}
	for _, rf := range c.Rootfiles {
		if rf.MediaType == "application/oebps-package+xml" {
			return rf.FullPath
		}
	}
	if len(c.Rootfiles) > 0 {
		return c.Rootfiles[0].FullPath
	}
	return ""
}

// parseOPFManifestAndSpine returns manifest id→href, manifest id→mediaType, and spine idrefs.
func parseOPFManifestAndSpine(t *testing.T, data []byte) (manifest map[string]string, mediaTypes map[string]string, spine []string) {
	t.Helper()
	type item struct {
		ID        string `xml:"id,attr"`
		Href      string `xml:"href,attr"`
		MediaType string `xml:"media-type,attr"`
	}
	type itemref struct {
		IDRef string `xml:"idref,attr"`
	}
	type pkg struct {
		Manifest []item    `xml:"manifest>item"`
		Spine    []itemref `xml:"spine>itemref"`
	}
	var p pkg
	if err := xml.Unmarshal(data, &p); err != nil {
		t.Fatalf("readability: OPF XML parse failed: %v", err)
	}
	manifest = make(map[string]string, len(p.Manifest))
	mediaTypes = make(map[string]string, len(p.Manifest))
	for _, it := range p.Manifest {
		manifest[it.ID] = it.Href
		mediaTypes[it.ID] = it.MediaType
	}
	for _, ir := range p.Spine {
		spine = append(spine, ir.IDRef)
	}
	return manifest, mediaTypes, spine
}

var reTag = regexp.MustCompile(`<[^>]+>`)

// extractText strips HTML/XML tags and returns the remaining text.
func extractText(html []byte) string {
	return reTag.ReplaceAllString(string(html), "")
}

func xmlValid(data []byte) error {
	dec := xml.NewDecoder(strings.NewReader(string(data)))
	for {
		if _, err := dec.Token(); err == io.EOF {
			return nil
		} else if err != nil {
			return err
		}
	}
}

func zipDir(path string) string {
	if i := strings.LastIndex(path, "/"); i >= 0 {
		return path[:i+1]
	}
	return ""
}

func readZipFile(f *zip.File) ([]byte, error) {
	rc, err := f.Open()
	if err != nil {
		return nil, fmt.Errorf("open %q: %w", f.Name, err)
	}
	defer rc.Close()
	return io.ReadAll(rc)
}

func must(b []byte, err error) []byte {
	if err != nil {
		panic(err)
	}
	return b
}
