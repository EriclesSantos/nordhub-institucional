#!/usr/bin/env python3
"""Generate Nordhub brand favicons during GitHub Pages build from the original SVG."""
import io
import sys
from pathlib import Path
import cairosvg
from PIL import Image

target = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("dist")
target.mkdir(parents=True, exist_ok=True)
source = Path("public/favicon-square.svg").read_bytes()
raster = cairosvg.svg2png(bytestring=source, output_width=512, output_height=512)
original = Image.open(io.BytesIO(raster)).convert("RGBA")
for size, name in [(48, "favicon-48x48.png"), (192, "favicon-192x192.png"), (180, "apple-touch-icon.png")]:
    icon = original.resize((size, size), Image.Resampling.LANCZOS)
    icon.save(target / name, format="PNG", optimize=True)
original.save(target / "favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])
for name in ("favicon-48x48.png", "favicon-192x192.png", "apple-touch-icon.png", "favicon.ico"):
    assert (target / name).stat().st_size > 200, f"Invalid favicon: {name}"
print("Nördhub favicons generated:", ", ".join(["favicon-48x48.png", "favicon-192x192.png", "apple-touch-icon.png", "favicon.ico"]))
