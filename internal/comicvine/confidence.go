package comicvine

import (
	"strings"
	"unicode"
)

// AutoAssignThreshold is the minimum confidence score required to automatically
// assign a ComicVine volume to a comic without prompting the user. Scores below
// this threshold cause the comic to be queued for manual review.
const AutoAssignThreshold = 0.75

// Score computes a confidence score in [0, 1] measuring how well volumeName
// matches query. It uses Jaccard token-overlap similarity with an additional
// bonus for exact matches (after normalization).
func Score(query, volumeName string) float64 {
	qTokens := tokenize(query)
	vTokens := tokenize(volumeName)

	if len(qTokens) == 0 || len(vTokens) == 0 {
		return 0
	}

	intersection := 0
	for t := range qTokens {
		if vTokens[t] {
			intersection++
		}
	}
	union := len(qTokens) + len(vTokens) - intersection
	jaccard := float64(intersection) / float64(union)

	exactBonus := 0.0
	if strings.EqualFold(strings.TrimSpace(query), strings.TrimSpace(volumeName)) {
		exactBonus = 0.4
	}

	score := jaccard + exactBonus
	if score > 1.0 {
		score = 1.0
	}
	return score
}

// tokenize lowercases s, strips non-alphanumeric characters, and returns the
// set of whitespace-separated tokens.
func tokenize(s string) map[string]bool {
	var b strings.Builder
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			b.WriteRune(unicode.ToLower(r))
		} else {
			b.WriteRune(' ')
		}
	}
	tokens := make(map[string]bool)
	for _, tok := range strings.Fields(b.String()) {
		tokens[tok] = true
	}
	return tokens
}
