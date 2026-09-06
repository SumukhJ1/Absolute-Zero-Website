# Absolute Zero, FTC Team 12096

A rebuild of azrobotics.org. Seven top-level pages, nine outreach programmes,
a dark single-typeface design, and a WordPress theme that ships the whole site
as editable content.

```
PLAN.md              the design and IA plan, written before any code
CONTENT-TODO.md      everything still waiting on you, generated from the code
INSTALL.md           how to put this on a server

src/                 the source of truth
  css/               tokens, base, components, pages
  js/site.js         the snowflake nav, filters, disclosures, reveals
  lib/               config, icons, markup helpers, the document shell
  data/              roster, sponsors, workshops, record, library
  pages/             one file per page
build.js             src -> dist (the static site)
build-wp.js          dist -> wp  (the WordPress theme)

dist/                the built static site, openable in any browser
wp/                  the WordPress theme
assets/              fonts, and the placeholder imagery

tools/
  make_placeholders.py  regenerates labelled placeholder imagery
  shoot.mjs             screenshots + layout, contrast and heading audit
  interact.mjs          exercises every interactive behaviour
  gates.mjs             the anti-slop and SEO gates
  wp-smoke.php          loads and renders the theme without WordPress
  todo.mjs              regenerates CONTENT-TODO.md
```

## Working on it

```bash
node build.js                 # rebuild the static site into dist/
python3 tools/make_placeholders.py   # fill any new photo slot with a placeholder
node build-wp.js              # regenerate the WordPress theme from dist/
node tools/todo.mjs           # refresh the content checklist
```

Verification, all of which currently passes:

```bash
node tools/gates.mjs          # 23 gates: no emoji, no all-caps, no em-dash,
                              # token discipline, motion rules, SEO, links
node tools/contrast.mjs       # 45 text-on-surface pairs computed from the
                              # tokens, including hovered and raised surfaces
node tools/shoot.mjs          # 80 renders at 320/375/414/768/1440 with a
                              # contrast, overflow and heading audit
node tools/interact.mjs       # 43 checks on the nav, filters and disclosures
php tools/wp-smoke.php        # every theme part, region and template renders
```

Screenshots land in `shots/`.

## Adding the photographs

Every image slot on the site is a named placeholder. `CONTENT-TODO.md` lists all
55 of them with the exact filename, the target size and a description of the
shot. Drop a real file into `assets/img/` under the same name and run
`node build.js`; the placeholder is never regenerated over a real file.

In WordPress the same photographs go on as featured images: the theme falls
back to the shipped placeholder for any post that has none, so the layout never
breaks halfway through the upload.

## The three things worth knowing about the design

**Days One is the only typeface, and it has one weight.** Hierarchy is carried
by size, by a three-step colour ladder, by measure and by tracking instead. If
long body copy ever reads heavy, `--font-body` in `src/css/tokens.css` is a
one-line swap and nothing else in the system depends on the two faces being
the same.

**The whole site is dark, with one light reading canvas per long-form page.**
Mission and Vision and Namma Bhoomi each drop into a full-bleed light band for
their longest section, then return. The semantic tokens are re-pointed on
`.canvas`, so every component works on both surfaces with no extra CSS.

**The nav is one element in three states.** Full bar at the top of the page; a
snowflake capsule that keeps the current page name visible once you scroll past
the hero; and back to the bar when the pointer comes near, when focus enters or
when it is tapped. The outer height never changes, the offset is a transform,
every shared visual is cross-faded, and all ten properties share one curve.
Under `prefers-reduced-motion` the collapse is disabled entirely and the bar
simply stays open.
