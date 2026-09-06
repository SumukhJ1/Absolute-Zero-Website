/* interact.mjs — exercise every interactive behaviour and assert on it.
 * Nav island (scroll collapse, proximity expand, keyboard, Escape),
 * mobile disclosure, season filter, role filter, accordion, reduced motion.
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");
const PORT = 8211;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".woff2": "font/woff2", ".woff": "font/woff" };

const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split("?")[0]);
  let f = path.join(DIST, p);
  if (p.endsWith("/")) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "text/plain" });
  fs.createReadStream(f).pipe(r);
}).listen(PORT);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const results = [];
const check = (name, pass, detail) => results.push({ name, pass: !!pass, detail: detail || "" });

async function open(url, opts) {
  const ctx = await browser.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts));
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  return { ctx, page };
}

/* ---- 1. Nav island: scroll collapse ------------------------------- */
{
  const { ctx, page } = await open("/outreach/");
  const nav = page.locator("[data-nav]");

  check("nav starts expanded", !(await nav.evaluate((n) => n.classList.contains("is-flake"))));

  const h0 = await nav.evaluate((n) => n.getBoundingClientRect().height);

  await page.mouse.move(1400, 860);           // pointer far from the nav
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(900);
  check("collapses to flake past threshold", await nav.evaluate((n) => n.classList.contains("is-flake")));

  const h1 = await nav.evaluate((n) => n.getBoundingClientRect().height);
  check("nav outer height is constant", Math.abs(h0 - h1) < 0.5, `${h0} vs ${h1}`);

  const hint = await page.locator(".nav__flake-label").innerText();
  check("flake keeps the active page name", hint.trim() === "Outreach", hint);

  const flakeVisible = await page.locator(".nav__flake").evaluate((e) => Number(getComputedStyle(e).opacity) > 0.9);
  check("flake is visible when collapsed", flakeVisible);

  /* proximity expand */
  const box = await page.locator(".nav__inner").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height + 60);
  await page.waitForTimeout(800);
  check("expands on pointer proximity", await nav.evaluate((n) => n.classList.contains("is-open")));

  /* leaves again after the grace period */
  await page.mouse.move(1400, 860);
  await page.waitForTimeout(1200);
  check("re-collapses when the pointer leaves", !(await nav.evaluate((n) => n.classList.contains("is-open"))));

  /* the collapsed bar must be out of the tab order */
  const barInert = await page.locator(".nav__bar").evaluate((e) => e.inert === true);
  check("collapsed link row is inert", barInert);

  /* keyboard: activate the flake, focus lands on the first link */
  await page.locator(".nav__flake").focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(700);
  check("Enter on the flake expands it", await nav.evaluate((n) => n.classList.contains("is-open")));
  const focused = await page.evaluate(() => document.activeElement.className);
  check("focus moves into the link row", /nav__link/.test(focused), focused);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);
  check("Escape collapses it again", !(await nav.evaluate((n) => n.classList.contains("is-open"))));

  /* scrolling back to the top restores the bar */
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  check("returns to the bar at the top of the page", !(await nav.evaluate((n) => n.classList.contains("is-flake"))));

  await ctx.close();
}

/* ---- 2. Reduced motion: the island never collapses ---------------- */
{
  const { ctx, page } = await open("/outreach/", { reducedMotion: "reduce" });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(600);
  const flake = await page.locator("[data-nav]").evaluate((n) => n.classList.contains("is-flake"));
  check("reduced motion keeps the nav expanded", !flake);
  const barInert = await page.locator(".nav__bar").evaluate((e) => e.inert === true);
  check("reduced motion keeps the links reachable", !barInert);
  await ctx.close();
}

/* ---- 3. Mobile disclosure ----------------------------------------- */
{
  const { ctx, page } = await open("/outreach/", {
    viewport: { width: 375, height: 780 }, hasTouch: true, isMobile: true
  });
  const nav = page.locator("[data-nav]");
  const toggle = page.locator(".nav__toggle");
  check("hamburger is visible on a phone", await toggle.isVisible());
  check("desktop CTA is hidden on a phone", !(await page.locator(".nav__cta").isVisible()));

  await toggle.tap();
  await page.waitForTimeout(600);
  check("tapping opens the menu panel", await nav.evaluate((n) => n.classList.contains("is-menu-open")));
  check("menu links become visible", await page.locator(".nav__link").first().isVisible());
  check("toggle reports expanded", (await toggle.getAttribute("aria-expanded")) === "true");

  const tapTargets = await page.evaluate(() =>
    [...document.querySelectorAll(".nav__link, .nav__toggle")]
      .map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); })
      .filter((v) => v > 0)
  );
  check("all nav tap targets clear 44px", tapTargets.every((v) => v >= 43.5), JSON.stringify(tapTargets));

  await toggle.tap();
  await page.waitForTimeout(500);
  check("tapping again closes it", !(await nav.evaluate((n) => n.classList.contains("is-menu-open"))));
  await ctx.close();
}

/* ---- 4. Season filter, default DECODE ----------------------------- */
{
  const { ctx, page } = await open("/outreach/");
  const selected = await page.locator('[data-filter-group="season"] [aria-selected="true"]').innerText();
  check("season filter defaults to DECODE", selected.trim() === "DECODE", selected);

  /* Assert on what the browser actually paints, not on the property:
     an author display rule can override [hidden] and did once. */
  const visible = () => page.evaluate(() =>
    [...document.querySelectorAll("#ws-list .ws")]
      .filter((e) => getComputedStyle(e).display !== "none").length);
  const decodeCount = await visible();
  check("DECODE workshops are shown", decodeCount > 0, `${decodeCount} shown`);

  const allSeasons = await page.evaluate(() =>
    [...document.querySelectorAll("#ws-list .ws")]
      .filter((e) => getComputedStyle(e).display !== "none")
      .every((e) => e.dataset.season === "decode"));
  check("only DECODE workshops are painted", allSeasons && decodeCount === 4, `${decodeCount} painted`);

  await page.locator('[data-filter-group="season"] [data-value="biobuzz"]').click();
  await page.waitForTimeout(300);
  const bio = await page.evaluate(() =>
    [...document.querySelectorAll("#ws-list .ws")]
      .filter((e) => getComputedStyle(e).display !== "none")
      .every((e) => e.dataset.season === "biobuzz"));
  check("switching season filters correctly", bio);
  check("the URL records the chosen season", page.url().includes("season=biobuzz"), page.url());

  /* Arrow keys move selection, and clicking must not scroll-jump. */
  const yBefore = await page.evaluate(() => window.scrollY);
  await page.locator('[data-filter-group="season"] [data-value="biobuzz"]').press("ArrowRight");
  await page.waitForTimeout(300);
  const yAfter = await page.evaluate(() => window.scrollY);
  check("arrow keys move the selection",
    (await page.locator('[data-filter-group="season"] [aria-selected="true"]').innerText()).trim() !== "BIOBUZZ");
  check("filtering does not scroll-jump", Math.abs(yBefore - yAfter) < 4, `${yBefore} to ${yAfter}`);

  /* Every workshop shows its summary with nothing behind a read-more. */
  const hiddenSummaries = await page.evaluate(() =>
    [...document.querySelectorAll("#ws-list .ws")].filter((e) => getComputedStyle(e).display !== "none")
      .filter((e) => { const p = e.querySelector(".ws__text > p"); return !p || !p.offsetHeight; }).length);
  check("no workshop summary is collapsed", hiddenSummaries === 0);

  const withPhotos = await page.evaluate(() =>
    [...document.querySelectorAll("#ws-list .ws")]
      .filter((e) => getComputedStyle(e).display !== "none" && e.querySelector("img")).length);
  check("each season shows photographs up front", withPhotos >= 2, `${withPhotos} with images`);
  await ctx.close();
}

/* ---- 5. Role filter on the roster --------------------------------- */
{
  const { ctx, page } = await open("/our-team/");
  const all = await page.evaluate(() =>
    [...document.querySelectorAll("#roster .member")]
      .filter((e) => getComputedStyle(e).display !== "none").length);
  await page.locator('[data-filter-group="role"] [data-value="program"]').click();
  await page.waitForTimeout(250);
  const prog = await page.evaluate(() =>
    [...document.querySelectorAll("#roster .member")]
      .filter((e) => getComputedStyle(e).display !== "none")
      .every((e) => e.dataset.role.split(" ").includes("program")));
  const progCount = await page.evaluate(() =>
    [...document.querySelectorAll("#roster .member")]
      .filter((e) => getComputedStyle(e).display !== "none").length);
  check("role filter narrows the roster", prog && progCount > 0 && progCount < all, `${progCount} of ${all}`);

  const live = await page.locator("[data-filter-live]").innerText();
  check("the filter announces the result", /\d+ items? shown/.test(live), live);
  await ctx.close();
}

/* ---- 6. Accordion -------------------------------------------------- */
{
  const { ctx, page } = await open("/outreach/classes-with-curie/");
  const first = page.locator(".qa__q").first();
  const second = page.locator(".qa__q").nth(1);
  check("first question opens by default", (await first.getAttribute("aria-expanded")) === "true");
  check("later questions start closed", (await second.getAttribute("aria-expanded")) === "false");

  const closedH = await page.locator(".qa__a").nth(1).evaluate((e) => e.getBoundingClientRect().height);
  await second.click();
  await page.waitForTimeout(600);
  const openH = await page.locator(".qa__a").nth(1).evaluate((e) => e.getBoundingClientRect().height);
  check("clicking expands the answer", openH > closedH + 10, `${closedH} to ${openH}`);
  check("aria-expanded flips", (await second.getAttribute("aria-expanded")) === "true");
  await ctx.close();
}

/* ---- 7. No-JS fallback -------------------------------------------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${PORT}/our-team/`, { waitUntil: "load" });
  const visible = await page.evaluate ? null : null;
  const shown = await page.locator("#roster .member").count();
  check("roster renders without JavaScript", shown > 0, `${shown} members`);
  const navLinks = await page.locator(".nav__link").count();
  check("navigation works without JavaScript", navLinks === 7, `${navLinks} links`);
  await ctx.close();
}

/* ---- 8. Focus visibility ------------------------------------------- */
{
  const { ctx, page } = await open("/");
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => {
    const el = document.activeElement;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      cls: el.className, top: r.top,
      ring: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
      width: parseFloat(cs.outlineWidth),
      style: cs.outlineStyle,
      /* The ring must appear instantly. A transition list that mentions
         outline would fade it in for keyboard users. */
      transitions: cs.transitionProperty
    };
  });
  check("first Tab reaches the skip link", /skip-link/.test(skip.cls), skip.cls);
  check("skip link becomes visible on focus", skip.top >= 0, String(skip.top));
  check("focus ring is drawn", skip.style === "solid" && skip.width >= 2, skip.ring);
  check("focus ring is never transitioned", !/outline|all/.test(skip.transitions), skip.transitions.slice(0, 50));

  /* And on a card, which clips its own overflow: an inset ring would be
     cropped there, which is why the ring is an outline. */
  const cardRing = await page.evaluate(() => {
    const el = document.querySelector(".mosaic-tile");
    if (!el) return null;
    el.focus();
    const cs = getComputedStyle(el);
    return { style: cs.outlineStyle, width: parseFloat(cs.outlineWidth), t: cs.transitionProperty };
  });
  check("focus ring survives on a clipping card",
    cardRing && cardRing.style === "solid" && cardRing.width >= 2 && !/outline|all/.test(cardRing.t),
    JSON.stringify(cardRing));
  await ctx.close();
}

await browser.close();
srv.close();

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? "  ok  " : "FAIL  "} ${r.name}${r.detail ? "   (" + r.detail + ")" : ""}`);
}
console.log(failed ? `\n${failed} of ${results.length} checks failed.` : `\nAll ${results.length} interaction checks passed.`);
process.exit(failed ? 1 : 0);
