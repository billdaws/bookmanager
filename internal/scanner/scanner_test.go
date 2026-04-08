package scanner

import (
	"os"
	"path/filepath"
	"testing"
)

func TestScanDirectory(t *testing.T) {
	dir := t.TempDir()

	touch := func(name string) {
		f, err := os.Create(filepath.Join(dir, name))
		if err != nil {
			t.Fatal(err)
		}
		f.Close()
	}

	touch("moby-dick.epub")
	touch("dune.pdf")
	touch("foundation.mobi")
	touch("readme.txt") // should be excluded
	touch("cover.jpg")  // should be excluded
	touch("notes.docx") // should be excluded

	got, err := ScanDirectory(dir)
	if err != nil {
		t.Fatalf("ScanDirectory: %v", err)
	}

	want := map[string]bool{
		"moby-dick.epub":  true,
		"dune.pdf":        true,
		"foundation.mobi": true,
	}

	if len(got) != len(want) {
		t.Errorf("got %d files, want %d: %v", len(got), len(want), got)
	}

	for _, name := range got {
		if !want[name] {
			t.Errorf("unexpected file in results: %q", name)
		}
	}
}

func TestScanDirectory_RecursesSubdirectories(t *testing.T) {
	dir := t.TempDir()

	if err := os.MkdirAll(filepath.Join(dir, "a", "b"), 0755); err != nil {
		t.Fatal(err)
	}

	for _, rel := range []string{"top.epub", "a/mid.pdf", "a/b/deep.mobi"} {
		f, err := os.Create(filepath.Join(dir, rel))
		if err != nil {
			t.Fatal(err)
		}
		f.Close()
	}

	got, err := ScanDirectory(dir)
	if err != nil {
		t.Fatalf("ScanDirectory: %v", err)
	}

	want := map[string]bool{
		"top.epub":      true,
		"a/mid.pdf":     true,
		"a/b/deep.mobi": true,
	}

	if len(got) != len(want) {
		t.Errorf("got %d files, want %d: %v", len(got), len(want), got)
	}
	for _, name := range got {
		if !want[name] {
			t.Errorf("unexpected file in results: %q", name)
		}
	}
}

func TestScanDirectory_FollowsSymlinkedDirectories(t *testing.T) {
	real := t.TempDir()
	f, err := os.Create(filepath.Join(real, "linked.epub"))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()

	dir := t.TempDir()
	if err := os.Symlink(real, filepath.Join(dir, "books")); err != nil {
		t.Fatal(err)
	}

	got, err := ScanDirectory(dir)
	if err != nil {
		t.Fatalf("ScanDirectory: %v", err)
	}

	if len(got) != 1 || got[0] != "books/linked.epub" {
		t.Errorf("got %v, want [books/linked.epub]", got)
	}
}

func TestScanDirectory_SymlinkLoopDetection(t *testing.T) {
	dir := t.TempDir()

	sub := filepath.Join(dir, "sub")
	if err := os.Mkdir(sub, 0755); err != nil {
		t.Fatal(err)
	}
	// symlink sub/loop → dir, creating a cycle
	if err := os.Symlink(dir, filepath.Join(sub, "loop")); err != nil {
		t.Fatal(err)
	}
	f, err := os.Create(filepath.Join(dir, "book.epub"))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()

	got, err := ScanDirectory(dir)
	if err != nil {
		t.Fatalf("ScanDirectory: %v", err)
	}

	if len(got) != 1 || got[0] != "book.epub" {
		t.Errorf("got %v, want [book.epub]", got)
	}
}

func TestScanDirectory_EmptyDir(t *testing.T) {
	dir := t.TempDir()

	got, err := ScanDirectory(dir)
	if err != nil {
		t.Fatalf("ScanDirectory: %v", err)
	}
	if len(got) != 0 {
		t.Errorf("expected empty result, got %v", got)
	}
}
