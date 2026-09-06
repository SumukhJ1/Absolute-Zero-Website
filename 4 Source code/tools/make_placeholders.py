#!/usr/bin/env python3
"""Generate labelled placeholder imagery for every photo slot in the build.

Scans dist/ for <img> tags pointing at /assets/img/, reads the PHOTO SLOT
comment that precedes each one, and writes a placeholder at the exact
declared dimensions. Every file is named after the real photograph that
belongs there, so dropping in the team's photo folder is a filename match
and nothing else has to change.

Re-run after any build. Existing files are never overwritten unless
--force is passed, so real photographs survive a rebuild.
"""

import hashlib
import math
import os
import re
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
OUT = os.path.join(ROOT, "assets", "img")
FONT_PATH = "/tmp/DaysOne-Regular.ttf"

FORCE = "--force" in sys.argv

IMG_RE = re.compile(
    r'(?:<!--\s*PHOTO SLOT:\s*(?P<shot>[^|]+)\|[^>]*-->\s*)?'
    r'<img[^>]*?src="(?P<src>/assets/img/[^"]+)"[^>]*?'
    r'alt="(?P<alt>[^"]*)"[^>]*?'
    r'width="(?P<w>\d+)"[^>]*?height="(?P<h>\d+)"',
    re.S,
)


def collect():
    slots = {}
    for base, _dirs, files in os.walk(DIST):
        for f in files:
            if not f.endswith(".html"):
                continue
            html = open(os.path.join(base, f), encoding="utf-8").read()
            for m in IMG_RE.finditer(html):
                name = os.path.basename(m.group("src"))
                if name in slots:
                    continue
                slots[name] = {
                    "w": int(m.group("w")),
                    "h": int(m.group("h")),
                    "alt": m.group("alt").strip(),
                    "shot": (m.group("shot") or "").strip(),
                }
    return slots


def seeded(name, lo, hi):
    d = int(hashlib.sha1(name.encode()).hexdigest()[:8], 16)
    return lo + (d % 1000) / 1000.0 * (hi - lo)


def font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except Exception:
        return ImageFont.load_default()


def snowflake(draw, cx, cy, r, colour, width):
    """Six-fold line-art flake, matching the mark used in the nav."""
    for k in range(6):
        a = math.radians(k * 60)
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        draw.line([(cx, cy), (x, y)], fill=colour, width=width)
        for frac, blen in ((0.42, 0.20), (0.68, 0.15), (0.88, 0.10)):
            bx, by = cx + r * frac * math.cos(a), cy + r * frac * math.sin(a)
            for side in (-1, 1):
                a2 = a + side * math.radians(55)
                draw.line(
                    [(bx, by), (bx + r * blen * math.cos(a2), by + r * blen * math.sin(a2))],
                    fill=colour, width=max(1, width - 1),
                )


def field(name, w, h):
    """Dark ice gradient with a seeded off-centre glow and fine grain."""
    hue_shift = seeded(name, -10, 14)
    ang = seeded(name + "a", 0.15, 0.85)
    gx, gy = seeded(name + "x", 0.18, 0.82), seeded(name + "y", 0.14, 0.62)

    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / max(w - 1, 1), yy / max(h - 1, 1)

    ramp = (u * (1 - ang) + v * ang)
    base = np.stack([
        30 + ramp * 26 + hue_shift * 0.5,
        38 + ramp * 33 + hue_shift * 0.9,
        50 + ramp * 44 + hue_shift * 1.7,
    ], axis=-1)

    d = np.sqrt(((u - gx) * (w / max(h, 1)) * 0.9) ** 2 + (v - gy) ** 2)
    glow = np.clip(1 - d / 0.72, 0, 1) ** 2.1
    base += np.stack([glow * 34, glow * 55, glow * 82], axis=-1)

    rng = np.random.default_rng(int(hashlib.sha1(name.encode()).hexdigest()[:8], 16))
    base += rng.normal(0, 2.1, base.shape)

    vig = np.clip(1 - (((u - .5) ** 2 + (v - .5) ** 2) ** .5) * .85, .5, 1)[..., None]
    base *= vig

    return Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB")


def label(im, text, sub):
    w, h = im.size
    d = ImageDraw.Draw(im, "RGBA")
    pad = max(14, int(w * 0.028))
    fs = max(10, min(int(w * 0.021), 20))
    f1, f2 = font(fs), font(max(9, int(fs * 0.82)))

    lines, cur = [], ""
    limit = max(18, int(w / (fs * 0.62)))
    for word in text.split():
        if len(cur) + len(word) + 1 <= limit:
            cur = (cur + " " + word).strip()
        else:
            lines.append(cur)
            cur = word
        if len(lines) == 3:
            break
    if cur and len(lines) < 3:
        lines.append(cur)

    lh = int(fs * 1.42)
    block = lh * len(lines) + int(fs * 1.5)
    d.rectangle([0, h - block - pad * 2, w, h], fill=(8, 11, 15, 165))

    y = h - block - pad
    for ln in lines:
        d.text((pad, y), ln, font=f1, fill=(214, 226, 238, 232))
        y += lh
    d.text((pad, y + 2), sub, font=f2, fill=(106, 159, 197, 205))
    return im


def make_photo(name, spec):
    w, h = spec["w"], spec["h"]
    im = field(name, w, h)
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dr = ImageDraw.Draw(ov)
    r = int(min(w, h) * seeded(name + "r", 0.34, 0.52))
    cx = int(w * seeded(name + "cx", 0.62, 0.86))
    cy = int(h * seeded(name + "cy", 0.30, 0.52))
    snowflake(dr, cx, cy, r, (170, 208, 238, 40), max(2, int(min(w, h) / 240)))
    ov = ov.filter(ImageFilter.GaussianBlur(max(0.5, min(w, h) / 900)))
    im = Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB")

    text = spec["shot"] or spec["alt"] or "Photograph"
    im = label(im, text, "placeholder %d x %d" % (w, h))
    im.save(os.path.join(OUT, name), quality=86, optimize=True)


def make_logo(name, spec):
    """Sponsor marks: a plain light wordmark on transparency, so the wall
    reads correctly until the real vector logos arrive."""
    w, h = spec["w"], spec["h"]
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    text = spec["alt"] or name
    fs = max(12, int(h * 0.28))
    f = font(fs)
    while d.textlength(text, font=f) > w * 0.86 and fs > 9:
        fs -= 1
        f = font(fs)
    tw = d.textlength(text, font=f)
    d.text(((w - tw) / 2, (h - fs * 1.25) / 2), text, font=f, fill=(226, 236, 246, 236))
    d.line([(w * 0.5 - tw / 2, h * 0.5 + fs * 0.82), (w * 0.5 + tw / 2, h * 0.5 + fs * 0.82)],
           fill=(106, 159, 197, 150), width=max(1, int(h / 70)))
    im.save(os.path.join(OUT, name))


def make_favicon():
    for size, fname in ((512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")):
        im = Image.new("RGBA", (size, size), (11, 13, 16, 255))
        d = ImageDraw.Draw(im)
        snowflake(d, size / 2, size / 2, size * 0.36, (106, 159, 197, 255), max(2, size // 42))
        im.save(os.path.join(OUT, fname))

    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        '<rect width="32" height="32" rx="7" fill="#0b0d10"/>'
        '<g fill="none" stroke="#6a9fc5" stroke-width="1.7" stroke-linecap="round">'
        '<path d="M16 4v24M5.6 10 26.4 22M5.6 22 26.4 10"/>'
        '<path d="m16 8.6-2.6-2.3M16 8.6l2.6-2.3M16 23.4l-2.6 2.3M16 23.4l2.6 2.3"/>'
        '<path d="m9.4 12.4-3.5.3M9.4 12.4 8 9.2M22.6 19.6l3.5-.3M22.6 19.6l1.4 3.2"/>'
        '<path d="m9.4 19.6-3.5-.3M9.4 19.6 8 22.8M22.6 12.4l3.5.3M22.6 12.4 24 9.2"/>'
        "</g></svg>"
    )
    open(os.path.join(OUT, "favicon.svg"), "w").write(svg)


def make_og(slots):
    """A single default social card. Real per-page cards can replace it."""
    w, h = 1200, 630
    im = field("og-default.jpg", w, h)
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dr = ImageDraw.Draw(ov)
    snowflake(dr, 980, 300, 250, (150, 195, 230, 34), 3)
    im = Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB")
    d = ImageDraw.Draw(im)
    d.text((72, 236), "Absolute Zero", font=font(86), fill=(240, 246, 252))
    d.text((72, 344), "FIRST Tech Challenge  Team 12096", font=font(34), fill=(178, 200, 220))
    d.text((72, 400), "Northern Virginia", font=font(28), fill=(106, 159, 197))
    d.line([(72, 200), (188, 200)], fill=(106, 159, 197), width=4)
    im.save(os.path.join(OUT, "og-default.jpg"), quality=90, optimize=True)


def main():
    os.makedirs(OUT, exist_ok=True)
    slots = collect()
    made = skipped = 0
    for name, spec in sorted(slots.items()):
        target = os.path.join(OUT, name)
        if os.path.exists(target) and not FORCE:
            skipped += 1
            continue
        if name.endswith(".png"):
            make_logo(name, spec)
        else:
            make_photo(name, spec)
        made += 1
    make_favicon()
    make_og(slots)
    print("placeholders: %d written, %d already present (%d slots)" % (made, skipped, len(slots)))


if __name__ == "__main__":
    main()
