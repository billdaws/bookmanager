# SMB Unicode Normalization Bug

## Problem

The scanner fails to traverse directories on SMB-mounted NAS volumes when directory
names contain non-ASCII characters. Example error:

```
2026/06/29 09:58:06 poller error [live]: fdopendir /Volumes/data/media/library/unsorted/The Posthumous Memoirs of Brás Cubas by Joaquim Maria Machado de Assis: no such file or directory
```

## Root Cause

macOS returns NFD-encoded filenames from `readdir`/`getdents` on SMB mounts (raw bytes
from the server). However, when macOS resolves a *full path string* through the VFS
(e.g. via `open()` or `stat()`), it Unicode-normalizes each path component to NFC before
sending it to the SMB server. The Synology NAS runs a Linux filesystem (btrfs/ext4) with
byte-exact name matching — NFD ≠ NFC — so the lookup fails with ENOENT.

Confirmed empirically:

```python
import os
p = '/Volumes/data/media/library/unsorted'
for e in os.scandir(p):
    if 'Posthumous' in e.name:
        print('name bytes:', e.name.encode('utf-8').hex())
        # → ...427261cc8173... (NFD: a + combining acute)
        try:
            os.listdir(os.path.join(p, e.name))  # full path → ENOENT
        except Exception as ex:
            print('listdir failed:', ex)
```

The scanner already has a previous (incomplete) attempt at a fix using
`golang.org/x/text/unicode/norm` NFC normalization, but it doesn't help because
the problem is in the VFS path lookup, not the string representation.

## Fix

Replace full-path `os.ReadDir(dir)` calls for subdirectory traversal with
`openat(parent_fd, entry_name)`. Opening a directory entry *relative to the parent's
file descriptor* passes the raw name bytes directly to the SMB layer without triggering
VFS path normalization.

`golang.org/x/sys` is already in go.mod (currently indirect).

### Implementation

Rewrite `internal/scanner/scanner.go`:

- `ScanDirectory` opens the root dir with `os.Open(dir)` and passes the `*os.File` to `walkDir`
- `walkDir` takes an `*os.File` (already-open dir) and calls `f.ReadDir(-1)` instead of `os.ReadDir(path)`
- For each subdirectory entry, open it with `unix.Openat(int(parent.Fd()), entry.Name(), unix.O_RDONLY|unix.O_CLOEXEC, 0)` → `os.NewFile(...)`
- Recurse with the new `*os.File`
- Symlink handling can still use path strings (symlinks are rare; leave as best-effort)
- Keep the existing `norm.NFC.String(r)` normalization on results before returning

```go
import "golang.org/x/sys/unix"

func openDirAt(parent *os.File, name, fullPath string) (*os.File, error) {
    fd, err := unix.Openat(int(parent.Fd()), name, unix.O_RDONLY|unix.O_CLOEXEC, 0)
    if err != nil {
        return nil, &os.PathError{Op: "openat", Path: fullPath, Err: err}
    }
    return os.NewFile(uintptr(fd), fullPath), nil
}
```

## What's Not Fixed

After this fix the scanner will successfully traverse and record non-ASCII filenames.
However, there is a second problem: when the app later *opens* a specific file (e.g. to
serve a cover or send a book), it does:

```go
bookPath := filepath.Join(lib.Directory, book.Filename)
os.Stat(bookPath)   // or zip.OpenReader, rardecode.OpenReader, etc.
```

`book.Filename` is stored as NFC (normalized by the scanner). `filepath.Join` constructs
a full NFC path string. macOS will normalize this NFC path to... NFC (no change needed
for the directory parts, which are ASCII). Since the Synology has NFD filenames, this
full-path open will also fail.

The fix for this second problem would be either:
1. A helper that opens files using `openat` from the library root down the path
2. Rename files on the NAS to NFC (using `convmv` on the Synology over SSH:
   `convmv --notest -r --nfc /volume1/data/`)

Option 2 is simpler and fixes the problem at the source. Option 1 requires threading
`*os.File` handles through more of the codebase.

## Testing

The scanner test (`internal/scanner/scanner_test.go`) uses local testdata, so it won't
catch this issue. To test, run against an SMB mount with non-ASCII directory names, or
write a test that creates a temp dir with NFD-named subdirectories and verifies
`ScanDirectory` finds files inside them.
