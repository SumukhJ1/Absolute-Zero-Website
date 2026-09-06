# Absolute Zero FTC #12096 — Website Rebuild Plan

Target: self-hosted WordPress theme. Built and verified as static HTML first, then ported.

---

## 1. Design read

> Reading this as: **an organization site for a student-led FTC robotics team**, addressed to four audiences at once — prospective sponsors, FIRST judges, families of prospective members, and other FTC teams looking for help — with a **cinematic dark, engineered-precision** language, leaning toward a **custom OKLCH palette on the brand's ice-blue**, Days One as the sole typeface, and restrained, motivated motion.

Dials: `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 5` · `VISUAL_DENSITY 3` (Spacious tier).

Rationale: variance 7 because a templated grid is exactly the "vibecoded" complaint; motion 5 because judges and sponsors read this on bad conference wifi and the content must survive `prefers-reduced-motion` intact; density 3 because the #1 piece of feedback was *readability*.

Genre: **atmospheric**. Theme route: **custom** (brief named specific brand colours → custom signal fired).

---

## 2. Non-negotiable constraints from the brief

| Constraint | How it is enforced |
|---|---|
| No emojis anywhere | Zero emoji characters in any template. Icons are inline SVG from a single hand-set 24px/1.5-stroke family. Grep gate in verify step. |
| No ALL-CAPS headings | `text-transform: uppercase` appears **nowhere** in the stylesheet. Grep gate. |
| Not "vibecoded", not AI-looking | Hallmark 58-gate slop test + taste-skill Pre-Flight Check, both run before delivery. No purple gradients, no 3-equal-card grids, no aurora blobs, no gradient headline text, no fake browser chrome, no eyebrow-per-section, no scroll cues, no decorative status dots, no version stamps, no locale strips. |
| Zero em-dashes | taste-skill §9.G. Hard ban, including en-dash as separator. Grep gate on the rendered HTML. |
| Days One only | Single `--font-display` / `--font-body` token, both Days One. Hierarchy is carried by **size, colour, opacity, and measure** because Days One ships one weight (400). See §4. |
| Pure black / white / #6a9fc5 | Near-black `oklch(10.5% .006 240)` reads as black without OLED smear; near-white `oklch(97% .004 240)` reads as white. `#6a9fc5` is the single accent, held under ~3% of any viewport. |
| Dark-mode brand feel | Page Theme Lock: the whole site is dark. Long-form pages get **one** deliberate light reading canvas each (permitted once per page by taste-skill §4.11), entered and left with a full-bleed transition. This is the "mix of 1 and 2" the brief asked for. |
| Centered floating snowflake nav | N10 morph extended: full pill at top of page, collapses past the hero into a snowflake that keeps the active page name visible, expands on proximity / hover / focus / tap. See §6. |
| Readability first | Body 17px / 1.75 leading / 62ch measure / ≥7:1 contrast on reading surfaces. |
| SEO | Per-page metadata, JSON-LD, sitemap, canonical, OG/Twitter, semantic headings. See §8. |

---

## 3. Information architecture

```
/                                 Home
/mission-and-vision/              Mission and Vision
/our-team/                        Our Team
/build-and-program/               Build and Program
/outreach/                        Outreach  (hub + season-filtered workshop index)
    /outreach/ftc-collaboration-summit/
    /outreach/robo-reach/
    /outreach/classes-with-curie/
    /outreach/best-brains/
    /outreach/genius-in-you/
    /outreach/run4charity/           (Best Runners)
    /outreach/techstravaganza/
    /outreach/namma-bhoomi/          international access — sits immediately before Open Access
    /outreach/open-access/           resource library for other FTC teams
/sponsors-and-donors/             Sponsors and Donors
/contact/                         Contact
```

Redirects preserved from the old site (SEO migration is the #1 redesign risk):

| Old | New |
|---|---|
| `/our-team-2/`, `/our-team/` | `/our-team/` |
| `/outreach-workshops/` | `/outreach/` |
| `/sponsors-donors/`, `/sponsors/` | `/sponsors-and-donors/` |
| `/our-socials/` | `/contact/` |
| `/mission/` | `/mission-and-vision/` |
| `/ftc-collaboration-summit-2/` (was 404) | `/outreach/ftc-collaboration-summit/` |
| `/videos/` (was 404) | `/outreach/` |
| all `/YYYY/MM/DD/slug/` posts | kept as workshop CPT entries at the same paths |

Removed: the "Share this" widget, the WordPress.com subscribe bar, the Jetpack like button, the stale search + email-follow widgets on the sponsors page.

---

## 4. Type system — working within one weight

Days One has a single weight (400). Weight contrast is unavailable, so hierarchy comes from four other levers, applied consistently:

1. **Size** — 1.25 major-third scale, five sizes per page maximum.
2. **Colour** — `--ink` (97% L) → `--ink-2` (78%) → `--ink-3` (60%) three-step ladder. Never a fourth.
3. **Measure** — display runs wide, body is capped at 62ch, captions at 40ch.
4. **Optical tracking** — display `-0.025em`, body `+0.004em` (Days One is tight; body needs air).

```
--text-xs    0.8125rem / 13px   captions, meta
--text-sm    0.9375rem / 15px   labels, nav
--text-base  1.0625rem / 17px   body        ← larger than default on purpose
--text-md    1.3125rem / 21px   lede
--text-lg    1.625rem  / 26px   h3
--text-xl    2.0625rem / 33px   h2
--text-2xl   2.625rem  / 42px   h1 on inner pages
--text-display  clamp(2.5rem, 4.2vw + 1rem, 4.75rem)   hero only
```

Line heights: display 1.06, h2/h3 1.18, lede 1.5, body 1.75, caption 1.45.

Fallback stack is metric-matched with `size-adjust` so there is no CLS while Days One loads. Self-hosted woff2, `font-display: swap`, preloaded.

> **Flagged for Goutam:** Days One is a display face and this is the one place the brief fights itself. It is handled, but if long paragraphs ever read heavy, swapping `--font-body` to a neutral companion is a **one-line change** in `tokens.css`. Nothing else needs to move.

---

## 5. Colour system

Anchor hue 240 (the hue of `#6a9fc5`). Every neutral carries a trace of it so nothing reads as flat grey.

```
--void        oklch( 6.5% .004 240)   page floor, footer, gradient end
--paper       oklch(10.5% .006 240)   body surface            ← "pure black"
--paper-2     oklch(14.0% .008 240)   raised sections
--paper-3     oklch(18.0% .010 240)   cards
--rule        oklch(100% 0 0 / .08)   hairline borders — rgba only, never solid grey
--rule-strong oklch(100% 0 0 / .16)   hover / active borders
--ink         oklch(97.0% .004 240)   primary text            ← "pure white"
--ink-2       oklch(78.0% .008 240)   secondary text
--ink-3       oklch(60.0% .010 240)   meta, captions
--frost       #6a9fc5                 the accent
--frost-dim   oklch(58%  .075 240)    accent on light canvas (contrast fix)
--frost-glow  oklch(70%  .09  240 / .18)
```

Light reading canvas (used once per long-form page):
```
--canvas      oklch(96.5% .006 240)
--canvas-ink  oklch(17%   .012 240)
--canvas-ink-2 oklch(38%  .010 240)
```
On the light canvas the accent switches to `--frost-dim`, because `#6a9fc5` on near-white is 2.4:1 and fails AA.

Accent budget: links, active nav state, focus rings, one rule per section, the primary CTA border. Never a large fill.

Contrast targets: body ≥7:1 on both surfaces, secondary text ≥4.5:1 (never 3:1), focus ring ≥3:1, all verified programmatically in the verify step.

---

## 6. The snowflake nav

One `<header>`, three states, one 520ms `cubic-bezier(.16,1,.3,1)` curve for every property.

| State | Trigger | Appearance |
|---|---|---|
| **Bar** | `scrollY < 88px` | Centered floating pill, full link row, wordmark left, "Support the team" right. Detached from the top edge by `translateY`. |
| **Flake** | `scrollY ≥ 88px`, pointer far | Collapses to a compact capsule: the snowflake mark + the **active page name**. The persistent hint the brief asked for, so nobody loses the menu. |
| **Bar (re-expanded)** | pointer within 140px, or focus enters, or tap | Morphs back to the full link row in place. Leaves after a 400ms grace period so it does not flicker. |

The four laws from hallmark's floating-nav reference are honoured:
1. Outer nav height is **constant** across all states. Inner shrink is compensated by outer `padding-block`. No content jump.
2. The visible offset is `transform: translateY()`, never padding or margin.
3. Every shared visual (background, border, backdrop-filter, shadow) is explicitly neutralised in the other state and listed in the transition.
4. One curve, one duration, all ten properties.

Mechanics: `pointermove` and `scroll` listeners are `{passive:true}` and rAF-throttled with a boolean-flip guard. Proximity is measured against the nav's own bounding box, cached and recomputed only on resize. `@media (pointer: coarse)` swaps proximity for tap-to-expand and pins hit targets at 48px. `prefers-reduced-motion` collapses the morph to a 150ms opacity crossfade and disables the auto-collapse entirely (the bar simply stays expanded).

Keyboard: the flake is a real `<button aria-expanded>` controlling the link list; Tab into it expands, Escape collapses, focus never lands on a hidden link. Skip-link precedes it. `focus-not-obscured` is satisfied via `scroll-margin-block-start` on every heading.

Footer: **Ft5 Statement** — one large closing line, then a single hairline meta row (contact, socials, FIRST attribution, RFY attribution, copyright). Explicitly *not* the four-column Product/Company/Resources/Legal grid, and a real replacement for the bare dark-blue band the brief flagged.

---

## 7. Macrostructure per page — no two alike

The site is one build, so nav and footer stay constant across pages (`navigation-consistency` beats per-page diversification). **Section shapes rotate hard.**

| Page | Macrostructure | Why |
|---|---|---|
| Home | 03 Marquee Hero | The statement fills the fold; below it the page becomes something else entirely |
| Mission and Vision | 07 Manifesto | Declaration energy. Fosters FIRST interest, mentors teams, ambassadors — this is a page of beliefs |
| Our Team | 18 Portfolio Grid | Role filter: Build · Program · Outreach · Coaches · Mentors |
| Build and Program | 14 Narrative Workflow | Genuinely ordinal (design → build → program → compete), so numbering is *earned* here and nowhere else |
| Outreach hub | 20 Ecosystem Index | Multiple discovery surfaces: programs, workshops by season, partners |
| Sponsors and Donors | 15 Split Studio | Alternating diptych: the ask on one side, the proof on the other |
| Contact | 12 Letter | First person, warm, no buttons in the fold |
| FTC Collaboration Summit | 13 Index-First | A summit is an agenda; the list *is* the page |
| Robo Reach | 08 Photographic | Look before read |
| Classes with Curie | 06 Conversational FAQ | Parents arrive with questions |
| Best Brains | 01 Bento Grid | Varied spans, real visual variation in 3 of the cells |
| Genius In You | 16 Feature Stack | Sticky left pane, scroll-synced right |
| Run4Charity | 04 Stat-Led | Real numbers only, placeholders where unverified |
| Techstravaganza | 09 Quote-Led | Opens on the team's own 2018 words, which are real |
| Namma Bhoomi | 02 Long Document | The international-access story wants prose |
| Open Access | 11 Catalogue | It is literally an inventory of resources |

Section-layout-repetition rule: within any page, no layout family repeats; no 3 consecutive image+text splits; at most 1 eyebrow per 3 sections (in practice: near zero, since all-caps is banned outright).

---

## 8. SEO and structured data

- Unique `<title>` (≤60ch) and `<meta name="description">` (≤155ch) per page, written for the four audiences, not stuffed.
- Canonical URL on every page. `og:` and `twitter:` cards with a per-page 1200×630 image.
- JSON-LD: `Organization` + `SportsTeam` (site-wide), `BreadcrumbList` (all inner pages), `Event` (each workshop), `FAQPage` (Classes with Curie), `ItemList` (Open Access), `Person` (team roster).
- `sitemap.xml`, `robots.txt`, semantic `h1→h6` with no skips, descriptive alt text on every image, `loading="lazy"` everywhere below the fold and **never** on the LCP element (`fetchpriority="high"` there instead).
- Every image gets explicit `width`/`height` for CLS.
- Internal linking: the Outreach hub links every child; every child links back plus to one sibling.
- Preconnect to the font host, preload the two critical font files, critical CSS inlined.

---

## 9. Content honesty policy

The research pass verified some partnerships and could not verify others. Nothing gets invented.

**Verified and safe to state:** Techstravaganza attendance (2018, team's own blog) · Robotics for Youth as parent nonprofit, EIN 47-5340842 · all award records from the season blogs · FIRST mission/vision/core values verbatim · BIOBUZZ and DECODE season facts · every venue, partner team, and event from the old site.

**Corrections applied:** "Namabhoomi" → **Namma Bhoomi** (run by The Concerned for Working Children) · "Best Runners 5K" → **Run4Charity 1K/5K** organized by Best Runners · "World Robotics Olympiad" → **World Robot Olympiad** · Genius In You described as a private family-run program, **not** a nonprofit · Namma Bhoomi described as having a computer lab and vocational training, **not** robotics programming.

**Requires Goutam's input** — every one of these ships as a visible `TODO` comment in the source plus a line in `CONTENT-TODO.md`, and the page is structured so the real content drops straight in:
- Updated coach bios and a current photo of Coach Dinesh
- The nature and scale of the FTC Collaboration Summit
- What Robo Reach actually is (note: `roboreach.tech` already exists with an overlapping mission)
- Curie and Best Brains course details (filler for now, per instruction)
- The team's actual involvement with Genius In You, Run4Charity, Namma Bhoomi
- The list of booked BIOBUZZ-season workshops with dates and what each will cover
- Whether both coaches are in fact on the RFY board

Stats updated per the brief: **25+ workshops hosted**, **700+ students reached**, **10+ FIRST teams mentored** (replacing "100% Hands-On STEM").

Roster: Nikitha added, role **Outreach**. Role capitalization normalized throughout. Coaches, students, and mentors get real section headings, which the old page lacked.

---

## 10. Build and verify

1. `src/` → Node build script → `dist/` static site. One layout, one token file, one stylesheet, one script bundle. No framework, no CDN dependency at runtime.
2. Placeholder imagery: deterministic seeded photography per slot, each carrying real alt text and a `TODO` comment naming the shot and its target dimensions, so dropping in the real photo folder is a filename swap.
3. Verification with Playwright at **320 / 375 / 414 / 768 / 1440**: horizontal-scroll check, wrapped-affordance check, computed-contrast check on every text node, heading-order check, alt-text check, link crawl, and a full screenshot set.
4. Automated grep gates: no emoji, no `text-transform: uppercase`, no em-dash or en-dash, no raw hex outside `tokens.css`, no `window.addEventListener('scroll')` without passive+rAF, no `100vh`, no `z-index` off-scale.
5. Hallmark 58-gate slop test and taste-skill Pre-Flight Check, both answered explicitly.
6. Port to `wp-theme/`: `style.css`, `functions.php`, `header.php`, `footer.php`, `front-page.php`, `page-*.php`, CPTs for `workshop` / `sponsor` / `member`, taxonomy `season`, `single-workshop.php`, `archive-workshop.php`, `404.php`, `search.php`. Same CSS and JS files, byte for byte.
