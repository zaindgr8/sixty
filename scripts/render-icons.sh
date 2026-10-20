#!/bin/sh
# Regenerate all Sixty favicon and app icon sizes from scripts/icon-render.html
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

echo "1. Rendering 512x512 master PNG via headless Chrome..."
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=512,512 \
  --screenshot="$PWD/favicon-512x512.png" "file://$PWD/scripts/icon-render.html"

echo "2. Generating standard downsampled sizes using macOS sips..."
sips -z 16 16 favicon-512x512.png --out favicon-16x16.png >/dev/null
sips -z 32 32 favicon-512x512.png --out favicon-32x32.png >/dev/null
sips -z 48 48 favicon-512x512.png --out favicon-48x48.png >/dev/null
sips -z 96 96 favicon-512x512.png --out favicon-96x96.png >/dev/null
sips -z 144 144 favicon-512x512.png --out favicon-144x144.png >/dev/null
sips -z 180 180 favicon-512x512.png --out apple-touch-icon.png >/dev/null
sips -z 192 192 favicon-512x512.png --out favicon-192x192.png >/dev/null

echo "3. Packing 16x16, 32x32, 48x48 into favicon.ico..."
python3 -c "
import struct, subprocess

def png_to_ico(png_paths, out_path):
    images = []
    for p in png_paths:
        with open(p, 'rb') as f:
            data = f.read()
        dim = subprocess.check_output(['sips', '-g', 'pixelWidth', p]).decode()
        w = int(dim.strip().split()[-1])
        images.append((w, data))
    
    header = struct.pack('<HHH', 0, 1, len(images))
    offset = 6 + 16 * len(images)
    entries = []
    data_blobs = []
    for w, data in images:
        width_byte = 0 if w >= 256 else w
        height_byte = width_byte
        size = len(data)
        entry = struct.pack('<BBBBHHII', width_byte, height_byte, 0, 0, 1, 32, size, offset)
        entries.append(entry)
        data_blobs.append(data)
        offset += size
    
    with open(out_path, 'wb') as f:
        f.write(header + b''.join(entries) + b''.join(data_blobs))

png_to_ico(['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png'], 'favicon.ico')
"

echo "Done! Generated:"
ls -lh favicon.ico favicon-*.png apple-touch-icon.png
