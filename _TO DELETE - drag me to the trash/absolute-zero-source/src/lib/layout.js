/* layout.js — the document shell: head, the snowflake island, the footer. */

const { site, nav } = require("./config");
const { icons, flakeMark } = require("./icons");
const { esc, t } = require("./ui");

/* ---------------------------------------------------------------- *
 * Structured data                                                   *
 * ---------------------------------------------------------------- */

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["SportsTeam", "EducationalOrganization"],
    "@id": site.origin + "/#team",
    name: `${site.fullName} (FTC Team ${site.team})`,
    alternateName: `Absolute Zero FTC #${site.team}`,
    sport: "Robotics",
    url: site.origin + "/",
    logo: site.origin + "/assets/img/logo-absolute-zero.png",
    image: site.origin + "/assets/img/og-default.jpg",
    slogan: site.tagline,
    foundingDate: site.founded,
    email: site.email,
    areaServed: { "@type": "AdministrativeArea", name: "Northern Virginia" },
    location: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: "VA", addressCountry: "US" } },
    memberOf: { "@type": "Organization", name: "FIRST Tech Challenge", url: "https://www.firstinspires.org/robotics/ftc" },
    parentOrganization: { "@type": "NGO", name: site.parentOrg.name, url: site.parentOrg.url },
    sameAs: site.socials.map((s) => s.url)
  };
}

function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: site.origin + c.href
    }))
  };
}

/* ---------------------------------------------------------------- *
 * The island                                                        *
 * ---------------------------------------------------------------- */

function navMarkup(currentPath, currentTitle) {
  const links = nav.map((item) => {
    const active = item.path === currentPath ||
      (item.path !== "/" && currentPath.indexOf(item.path) === 0);
    return `<li><a class="nav__link" href="${item.path}"${active ? ' aria-current="page"' : ""}>${item.label}</a></li>`;
  }).join("");

  return `<header class="site-nav" data-nav>
  <div class="nav__inner">

    <div class="nav__bar">
      <a class="nav__mark" href="/" aria-label="${esc(site.fullName)}, home">
        ${flakeMark()}
        <span class="nav__wordmark">Absolute Zero <span>${site.team}</span></span>
      </a>

      <nav class="nav__menu" aria-label="Primary">
        <ul class="nav__links">${links}</ul>
      </nav>

      <a class="btn btn--primary nav__cta" href="/sponsors-and-donors/">Support us</a>

      <button class="nav__toggle" type="button" aria-expanded="false"
              aria-controls="nav-menu" aria-label="Open menu">
        <span class="icon-menu">${icons.menu}</span>
        <span class="icon-close">${icons.close}</span>
      </button>
    </div>

    <button class="nav__flake" type="button" aria-expanded="false" aria-controls="nav-menu">
      ${flakeMark()}
      <span class="nav__flake-label">${t(currentTitle)}</span>
      <span class="visually-hidden">Open the menu</span>
    </button>

  </div>
</header>`;
}

/* ---------------------------------------------------------------- *
 * Footer — Ft5 Statement, then one hairline meta row.               *
 * ---------------------------------------------------------------- */

function footerMarkup() {
  const socials = site.socials.map((s) =>
    `<a class="social-btn" href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(site.name)} on ${esc(s.label)}">${icons[s.icon]}</a>`
  ).join("");

  return `<footer class="site-footer">
  <div class="wrap">

    <p class="site-footer__statement">
      We are a student team. Everything here was <b>built by students</b>, and every
      workshop on this site was run by one.
    </p>

    <div class="site-footer__grid">
      <div class="foot-group">
        <span class="foot-group__title">Get in touch</span>
        <a href="mailto:${site.email}">${site.email}</a>
        <p class="meta" style="margin-top:var(--space-2xs);max-width:34ch">
          Sponsorship, mentoring requests and workshop bookings all reach the same inbox.
          A student answers it.
        </p>
        <div class="social-row" style="margin-top:var(--space-sm)">${socials}</div>
      </div>

      <div class="foot-group">
        <span class="foot-group__title">For other teams</span>
        <a href="/outreach/open-access/">Open Access library</a>
        <a href="${site.pitUrl}" target="_blank" rel="noopener">${site.season.currentYears} pit design</a>
        <a href="/outreach/ftc-collaboration-summit/">Collaboration Summit</a>
        <a href="/outreach/">Book a workshop</a>
      </div>
    </div>

    <div class="site-footer__base">
      <p>&copy; ${new Date().getFullYear()} ${site.fullName}, FIRST Tech Challenge Team ${site.team}. ${site.region}.</p>
      <p>A program of <a href="${site.parentOrg.url}" target="_blank" rel="noopener">${site.parentOrg.name}</a>,
         a registered 501(c)(3).</p>
      <p><em>FIRST</em>, FIRST Tech Challenge, BIOBUZZ and DECODE are trademarks of
         <a href="https://www.firstinspires.org/" target="_blank" rel="noopener">FIRST</a>.
         This site is run by the team, not by FIRST.</p>
    </div>

  </div>
</footer>`;
}

/* ---------------------------------------------------------------- *
 * The document                                                      *
 * ---------------------------------------------------------------- */

function render(page) {
  const url = site.origin + page.path;
  const navEntry = nav.find((n) => n.path === page.path);
  const flakeLabel = page.navLabel || (navEntry ? navEntry.title : page.shortTitle || page.h1);
  const ogImage = site.origin + (page.ogImage || "/assets/img/og-default.jpg");

  const schemas = [orgSchema()];
  if (page.trail && page.trail.length > 1) schemas.push(breadcrumbSchema(page.trail));
  if (page.schema) schemas.push.apply(schemas, [].concat(page.schema));

  const jsonLd = schemas.map(
    (s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`
  ).join("\n");

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.fullName)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(page.ogAlt || site.fullName + ", FTC Team " + site.team)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@absolutezeroftc">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImage}">

<meta name="theme-color" content="#0b0d10">
<meta name="color-scheme" content="dark">
<meta name="robots" content="index, follow, max-image-preview:large">

<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/days-one-latin-400.woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">

<script>document.documentElement.className=document.documentElement.className.replace('no-js','js');</script>

${jsonLd}
</head>
<body class="page-${page.slug || "home"}">

<a class="skip-link" href="#main">Skip to content</a>

${navMarkup(page.path, flakeLabel)}

<main id="main" class="site-main" tabindex="-1">
${page.body}
</main>

${footerMarkup()}

<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

module.exports = { render, orgSchema, breadcrumbSchema };
