// cvlookup traces the full ComicVine metadata pipeline for a comic file.
// Given a file path it shows what the filename parser extracts, what ComicVine
// returns for that query, and which issue (if any) would be matched.
//
// Usage:
//
//	BOOKMANAGER_COMICVINE_API_KEY=<key> go run ./cmd/cvlookup <path/to/comic.cbz>
//
// or via make:
//
//	make cv-lookup FILE=<path/to/comic.cbz>
package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strconv"

	"github.com/billdaws/bookmanager/internal/comicvine"
	cv "github.com/billdaws/comicvine"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage: cvlookup <path/to/comic.cbz>")
		os.Exit(1)
	}
	path := os.Args[1]
	base := filepath.Base(path)

	apiKey := os.Getenv("BOOKMANAGER_COMICVINE_API_KEY")
	if apiKey == "" {
		fmt.Fprintln(os.Stderr, "BOOKMANAGER_COMICVINE_API_KEY is not set")
		os.Exit(1)
	}

	fmt.Printf("file:     %s\n", path)
	fmt.Printf("basename: %s\n\n", base)

	// --- Step 1: filename parsing ---
	seriesName, issueNum, ok := comicvine.ParseComicFilename(base)
	if !ok {
		fmt.Println("parse:    FAILED — filename does not match any known pattern")
		fmt.Println("          The poller would skip this file.")
		os.Exit(1)
	}
	fmt.Printf("parse:    series=%q  issue=%d\n", seriesName, issueNum)

	// Also extract parent directory as a candidate series name.
	dirName := filepath.Base(filepath.Dir(path))

	queries := []string{seriesName}
	if dirName != "." && dirName != "" && dirName != seriesName {
		fmt.Printf("          directory candidate: %q\n", dirName)
		queries = append(queries, dirName)
	}
	fmt.Println()

	client := cv.NewClient("https://comicvine.gamespot.com/api", apiKey)
	ctx := context.Background()

	// --- Step 2: search each candidate query, score results ---
	type candidate struct {
		query string
		vol   cv.Volume
		score float64
		vols  []cv.Volume
	}

	var candidates []candidate
	for _, q := range queries {
		fmt.Printf("searching ComicVine for %q...\n", q)
		vols, err := client.SearchVolumes(q).
			Fields(cv.FieldID, cv.FieldName, cv.FieldStartYear, cv.FieldPublisher, cv.FieldCountOfIssues).
			Do(ctx)
		if err != nil {
			fmt.Fprintf(os.Stderr, "search error: %v\n", err)
			os.Exit(1)
		}
		if len(vols) == 0 {
			fmt.Printf("search:   no volumes found\n\n")
			continue
		}
		score := comicvine.Score(q, vols[0].Name)
		candidates = append(candidates, candidate{query: q, vol: vols[0], score: score, vols: vols})

		show := vols
		if len(show) > 5 {
			show = show[:5]
		}
		fmt.Printf("search:   %d result(s) returned, top %d:\n", len(vols), len(show))
		for i, v := range show {
			marker := "  "
			if i == 0 {
				marker = "→ "
			}
			fmt.Printf("  %sid=%-7d  name=%-35q  year=%-5s  publisher=%-20q  issues=%d\n",
				marker, v.ID, v.Name, v.StartYear, v.Publisher, v.CountOfIssues)
		}
		if len(vols) > 5 {
			fmt.Printf("  ... (%d more)\n", len(vols)-5)
		}
		fmt.Println()
	}

	if len(candidates) == 0 {
		fmt.Println("result:   no volumes found for any query — poller would skip this file")
		os.Exit(1)
	}

	// --- Step 3: pick the best candidate ---
	best := candidates[0]
	for _, c := range candidates[1:] {
		if c.score > best.score {
			best = c
		}
	}

	fmt.Println("confidence scores:")
	for _, c := range candidates {
		winner := ""
		if c.query == best.query {
			winner = " ← winner"
		}
		action := "REVIEW QUEUE"
		if c.score >= comicvine.AutoAssignThreshold {
			action = "AUTO-ASSIGN"
		}
		fmt.Printf("  query=%-30q  vol=%-35q  score=%.2f  [%s]%s\n",
			c.query, c.vol.Name, c.score, action, winner)
	}
	fmt.Println()

	action := "REVIEW QUEUE"
	if best.score >= comicvine.AutoAssignThreshold {
		action = "AUTO-ASSIGN"
	}
	fmt.Printf("decision: %s (score=%.2f)\n", action, best.score)
	fmt.Printf("          query=%q → id=%d %q (%s)\n\n", best.query, best.vol.ID, best.vol.Name, best.vol.StartYear)

	if best.score < comicvine.AutoAssignThreshold {
		fmt.Println("          The book would be queued for user review on the library page.")
		os.Exit(0)
	}

	// --- Step 4: issue lookup ---
	fmt.Printf("fetching issues for volume %d...\n", best.vol.ID)
	issues, err := client.GetIssues(best.vol.ID).
		Fields(cv.FieldID, cv.FieldIssueNumber, cv.FieldName, cv.FieldCoverDate).
		Do(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "get issues error: %v\n", err)
		os.Exit(1)
	}
	fmt.Printf("issues:   %d returned\n", len(issues))

	var matched *cv.Issue
	for i := range issues {
		n, err := strconv.Atoi(issues[i].IssueNumber)
		if err != nil {
			continue
		}
		if n == issueNum {
			matched = &issues[i]
			break
		}
	}

	if matched == nil {
		fmt.Printf("match:    NONE — no issue with number %d found in volume %d\n", issueNum, best.vol.ID)
		fmt.Println("          Book would be added to the series but without issue metadata or title.")
	} else {
		fmt.Printf("match:    id=%d  number=%q  name=%q  cover_date=%q\n",
			matched.ID, matched.IssueNumber, matched.Name, matched.CoverDate)
		if matched.Name != "" {
			fmt.Printf("          %q would be written to books.title\n", matched.Name)
		} else {
			fmt.Println("          Issue has no name on ComicVine; books.title would not be updated.")
		}
	}
}
