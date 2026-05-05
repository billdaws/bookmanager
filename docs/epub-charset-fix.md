# EPUB charset fix

## Problem

EPUBs can declare `charset=iso-8859-1` in their HTML `<meta>` tags while the content is
actually UTF-8. Some readers honour the meta tag over the XML declaration, causing smart
quotes and accented characters to render as mojibake (e.g. `'` → `â€™`).

## Fix

The bytes in the file are already correct UTF-8 — only the declaration is wrong. The fix is
to rewrite `charset=iso-8859-1` → `charset=utf-8` in every HTML file inside the EPUB, then
repack.

```sh
# Extract
mkdir /tmp/epub_fix
cd /tmp/epub_fix
unzip "book.epub"

# Fix charset declarations
python3 -c "
import glob, re
for f in glob.glob('OEBPS/Text/*.html'):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    fixed = re.sub(r'charset=iso-8859-1', 'charset=utf-8', content, flags=re.IGNORECASE)
    if fixed != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(fixed)
        print(f'Fixed: {f}')
"

# Repack (mimetype must be first and uncompressed per EPUB spec)
zip -X -0 /tmp/fixed.epub mimetype
zip -r /tmp/fixed.epub META-INF OEBPS
```
