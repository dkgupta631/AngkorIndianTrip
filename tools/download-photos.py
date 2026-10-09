"""
Copies every photo/video the site still loads from the old
vishnuinternationaltours.com server into assets/img/photos/
and rewrites the HTML to use the local copies.

Run it ONCE, before the old WordPress site is switched off:

    python tools/download-photos.py

Then commit and push the changes to GitHub.
"""
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img" / "photos"
OUT.mkdir(parents=True, exist_ok=True)
PATTERN = re.compile(r"https://vishnuinternationaltours\.com/wp-content/uploads/[^\"'\s)]+")

pages = sorted(ROOT.glob("*.html"))
urls = sorted({u for p in pages for u in PATTERN.findall(p.read_text(encoding="utf-8"))})
print(f"Found {len(urls)} files to download")

local = {}
for url in urls:
    name = url.rsplit("/", 1)[-1]
    dest = OUT / name
    if not dest.exists():
        print("  downloading", name)
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            dest.write_bytes(r.read())
    local[url] = "assets/img/photos/" + name

for p in pages:
    text = p.read_text(encoding="utf-8")
    new = PATTERN.sub(lambda m: local[m.group(0)], text)
    if new != text:
        p.write_text(new, encoding="utf-8")
        print("  updated", p.name)

print("Done.")
