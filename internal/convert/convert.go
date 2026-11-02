// Package convert handles ebook format conversion.
package convert

import (
	"bytes"
	"fmt"
	"io"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/billdaws/epub"
	"github.com/billdaws/mobi"
)

// MobiToEpub converts the MOBI/AZW file at srcPath and writes an EPUB to dst.
func MobiToEpub(srcPath string, dst io.Writer) error {
	b, err := mobi.Open(srcPath)
	if err != nil {
		return fmt.Errorf("convert: read mobi: %w", err)
	}

	doc := &document{
		metadata: b.Metadata,
		chapters: []chapter{{id: "chapter-001", html: b.HTML()}},
		images:   b.Images(),
	}

	for _, t := range pipeline {
		if err := t(doc); err != nil {
			return fmt.Errorf("convert: transform: %w", err)
		}
	}

	lang := doc.metadata.Language
	if lang == "" {
		lang = "en"
	}

	identifier := fmt.Sprintf("mobi-uid-%s", sanitizeID(doc.metadata.Title))
	items := []epub.ContentItem{
		{
			ID:         "nav",
			Href:       "nav.xhtml",
			MediaType:  "application/xhtml+xml",
			Properties: "nav",
			Content:    buildNav(doc.chapters),
		},
		{
			ID:        "ncx",
			Href:      "toc.ncx",
			MediaType: "application/x-dtbncx+xml",
			Content:   buildNCX(identifier, doc.metadata.Title, doc.chapters),
		},
	}

	var spineIDs []string
	for _, ch := range doc.chapters {
		items = append(items, epub.ContentItem{
			ID:        ch.id,
			Href:      ch.id + ".xhtml",
			MediaType: "application/xhtml+xml",
			Content:   ch.html,
		})
		spineIDs = append(spineIDs, ch.id)
	}

	for _, img := range doc.images {
		ci := epub.ContentItem{
			ID:        fmt.Sprintf("img-%d", img.Index),
			Href:      mobi.ImagePath(img.Index, img.Ext),
			MediaType: img.MediaType,
			Content:   img.Data,
		}
		if doc.coverID != "" && ci.ID == doc.coverID {
			ci.Properties = "cover-image"
		}
		items = append(items, ci)
	}

	book := epub.Book{
		Metadata: epub.Metadata{
			Title:           doc.metadata.Title,
			Authors:         doc.metadata.Authors,
			Language:        lang,
			Identifier:      identifier,
			PublicationDate: doc.metadata.PublicationDate,
		},
		Items:       items,
		Spine:       spineIDs,
		CoverItemID: doc.coverID,
		SpineTocID:  "ncx",
	}

	if err := epub.Write(dst, book); err != nil {
		return fmt.Errorf("convert: write epub: %w", err)
	}
	return nil
}

// IsMobiFormat reports whether filename has a MOBI/AZW extension.
func IsMobiFormat(filename string) bool {
	switch strings.ToLower(filepath.Ext(filename)) {
	case ".mobi", ".azw", ".azw3":
		return true
	}
	return false
}

type document struct {
	metadata mobi.Metadata
	chapters []chapter
	images   []mobi.Image
	coverID  string // manifest ID of the cover image item; empty = no cover
}

type chapter struct {
	id    string
	title string
	html  []byte
}

type transform func(*document) error

var pipeline = []transform{
	splitChapters,
	cleanHTML,
	buildTOC, // must run before sanitizeChapters so titles are available
	sanitizeChapters,
	extractCover,
}

// Package-level regexps compiled once.
var (
	reHTMLHead      = regexp.MustCompile(`(?is)<head[^>]*>(.*?)</head>`)
	reHTMLBody      = regexp.MustCompile(`(?is)<body[^>]*>(.*?)</body>`)
	reGuide         = regexp.MustCompile(`(?is)<guide[^>]*>.*?</guide>`)
	reMBPPagebreak  = regexp.MustCompile(`(?i)<mbp:pagebreak[^>]*/?>`)
	reFileposAttr   = regexp.MustCompile(`(?i)\s+filepos=(?:"[^"]*"|\d+)`)
	reAidAttr       = regexp.MustCompile(`(?i)\s+aid="[^"]*"`)
	reCidAttr       = regexp.MustCompile(`(?i)\s+cid="[^"]*"`)
	reItemidAttr    = regexp.MustCompile(`(?i)\s+itemid="[^"]*"`)
	reFileposAnchor = regexp.MustCompile(`(?i)<a[^>]+name="filepos\d+"[^>]*>\s*</a>`)
	reHeading       = regexp.MustCompile(`(?is)<h[1-4][^>]*>(.*?)</h[1-4]>`)
	reInnerTags     = regexp.MustCompile(`<[^>]+>`)
	reControlChars  = regexp.MustCompile(`[\x00-\x08\x0b\x0c\x0e-\x1f]`)
)

// splitChapters extracts the <head> and <body> from the source HTML, splits
// the body at <mbp:pagebreak/> markers, and wraps each chunk in a complete
// XHTML document. This runs first so every subsequent transform operates on
// valid per-chapter XHTML rather than raw fragments.
func splitChapters(doc *document) error {
	if len(doc.chapters) == 0 {
		return nil
	}
	raw := string(doc.chapters[0].html)

	// Extract and clean the <head> block; use empty string if absent.
	head := ""
	if m := reHTMLHead.FindStringSubmatch(raw); m != nil {
		head = strings.TrimSpace(reGuide.ReplaceAllString(m[1], ""))
	}

	// Extract <body> content; fall back to the full raw HTML if no <body> tag.
	body := raw
	if m := reHTMLBody.FindStringSubmatch(raw); m != nil {
		body = m[1]
	}

	chunks := reMBPPagebreak.Split(body, -1)

	var chapters []chapter
	n := 0
	for _, chunk := range chunks {
		trimmed := strings.TrimSpace(chunk)
		if trimmed == "" {
			continue
		}
		n++
		chapters = append(chapters, chapter{
			id:   fmt.Sprintf("chapter-%03d", n),
			html: wrapHTML(head, trimmed),
		})
	}

	if len(chapters) > 0 {
		doc.chapters = chapters
	}
	return nil
}

// wrapHTML wraps body content in a minimal complete HTML5 document.
func wrapHTML(head, body string) []byte {
	var sb strings.Builder
	sb.WriteString("<!DOCTYPE html>\n")
	sb.WriteString("<html>\n")
	sb.WriteString("<head>")
	if head != "" {
		sb.WriteString(head)
	}
	sb.WriteString("</head>\n")
	sb.WriteString("<body>\n")
	sb.WriteString(body)
	sb.WriteString("\n</body>\n</html>")
	return []byte(sb.String())
}

// cleanHTML strips MOBI-specific markup and invalid characters from each chapter.
func cleanHTML(doc *document) error {
	for i, ch := range doc.chapters {
		h := ch.html
		h = reControlChars.ReplaceAll(h, nil)
		h = reFileposAnchor.ReplaceAll(h, nil)
		h = reFileposAttr.ReplaceAll(h, nil)
		h = reAidAttr.ReplaceAll(h, nil)
		h = reCidAttr.ReplaceAll(h, nil)
		h = reItemidAttr.ReplaceAll(h, nil)
		h = reMBPPagebreak.ReplaceAll(h, nil)
		doc.chapters[i].html = h
	}
	return nil
}

// sanitizeChapters parses each chapter through the HTML5 parser and
// re-serialises as well-formed XHTML, fixing mismatched tags, bare < characters,
// and other XML-invalid constructs inherited from the MOBI HTML.
func sanitizeChapters(doc *document) error {
	for i, ch := range doc.chapters {
		clean, err := sanitizeXHTML(ch.html, ch.title)
		if err != nil {
			return fmt.Errorf("chapter %s: %w", ch.id, err)
		}
		doc.chapters[i].html = clean
	}
	return nil
}

// extractCover identifies the cover image from the MOBI cover index.
func extractCover(doc *document) error {
	if doc.metadata.CoverIndex <= 0 {
		return nil
	}
	for _, img := range doc.images {
		if img.Index == doc.metadata.CoverIndex {
			doc.coverID = fmt.Sprintf("img-%d", img.Index)
			return nil
		}
	}
	return nil
}

// buildTOC scans each chapter for the first <h1> or <h2> heading to use as title.
func buildTOC(doc *document) error {
	for i, ch := range doc.chapters {
		title := ""
		if m := reHeading.FindSubmatch(ch.html); m != nil {
			title = strings.TrimSpace(reInnerTags.ReplaceAllString(string(m[1]), ""))
			title = htmlEscape(title)
		}
		if title == "" {
			title = fmt.Sprintf("Chapter %d", i+1)
		}
		doc.chapters[i].title = title
	}
	return nil
}

func buildNCX(identifier, title string, chapters []chapter) []byte {
	var sb strings.Builder
	sb.WriteString(`<?xml version="1.0" encoding="UTF-8"?>`)
	sb.WriteString("\n<!DOCTYPE ncx PUBLIC \"-//NISO//DTD ncx 2005-1//EN\" \"http://www.daisy.org/z3986/2005/ncx-2005-1.dtd\">")
	sb.WriteString("\n<ncx xmlns=\"http://www.daisy.org/z3986/2005/ncx/\" version=\"2005-1\">")
	sb.WriteString("\n  <head>")
	sb.WriteString(fmt.Sprintf("\n    <meta name=\"dtb:uid\" content=\"%s\"/>", htmlEscape(identifier)))
	sb.WriteString("\n    <meta name=\"dtb:depth\" content=\"1\"/>")
	sb.WriteString("\n    <meta name=\"dtb:totalPageCount\" content=\"0\"/>")
	sb.WriteString("\n    <meta name=\"dtb:maxPageNumber\" content=\"0\"/>")
	sb.WriteString("\n  </head>")
	sb.WriteString(fmt.Sprintf("\n  <docTitle><text>%s</text></docTitle>", htmlEscape(title)))
	sb.WriteString("\n  <navMap>")
	for i, ch := range chapters {
		sb.WriteString(fmt.Sprintf("\n    <navPoint id=\"np-%d\" playOrder=\"%d\">", i+1, i+1))
		sb.WriteString(fmt.Sprintf("\n      <navLabel><text>%s</text></navLabel>", htmlEscape(ch.title)))
		sb.WriteString(fmt.Sprintf("\n      <content src=\"%s.xhtml\"/>", ch.id))
		sb.WriteString("\n    </navPoint>")
	}
	sb.WriteString("\n  </navMap>\n</ncx>")
	return []byte(sb.String())
}

func buildNav(chapters []chapter) []byte {
	var sb strings.Builder
	sb.WriteString(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Table of Contents</title></head>
<body>
  <nav epub:type="toc"><ol>`)
	for _, ch := range chapters {
		sb.WriteString("\n    <li><a href=\"")
		sb.WriteString(ch.id)
		sb.WriteString(".xhtml\">")
		sb.WriteString(ch.title)
		sb.WriteString("</a></li>")
	}
	sb.WriteString("\n  </ol></nav>\n</body>\n</html>")
	return []byte(sb.String())
}

func htmlEscape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, `"`, "&quot;")
	return s
}

func sanitizeID(s string) string {
	var b bytes.Buffer
	for _, r := range s {
		if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r >= '0' && r <= '9') {
			b.WriteRune(r)
		} else {
			b.WriteByte('-')
		}
	}
	return b.String()
}
