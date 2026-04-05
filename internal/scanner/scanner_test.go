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

func TestScanDirectory_SkipsSubdirectories(t *testing.T) {
	dir := t.TempDir()

	if err := os.Mkdir(filepath.Join(dir, "subdir"), 0755); err != nil {
		t.Fatal(err)
	}
	// .epub inside subdir should not appear — scanner is non-recursive
	f, err := os.Create(filepath.Join(dir, "subdir", "nested.epub"))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()

	f, err = os.Create(filepath.Join(dir, "top.epub"))
	if err != nil {
		t.Fatal(err)
	}
	f.Close()

	got, err := ScanDirectory(dir)
	if err != nil {
		t.Fatalf("ScanDirectory: %v", err)
	}

	if len(got) != 1 || got[0] != "top.epub" {
		t.Errorf("got %v, want [top.epub]", got)
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
