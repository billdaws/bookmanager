//go:build windows

package scanner

import "os"

func openDirFd(_ *os.File, _, fullPath string) (*os.File, error) {
	return os.Open(fullPath)
}

var openDirFdFn func(*os.File, string, string) (*os.File, error) = openDirFd

func openRootDir(dir string) (*os.File, error) {
	return os.Open(dir)
}

func isSMBNFDError(_ error) bool {
	return false
}
