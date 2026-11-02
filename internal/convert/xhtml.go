package convert

import (
	"bytes"
	"fmt"
	"unicode"

	"golang.org/x/net/html"
	"golang.org/x/net/html/atom"
)

// sanitizeXHTML parses src as HTML5 and re-serialises it as well-formed XHTML.
// The HTML5 parser corrects mismatched tags, unclosed elements, and other
// structural problems that would make the content invalid XML.
// No DOCTYPE is emitted — XHTML files in EPUB rely on the XML declaration
// and xmlns attribute; a <!DOCTYPE html> in XML mode confuses some readers.
func sanitizeXHTML(src []byte, title string) ([]byte, error) {
	doc, err := html.Parse(bytes.NewReader(src))
	if err != nil {
		return nil, fmt.Errorf("html parse: %w", err)
	}
	injectTitle(doc, title)
	var buf bytes.Buffer
	buf.WriteString("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
	renderXHTML(&buf, doc)
	return buf.Bytes(), nil
}

// renderXHTML walks an html.Node tree and writes valid XHTML to buf.
func renderXHTML(buf *bytes.Buffer, n *html.Node) {
	switch n.Type {
	case html.DocumentNode:
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			renderXHTML(buf, c)
		}

	case html.DoctypeNode:
		// already written before calling renderXHTML

	case html.TextNode:
		writeEscapedText(buf, n.Data)

	case html.CommentNode:
		// drop comments — they can contain -- which is invalid in XML

	case html.ElementNode:
		tag := n.Data
		buf.WriteByte('<')
		buf.WriteString(tag)

		if tag == "html" {
			buf.WriteString(` xmlns="http://www.w3.org/1999/xhtml"`)
		}

		for _, a := range n.Attr {
			// Skip attributes whose name is not a valid XML name (e.g. names
			// starting with '"' produced when the HTML5 parser encounters
			// malformed tag-like fragments in text).
			if !isValidXMLName(a.Key) {
				continue
			}
			buf.WriteByte(' ')
			if a.Namespace != "" {
				buf.WriteString(a.Namespace)
				buf.WriteByte(':')
			}
			buf.WriteString(a.Key)
			buf.WriteString(`="`)
			writeEscapedAttr(buf, a.Val)
			buf.WriteByte('"')
		}

		if isVoid(n.DataAtom) {
			buf.WriteString("/>")
		} else {
			buf.WriteByte('>')
			for c := n.FirstChild; c != nil; c = c.NextSibling {
				renderXHTML(buf, c)
			}
			buf.WriteString("</")
			buf.WriteString(tag)
			buf.WriteByte('>')
		}

	case html.RawNode:
		buf.WriteString(n.Data)
	}
}

func writeEscapedText(buf *bytes.Buffer, s string) {
	for _, r := range s {
		switch r {
		case '&':
			buf.WriteString("&amp;")
		case '<':
			buf.WriteString("&lt;")
		case '>':
			buf.WriteString("&gt;")
		default:
			buf.WriteRune(r)
		}
	}
}

func writeEscapedAttr(buf *bytes.Buffer, s string) {
	for _, r := range s {
		switch r {
		case '&':
			buf.WriteString("&amp;")
		case '"':
			buf.WriteString("&quot;")
		case '<':
			buf.WriteString("&lt;")
		default:
			buf.WriteRune(r)
		}
	}
}

// isVoid reports whether the element should be self-closed in XHTML.
var voidElements = map[atom.Atom]bool{
	atom.Area: true, atom.Base: true, atom.Br: true, atom.Col: true,
	atom.Embed: true, atom.Hr: true, atom.Img: true, atom.Input: true,
	atom.Link: true, atom.Meta: true, atom.Param: true, atom.Source: true,
	atom.Track: true, atom.Wbr: true,
}

func isVoid(a atom.Atom) bool {
	return voidElements[a]
}

// isValidXMLName reports whether s is a valid XML name: starts with a letter
// or underscore, and contains only letters, digits, hyphens, underscores,
// periods, and colons.
func isValidXMLName(s string) bool {
	if s == "" {
		return false
	}
	for i, r := range s {
		if i == 0 {
			if !unicode.IsLetter(r) && r != '_' {
				return false
			}
		} else {
			if !unicode.IsLetter(r) && !unicode.IsDigit(r) && r != '-' && r != '_' && r != '.' && r != ':' {
				return false
			}
		}
	}
	return true
}

// injectTitle ensures the <head> element contains a <title> child with the
// given text. If a <title> already exists it is left unchanged.
func injectTitle(doc *html.Node, title string) {
	var head *html.Node
	var findHead func(*html.Node)
	findHead = func(n *html.Node) {
		if n.Type == html.ElementNode && n.DataAtom == atom.Head {
			head = n
			return
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			findHead(c)
			if head != nil {
				return
			}
		}
	}
	findHead(doc)
	if head == nil {
		return
	}
	// Check if <title> already exists.
	for c := head.FirstChild; c != nil; c = c.NextSibling {
		if c.Type == html.ElementNode && c.DataAtom == atom.Title {
			return
		}
	}
	titleNode := &html.Node{
		Type:     html.ElementNode,
		Data:     "title",
		DataAtom: atom.Title,
	}
	titleNode.AppendChild(&html.Node{
		Type: html.TextNode,
		Data: title,
	})
	head.AppendChild(titleNode)
}
