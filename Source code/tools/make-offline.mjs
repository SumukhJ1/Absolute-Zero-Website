/* make-offline.mjs — a copy of the built site with relative links, so
 * index.html opens by double-click with no server at all.
 *
 * The real site uses root-relative URLs (/outreach/), which is correct on
 * a server and broken on file://. This rewrites every internal link and
 * asset reference to a path relative to the page it sits on.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "dist");
const OUT = path.join(ROOT, "dist-offline");

fs.rmSync(OUT, { recursive: true, force: true });

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}
copyDir(SRC, OUT);

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(OUT);

/* Redirect stubs are meta-refresh shims that map the old azrobotics.org URLs
 * onto the new ones. They belong on a live server; offline they only clutter
 * the folder with directories that look like real, duplicate pages. Drop the
 * whole directory for each one. */
let stubs = 0;
for (const file of pages.slice()) {
  const html = fs.readFileSync(file, "utf8");
  if (!/http-equiv="refresh"/.test(html)) continue;
  fs.rmSync(path.dirname(file), { recursive: true, force: true });
  pages.splice(pages.indexOf(file), 1);
  stubs++;
}

let rewritten = 0;

for (const file of pages) {
  const depth = path.relative(OUT, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const up = depth === 0 ? "" : "../".repeat(depth);
  let html = fs.readFileSync(file, "utf8");

  /* Internal page links: /foo/ and /foo/#bar and / itself. */
  html = html.replace(/(href|action)="\/([^"]*)"/g, (m, attr, rest) => {
    if (rest.startsWith("/")) return m;                    // protocol-relative
    if (/^assets\//.test(rest)) return `${attr}="${up}${rest}"`;
    if (rest === "") return `${attr}="${up}index.html"`;
    const [pathPart, hash = ""] = rest.split("#");
    const clean = pathPart.replace(/\/$/, "");
    if (!clean) return `${attr}="${up}index.html${hash ? "#" + hash : ""}"`;
    if (/\.[a-z0-9]+$/i.test(clean)) return `${attr}="${up}${clean}"`;
    return `${attr}="${up}${clean}/index.html${hash ? "#" + hash : ""}"`;
  });

  /* Assets. */
  html = html.replace(/(src|srcset)="\/(?!\/)([^"]*)"/g, (m, attr, rest) => `${attr}="${up}${rest}"`);
  html = html.replace(/url\("\/(?!\/)([^"]*)"\)/g, (m, rest) => `url("${up}${rest}")`);

  /* The crossorigin font preload is refused under file://, which logs an
     error even though the @font-face itself loads fine. Drop it here. */
  html = html.replace(/\n?<link rel="preload" as="font"[^>]*>/g, "");

  /* A note at the top of the source, so nobody deploys this copy. */
  html = html.replace(
    "<head>",
    "<head>\n<!-- OFFLINE COPY. Links are relative so this opens by double-click.\n" +
    "     Do not upload this folder to a server: use the WordPress theme. -->"
  );

  fs.writeFileSync(file, html);
  rewritten++;
}

/* The sitemap and manifest point at the live domain and mean nothing here. */
for (const junk of ["sitemap.xml", "robots.txt"]) {
  fs.rmSync(path.join(OUT, junk), { force: true });
}

console.log(`offline copy: ${rewritten} pages rewritten to relative links, ${stubs} redirect stubs dropped`);
