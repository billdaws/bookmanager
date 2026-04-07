package query

import (
	"fmt"
	"strings"
	"unicode"
)

// ---- Tokens ----------------------------------------------------------------

type tokKind int

const (
	tokWord   tokKind = iota // non-keyword word token
	tokAnd                   // AND keyword
	tokOr                    // OR keyword
	tokLParen                // (
	tokRParen                // )
	tokColon                 // :
	tokQuoted                // "..."
	tokEOF
)

type token struct {
	kind tokKind
	val  string
}

// ---- Lexer -----------------------------------------------------------------

type lexer struct {
	runes []rune
	pos   int
}

func (l *lexer) peek() rune {
	if l.pos >= len(l.runes) {
		return 0
	}
	return l.runes[l.pos]
}

func (l *lexer) next() rune {
	r := l.peek()
	l.pos++
	return r
}

func (l *lexer) tokenize() ([]token, error) {
	var tokens []token
	for {
		for l.pos < len(l.runes) && unicode.IsSpace(l.peek()) {
			l.pos++
		}
		if l.pos >= len(l.runes) {
			tokens = append(tokens, token{kind: tokEOF})
			return tokens, nil
		}

		r := l.peek()
		switch r {
		case '(':
			l.next()
			tokens = append(tokens, token{kind: tokLParen, val: "("})
		case ')':
			l.next()
			tokens = append(tokens, token{kind: tokRParen, val: ")"})
		case ':':
			l.next()
			tokens = append(tokens, token{kind: tokColon, val: ":"})
		case '"':
			l.next()
			var sb strings.Builder
			for l.pos < len(l.runes) && l.peek() != '"' {
				sb.WriteRune(l.next())
			}
			if l.pos >= len(l.runes) {
				return nil, fmt.Errorf("unclosed quoted string")
			}
			l.next()
			tokens = append(tokens, token{kind: tokQuoted, val: sb.String()})
		default:
			var sb strings.Builder
			for l.pos < len(l.runes) && !unicode.IsSpace(l.peek()) &&
				l.peek() != '(' && l.peek() != ')' &&
				l.peek() != ':' && l.peek() != '"' {
				sb.WriteRune(l.next())
			}
			word := sb.String()
			switch word {
			case "AND":
				tokens = append(tokens, token{kind: tokAnd, val: word})
			case "OR":
				tokens = append(tokens, token{kind: tokOr, val: word})
			default:
				tokens = append(tokens, token{kind: tokWord, val: word})
			}
		}
	}
}

// ---- AST -------------------------------------------------------------------

// Expr is a node in the parsed query tree.
type Expr interface{ isExpr() }

// AndExpr matches when all operands match.
type AndExpr struct{ Operands []Expr }

// OrExpr matches when any operand matches.
type OrExpr struct{ Operands []Expr }

// FieldExpr matches a specific metadata field.
type FieldExpr struct{ Field, Value string }

// BareExpr matches any field.
type BareExpr struct{ Value string }

func (AndExpr) isExpr()   {}
func (OrExpr) isExpr()    {}
func (FieldExpr) isExpr() {}
func (BareExpr) isExpr()  {}

// ---- Parser ----------------------------------------------------------------

type parser struct {
	tokens []token
	pos    int
}

func (p *parser) peek() token {
	if p.pos >= len(p.tokens) {
		return token{kind: tokEOF}
	}
	return p.tokens[p.pos]
}

func (p *parser) consume() token {
	t := p.peek()
	p.pos++
	return t
}

func (p *parser) canStartTerm() bool {
	switch p.peek().kind {
	case tokWord, tokQuoted, tokLParen:
		return true
	}
	return false
}

// parseExpr parses: term { [AND] term }
func (p *parser) parseExpr() (Expr, error) {
	first, err := p.parseTerm()
	if err != nil {
		return nil, err
	}
	operands := []Expr{first}

	for {
		if p.peek().kind == tokAnd {
			p.consume()
			next, err := p.parseTerm()
			if err != nil {
				return nil, err
			}
			operands = append(operands, next)
			continue
		}
		if p.canStartTerm() {
			next, err := p.parseTerm()
			if err != nil {
				return nil, err
			}
			operands = append(operands, next)
			continue
		}
		break
	}

	if len(operands) == 1 {
		return operands[0], nil
	}
	return AndExpr{Operands: operands}, nil
}

// parseTerm parses: "(" inner ")" | atom
func (p *parser) parseTerm() (Expr, error) {
	if p.peek().kind == tokLParen {
		return p.parseGroup()
	}
	return p.parseAtom()
}

// parseGroup parses: "(" expr { OR expr } ")"
func (p *parser) parseGroup() (Expr, error) {
	p.consume() // consume "("

	first, err := p.parseExpr()
	if err != nil {
		return nil, err
	}

	if p.peek().kind == tokRParen {
		p.consume()
		return first, nil
	}

	if p.peek().kind != tokOr {
		return nil, fmt.Errorf("expected OR or ) inside parentheses, got %q", p.peek().val)
	}

	operands := []Expr{first}
	for p.peek().kind == tokOr {
		p.consume()
		next, err := p.parseExpr()
		if err != nil {
			return nil, err
		}
		operands = append(operands, next)
	}

	if p.peek().kind != tokRParen {
		return nil, fmt.Errorf("expected ) after OR expression, got %q", p.peek().val)
	}
	p.consume()

	return OrExpr{Operands: operands}, nil
}

// parseAtom parses: WORD ":" value | value
func (p *parser) parseAtom() (Expr, error) {
	tok := p.peek()

	if tok.kind == tokWord {
		p.consume()
		if p.peek().kind == tokColon {
			p.consume()
			val, err := p.parseValue()
			if err != nil {
				return nil, err
			}
			return FieldExpr{Field: strings.ToLower(tok.val), Value: val}, nil
		}
		return BareExpr{Value: tok.val}, nil
	}

	if tok.kind == tokQuoted {
		p.consume()
		return BareExpr{Value: tok.val}, nil
	}

	return nil, fmt.Errorf("unexpected token %q", tok.val)
}

// parseValue parses: WORD | QUOTED
func (p *parser) parseValue() (string, error) {
	tok := p.peek()
	switch tok.kind {
	case tokWord, tokQuoted:
		p.consume()
		return tok.val, nil
	}
	return "", fmt.Errorf("expected a value after ':', got %q", tok.val)
}

// ---- Public API ------------------------------------------------------------

// Parse parses a query string and returns an expression tree.
// Returns nil, nil for an empty or whitespace-only query.
func Parse(s string) (Expr, error) {
	s = strings.TrimSpace(s)
	if s == "" {
		return nil, nil
	}

	l := &lexer{runes: []rune(s)}
	tokens, err := l.tokenize()
	if err != nil {
		return nil, err
	}

	p := &parser{tokens: tokens}
	expr, err := p.parseExpr()
	if err != nil {
		return nil, err
	}

	if p.peek().kind != tokEOF {
		return nil, fmt.Errorf("unexpected token %q", p.peek().val)
	}

	return expr, nil
}

// ---- Evaluator -------------------------------------------------------------

// Fields holds the searchable metadata for a single book.
type Fields struct {
	Title, Authors, Year, Filename string
}

// Match reports whether expr matches the given book fields.
// A nil expr matches everything.
func Match(expr Expr, f Fields) bool {
	if expr == nil {
		return true
	}
	switch e := expr.(type) {
	case BareExpr:
		q := strings.ToLower(e.Value)
		return strings.Contains(strings.ToLower(f.Title), q) ||
			strings.Contains(strings.ToLower(f.Authors), q) ||
			strings.Contains(strings.ToLower(f.Filename), q) ||
			strings.Contains(f.Year, q)
	case FieldExpr:
		q := strings.ToLower(e.Value)
		switch e.Field {
		case "author", "authors":
			return strings.Contains(strings.ToLower(f.Authors), q)
		case "title":
			return strings.Contains(strings.ToLower(f.Title), q)
		case "year":
			return strings.Contains(f.Year, q)
		case "filename":
			return strings.Contains(strings.ToLower(f.Filename), q)
		default:
			return false
		}
	case AndExpr:
		for _, op := range e.Operands {
			if !Match(op, f) {
				return false
			}
		}
		return true
	case OrExpr:
		for _, op := range e.Operands {
			if Match(op, f) {
				return true
			}
		}
		return false
	}
	return false
}
