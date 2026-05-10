// Package rarinfo lists filenames from RAR archives by reading only block
// headers, seeking over packed data rather than reading or decompressing it.
package rarinfo

import (
	"encoding/binary"
	"fmt"
	"io"
	"os"
	"strings"
)

// rar4Sig is the RAR4 file signature.
var rar4Sig = [7]byte{0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x00}

const (
	blockHasData  = 0x8000
	blockFile     = 0x74
	fileLargeData = 0x0100
	fileUnicode   = 0x0200
)

// ListFiles reads only block headers from a RAR4 archive, seeking over packed
// data rather than reading it. Returns all filenames found, or an error if f
// is not a RAR4 archive.
func ListFiles(f *os.File) ([]string, error) {
	var sig [7]byte
	if _, err := io.ReadFull(f, sig[:]); err != nil {
		return nil, err
	}
	if sig != rar4Sig {
		return nil, fmt.Errorf("not RAR4")
	}

	var names []string
	base := make([]byte, 7)
	var hdr []byte

	for {
		blockStart, err := f.Seek(0, io.SeekCurrent)
		if err != nil {
			break
		}

		// Read: HEAD_CRC(2) + HEAD_TYPE(1) + HEAD_FLAGS(2) + HEAD_SIZE(2)
		if _, err := io.ReadFull(f, base); err != nil {
			break
		}
		headType := base[2]
		headFlags := binary.LittleEndian.Uint16(base[3:5])
		headSize := int64(binary.LittleEndian.Uint16(base[5:7]))
		if headSize < 7 {
			break
		}

		// Read remainder of header into hdr, growing the buffer as needed.
		rest := int(headSize - 7)
		if rest > len(hdr) {
			hdr = make([]byte, rest)
		}
		if _, err := io.ReadFull(f, hdr[:rest]); err != nil {
			break
		}

		// ADD_SIZE: low 32 bits of packed data length (present when blockHasData).
		var addSize int64
		if headFlags&blockHasData != 0 && rest >= 4 {
			addSize = int64(binary.LittleEndian.Uint32(hdr[0:4]))
		}

		// For file blocks, extract the filename from the fixed-offset fields.
		// h.data layout (from rardecode/archive15.go):
		//   [0:4]  ADD_SIZE (= packed size lo32)
		//   [4:8]  UNP_SIZE lo32
		//   [8]    HOST_OS
		//   [9:13] FILE_CRC
		//  [13:17] FTIME
		//  [17]    UNP_VER
		//  [18]    METHOD
		//  [19:21] NAME_SIZE
		//  [21:25] ATTR
		//  [25:29] HIGH_PACK_SZ (only when fileLargeData)
		//  [29:33] HIGH_UNP_SZ  (only when fileLargeData)
		//  [25/33] NAME (NAME_SIZE bytes)
		if headType == blockFile && rest >= 21 {
			nameSize := int(binary.LittleEndian.Uint16(hdr[19:21]))
			nameOffset := 25
			if headFlags&fileLargeData != 0 && rest >= 29 {
				addSize |= int64(binary.LittleEndian.Uint32(hdr[25:29])) << 32
				nameOffset = 33
			}
			if nameSize > 0 && nameOffset+nameSize <= rest {
				name := string(hdr[nameOffset : nameOffset+nameSize])
				if headFlags&fileUnicode == 0 {
					// Non-unicode: may be null-terminated with encoded suffix — take up to null.
					if i := strings.IndexByte(name, 0); i >= 0 {
						name = name[:i]
					}
				} else {
					name = decodeName(hdr[nameOffset : nameOffset+nameSize])
				}
				name = strings.ReplaceAll(name, "\\", "/")
				names = append(names, name)
			}
		}

		if _, err := f.Seek(blockStart+headSize+addSize, io.SeekStart); err != nil {
			break
		}
	}

	return names, nil
}

// decodeName decodes a RAR4 unicode-encoded filename (fileUnicode flag set).
// It mirrors the logic in rardecode/archive15.go decodeName.
func decodeName(buf []byte) string {
	i := strings.IndexByte(string(buf), 0)
	if i < 0 {
		return string(buf) // plain UTF-8
	}
	// Unicode-encoded: ASCII prefix + encoded suffix after the null separator.
	name := buf[:i]
	enc := buf[i+1:]
	if len(enc) < 2 {
		return string(name)
	}
	highByte := uint16(enc[0]) << 8
	enc = enc[1:]
	flags := enc[0]
	enc = enc[1:]
	flagBits := 8
	var wchars []uint16
	for len(wchars) < len(name) && len(enc) > 0 {
		if flagBits == 0 {
			flags = enc[0]
			enc = enc[1:]
			flagBits = 8
			if len(enc) == 0 {
				break
			}
		}
		switch flags >> 6 {
		case 0:
			wchars = append(wchars, uint16(enc[0]))
			enc = enc[1:]
		case 1:
			wchars = append(wchars, uint16(enc[0])|highByte)
			enc = enc[1:]
		case 2:
			if len(enc) < 2 {
				enc = nil
			} else {
				wchars = append(wchars, binary.LittleEndian.Uint16(enc[0:2]))
				enc = enc[2:]
			}
		case 3:
			if len(enc) == 0 {
				break
			}
			n := enc[0]
			enc = enc[1:]
			b := name[len(wchars):]
			if l := int(n&0x7f) + 2; l < len(b) {
				b = b[:l]
			}
			if n&0x80 > 0 {
				if len(enc) == 0 {
					break
				}
				ec := enc[0]
				enc = enc[1:]
				for _, c := range b {
					wchars = append(wchars, uint16(c+ec)|highByte)
				}
			} else {
				for _, c := range b {
					wchars = append(wchars, uint16(c))
				}
			}
		}
		flags <<= 2
		flagBits -= 2
	}
	runes := make([]rune, len(wchars))
	for i, w := range wchars {
		runes[i] = rune(w)
	}
	return string(runes)
}
