/* todo.mjs — build CONTENT-TODO.md from the markers actually in the code,
 * so the checklist can never drift from the site. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");
const SRC = path.join(ROOT, "src");

const html = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") html.push(p);
  }
})(DIST);

/* --- photo slots ------------------------------------------------------- */
const slots = new Map();
for (const f of html) {
  const page = "/" + path.relative(DIST, path.dirname(f)).split(path.sep).filter(Boolean).join("/");
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/<!-- PHOTO SLOT: ([^|]+)\| target (\d+x\d+) \| drop file at assets\/img\/([^\s]+) -->/g)) {
    if (slots.has(m[3])) continue;
    slots.set(m[3], { shot: m[1].trim(), size: m[2], file: m[3], page: page === "/" ? "/" : page + "/" });
  }
}

/* --- visible notes on the site ----------------------------------------- */
const notes = [];
for (const f of html) {
  const page = "/" + path.relative(DIST, path.dirname(f)).split(path.sep).filter(Boolean).join("/");
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/<p class="note">[\s\S]*?<span>([\s\S]*?)<\/span>/g)) {
    notes.push({ page: page === "/" ? "/" : page + "/", text: m[1].replace(/<[^>]+>/g, "").trim() });
  }
}

/* --- source TODOs ------------------------------------------------------- */
const todos = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(js|css)$/.test(e.name)) {
      const lines = fs.readFileSync(p, "utf8").split("\n");
      lines.forEach((l, i) => {
        const m = l.match(/TODO\(goutam\):\s*(.*)/);
        if (m) {
          /* gather the continuation of the comment block */
          let text = m[1];
          for (let j = i + 1; j < lines.length; j++) {
            const cont = lines[j].match(/^\s*\*\s?(.+)$/);
            if (!cont || /^\s*\*\/\s*$/.test(lines[j])) break;
            text += " " + cont[1].trim();
          }
          text = text.replace(/\s*\*\/\s*$/, "").trim();
          todos.push({ file: path.relative(ROOT, p), text });
        }
      });
    }
  }
})(SRC);

/* --- library items awaiting a file -------------------------------------- */
const { groups } = await import(path.join(SRC, "data/library.js")).then((m) => m.default || m)
  .catch(() => ({ groups: [] }));

const byPage = new Map();
for (const s of slots.values()) {
  if (!byPage.has(s.page)) byPage.set(s.page, []);
  byPage.get(s.page).push(s);
}

const out = [];
out.push("# Content still needed");
out.push("");
out.push("Generated from the markers in the code by `node tools/todo.mjs`, so it");
out.push("cannot drift from the site. Everything listed here has a working");
out.push("placeholder in place: nothing is broken while it waits.");
out.push("");
out.push(`Photograph slots: **${slots.size}** · Visible notes on the site: **${notes.length}** · Source TODOs: **${todos.length}**`);
out.push("");

out.push("## 1. Facts and copy to confirm");
out.push("");
out.push("Each of these renders a visible dashed note on the page until it is resolved,");
out.push("so a visitor never sees an unmarked guess.");
out.push("");
for (const n of notes) {
  out.push(`- **${n.page}** ${n.text}`);
}
out.push("");

out.push("## 2. Notes left in the source");
out.push("");
for (const t of todos) {
  out.push(`- **\`${t.file}\`** ${t.text}`);
}
out.push("");

out.push("## 3. Photographs");
out.push("");
out.push("Drop a file with the exact name into `assets/img/` (static build) or upload it");
out.push("as the featured image on the matching post (WordPress). Sizes are the layout's");
out.push("target; anything larger with the same aspect ratio is fine.");
out.push("");
for (const [page, items] of [...byPage.entries()].sort()) {
  out.push(`### ${page}`);
  out.push("");
  out.push("| File | Size | The shot |");
  out.push("|---|---|---|");
  for (const s of items.sort((a, b) => a.file.localeCompare(b.file))) {
    out.push(`| \`${s.file}\` | ${s.size} | ${s.shot} |`);
  }
  out.push("");
}

if (groups.length) {
  out.push("## 4. Open Access documents");
  out.push("");
  out.push("Each entry shows an honest \"file pending\" state until a file is attached.");
  out.push("In WordPress: Open Access library, open the item, paste the media URL into");
  out.push("\"File or link\".");
  out.push("");
  for (const g of groups) {
    const pending = g.items.filter((i) => i.pending);
    if (!pending.length) continue;
    out.push(`**${g.title}**`);
    out.push("");
    for (const i of pending) out.push(`- ${i.title} (${i.season})`);
    out.push("");
  }
}

fs.writeFileSync(path.join(ROOT, "CONTENT-TODO.md"), out.join("\n"));
console.log(`CONTENT-TODO.md: ${slots.size} photo slots, ${notes.length} notes, ${todos.length} source TODOs`);
