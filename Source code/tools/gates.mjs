/* gates.mjs — mechanical checks against the brief and against the
 * anti-slop rules. Every one of these is a thing that would make the site
 * read as generated. Run after every build. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");
const SRC = path.join(ROOT, "src");

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(p);
  }
})(DIST);

const html = files.filter((f) => f.endsWith(".html"))
  .filter((f) => !/http-equiv="refresh"/.test(fs.readFileSync(f, "utf8")));
const css = files.filter((f) => f.endsWith(".css"));
const js = files.filter((f) => f.endsWith(".js"));

const fails = [];
const passes = [];
function gate(name, bad, note) {
  if (bad && bad.length) fails.push({ name, hits: bad.slice(0, 6), note });
  else passes.push(name);
}
const rel = (f) => path.relative(DIST, f);

/* Visible text only: strip tags, comments, script, style, and the
   TODO markers that are deliberately in the source. */
function visibleText(file) {
  return fs.readFileSync(file, "utf8")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
}

/* ---- 1. No emoji, anywhere ---------------------------------------- */
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F000}-\u{1F0FF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/u;
gate("no emoji in any rendered page",
  html.filter((f) => emoji.test(visibleText(f))).map(rel));

/* ---- 2. No ALL-CAPS headings, no uppercase transform -------------- */
gate("no text-transform: uppercase in the stylesheet",
  css.filter((f) => /text-transform\s*:\s*uppercase/.test(fs.readFileSync(f, "utf8"))).map(rel));

const shoutingHeads = [];
for (const f of html) {
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)) {
    const txt = m[1].replace(/<[^>]+>/g, "").trim();
    /* FIRST sets its own game names in caps, and quoting a proper noun is
       not shouting. Everything else must be sentence case. */
    const GAMES = /^(BIOBUZZ|DECODE|POWERPLAY|SKYSTONE|CENTERSTAGE|ROVER RUCKUS|RELIC RECOVERY|INTO THE DEEP|FIRST)\b/;
    const bare = txt.replace(/\s+/g, " ").trim();
    const letters = bare.replace(/[^A-Za-z]/g, "");
    if (letters.length > 6 && letters === letters.toUpperCase() && !GAMES.test(bare)) {
      shoutingHeads.push(`${rel(f)}: ${txt.slice(0, 40)}`);
    }
  }
}
gate("no all-caps headings", shoutingHeads);

/* ---- 3. Zero em-dashes and en-dashes in visible copy -------------- */
const dashes = [];
for (const f of html) {
  const txt = visibleText(f);
  const m = txt.match(/[^\s]{0,18}[\u2013\u2014][^\s]{0,18}/g);
  if (m) dashes.push(`${rel(f)}: ${m.slice(0, 2).join(" | ")}`);
}
gate("zero em-dashes or en-dashes in visible copy", dashes);

/* ---- 4. Straight quotes and three-dot ellipsis -------------------- */
const straight = [];
for (const f of html) {
  const txt = visibleText(f);
  if (/\.\.\./.test(txt)) straight.push(`${rel(f)}: three-dot ellipsis`);
  if (/\s"[A-Za-z]/.test(txt)) straight.push(`${rel(f)}: straight quote`);
}
gate("typographic quotes and ellipsis", straight);

/* ---- 5. Token discipline: no raw colour outside tokens.css -------- */
const rawColour = [];
for (const f of css) {
  const src = fs.readFileSync(f, "utf8");
  const body = src.split("/* ===== base.css =====")[1] || "";
  for (const m of body.matchAll(/#[0-9a-fA-F]{3,8}\b|(?<!-)\brgb\(|(?<!-)\bhsl\(/g)) {
    const line = body.slice(0, m.index).split("\n").length;
    rawColour.push(`${rel(f)} (after tokens) line ~${line}: ${m[0]}`);
  }
}
gate("no raw colour values outside the token block", rawColour);

const inlineColour = [];
for (const f of html) {
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/style="[^"]*(?:#[0-9a-fA-F]{3,8}|rgb\(|oklch\()/g)) {
    inlineColour.push(`${rel(f)}: ${m[0].slice(0, 50)}`);
  }
}
gate("no inline colour in markup", inlineColour);

/* ---- 6. Motion and layout discipline ------------------------------ */
const cssAll = css.map((f) => fs.readFileSync(f, "utf8")).join("\n");
gate("no browser-default easing",
  [/transition[^;]*\bease\b(?!-)/, /transition[^;]*\bease-in-out\b(?!\))/]
    .filter((re) => re.test(cssAll.replace(/var\(--ease[^)]*\)/g, "TOKEN"))).map(String));
gate("no bounce or overshoot easing",
  /cubic-bezier\(\s*[\d.]+\s*,\s*1\.[1-9]/.test(cssAll) ? ["overshoot cubic-bezier"] : []);
gate("no transition: all", /transition:\s*all\b/.test(cssAll) ? ["transition: all"] : []);
gate("no 100vh (dvh only)", /:\s*100vh|height:\s*100vh/.test(cssAll) ? ["100vh"] : []);
gate("no 100vw widths", /width:\s*100vw/.test(cssAll) ? ["100vw"] : []);
gate("no overflow-x: hidden on the root",
  /\b(html|body)\b[^{]*\{[^}]*overflow-x:\s*hidden/.test(cssAll) ? ["overflow-x: hidden"] : []);
gate("no ad-hoc z-index",
  [...cssAll.matchAll(/z-index:\s*(\d+)/g)].map((m) => m[1]).filter((v) => Number(v) > 6));
gate("no italic display type", /font-style:\s*italic/.test(
  cssAll.replace(/em,\s*i \{ font-style: italic; \}/, "")) ? ["italic"] : []);
gate("no gradient text", /background-clip:\s*text|-webkit-background-clip:\s*text/.test(cssAll) ? ["gradient text"] : []);

/* ---- 7. Script discipline ------------------------------------------ */
const jsAll = js.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const scrollListeners = [...jsAll.matchAll(/addEventListener\(\s*["']scroll["'][^)]*\)/g)].map((m) => m[0]);
gate("every scroll listener is passive",
  scrollListeners.filter((s) => !/passive:\s*true/.test(s)));
gate("scroll work is rAF-throttled",
  /requestAnimationFrame/.test(jsAll) ? [] : ["no requestAnimationFrame found"]);
gate("reduced motion is honoured in script",
  /prefers-reduced-motion/.test(jsAll) ? [] : ["no reduced-motion query"]);

/* ---- 8. Accessibility and SEO -------------------------------------- */
const seo = [];
for (const f of html) {
  const src = fs.readFileSync(f, "utf8");
  const title = (src.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (src.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  if (!title) seo.push(`${rel(f)}: no title`);
  else if (title.length > 68) seo.push(`${rel(f)}: title ${title.length} chars`);
  if (!desc) seo.push(`${rel(f)}: no description`);
  else if (desc.length > 165) seo.push(`${rel(f)}: description ${desc.length} chars`);
  if (!/rel="canonical"/.test(src)) seo.push(`${rel(f)}: no canonical`);
  if (!/property="og:image"/.test(src)) seo.push(`${rel(f)}: no og:image`);
  if (!/application\/ld\+json/.test(src)) seo.push(`${rel(f)}: no structured data`);
  if ((src.match(/<h1[\s>]/g) || []).length !== 1) seo.push(`${rel(f)}: h1 count`);
  if (!/class="skip-link"/.test(src)) seo.push(`${rel(f)}: no skip link`);
  for (const m of src.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) seo.push(`${rel(f)}: img without alt`);
  for (const m of src.matchAll(/<img\b(?![^>]*\bwidth=)[^>]*>/g)) seo.push(`${rel(f)}: img without width`);
  for (const m of src.matchAll(/target="_blank"(?![^>]*rel=)/g)) seo.push(`${rel(f)}: _blank without rel`);
}
gate("per-page SEO and accessibility metadata", seo);

/* ---- 9. Internal links all resolve --------------------------------- */
const known = new Set(html.map((f) => {
  const d = path.dirname(rel(f));
  return d === "." ? "/" : "/" + d.split(path.sep).join("/") + "/";
}));
for (const f of files) {
  const r = "/" + rel(f).split(path.sep).join("/");
  known.add(r);
  if (r.endsWith("/index.html")) known.add(r.replace(/index\.html$/, ""));
}
const broken = [];
for (const f of html) {
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = m[1];
    if (!known.has(target) && !known.has(target + "/") && !known.has(target.replace(/\/$/, ""))) {
      broken.push(`${rel(f)} -> ${target}`);
    }
  }
}
gate("every internal link resolves", [...new Set(broken)]);

/* ---- 10. Banned marketing language ---------------------------------- */
const cliches = [
  "cutting-edge", "state-of-the-art", "seamless", "unleash", "supercharge",
  "empower", "next-generation", "revolutioniz", "game-chang", "in today's",
  "elevate your", "take it to the next level", "passionate about", "world-class",
  "leverage", "synerg", "best-in-class", "innovative solution", "dive into",
  "delve into", "it's not just", "more than just", "at the end of the day"
];
const found = [];
for (const f of html) {
  const txt = visibleText(f).toLowerCase();
  for (const c of cliches) if (txt.includes(c)) found.push(`${rel(f)}: "${c}"`);
}
gate("no marketing cliches", found);

/* ---- 11. Section-shape variety across pages ------------------------- */
const shapes = new Map();
for (const f of html) {
  const src = fs.readFileSync(f, "utf8");
  const key = [...src.matchAll(/class="(?:band[^"]*)"/g)].length + ":" +
              [...src.matchAll(/class="(split[^"]*)"/g)].length;
  if (!shapes.has(key)) shapes.set(key, []);
  shapes.get(key).push(rel(f));
}
gate("pages do not share an identical section skeleton",
  [...shapes.entries()].filter(([, v]) => v.length > 3).map(([k, v]) => `${k}: ${v.join(", ")}`));

/* ---- report --------------------------------------------------------- */
console.log(`\n${passes.length} gates passed.\n`);
for (const p of passes) console.log("  ok   " + p);
if (fails.length) {
  console.log("");
  for (const f of fails) {
    console.log(`FAIL   ${f.name}`);
    for (const h of f.hits) console.log("         " + h);
  }
  console.log(`\n${fails.length} gate(s) failed.`);
  process.exit(1);
}
console.log("\nAll gates clean.");
