//go:build !windows

package scanner

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"syscall"

	"golang.org/x/sys/unix"
	"golang.org/x/text/unicode/norm"
)

// osOpen is the function used to open a directory by full path string. It is a
// variable so tests can replace it to simulate macOS SMB VFS behaviour, where
// the kernel normalises each path component to NFC before sending it to the
// server, causing ENOENT for directories whose names the server stored in NFD.
var osOpen = os.Open

// openDirFdFn is the function used to open a subdirectory relative to a parent
// file descriptor. It is a variable so tests can simulate the macOS SMB VFS
// behaviour where even openat(2) normalises the name to NFC before sending it
// to the server, causing ENOENT for NFD-named directories.
var openDirFdFn func(*os.File, string, string) (*os.File, error) = openDirFd

// isSMBNFDError reports whether err is the macOS SMB NFD pattern: a directory
// was opened (possibly from a stale VFS cache) but fdopendir subsequently
// failed with ENOENT when trying to enumerate it. This happens because macOS
// SMB VFS normalises path components to NFC for every readdir-style operation
// while the server stores names in NFD with byte-exact matching.
func isSMBNFDError(err error) bool {
	var pathErr *os.PathError
	return errors.As(err, &pathErr) &&
		pathErr.Op == "fdopendir" &&
		errors.Is(pathErr.Err, syscall.ENOENT)
}

// openDirFd opens the subdirectory named name inside parent using openat(2).
func openDirFd(parent *os.File, name, fullPath string) (*os.File, error) {
	fd, err := unix.Openat(int(parent.Fd()), name, unix.O_RDONLY|unix.O_CLOEXEC, 0)
	if err != nil {
		return nil, &os.PathError{Op: "openat", Path: fullPath, Err: err}
	}
	return os.NewFile(uintptr(fd), fullPath), nil
}

// openRootDir opens dir as a directory. If the direct osOpen call fails (e.g.
// on an SMB mount where macOS VFS normalises the full path to NFC but the
// server stores the directory name in NFD with byte-exact matching), it falls
// back to opening the parent directory via osOpen and then using openDirFdFn
// with the NFC-normalised entry name from readdir. The fallback recurses
// upward until it finds an ancestor that can be opened directly (typically the
// first ASCII-only component).
func openRootDir(dir string) (*os.File, error) {
	if f, err := osOpen(dir); err == nil {
		return f, nil
	}

	parent := filepath.Dir(dir)
	if parent == dir {
		return nil, &os.PathError{Op: "open", Path: dir, Err: syscall.ENOENT}
	}

	parentFD, err := openRootDir(parent)
	if err != nil {
		return nil, err
	}
	defer parentFD.Close()

	entries, err := parentFD.ReadDir(-1)
	if err != nil {
		return nil, err
	}

	baseNFC := norm.NFC.String(filepath.Base(dir))
	for _, e := range entries {
		if e.IsDir() && norm.NFC.String(e.Name()) == baseNFC {
			nfcName := norm.NFC.String(e.Name())
			f, err := openDirFdFn(parentFD, nfcName, dir)
			if err != nil {
				// The directory is visible in the parent's readdir but opening
				// it fails even with the NFC-normalised name. On macOS SMB this
				// means the server stores the name in NFD while the client
				// normalises all lookups to NFC, making the directory
				// permanently unreachable via POSIX. Return a sentinel so
				// callers can handle this gracefully.
				log.Printf("scanner: %s: directory exists on server but cannot be opened; server may have NFD-encoded name — rename with convmv --notest --nfc -r <path> to fix", dir)
				return nil, fmt.Errorf("%w: %s", ErrSMBNFDDirectory, dir)
			}
			return f, nil
		}
	}
	return nil, &os.PathError{Op: "open", Path: dir, Err: syscall.ENOENT}
}
