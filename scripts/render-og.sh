#!/bin/sh
# Regenerate og-image.png (1200x630) from scripts/og-image.html using headless Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot="$PWD/og-image.png" "file://$PWD/scripts/og-image.html"
echo "Wrote og-image.png"
