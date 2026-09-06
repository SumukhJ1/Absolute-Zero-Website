# Deploying

Two ways to put this online. The static build is for reviewing and for a fast
free host; the WordPress theme is the one you asked for and the one the team
will maintain.

---

## A. Look at it right now, no server

Open `dist/index.html` in a browser. Most of it works, but the pages are
separate folders, so use a local server to get the internal links right:

```bash
cd dist
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

## B. WordPress, self-hosted

### 1. Requirements

- WordPress 6.4 or newer, PHP 8.0 or newer
- **Self-hosted**, or WordPress.com Business/Commerce. The current site is on a
  WordPress.com plan that cannot install a custom theme, so this is a move.
- Pretty permalinks. The theme sets `/%postname%/` on activation if the site is
  still on plain permalinks.

### 2. Install

`absolute-zero-theme.zip` is the whole theme.

**Appearance → Themes → Add New → Upload Theme →** choose the zip → Install →
Activate.

On activation the theme imports itself:

| Created | Count |
|---|---|
| Pages | 7, with Home set as the front page |
| Outreach programmes | 9 |
| Workshops | 30, filed under four seasons |
| Team members | 19, in three groups with roles |
| Sponsors | 7 |
| Open Access library items | 16, across 5 shelves |
| Competition results | 17 event records |
| Menus | 3, assigned to their locations |

The import never overwrites anything that already exists, so it is safe to run
twice. **Appearance → AZ content** re-runs it and shows the current counts.

### 3. Point the old URLs at the new ones

The theme carries the full redirect map in `inc/redirects.php` and applies it on
any 404, so this works with no configuration. If you would rather Apache handle
it before WordPress boots, add this to `.htaccess` above the WordPress block:

```apache
Redirect 301 /our-team-2/                /our-team/
Redirect 301 /outreach-workshops/        /outreach/
Redirect 301 /sponsors-donors/           /sponsors-and-donors/
Redirect 301 /sponsors/                  /sponsors-and-donors/
Redirect 301 /our-socials/               /contact/
Redirect 301 /mission/                   /mission-and-vision/
Redirect 301 /ftc-collaboration-summit-2/ /outreach/ftc-collaboration-summit/
Redirect 301 /videos/                    /outreach/
```

On nginx:

```nginx
location = /our-team-2/         { return 301 /our-team/; }
location = /outreach-workshops/ { return 301 /outreach/; }
location = /sponsors-donors/    { return 301 /sponsors-and-donors/; }
location = /our-socials/        { return 301 /contact/; }
location = /mission/            { return 301 /mission-and-vision/; }
```

The ten old blog-post URLs are handled by the theme's map only; leave those to
it rather than duplicating them here.

### 4. After activating

1. **Settings → Reading** confirm Home is the front page.
2. **Appearance → Customize → Absolute Zero** holds the team number, the season
   names, the four outreach figures, the parent-organisation details and the
   social links. Everything a visitor sees as a number is here.
3. **Appearance → Menus** the three menus are built and assigned. Reorder the
   primary one freely, but keep the labels short: the bar has to fit on one line
   at desktop, which is why they read "Mission" and not "Mission and Vision".
4. Upload the team photographs as featured images. `CONTENT-TODO.md` lists every
   slot. Until then the shipped placeholders render, labelled with the shot
   they are waiting for.
5. Set **Settings → General → Site Icon** if you want the favicon in the media
   library rather than the one the theme ships.

### 5. What the team edits, and where

| To change | Go to |
|---|---|
| Add a workshop | Workshops → Add workshop, then pick a season |
| Add or remove a team member | Team members, set the group and roles |
| Add a sponsor | Sponsors, upload the logo as the featured image |
| Change a sponsorship tier | Tiers taxonomy: the description is the benefit list, one per line |
| Attach an Open Access PDF | Open Access library → the item → "File or link" |
| Add this season's results | Competition record → Add event result |
| The outreach numbers | Customize → Absolute Zero → Outreach figures |
| The footer's closing line | Customize → Absolute Zero → Footer statement |
| Free-form text on any page | The block editor on that page; it renders below the designed content |

Adding a new outreach programme creates a page automatically: the theme has a
complete generic layout that builds itself from the programme's own fields, so a
new one is presentable the moment it is published.

### 6. Performance and security notes

- Days One is self-hosted in the theme. Nothing is fetched from a font CDN at
  page load, which is both faster and cleaner for visitor privacy.
- No plugin is required. The theme provides its own fields, its own SEO output
  and its own redirects, so nothing critical can be deactivated by accident.
- Core's own `wp-sitemap.xml` is used and includes the workshops and programmes.
- If you add a caching plugin, exclude nothing: every page is static output.

---

## C. Rebuilding after a change

The theme is generated from the same source as the static site, so edit `src/`
and regenerate rather than editing `wp/parts/` by hand:

```bash
node build.js && node build-wp.js && node tools/todo.mjs
node tools/gates.mjs && node tools/interact.mjs && php tools/wp-smoke.php
cd wp && zip -qr ../absolute-zero-theme.zip . && cd ..
```

Files under `wp/` that are hand-written (`functions.php`, `inc/*` except
`icons.php` and `seed-data.php`, and the templates) are never touched by the
generator.
