package main

import (
	"archive/zip"
	"bytes"
	"encoding/binary"
	"fmt"
	"hash/crc32"
	"image"
	"image/color"
	"image/jpeg"
	"io"
	"os"
	"path/filepath"
)

func main() {
	jpegData, err := makeJPEG()
	if err != nil {
		fmt.Fprintf(os.Stderr, "make jpeg: %v\n", err)
		os.Exit(1)
	}

	outDir := filepath.Join("internal", "e2e", "testdata", "raw")

	fixtures := []struct {
		name string
		cbr  bool
	}{
		{"Astounding Comics 01.cbz", false},
		{"Astounding Comics 02.cbz", false},
		{"Astounding Comics 03.cbz", false},
		{"Astounding Comics 04.cbr", true},
		{"Astounding Comics 05.cbr", true},
		{"Astounding Comics 06.cbr", true},
		{"not-a-series.cbz", false},
	}

	for _, f := range fixtures {
		path := filepath.Join(outDir, f.name)
		file, err := os.Create(path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "create %s: %v\n", path, err)
			os.Exit(1)
		}
		if f.cbr {
			err = writeRAR4(file, "001.jpg", jpegData)
		} else {
			err = writeCBZ(file, "001.jpg", jpegData)
		}
		file.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "write %s: %v\n", path, err)
			os.Exit(1)
		}
		fmt.Printf("wrote %s\n", path)
	}
}

func makeJPEG() ([]byte, error) {
	img := image.NewRGBA(image.Rect(0, 0, 1, 1))
	img.Set(0, 0, color.White)
	var buf bytes.Buffer
	if err := jpeg.Encode(&buf, img, nil); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func writeCBZ(w io.Writer, filename string, data []byte) error {
	zw := zip.NewWriter(w)
	f, err := zw.CreateHeader(&zip.FileHeader{
		Name:   filename,
		Method: zip.Store,
	})
	if err != nil {
		return err
	}
	if _, err := f.Write(data); err != nil {
		return err
	}
	return zw.Close()
}

// crc16 computes CRC-16 with polynomial 0x8005, MSB-first.
func crc16(data []byte) uint16 {
	var crc uint16
	for _, b := range data {
		for i := 0; i < 8; i++ {
			if (crc^(uint16(b)<<8))&0x8000 != 0 {
				crc = (crc << 1) ^ 0x8005
			} else {
				crc <<= 1
			}
			b <<= 1
		}
	}
	return crc
}

// writeRAR4 produces a minimal RAR4 archive containing one stored file.
func writeRAR4(w io.Writer, filename string, data []byte) error {
	// 1. Marker block — fixed RAR4 signature.
	if _, err := w.Write([]byte{0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x00}); err != nil {
		return err
	}

	// 2. Archive header (13 bytes total).
	archBody := []byte{
		0x73,       // HEAD_TYPE
		0x00, 0x00, // HEAD_FLAGS
		0x0D, 0x00, // HEAD_SIZE = 13 (little-endian)
		0x00, 0x00, // RESERVED1
		0x00, 0x00, 0x00, 0x00, // RESERVED2
	}
	if err := binary.Write(w, binary.LittleEndian, crc16(archBody)); err != nil {
		return err
	}
	if _, err := w.Write(archBody); err != nil {
		return err
	}

	// 3. File header.
	nameBytes := []byte(filename)
	headSize := uint16(32 + len(nameBytes))
	fileCRC := crc32.ChecksumIEEE(data)

	var fhBuf bytes.Buffer
	fhBuf.WriteByte(0x74)                                             // HEAD_TYPE
	binary.Write(&fhBuf, binary.LittleEndian, uint16(0x0000))         // HEAD_FLAGS
	binary.Write(&fhBuf, binary.LittleEndian, headSize)               // HEAD_SIZE
	binary.Write(&fhBuf, binary.LittleEndian, uint32(len(data)))      // PACK_SIZE
	binary.Write(&fhBuf, binary.LittleEndian, uint32(len(data)))      // UNP_SIZE
	fhBuf.WriteByte(0x00)                                             // HOST_OS (MS-DOS)
	binary.Write(&fhBuf, binary.LittleEndian, fileCRC)                // FILE_CRC
	binary.Write(&fhBuf, binary.LittleEndian, uint32(0))              // FTIME
	fhBuf.WriteByte(0x14)                                             // UNP_VER (2.0)
	fhBuf.WriteByte(0x30)                                             // METHOD (store)
	binary.Write(&fhBuf, binary.LittleEndian, uint16(len(nameBytes))) // NAME_SIZE
	binary.Write(&fhBuf, binary.LittleEndian, uint32(0x20))           // ATTR
	fhBuf.Write(nameBytes)                                            // filename

	if err := binary.Write(w, binary.LittleEndian, crc16(fhBuf.Bytes())); err != nil {
		return err
	}
	if _, err := w.Write(fhBuf.Bytes()); err != nil {
		return err
	}

	// 4. File data — stored (no compression).
	if _, err := w.Write(data); err != nil {
		return err
	}

	// 5. End-of-archive block (7 bytes total).
	eoaBody := []byte{
		0x7B,       // HEAD_TYPE
		0x00, 0x00, // HEAD_FLAGS
		0x07, 0x00, // HEAD_SIZE = 7
	}
	if err := binary.Write(w, binary.LittleEndian, crc16(eoaBody)); err != nil {
		return err
	}
	if _, err := w.Write(eoaBody); err != nil {
		return err
	}

	return nil
}
