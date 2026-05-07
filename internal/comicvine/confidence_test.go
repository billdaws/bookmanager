package comicvine

import (
	"math"
	"testing"
)

func TestScore(t *testing.T) {
	cases := []struct {
		query      string
		volumeName string
		wantMin    float64
		wantMax    float64
	}{
		// Exact match → 1.0
		{"1963", "1963", 1.0, 1.0},
		{"Batman", "Batman", 1.0, 1.0},

		// The motivating bug: "Alan Moore's 1963" vs "Alan Moore's Glory"
		// Tokens: {alan, moores, 1963} vs {alan, moores, glory}
		// intersection=2 ("alan","moores"), union=4 → jaccard=0.5, no exact bonus → 0.5
		{"Alan Moore's 1963", "Alan Moore's Glory", 0.0, 0.74},

		// "1963" as directory query vs correct volume → score = 1.0
		{"1963", "1963", 1.0, 1.0},

		// Partial overlap: "Amazing Spider-Man" vs "The Amazing Spider-Man"
		// qTokens={amazing,spider,man}, vTokens={the,amazing,spider,man}
		// intersection=3, union=4 → 0.75
		{"Amazing Spider-Man", "The Amazing Spider-Man", 0.74, 1.0},

		// No overlap → 0
		{"Watchmen", "X-Men", 0.0, 0.0},

		// Empty inputs → 0
		{"", "Batman", 0.0, 0.0},
		{"Batman", "", 0.0, 0.0},
		{"", "", 0.0, 0.0},
	}

	for _, tc := range cases {
		t.Run(tc.query+"_vs_"+tc.volumeName, func(t *testing.T) {
			got := Score(tc.query, tc.volumeName)
			if math.IsNaN(got) {
				t.Fatalf("Score returned NaN")
			}
			if got < tc.wantMin || got > tc.wantMax {
				t.Errorf("Score(%q, %q) = %.4f, want [%.4f, %.4f]",
					tc.query, tc.volumeName, got, tc.wantMin, tc.wantMax)
			}
		})
	}
}

func TestScore_Clamped(t *testing.T) {
	// Exact match with high overlap should be clamped to 1.0, not exceed it.
	s := Score("Batman", "Batman")
	if s > 1.0 {
		t.Errorf("Score = %.4f, want <= 1.0", s)
	}
}

func TestScore_AboveThreshold(t *testing.T) {
	cases := []struct {
		query      string
		volumeName string
		autoAssign bool
	}{
		{"1963", "1963", true},
		{"Batman", "Batman", true},
		{"Amazing Spider-Man", "The Amazing Spider-Man", true},
		{"Alan Moore's 1963", "Alan Moore's Glory", false},
		{"Watchmen", "X-Men", false},
	}
	for _, tc := range cases {
		t.Run(tc.query+"_vs_"+tc.volumeName, func(t *testing.T) {
			s := Score(tc.query, tc.volumeName)
			got := s >= AutoAssignThreshold
			if got != tc.autoAssign {
				t.Errorf("Score(%q, %q) = %.4f, autoAssign = %v, want %v",
					tc.query, tc.volumeName, s, got, tc.autoAssign)
			}
		})
	}
}
