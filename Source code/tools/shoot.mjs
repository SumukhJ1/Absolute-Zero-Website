/* shoot.mjs — render every built page at every width and save screenshots.
 *
 *   node tools/shoot.mjs                    all pages, all widths
 *   node tools/shoot.mjs /outreach/ 1440    one page, one width
 *   node tools/shoot.mjs --full             full-page instead of viewport
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");
const SHOTS = path.join(ROOT, "shots");
const PORT = 8181;

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml",
  ".webmanifest": "application/manifest+json", ".txt": "text/plain"
};

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    let f = path.join(DIST, p);
    if (p.endsWith("/")) f = path.join(f, "index.html");
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      const alt = path.join(DIST, p, "index.html");
      if (fs.existsSync(alt)) f = alt;
      else { res.writeHead(404); return res.end("404"); }
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  }).listen(PORT);
}

function pages() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) walk(abs);
      else if (e.name === "index.html") {
        const rel = "/" + path.relative(DIST, dir).split(path.sep).filter(Boolean).join("/");
        const url = rel === "/" ? "/" : rel + "/";
        const html = fs.readFileSync(abs, "utf8");
        if (/http-equiv="refresh"/.test(html)) continue;  // redirect stub
        out.push(url);
      }
    }
  })(DIST);
  return out.sort();
}

const args = process.argv.slice(2);
const full = args.includes("--full");
const only = args.find((a) => a.startsWith("/"));
const onlyW = args.find((a) => /^\d+$/.test(a));
const WIDTHS = onlyW ? [Number(onlyW)] : [320, 375, 414, 768, 1440];

const server = serve();
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
fs.rmSync(SHOTS, { recursive: true, force: true });
fs.mkdirSync(SHOTS, { recursive: true });

const list = only ? [only] : pages();
const report = [];

for (const url of list) {
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: w < 500 ? 780 : 900 },
      deviceScaleFactor: 1
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

    await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(650);

    const audit = await page.evaluate(() => {
      const de = document.documentElement;
      const horiz = de.scrollWidth - de.clientWidth;

      const clipped = (el) => {
        for (let n = el; n && n !== document.body; n = n.parentElement) {
          const o = getComputedStyle(n);
          if (o.overflow !== "visible" || o.position === "fixed") return true;
        }
        return false;
      };

      /* Affordances must never wrap to two lines. */
      const wrapped = [];
      document.querySelectorAll(".btn, .nav__link, .link-cta, .foot-group a, .segmented__btn, .crumbs a, .child-foot__hub")
        .forEach((el) => {
          const label = (el.textContent || "").trim();
          if (!label) return;
          const r = el.getBoundingClientRect();
          if (!r.height) return;
          const cs = getComputedStyle(el);
          const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
          const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) +
                      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
          if (r.height - pad > lh * 1.75) wrapped.push(label.slice(0, 40));
        });

      /* Anything sticking out of the document, ignoring deliberate clips. */
      const overflowing = [];
      document.querySelectorAll("main *, footer *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || clipped(el)) return;
        if (r.right > de.clientWidth + 2 || r.left < -2) {
          const sel = el.tagName.toLowerCase() +
            (typeof el.className === "string" && el.className.trim()
              ? "." + el.className.trim().split(/\s+/)[0] : "");
          if (!overflowing.includes(sel)) overflowing.push(sel);
        }
      });

      /* Heading order: h1 present, exactly one, and no skipped levels. */
      const hs = [...document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6")]
        .map((h) => Number(h.tagName[1]));
      const headingIssues = [];
      const h1s = hs.filter((n) => n === 1).length;
      if (h1s !== 1) headingIssues.push(`h1 count ${h1s}`);
      for (let i = 1; i < hs.length; i++) {
        if (hs[i] > hs[i - 1] + 1) { headingIssues.push(`h${hs[i-1]} to h${hs[i]}`); break; }
      }

      /* Images without alt text. */
      const noAlt = [...document.querySelectorAll("img")]
        .filter((i) => !i.hasAttribute("alt")).length;

      /* Computed contrast on every visible text node.
         Colours are resolved through a canvas so oklch/oklab computed
         values become real sRGB, and translucent backgrounds are
         composited down to the first opaque ancestor. */
      const cv = document.createElement("canvas");
      cv.width = cv.height = 1;
      const cx = cv.getContext("2d", { willReadFrequently: true });
      const cache = new Map();
      const toRGBA = (css) => {
        if (cache.has(css)) return cache.get(css);
        cx.clearRect(0, 0, 1, 1);
        cx.fillStyle = "#000";
        cx.fillStyle = css;
        cx.fillRect(0, 0, 1, 1);
        const d = cx.getImageData(0, 0, 1, 1).data;
        const out = [d[0], d[1], d[2], d[3] / 255];
        cache.set(css, out);
        return out;
      };
      const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3]));
      const srgb = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
      const lum = (r) => 0.2126 * srgb(r[0]) + 0.7152 * srgb(r[1]) + 0.0722 * srgb(r[2]);

      const bgOf = (el) => {
        const stack = [];
        for (let n = el; n; n = n.parentElement) {
          const c = toRGBA(getComputedStyle(n).backgroundColor);
          if (c[3] > 0) stack.push(c);
          if (c[3] >= 0.999) break;
        }
        let base = [11, 13, 16];
        for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
        return base;
      };

      const lowContrast = [];
      document.querySelectorAll("main p, main li, main h1, main h2, main h3, main h4, main a, main span, main dt, main dd, main cite, main figcaption, main button, main label, footer p, footer a, footer span")
        .forEach((el) => {
          if (!el.textContent.trim() || el.children.length) return;
          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) return;
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.5) return;
          const fgRaw = toRGBA(cs.color);
          const bg = bgOf(el);
          const fg = fgRaw[3] < 1 ? over(fgRaw, bg) : fgRaw;
          const L1 = lum(fg), L2 = lum(bg);
          const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          const px = parseFloat(cs.fontSize);
          const large = px >= 24;
          const need = large ? 3 : 4.5;
          if (ratio < need) lowContrast.push(`${ratio.toFixed(2)}:1 ${px}px "${el.textContent.trim().slice(0, 24)}"`);
        });

      return { horiz, wrapped, overflowing: overflowing.slice(0, 8), headingIssues,
               noAlt, lowContrast: [...new Set(lowContrast)].slice(0, 6) };
    });

    const name = (url === "/" ? "home" : url.replace(/^\/|\/$/g, "").replace(/\//g, "_")) + `_${w}.png`;
    await page.screenshot({ path: path.join(SHOTS, name), fullPage: full });
    report.push({ url, w, ...audit, errors });
    await ctx.close();
  }
}

await browser.close();
server.close();

let bad = 0;
for (const r of report) {
  const issues = [];
  if (r.horiz > 1) issues.push(`H-SCROLL ${r.horiz}px`);
  if (r.wrapped.length) issues.push(`WRAPPED: ${r.wrapped.join(" | ")}`);
  if (r.overflowing.length) issues.push(`OVERFLOW: ${r.overflowing.join(", ")}`);
  if (r.errors.length) issues.push(`JS: ${r.errors.slice(0, 2).join(" | ")}`);
  if (r.headingIssues && r.headingIssues.length) issues.push(`HEADINGS: ${r.headingIssues.join(", ")}`);
  if (r.noAlt) issues.push(`NO-ALT x${r.noAlt}`);
  if (r.lowContrast && r.lowContrast.length) issues.push(`CONTRAST: ${r.lowContrast.join(" | ")}`);
  if (issues.length) { bad++; console.log(`${r.url} @${r.w}  ${issues.join("  ::  ")}`); }
}
console.log(bad ? `\n${bad} viewport(s) with issues.` : `\nClean across ${report.length} renders.`);
fs.writeFileSync(path.join(SHOTS, "report.json"), JSON.stringify(report, null, 2));
