package query

import (
	"testing"
)

func TestParse(t *testing.T) {
	tests := []struct {
		input   string
		wantErr bool
		wantNil bool // nil expr (empty input)
	}{
		// Empty
		{"", false, true},
		{"   ", false, true},

		// Bare terms
		{"tolkien", false, false},
		{`"the hobbit"`, false, false},

		// Field terms
		{"author:tolkien", false, false},
		{`title:"the hobbit"`, false, false},
		{"year:1954", false, false},
		{"filename:book.epub", false, false},

		// Implicit AND
		{"tolkien hobbit", false, false},
		{"author:tolkien year:1954", false, false},

		// Explicit AND
		{"tolkien AND hobbit", false, false},
		{"author:tolkien AND year:1954", false, false},

		// OR inside parens
		{"(tolkien OR hobbit)", false, false},
		{"(author:tolkien OR author:lewis)", false, false},

		// Combined
		{"(author:tolkien OR author:lewis) year:1954", false, false},
		{"author:tolkien (title:hobbit OR title:silmarillion)", false, false},

		// Plain grouping (no OR)
		{"(tolkien hobbit)", false, false},

		// Nested
		{"((tolkien OR hobbit) OR carroll)", false, false},

		// Errors
		{"tolkien OR hobbit", true, false},       // OR at top level
		{`title:`, true, false},                  // missing value after colon
		{`"unclosed`, true, false},               // unclosed quote
		{"(tolkien", true, false},                // unclosed paren
		{"(tolkien AND OR hobbit)", true, false}, // AND followed by OR
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			expr, err := Parse(tt.input)
			if tt.wantErr {
				if err == nil {
					t.Errorf("Parse(%q): expected error, got nil", tt.input)
				}
				return
			}
			if err != nil {
				t.Errorf("Parse(%q): unexpected error: %v", tt.input, err)
				return
			}
			if tt.wantNil && expr != nil {
				t.Errorf("Parse(%q): expected nil expr, got %T", tt.input, expr)
			}
			if !tt.wantNil && expr == nil {
				t.Errorf("Parse(%q): expected non-nil expr, got nil", tt.input)
			}
		})
	}
}

func TestParseAST(t *testing.T) {
	t.Run("bare word", func(t *testing.T) {
		expr, err := Parse("tolkien")
		if err != nil {
			t.Fatal(err)
		}
		b, ok := expr.(BareExpr)
		if !ok {
			t.Fatalf("got %T, want BareExpr", expr)
		}
		if b.Value != "tolkien" {
			t.Errorf("Value = %q, want %q", b.Value, "tolkien")
		}
	})

	t.Run("field term", func(t *testing.T) {
		expr, err := Parse("author:tolkien")
		if err != nil {
			t.Fatal(err)
		}
		f, ok := expr.(FieldExpr)
		if !ok {
			t.Fatalf("got %T, want FieldExpr", expr)
		}
		if f.Field != "author" || f.Value != "tolkien" {
			t.Errorf("Field=%q Value=%q, want author/tolkien", f.Field, f.Value)
		}
	})

	t.Run("implicit AND", func(t *testing.T) {
		expr, err := Parse("tolkien hobbit")
		if err != nil {
			t.Fatal(err)
		}
		a, ok := expr.(AndExpr)
		if !ok {
			t.Fatalf("got %T, want AndExpr", expr)
		}
		if len(a.Operands) != 2 {
			t.Errorf("len(Operands) = %d, want 2", len(a.Operands))
		}
	})

	t.Run("OR group", func(t *testing.T) {
		expr, err := Parse("(author:tolkien OR author:lewis)")
		if err != nil {
			t.Fatal(err)
		}
		o, ok := expr.(OrExpr)
		if !ok {
			t.Fatalf("got %T, want OrExpr", expr)
		}
		if len(o.Operands) != 2 {
			t.Errorf("len(Operands) = %d, want 2", len(o.Operands))
		}
	})

	t.Run("quoted value", func(t *testing.T) {
		expr, err := Parse(`title:"the hobbit"`)
		if err != nil {
			t.Fatal(err)
		}
		f, ok := expr.(FieldExpr)
		if !ok {
			t.Fatalf("got %T, want FieldExpr", expr)
		}
		if f.Value != "the hobbit" {
			t.Errorf("Value = %q, want %q", f.Value, "the hobbit")
		}
	})
}

func TestMatch(t *testing.T) {
	book := Fields{
		Title:    "The Hobbit",
		Authors:  "Tolkien, J.R.R.",
		Year:     "1937",
		Filename: "hobbit.epub",
	}

	tests := []struct {
		query string
		want  bool
	}{
		// nil expr matches everything
		{"", true},

		// Bare terms (case-insensitive, any field)
		{"tolkien", true},
		{"hobbit", true},
		{"1937", true},
		{"epub", true},
		{"carroll", false},

		// Field: author
		{"author:tolkien", true},
		{"author:carroll", false},
		{"author:TOLKIEN", true},

		// Field: title
		{"title:hobbit", true},
		{"title:carroll", false},
		{`title:"the hobbit"`, true},

		// Field: year
		{"year:1937", true},
		{"year:1954", false},

		// Field: filename
		{"filename:hobbit", true},
		{"filename:silmarillion", false},

		// Unknown field never matches
		{"publisher:allen", false},

		// AND
		{"author:tolkien year:1937", true},
		{"author:tolkien year:1954", false},
		{"tolkien AND hobbit", true},
		{"tolkien AND carroll", false},

		// OR
		{"(author:tolkien OR author:lewis)", true},
		{"(author:lewis OR author:carroll)", false},

		// Combined
		{"(author:tolkien OR author:lewis) year:1937", true},
		{"(author:tolkien OR author:lewis) year:1954", false},
	}

	for _, tt := range tests {
		t.Run(tt.query, func(t *testing.T) {
			expr, err := Parse(tt.query)
			if err != nil {
				t.Fatalf("Parse(%q): %v", tt.query, err)
			}
			got := Match(expr, book)
			if got != tt.want {
				t.Errorf("Match(%q) = %v, want %v", tt.query, got, tt.want)
			}
		})
	}
}
