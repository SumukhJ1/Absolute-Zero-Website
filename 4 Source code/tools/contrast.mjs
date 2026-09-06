/* contrast.mjs — every text-on-surface pair the design system can produce,
 * including the hovered and raised surfaces a screenshot audit never sees
 * because nothing is hovered in a screenshot.
 *
 * Parses the OKLCH values straight out of tokens.css so the check can
 * never drift from the palette.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const css = fs.readFileSync(path.join(ROOT, "src/css/tokens.css"), "utf8");

/* --- OKLCH to linear sRGB, then WCAG relative luminance ---------------- */
function oklchToLinearRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ].map((v) => Math.min(Math.max(v, 0), 1));
}
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/* --- read the tokens, scoped -------------------------------------------
 * .canvas re-points half the semantic layer, so a flat parse would have
 * the light-canvas values standing in for the dark ones. Each block is
 * read separately and the canvas map falls back to :root. */
function block(selector) {
  const i = css.indexOf(selector + " {");
  if (i < 0) return "";
  const start = css.indexOf("{", i);
  let depth = 0;
  for (let j = start; j < css.length; j++) {
    if (css[j] === "{") depth++;
    else if (css[j] === "}") { depth--; if (!depth) return css.slice(start, j); }
  }
  return "";
}
function parse(text) {
  const map = new Map();
  for (const m of text.matchAll(/(--[\w-]+):\s*(oklch\([^)]*\)|#[0-9a-fA-F]{3,8}|var\(--[\w-]+\))\s*;/g)) {
    map.set(m[1], m[2]);
  }
  return map;
}
const rootMap = parse(block(":root"));
const canvasMap = new Map([...rootMap, ...parse(block(".canvas"))]);
let raw = rootMap;

function resolve(name, depth = 0) {
  if (depth > 8) return null;
  const v = raw.get(name);
  if (!v) return null;
  const varMatch = v.match(/^var\((--[\w-]+)\)$/);
  if (varMatch) return resolve(varMatch[1], depth + 1);
  const ok = v.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/);
  if (ok) {
    let L = parseFloat(ok[1]);
    if (v.includes("%")) L /= 100;
    return oklchToLinearRgb(L, parseFloat(ok[2]), parseFloat(ok[3]));
  }
  const hex = v.match(/^#([0-9a-fA-F]{6})$/);
  if (hex) {
    const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return [0, 2, 4].map((i) => srgbToLinear(parseInt(hex[1].slice(i, i + 2), 16) / 255));
  }
  return null;
}

/* --- the pairs the system can actually produce ------------------------- */
const inks = [
  ["--ink", 4.5, "body and headings"],
  ["--ink-2", 4.5, "secondary text"],
  ["--ink-3", 4.5, "meta and captions"],
  ["--accent", 4.5, "links and accents"]
];
const darkSurfaces = [
  ["--void", "footer"],
  ["--paper", "page"],
  ["--paper-2", "raised band"],
  ["--paper-3", "card"],
  ["--paper-4", "card, hovered"]
];
const canvasSurfaces = [["--canvas-bg", "reading canvas"], ["--canvas-bg-2", "canvas, raised"]];

/* On the light canvas the semantic layer is re-pointed, so the ink values
   there are the canvas ones. */
const canvasInks = [
  ["--canvas-fg", 4.5, "canvas body"],
  ["--canvas-fg-2", 4.5, "canvas secondary"],
  ["--frost-700", 4.5, "canvas links"]
];

const rows = [];
let fails = 0;

function pair(inkName, need, inkLabel, surfName, surfLabel) {
  const a = resolve(inkName), b = resolve(surfName);
  if (!a || !b) {
    rows.push([`?      `, inkName, surfName, "unresolved"]);
    fails++;
    return;
  }
  const r = ratio(a, b);
  const ok = r >= need;
  if (!ok) fails++;
  rows.push([
    (ok ? "  ok  " : "FAIL  ") + r.toFixed(2).padStart(6) + ":1",
    `${inkLabel} on ${surfLabel}`,
    `needs ${need}`
  ]);
}

for (const [ink, need, label] of inks) {
  for (const [surf, sLabel] of darkSurfaces) pair(ink, need, label, surf, sLabel);
}
raw = canvasMap;
for (const [ink, need, label] of canvasInks) {
  for (const [surf, sLabel] of canvasSurfaces) pair(ink, need, label, surf, sLabel);
}
/* The canvas re-points the whole semantic layer, so check it the same way
   the dark theme is checked, not only its own primitives. */
for (const [ink, need, label] of inks) {
  for (const [surf, sLabel] of [["--paper", "canvas page"], ["--paper-3", "canvas card"], ["--paper-4", "canvas card, hovered"]]) {
    pair(ink, need, label + " (canvas)", surf, sLabel);
  }
}
raw = rootMap;
/* Filled accent button, both themes. */
pair("--ice-06", 4.5, "button label", "--frost-500", "accent fill");
pair("--canvas-bg", 4.5, "button label on canvas", "--frost-700", "canvas accent fill");
/* Focus ring against the surfaces it sits on. Non-text: 3:1. */
for (const [surf, sLabel] of darkSurfaces) pair("--frost-300", 3, "focus ring", surf, sLabel);

for (const r of rows) console.log(r[0] + "   " + r[1].padEnd(40) + r[2]);
console.log(fails ? `\n${fails} contrast pair(s) below target.` : `\nAll ${rows.length} contrast pairs pass.`);
process.exit(fails ? 1 : 0);
