#!/usr/bin/env node
/* build-wp.js — turn the verified static build into the WordPress theme.
 *
 * The theme and the static site are the same markup. Rather than hand-port
 * sixteen pages into PHP and let the two drift, each page's <main> is
 * lifted verbatim into wp/parts/<slug>.html with four kinds of
 * placeholder, and az_part() renders it:
 *
 *   {{URI}}            the theme directory URI
 *   {{HOME}}           the site root
 *   {{OPT:key}}        an editable option (team number, stats, pit URL)
 *   {{REGION:name}}    a live loop over a custom post type
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");
const WP = path.join(ROOT, "wp");
const { site, nav, outreachChildren } = require(path.join(ROOT, "src/lib/config"));

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  mkdir(to);
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
  }
}

/* ------------------------------------------------------------------ *
 * 1. Icons: one source, two languages.                                *
 * ------------------------------------------------------------------ */

const { icons, flakeMark } = require(path.join(ROOT, "src/lib/icons"));

const iconsPhp = `<?php
/**
 * The icon family, generated from src/lib/icons.js by build-wp.js.
 * One stroke voice, 24px viewBox, 1.5 weight, round caps. Brand marks are
 * the only filled paths. Do not edit by hand.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

function az_icons() {
	static $set = null;
	if ( null !== $set ) {
		return $set;
	}
	$set = array(
${Object.entries(icons).map(([k, v]) =>
  `\t\t'${k}' => '${v.replace(/'/g, "\\'")}',`).join("\n")}
	);
	return $set;
}

function az_icon( $name ) {
	$set = az_icons();
	return $set[ $name ] ?? '';
}

/** The team mark. Same geometry as the static build. */
function az_flake_mark( $class = 'flake-mark' ) {
	return str_replace( 'class="flake-mark"', 'class="' . esc_attr( $class ) . '"',
		'${flakeMark().replace(/'/g, "\\'")}' );
}
`;
mkdir(path.join(WP, "inc"));
fs.writeFileSync(path.join(WP, "inc/icons.php"), iconsPhp);

/* ------------------------------------------------------------------ *
 * 2. Page parts.                                                      *
 * ------------------------------------------------------------------ */

/* Literal strings in the markup that become editable options. */
const OPTIONS = [
  [site.email, "az_email"],
  [site.pitUrl, "az_pit_url"],
  [site.parentOrg.ein, "az_parent_ein"],
  [site.season.currentYears, "az_season_years"]
];

function toPart(html) {
  let out = html;

  /* Regions become loops. */
  out = out.replace(
    /<!-- AZ-REGION:([a-z_]+) -->[\s\S]*?<!-- \/AZ-REGION:\1 -->/g,
    (_m, name) => `{{REGION:${name}}}`
  );

  /* Photo-slot comments stay: they tell the team which photograph goes
     where, and they are invisible to visitors. */

  /* Asset and link roots. */
  out = out.replace(/(["'(])\/assets\//g, "$1{{URI}}/assets/");
  out = out.replace(/href="\/(?!\/)/g, 'href="{{HOME}}/');
  out = out.replace(/href="{{HOME}}\/"/g, 'href="{{HOME}}/"');

  /* Editable literals. */
  for (const [value, key] of OPTIONS) {
    if (!value) continue;
    out = out.split(value).join(`{{OPT:${key}}}`);
  }

  return out.trim() + "\n";
}

const pageFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") pageFiles.push(p);
  }
})(DIST);

const slugFor = (p) => {
  const relDir = path.relative(DIST, path.dirname(p)).split(path.sep).filter(Boolean);
  return relDir.length ? relDir.join("-") : "home";
};

mkdir(path.join(WP, "parts"));
let written = 0;
const partIndex = [];

for (const file of pageFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (/http-equiv="refresh"/.test(html)) continue;   // redirect stub
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) continue;
  const slug = slugFor(file);
  fs.writeFileSync(path.join(WP, "parts", slug + ".html"), toPart(m[1]));
  partIndex.push(slug);
  written++;
}

/* ------------------------------------------------------------------ *
 * 3. Assets, shared byte for byte with the static build.              *
 * ------------------------------------------------------------------ */

copyDir(path.join(DIST, "assets"), path.join(WP, "assets"));

console.log(`wp theme: ${written} parts, ${Object.keys(icons).length} icons`);
console.log("  " + partIndex.join("\n  "));

/* ------------------------------------------------------------------ *
 * 4. Seed data. The theme ships the finished site; activation imports *
 *    it so the team edits real content rather than an empty shell.    *
 * ------------------------------------------------------------------ */

const team = require(path.join(ROOT, "src/data/team"));
const sponsors = require(path.join(ROOT, "src/data/sponsors"));
const outreach = require(path.join(ROOT, "src/data/outreach"));
const record = require(path.join(ROOT, "src/data/record"));

const slugify = (s) => String(s).toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const seed = {
  pages: nav.map((n, i) => ({
    slug: n.path === "/" ? "home" : n.path.replace(/^\/|\/$/g, ""),
    title: n.title,
    front: n.path === "/",
    order: i
  })),

  menus: {
    primary: nav.map((n) => ({ label: n.label, title: n.title, path: n.path })),
    footer: nav.slice(1).map((n) => ({ label: n.title, path: n.path })),
    teams: [
      { label: "Open Access library", path: "/outreach/open-access/" },
      { label: "Collaboration Summit", path: "/outreach/ftc-collaboration-summit/" },
      { label: "Book a workshop", path: "/outreach/" }
    ]
  },

  seasons: outreach.seasons.map((s, i) => ({
    slug: s.key, name: s.label, description: s.years, order: i
  })),

  programs: outreachChildren.map((c, i) => ({
    slug: c.path.replace("/outreach/", "").replace(/\/$/, ""),
    title: c.title,
    blurb: c.blurb,
    featured: ["robo-reach", "techstravaganza", "classes-with-curie"]
      .includes(c.path.replace("/outreach/", "").replace(/\/$/, "")),
    order: i
  })),

  workshops: outreach.workshops.map((w, i) => ({
    slug: slugify(w.title) + "-" + w.season,
    title: w.title,
    season: w.season,
    venue: w.venue,
    date: w.date,
    dateISO: w.dateISO || "",
    audience: w.audience || "",
    planned: !!w.planned,
    summary: w.summary || "",
    detail: w.detail || "",
    plan: (w.plan || []).join("\n"),
    video: w.video || "",
    order: i
  })),

  members: []
    .concat(team.coaches.map((c, i) => ({
      slug: slugify(c.name), title: c.name, group: "coach", roles: [],
      line: c.line, bio: c.bio, stale: !!c.stale, order: i
    })))
    .concat(team.students.map((s, i) => ({
      slug: slugify(s.name), title: s.name, group: "student", roles: s.roles,
      line: s.line, bio: "", stale: false, order: i
    })))
    .concat(team.mentors.map((m, i) => ({
      slug: slugify(m.name), title: m.name, group: "mentor", roles: [],
      line: m.line, bio: m.bio, stale: false, order: i
    }))),

  roles: Object.entries(team.roles).map(([slug, name], i) => ({ slug, name, order: i })),

  groups: [
    { slug: "coach", name: "Coaches", order: 0 },
    { slug: "student", name: "Students", order: 1 },
    { slug: "mentor", name: "Mentors", order: 2 }
  ],

  sponsors: sponsors.supporters.map((s, i) => ({
    slug: slugify(s.name), title: s.name, url: s.url, kind: s.kind, order: i
  })),

  tiers: sponsors.tiers.map((t, i) => ({
    slug: t.key, name: t.name, amount: t.amount,
    description: t.benefits.join("\n"), order: i
  })),

  results: record.seasons.flatMap((s) =>
    s.events.map((e, i) => ({
      slug: slugify(s.game + "-" + e.name),
      title: e.name,
      game: s.game,
      years: s.years,
      note: s.note || "",
      awards: e.results.join("\n"),
      order: i
    }))
  )
};

/* The Open Access catalogue, from the same data file the page reads. */
const library = require(path.join(ROOT, "src/data/library"));

seed.shelves = library.groups.map((g, i) => ({
  slug: slugify(g.title),
  name: g.title,
  description: g.blurb,
  order: i
}));

seed.resources = library.groups.flatMap((g, gi) =>
  g.items.map((it, i) => ({
    slug: slugify(it.title),
    title: it.title,
    shelf: slugify(g.title),
    season: it.season,
    kind: it.kind,
    file: it.pending ? "" : (it.href || it.file || ""),
    size: it.size || "",
    external: !!it.external,
    order: gi * 100 + i
  }))
);

const phpValue = (v, indent) => {
  const pad = "\t".repeat(indent);
  if (Array.isArray(v)) {
    if (!v.length) return "array()";
    return "array(\n" + v.map((x) => pad + "\t" + phpValue(x, indent + 1) + ",").join("\n") + "\n" + pad + ")";
  }
  if (v && typeof v === "object") {
    return "array(\n" + Object.entries(v).map(([k, x]) =>
      pad + "\t" + `'${k}' => ` + phpValue(x, indent + 1) + ",").join("\n") + "\n" + pad + ")";
  }
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  return "'" + String(v).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
};

fs.writeFileSync(path.join(WP, "inc/seed-data.php"),
`<?php
/**
 * Content shipped with the theme, generated from src/data by build-wp.js.
 * Imported once on activation. Do not edit by hand: edit the content in
 * wp-admin instead, which is the point of the import.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

function az_seed_data() {
	return ${phpValue(seed, 1)};
}
`);

console.log(`seed data: ${seed.workshops.length} workshops, ${seed.members.length} members, ` +
  `${seed.sponsors.length} sponsors, ${seed.results.length} results, ${seed.programs.length} programmes`);
