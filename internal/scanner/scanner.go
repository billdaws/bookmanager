package scanner

import (
	"fmt"
	"io/fs"
	"log"
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

// ScanDirectory returns the relative paths of book files under dir, recursing
// into subdirectories and following symlinked directories. Symlink loops are
// detected and skipped. Returns an error if any symlink cannot be resolved.
func ScanDirectory(dir string) ([]string, error) {
	real, err := filepath.EvalSymlinks(dir)
	if err != nil {
		return nil, err
	}
	visited := map[string]bool{real: true}
	var results []string
	if err := walkDir(dir, dir, visited, &results); err != nil {
		return nil, err
	}
	return results, nil
}

func walkDir(dir, root string, visited map[string]bool, results *[]string) error {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return err
	}

	for _, entry := range entries {
		path := filepath.Join(dir, entry.Name())

		if entry.Type()&fs.ModeSymlink != 0 {
			info, err := os.Stat(path)
			if err != nil {
				log.Printf("scanner: broken symlink %s: %v", path, err)
				return fmt.Errorf("broken symlink %s: %w", filepath.Base(path), err)
			}
			if info.IsDir() {
				real, err := filepath.EvalSymlinks(path)
				if err != nil {
					log.Printf("scanner: broken symlink %s: %v", path, err)
					return fmt.Errorf("broken symlink %s: %w", filepath.Base(path), err)
				}
				if visited[real] {
					log.Printf("scanner: skipping symlink loop at %s -> %s", path, real)
					continue
				}
				visited[real] = true
				if err := walkDir(path, root, visited, results); err != nil {
					return err
				}
			} else {
				ext := strings.ToLower(filepath.Ext(entry.Name()))
				if bookExtensions[ext] {
					rel, relErr := filepath.Rel(root, path)
					if relErr != nil {
						return relErr
					}
					*results = append(*results, rel)
				}
			}
			continue
		}

		if entry.IsDir() {
			if err := walkDir(path, root, visited, results); err != nil {
				return err
			}
			continue
		}

		ext := strings.ToLower(filepath.Ext(entry.Name()))
		if bookExtensions[ext] {
			rel, relErr := filepath.Rel(root, path)
			if relErr != nil {
				return relErr
			}
			*results = append(*results, rel)
		}
	}
	return nil
}
