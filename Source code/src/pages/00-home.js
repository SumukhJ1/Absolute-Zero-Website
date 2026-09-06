/* Home — macrostructure 03 Marquee Hero.
 * The statement fills the fold over a single photograph; below the fold
 * the page becomes prose, then a grid, then a record, then a wall.
 * Section families, in order: marquee / hairline-facts / split-prose /
 * asymmetric-grid / tabular-record / full-width-panel / logo-wall / cta.
 */

const { site } = require("../lib/config");
const { impact } = require("../data/outreach");
const { supporters } = require("../data/sponsors");
const { seasons: record } = require("../data/record");
const U = require("../lib/ui");
const { t, img, icons, btn, linkCta, stat, head, card } = U;

const latest = record[1]; /* POWERPLAY, the most recent season with a published record */

const facts = [
  { v: "2016",  l: "Founded" },
  { v: "12096", l: "FIRST Tech Challenge team number" },
  { v: "10",    l: "Seasons competed" },
  { v: "17",    l: "Students, coaches and mentors" }
];

const pillars = [
  {
    icon: "wrench",
    title: "We build a competition robot",
    body: "Every season starts over. New game, new constraints, new machine, designed and built by students in a garage over about twelve weeks."
  },
  {
    icon: "users",
    title: "We teach it to other people",
    body: "Twenty-five workshops and counting, in libraries, schools, learning centres and one residential school in India. Always run by students."
  },
  {
    icon: "handshake",
    title: "We help other teams win",
    body: "Ten or more FIRST teams mentored. Scrimmages we host, notebooks we swap, and every design we have ever used, published for free."
  }
];

const body = `

<!-- ============================ HERO ============================ -->
<section class="hero-marquee">
  <div class="hero-marquee__media" aria-hidden="true">
    ${img({
      src: "/assets/img/hero-team.jpg",
      alt: "",
      w: 2000, h: 1200, priority: true,
      shot: "The full team behind the competition robot, in the pit or the build space. Wide, low light, faces visible."
    })}
  </div>

  <div class="hero-marquee__body wrap">
    <h1 class="hero-marquee__title">Pushing our limits to&nbsp;accomplish the impossible.</h1>
    <p class="hero-marquee__lede">
      ${t("A student-led FIRST Tech Challenge team in Northern Virginia, now in our tenth season.")}
    </p>
    <div class="btn-row hero-marquee__actions">
      ${btn({ href: "/sponsors-and-donors/", label: "Support the team", variant: "primary", icon: "arrowRight" })}
      ${btn({ href: "/outreach/", label: "See our outreach", variant: "ghost" })}
    </div>
  </div>

  <div class="hero-marquee__facts">
    <div class="wrap">
      <dl class="fact-row">
        ${facts.map((f) => `<div class="fact">
          <dt>${t(f.l)}</dt>
          <dd class="nums">${f.v}</dd>
        </div>`).join("")}
      </dl>
    </div>
  </div>
</section>

<!-- ====================== WHAT WE ACTUALLY DO ==================== -->
<section class="band band--open-top">
  <div class="wrap">
    <div class="split split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Three things, every season, since 2016.</h2>
        <p class="lede">
          ${t("Absolute Zero is a competitive robotics team, but a competition robot is the smallest part of what a season produces. The rest is other people learning to build one.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-lg)">
          ${linkCta({ href: "/mission-and-vision/", label: "Read our mission and vision" })}
        </div>
      </div>

      <ul class="pillars bare">
        ${pillars.map((p) => `<li class="pillar">
          <span class="pillar__icon" aria-hidden="true">${icons[p.icon]}</span>
          <div>
            <h3>${t(p.title)}</h3>
            <p>${t(p.body)}</p>
          </div>
        </li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<!-- ========================== OUTREACH =========================== -->
<section class="band band--raised rule-top">
  <div class="wrap">
    ${head({
      title: "Outreach is the point, not the side project.",
      body: "FIRST asks teams to be ambassadors for the programme. We took that literally, and it has become the largest thing this team does."
    })}

    <!-- AZ-REGION:impact -->
    <div class="impact-grid">
      ${impact.map((s) => `<div class="impact-grid__cell">${stat(s)}</div>`).join("")}
    </div>
    <!-- /AZ-REGION:impact -->

    <div class="feature-mosaic">
      <a class="mosaic-tile mosaic-tile--wide card--link" href="/outreach/robo-reach/">
        <span class="mosaic-tile__media">${img({
          src: "/assets/img/outreach-library.jpg",
          alt: "A child at a driver station operating the team's competition robot at a public library workshop.",
          w: 1200, h: 800,
          shot: "A child holding the driver station gamepad at a library workshop, robot in frame."
        })}</span>
        <span class="mosaic-tile__text">
          <h3>Robo Reach</h3>
          <p>${t("Our travelling workshop. A competition robot, a driver station and a build table, taken to libraries and schools across Loudoun County.")}</p>
          <span class="card__more">See the programme${icons.arrowRight}</span>
        </span>
      </a>

      <a class="mosaic-tile card--link" href="/outreach/namma-bhoomi/">
        <span class="mosaic-tile__media">${img({
          src: "/assets/img/outreach-namma-bhoomi.jpg",
          alt: "Students at a residential school in Karnataka working with a robotics kit in a computer lab.",
          w: 900, h: 900,
          shot: "Namma Bhoomi students with a robotics kit, or a screenshot of a remote session if no photo exists."
        })}</span>
        <span class="mosaic-tile__text">
          <h3>Namma Bhoomi</h3>
          <p>${t("Kits and remote instruction for a residential school for working children in Karnataka, India.")}</p>
          <span class="card__more">Read about it${icons.arrowRight}</span>
        </span>
      </a>

      <a class="mosaic-tile mosaic-tile--accent card--link" href="/outreach/open-access/">
        <span class="mosaic-tile__text">
          <span class="mosaic-tile__glyph" aria-hidden="true">${icons.book}</span>
          <h3>Open Access</h3>
          <p>${t("Our engineering notebooks, pit designs and build guides, published in full for any team that wants them. No sign-up, no email wall.")}</p>
          <span class="card__more">Open the library${icons.arrowRight}</span>
        </span>
      </a>
    </div>

    <p class="section-tail">
      ${linkCta({ href: "/outreach/", label: "All programmes and workshops" })}
    </p>
  </div>
</section>

<!-- =========================== RECORD ============================ -->
<section class="band">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>The record.</h2>
        <p>${t("Nine competition seasons, four state championship appearances, and a shelf of judged awards that lean heavily toward Connect, Control and Inspire. That mix is not an accident: it is what a team looks like when it spends as much time on other people as on its own robot.")}</p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${linkCta({ href: "/build-and-program/", label: "How the robot gets built" })}
        </div>
      </div>

      <div>
        <h3 class="record-lead">${t(latest.game)} <span class="meta nums">${latest.years}</span></h3>
        <dl class="record-list">
          ${latest.events.map((e) => `
            <dt>${t(e.name)}</dt>
            <dd>${e.results.length
              ? `<ul class="bare">${e.results.map((r) => `<li>${t(r)}</li>`).join("")}</ul>`
              : `<span class="meta">${t("No award record published.")}</span>`}</dd>`).join("")}
        </dl>
      </div>
    </div>
  </div>
</section>

<!-- ======================= PIT DESIGN PANEL ====================== -->
<section class="band band--tight">
  <div class="wrap">
    <div class="panel panel--accent pit-panel">
      <div>
        <h2>${t("Our " + site.season.currentYears + " pit, as a model you can walk around.")}</h2>
        <p>${t("We build the pit in 3D before we build it in plywood: a ten foot square, every tool and charging station placed, three-table states layout included. It is public. Steal the layout.")}</p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${btn({ href: site.pitUrl, label: "Open the pit model", variant: "primary", icon: "arrowUpRight", external: true })}
        </div>
      </div>
      <span class="pit-panel__glyph" aria-hidden="true">${icons.cpu}</span>
    </div>
  </div>
</section>

<!-- ========================== SUPPORTERS ========================= -->
<section class="band band--tight rule-top">
  <div class="wrap">
    <h2 class="wall-title">Supported by</h2>
    <!-- AZ-REGION:logowall -->
    <ul class="logo-wall bare">
      ${supporters.map((s) => `<li class="logo-wall__item">
        ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${U.esc(s.name)}">` : "<span>"}
          ${img({ src: "/assets/img/" + s.logo, alt: s.name, w: 320, h: 140,
                  shot: s.name + " logo, monochrome or light-on-dark, transparent PNG" })}
        ${s.url ? "</a>" : "</span>"}
      </li>`).join("")}
    </ul>
    <!-- /AZ-REGION:logowall -->
    <p class="section-tail">
      ${linkCta({ href: "/sponsors-and-donors/", label: "Why sponsorship matters" })}
    </p>
  </div>
</section>

<!-- ============================= CTA ============================= -->
<section class="band band--open-bottom">
  <div class="wrap-read cta-close">
    <h2>${t("Want us at your library, school or centre?")}</h2>
    <p class="lede">${t("Tell us the age group and the room, and we will bring a robot. Booking a workshop costs nothing.")}</p>
    <div class="btn-row" style="margin-top:var(--space-lg)">
      ${btn({ href: "/contact/", label: "Get in touch", variant: "primary", icon: "arrowRight" })}
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/",
  slug: "home",
  navLabel: "Home",
  title: "Absolute Zero Robotics | FTC Team 12096, Northern Virginia",
  ogTitle: "Absolute Zero Robotics, FTC Team 12096",
  description: "A student-led FIRST Tech Challenge team in Northern Virginia. We build a competition robot every season and run free robotics workshops for 700+ students.",
  trail: [{ label: "Home", href: "/" }],
  priority: "1.0",
  body
};
