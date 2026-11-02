package scanner

import (
	"errors"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/text/unicode/norm"
)

// ErrSMBNFDDirectory is returned by ScanDirectory when the library's root
// directory exists on the SMB server but cannot be opened via POSIX because
// macOS SMB VFS normalises path components to NFC while the server stores the
// name in NFD with byte-exact matching. The caller should preserve existing
// database state rather than treating the directory as empty.
// Fix: rename the directory on the server with convmv --notest --nfc -r <path>.
var ErrSMBNFDDirectory = errors.New("directory has NFD-encoded name inaccessible via POSIX on macOS SMB")

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
// Returned paths are NFC-normalized for consistent storage and comparison.
//
// All directory names are NFC-normalized before use so that the application
// uses a single canonical form regardless of what the filesystem stores.
// Subdirectories whose NFC-normalized name cannot be opened are logged and
// skipped rather than aborting the scan; this handles the case where the
// server temporarily stores names in NFD (e.g. after a sync from a macOS
// client) while a normalisation job runs to restore them to NFC.
func ScanDirectory(dir string) ([]string, error) {
	nfcDir := norm.NFC.String(dir)

	rootFD, err := openRootDir(nfcDir)
	if err != nil {
		return nil, err
	}
	defer rootFD.Close()

	// Best-effort: resolve the real path for symlink loop detection.
	// EvalSymlinks may fail on SMB mounts with NFD-named root dirs; fall back
	// to using the dir string itself so loop detection still works for the
	// common case (symlinked directories below an ASCII root).
	real, err := filepath.EvalSymlinks(nfcDir)
	if err != nil {
		real = nfcDir
	}
	visited := map[string]bool{real: true}

	var results []string
	if err := walkDir(rootFD, nfcDir, nfcDir, visited, &results); err != nil {
		if isSMBNFDError(err) {
			// The root directory fd was opened (possibly from a stale VFS
			// cache) but fdopendir failed when ReadDir tried to enumerate it.
			log.Printf("scanner: %s: directory cannot be enumerated; server may have NFD-encoded name — rename with convmv --notest --nfc -r <path> to fix", dir)
			return nil, fmt.Errorf("%w: %s", ErrSMBNFDDirectory, dir)
		}
		return nil, err
	}
	for i, r := range results {
		results[i] = norm.NFC.String(r)
	}
	return results, nil
}

// walkDir recurses dir, appending book file paths relative to root to results.
// dirPath is the logical path string for dir (used to build relative paths and
// error messages); dir is the already-open directory file descriptor.
func walkDir(dir *os.File, dirPath, root string, visited map[string]bool, results *[]string) error {
	entries, err := dir.ReadDir(-1)
	if err != nil {
		return err
	}

	for _, entry := range entries {
		// Normalize the entry name to NFC so that all path operations in this
		// application use a single canonical form, regardless of what encoding
		// the underlying filesystem or SMB server happens to store.
		name := norm.NFC.String(entry.Name())
		path := filepath.Join(dirPath, name)

		if entry.Type()&fs.ModeSymlink != 0 {
			info, err := os.Stat(path)
			if err != nil {
				log.Printf("scanner: broken symlink %s: %v", path, err)
				return fmt.Errorf("broken symlink %s: %w", filepath.Base(path), err)
			}
			if info.IsDir() {
				real, err := filepath.EvalSymlinks(path)
				if err != nil {
					// EvalSymlinks resolves the target path client-side using
					// successive Lstat calls. On macOS SMB this fails when the
					// symlink's target directory has an NFD-encoded name on the
					// server (macOS normalises all lookups to NFC, server does
					// byte-exact matching → ENOENT). os.Stat above succeeded
					// because SMB resolves symlinks server-side and returns the
					// target's attributes without a separate client-side name
					// lookup. Open through the symlink path directly so SMB
					// resolves it server-side again; this lets an NFC-named
					// symlink act as an alias for an NFD-named directory.
					symFD, err := os.Open(path)
					if err != nil {
						log.Printf("scanner: %s: cannot open symlink target: %v", path, err)
						continue
					}
					err = walkDir(symFD, path, root, visited, results)
					symFD.Close()
					if err != nil {
						if isSMBNFDError(err) {
							log.Printf("scanner: %s: symlink target cannot be enumerated, skipping", path)
							continue
						}
						return err
					}
					continue
				}
				if visited[real] {
					log.Printf("scanner: skipping symlink loop at %s -> %s", path, real)
					continue
				}
				visited[real] = true
				symFD, err := os.Open(real)
				if err != nil {
					return err
				}
				err = walkDir(symFD, path, root, visited, results)
				symFD.Close()
				if err != nil {
					return err
				}
			} else {
				ext := strings.ToLower(filepath.Ext(name))
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
			subFD, err := openDirFdFn(dir, name, path)
			if err != nil {
				if os.IsNotExist(err) {
					// The directory appeared in readdir but cannot be opened
					// with its NFC-normalised name. On macOS SMB this occurs
					// when the server stored the name in NFD and macOS sent
					// NFC; skip and continue scanning sibling directories.
					log.Printf("scanner: %s: skipping directory (not found after NFC normalisation)", path)
					continue
				}
				return err
			}
			err = walkDir(subFD, path, root, visited, results)
			subFD.Close()
			if err != nil {
				if isSMBNFDError(err) {
					// Opened successfully (possibly from VFS cache) but
					// enumerating the contents failed. Skip this directory.
					log.Printf("scanner: %s: skipping directory (cannot enumerate contents)", path)
					continue
				}
				return err
			}
			continue
		}

		ext := strings.ToLower(filepath.Ext(name))
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
