//go:build !windows

package scanner

import (
	"errors"
	"os"
	"path/filepath"
	"syscall"
	"testing"
)

// TestScanDirectory_SMBNFDSubdir covers the case where lib.Directory is an
// ASCII path but contains NFD-named subdirectories — the typical SMB/Synology
// scenario. On macOS SMB both full-path open(2) and openat(2) normalise the
// name to NFC before sending it to the server, so NFD-named subdirectories are
// permanently unreachable via POSIX. The scanner must skip them with a warning
// and continue scanning sibling directories rather than aborting the scan.
func TestScanDirectory_SMBNFDSubdir(t *testing.T) {
	root := t.TempDir()

	// NFD-named subdirectory: unreachable on macOS SMB (both osOpen and
	// openat normalise to NFC, which the server cannot match against NFD bytes).
	// NFD: 'a' (U+0061) + combining acute accent (U+0301)
	nfdName := "Brás Cubas"
	nfdDir := filepath.Join(root, nfdName)
	if err := os.Mkdir(nfdDir, 0755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(nfdDir, "nfd-book.epub"), nil, 0644); err != nil {
		t.Fatal(err)
	}

	// ASCII sibling directory: must still be scanned after the NFD dir is skipped.
	otherDir := filepath.Join(root, "other")
	if err := os.Mkdir(otherDir, 0755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(otherDir, "accessible.epub"), nil, 0644); err != nil {
		t.Fatal(err)
	}

	withSMBSimulation(t, func() {
		got, err := ScanDirectory(root)
		if err != nil {
			t.Fatalf("ScanDirectory returned error: %v", err)
		}
		// NFD directory is skipped; only the ASCII sibling is scanned.
		want := "other/accessible.epub"
		if len(got) != 1 || got[0] != want {
			t.Errorf("got %v, want [%s]", got, want)
		}
	})
}

// TestScanDirectory_SMBNFDRoot covers the case where lib.Directory itself is
// NFD-named. openRootDir detects that the entry exists in the parent's readdir
// but openat still fails (macOS SMB normalises name components to NFC for both
// full-path and relative lookups), and returns ErrSMBNFDDirectory so callers
// can preserve existing DB state rather than treating the library as empty.
func TestScanDirectory_SMBNFDRoot(t *testing.T) {
	parent := t.TempDir()

	// NFD form: 'a' (U+0061) + combining acute accent (U+0301)
	nfdName := "Brás Cubas"
	// NFC form: precomposed á (U+00E1) — what lib.Directory stores in the DB
	nfcName := "Brás Cubas"

	subdir := filepath.Join(parent, nfdName)
	if err := os.Mkdir(subdir, 0755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(subdir, "book.epub"), nil, 0644); err != nil {
		t.Fatal(err)
	}

	withSMBSimulation(t, func() {
		// lib.Directory is the NFC path (as stored in the DB).
		libDir := filepath.Join(parent, nfcName)
		_, err := ScanDirectory(libDir)
		if !errors.Is(err, ErrSMBNFDDirectory) {
			t.Fatalf("got err=%v, want ErrSMBNFDDirectory", err)
		}
	})
}

// TestScanDirectory_RealMount runs ScanDirectory against a real directory path
// supplied via the BOOKMANAGER_TEST_SCAN_PATH environment variable. Use this to
// verify the openat fix on an actual SMB mount where the simulated tests cannot
// reach, e.g.:
//
//	BOOKMANAGER_TEST_SCAN_PATH="/Volumes/data/media/library/unsorted/The Posthumous Memoirs of Brás Cubas by Joaquim Maria Machado de Assis" \
//	  go test ./internal/scanner/... -v -run TestScanDirectory_RealMount
func TestScanDirectory_RealMount(t *testing.T) {
	path := os.Getenv("BOOKMANAGER_TEST_SCAN_PATH")
	if path == "" {
		t.Skip("BOOKMANAGER_TEST_SCAN_PATH not set")
	}
	got, err := ScanDirectory(path)
	if err != nil {
		if errors.Is(err, ErrSMBNFDDirectory) {
			t.Logf("HANDLED: directory has NFD-encoded name on SMB server; inaccessible via POSIX")
			t.Logf("Scanner detected the condition and returns ErrSMBNFDDirectory (no crash, DB preserved)")
			t.Logf("Permanent fix: rename directory on Synology with: convmv --notest --nfc -r <path>")
			return
		}
		t.Fatalf("ScanDirectory(%q): %v", path, err)
	}
	t.Logf("found %d book(s):", len(got))
	for _, f := range got {
		t.Logf("  %s", f)
	}
}

// withSMBSimulation replaces osOpen and openDirFdFn for the duration of fn
// with stubs that return ENOENT for any path or name containing non-ASCII
// bytes. This reproduces the macOS SMB VFS behaviour on a Synology NAS:
// readdir returns raw NFD bytes from the server, but both full-path open(2)
// and relative openat(2) normalise each component to NFC before sending it to
// the server, which uses byte-exact matching and returns ENOENT for NFD names.
func withSMBSimulation(t *testing.T, fn func()) {
	t.Helper()
	origOpen := osOpen
	origOpenDirFd := openDirFdFn
	t.Cleanup(func() {
		osOpen = origOpen
		openDirFdFn = origOpenDirFd
	})
	osOpen = func(path string) (*os.File, error) {
		for i := 0; i < len(path); i++ {
			if path[i] > 0x7e {
				return nil, &os.PathError{Op: "open", Path: path, Err: syscall.ENOENT}
			}
		}
		return os.Open(path)
	}
	openDirFdFn = func(parent *os.File, name, fullPath string) (*os.File, error) {
		for i := 0; i < len(name); i++ {
			if name[i] > 0x7e {
				return nil, &os.PathError{Op: "openat", Path: fullPath, Err: syscall.ENOENT}
			}
		}
		return openDirFd(parent, name, fullPath)
	}
	fn()
}
