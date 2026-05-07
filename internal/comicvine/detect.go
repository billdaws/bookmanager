package comicvine

import (
	"regexp"
	"strconv"
	"strings"
)

var (
	reYear    = regexp.MustCompile(`\s*\(\d{4}\)`)
	reVol     = regexp.MustCompile(`(?i)\s+v\d+\b`)
	reHash    = regexp.MustCompile(`#(\d+)`)
	reParens  = regexp.MustCompile(`\s*\([^)]*\)`)
	reVolNum  = regexp.MustCompile(`(?i)\s+(?:vol(?:ume)?\.?|book)\s*(\d+)\b`)
	reTrail   = regexp.MustCompile(`(\d{2,})[a-z]?\s*$`)
	reNumDash = regexp.MustCompile(`\s(\d+)\s*-\s+`)
)

// ParseComicFilename extracts a series name and issue number from a comic
// filename. It strips the extension, year annotations, volume markers, and
// parenthetical metadata blocks, then looks for an issue number via several
// patterns in order of specificity.
//
// Returns ok=false when no issue number can be determined.
func ParseComicFilename(filename string) (seriesName string, issueNumber int, ok bool) {
	name := stripAnnotations(filename)
	if name == "" {
		return "", 0, false
	}

	// Prefer explicit issue marker: "#042".
	if loc := reHash.FindStringSubmatchIndex(name); loc != nil {
		numStr := name[loc[2]:loc[3]]
		n, err := strconv.Atoi(numStr)
		if err != nil {
			return "", 0, false
		}
		sn := strings.TrimRight(strings.TrimSpace(name[:loc[0]]), " -_")
		if sn == "" {
			return "", 0, false
		}
		return sn, n, true
	}

	// "Volume N", "Vol. N", "Book N": treat N as the issue number and
	// everything before the keyword as the series name.
	if loc := reVolNum.FindStringSubmatchIndex(name); loc != nil {
		numStr := name[loc[2]:loc[3]]
		n, err := strconv.Atoi(numStr)
		if err != nil {
			return "", 0, false
		}
		sn := strings.TrimRight(strings.TrimSpace(name[:loc[0]]), " -_")
		if sn == "" {
			return "", 0, false
		}
		return sn, n, true
	}

	// Trailing two-or-more digit number, optionally followed by one letter:
	// "Watchmen 01", "Supreme 52a".
	if loc := reTrail.FindStringSubmatchIndex(name); loc != nil {
		numStr := name[loc[2]:loc[3]]
		n, err := strconv.Atoi(numStr)
		if err != nil {
			return "", 0, false
		}
		sn := strings.TrimRight(strings.TrimSpace(name[:loc[2]]), " -_")
		if sn == "" {
			return "", 0, false
		}
		return sn, n, true
	}

	// "Series N - Story Title": a space-separated single digit followed by a
	// dash separator, e.g. "Alan Moore's 1963 1 - Mystery Inc".
	if loc := reNumDash.FindStringSubmatchIndex(name); loc != nil {
		numStr := name[loc[2]:loc[3]]
		n, err := strconv.Atoi(numStr)
		if err != nil {
			return "", 0, false
		}
		sn := strings.TrimRight(strings.TrimSpace(name[:loc[0]]), " -_")
		if sn == "" {
			return "", 0, false
		}
		return sn, n, true
	}

	return "", 0, false
}

// StripAnnotations returns the filename with extension, year annotations like
// "(2016)", volume markers like "v2", and parenthetical metadata blocks like
// "(Digital)" or "(TPB)" removed. The result is suitable as a series name
// query for files that do not carry an explicit issue number.
func StripAnnotations(filename string) string {
	return stripAnnotations(filename)
}

func stripAnnotations(filename string) string {
	name := filename
	if idx := strings.LastIndex(name, "."); idx >= 0 {
		ext := strings.ToLower(name[idx:])
		if ext == ".cbz" || ext == ".cbr" {
			name = name[:idx]
		}
	}
	name = reYear.ReplaceAllString(name, "")
	name = reVol.ReplaceAllString(name, "")
	name = reParens.ReplaceAllString(name, "")
	return strings.TrimSpace(name)
}
