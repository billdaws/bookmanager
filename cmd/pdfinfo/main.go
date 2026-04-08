// pdfinfo walks a directory and prints PDF metadata (DocInfo) as TSV rows.
// Columns: FILE, TITLE, AUTHOR, CREATION_DATE
// Errors are printed to stderr; the row is still emitted with empty fields.
// This is mostly just to get information from PDFCPU directly for testing purposes.
package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/model"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: pdfinfo <directory>")
		os.Exit(1)
	}
	dir := os.Args[1]

	fmt.Println("FILE\tTITLE\tAUTHOR\tCREATION_DATE")

	if err := filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			fmt.Fprintf(os.Stderr, "walk error: %s: %v\n", path, err)
			return nil
		}
		if d.IsDir() || strings.ToLower(filepath.Ext(path)) != ".pdf" {
			return nil
		}

		rel, _ := filepath.Rel(dir, path)
		title, author, date := pdfDocInfo(path)
		fmt.Printf("%s\t%s\t%s\t%s\n", rel, title, author, date)
		return nil
	}); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func pdfDocInfo(path string) (title, author, date string) {
	f, err := os.Open(path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "open: %s: %v\n", path, err)
		return
	}
	defer f.Close()

	conf := model.NewDefaultConfiguration()
	conf.ValidationMode = model.ValidationRelaxed

	info, err := api.PDFInfo(f, path, nil, false, conf)
	if err != nil {
		fmt.Fprintf(os.Stderr, "pdfinfo: %s: %v\n", path, err)
		return
	}

	return info.Title, info.Author, info.CreationDate
}
