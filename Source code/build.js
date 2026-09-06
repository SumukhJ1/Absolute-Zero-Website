#!/usr/bin/env node
/* build.js — src/ to dist/. No framework, no runtime dependency. */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "dist");

const { site, redirects } = require(path.join(SRC, "lib/config"));
const { render } = require(path.join(SRC, "lib/layout"));

function rm(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function write(p, s) { mkdir(path.dirname(p)); fs.writeFileSync(p, s); }
function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  mkdir(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name), b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

/* ---------------------------------------------------------------- */

rm(OUT);
mkdir(OUT);

/* --- styles: one file, deterministic order ----------------------- */
const cssOrder = ["tokens.css", "base.css", "components.css", "pages.css"];
const css = cssOrder
  .map((f) => {
    const p = path.join(SRC, "css", f);
    return fs.existsSync(p) ? `/* ===== ${f} ===== */\n` + fs.readFileSync(p, "utf8") : "";
  })
  .join("\n\n");
write(path.join(OUT, "assets/css/site.css"), css);

/* --- scripts ------------------------------------------------------ */
copyDir(path.join(SRC, "js"), path.join(OUT, "assets/js"));

/* --- static assets ------------------------------------------------ */
copyDir(path.join(ROOT, "assets/img"), path.join(OUT, "assets/img"));
copyDir(path.join(ROOT, "assets/fonts"), path.join(OUT, "assets/fonts"));

/* --- pages -------------------------------------------------------- */
const pagesDir = path.join(SRC, "pages");
const pageFiles = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".js")).sort();

const pages = [];
for (const file of pageFiles) {
  const mod = require(path.join(pagesDir, file));
  const list = Array.isArray(mod) ? mod : [mod];
  for (const p of list) pages.push(typeof p === "function" ? p() : p);
}

for (const page of pages) {
  const rel = page.path === "/" ? "index.html" : page.path.replace(/^\/|\/$/g, "") + "/index.html";
  write(path.join(OUT, rel), render(page));
}

/* --- redirects (static preview only; WordPress uses real 301s) ----- */
for (const [from, to] of redirects) {
  if (pages.some((p) => p.path === from)) continue;
  const rel = from.replace(/^\/|\/$/g, "") + "/index.html";
  write(path.join(OUT, rel),
`<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved</title><link rel="canonical" href="${site.origin}${to}">
<meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${to}">
</head><body><p>This page has moved to <a href="${to}">${to}</a>.</p></body></html>`);
}

/* --- 404 ---------------------------------------------------------- */
write(path.join(OUT, "404.html"), render({
  path: "/404/", slug: "notfound", navLabel: "Not found",
  title: "Page not found | Absolute Zero FTC #12096",
  description: "That page does not exist. Head back to the home page or browse our outreach programmes.",
  body: `<section class="band band--tall"><div class="wrap-read">
    <h1>That page is not here.</h1>
    <p class="lede">The link may be from the old site. Everything that used to live at an old
    address has been moved, so the page you wanted probably exists at a new one.</p>
    <div class="btn-row" style="margin-top:var(--space-lg)">
      <a class="btn btn--primary" href="/">Home</a>
      <a class="btn btn--ghost" href="/outreach/">Outreach</a>
      <a class="btn btn--ghost" href="/contact/">Contact</a>
    </div>
  </div></section>`
}));

/* --- sitemap ------------------------------------------------------ */
const today = new Date().toISOString().slice(0, 10);
const sitemap =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${site.origin}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${p.priority || (p.path === "/" ? "1.0" : p.path.split("/").length > 3 ? "0.6" : "0.8")}</priority>
  </url>`).join("\n")}
</urlset>`;
write(path.join(OUT, "sitemap.xml"), sitemap);

write(path.join(OUT, "robots.txt"),
`User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`);

write(path.join(OUT, "site.webmanifest"), JSON.stringify({
  name: site.fullName + " FTC #" + site.team,
  short_name: site.name,
  start_url: "/",
  display: "standalone",
  background_color: "#0b0d10",
  theme_color: "#0b0d10",
  icons: [
    { src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" }
  ]
}, null, 2));

console.log(`Built ${pages.length} pages + ${redirects.length} redirects to dist/`);
pages.forEach((p) => console.log("  " + p.path));
