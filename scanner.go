package main

import (
	"os"
	"path/filepath"
	"strings"
)

var bookExtensions = map[string]bool{
	".epub": true,
	".pdf":  true,
	".mobi": true,
	".azw":  true,
	".azw3": true,
	".cbz":  true,
	".cbr":  true,
}

// scanDirectory returns the base filenames of book files in dir.
// It is non-recursive — subdirectories are skipped.
func scanDirectory(dir string) ([]string, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	var filenames []string
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		ext := strings.ToLower(filepath.Ext(entry.Name()))
		if bookExtensions[ext] {
			filenames = append(filenames, entry.Name())
		}
	}
	return filenames, nil
}
