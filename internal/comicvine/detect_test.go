package comicvine

import (
	"testing"
)

func TestParseComicFilename(t *testing.T) {
	cases := []struct {
		input       string
		seriesName  string
		issueNumber int
		ok          bool
	}{
		// Trailing digits
		{"Watchmen 01.cbr", "Watchmen", 1, true},
		{"Batman 001.cbz", "Batman", 1, true},
		{"Astounding Comics 06.cbr", "Astounding Comics", 6, true},

		// Explicit # marker
		{"The Amazing Spider-Man #042.cbz", "The Amazing Spider-Man", 42, true},
		{"Batman (2016) #001.cbz", "Batman", 1, true},

		// Year + # marker
		{"X-Men (1963) #094.cbz", "X-Men", 94, true},

		// Volume + trailing digits
		{"Batman v2 003.cbz", "Batman", 3, true},

		// "Series N - Story Title" (no trailing digits, no # marker)
		{"Alan Moore's 1963 1 - Mystery Inc.cbz", "Alan Moore's 1963", 1, true},
		{"Alan Moore's 1963 6 - The Tomorrow Syndicate.cbz", "Alan Moore's 1963", 6, true},

		// Parenthetical metadata after issue number
		{"Spawn 032 (prologue to Blood Feud).cbr", "Spawn", 32, true},
		{"Batman (2016) 001 (Digital).cbz", "Batman", 1, true},

		// "Volume N" / "Vol N" / "Book N" patterns
		{"Leviathan Volume 1.cbz", "Leviathan", 1, true},
		{"The Ballad of Halo Jones Book 1.cbr", "The Ballad of Halo Jones", 1, true},
		{"The Ballad of Halo Jones Book 2.cbr", "The Ballad of Halo Jones", 2, true},
		{"Dark Victory Vol. 2.cbz", "Dark Victory", 2, true},

		// Alphanumeric issue numbers ("52a", "52b")
		{"Supreme 52a.cbz", "Supreme", 52, true},
		{"Supreme 52b.cbz", "Supreme", 52, true},

		// No issue number → not parseable
		{"not-a-series.cbz", "", 0, false},
		{"Watchmen.cbz", "", 0, false},
		{"From Hell.cbz", "", 0, false},
	}

	for _, tc := range cases {
		t.Run(tc.input, func(t *testing.T) {
			sn, n, ok := ParseComicFilename(tc.input)
			if ok != tc.ok {
				t.Fatalf("ok = %v, want %v", ok, tc.ok)
			}
			if !ok {
				return
			}
			if sn != tc.seriesName {
				t.Errorf("seriesName = %q, want %q", sn, tc.seriesName)
			}
			if n != tc.issueNumber {
				t.Errorf("issueNumber = %d, want %d", n, tc.issueNumber)
			}
		})
	}
}
