/* Outreach — macrostructure 20 Ecosystem Index.
 * Several discovery surfaces rather than one list: the programmes, the
 * workshop record by season, international access, and Open Access.
 *
 * Two pieces of the brief land here specifically. Workshops are grouped
 * by season with a selector that defaults to DECODE, and every workshop
 * shows its photograph and its full summary with nothing hidden behind
 * a "read more".
 */

const { site, outreachChildren } = require("../lib/config");
const { seasons, impact, workshops } = require("../data/outreach");
const U = require("../lib/ui");
const { t, img, icons, btn, linkCta, crumbs, head, note, segmented, chip } = U;

/* The three programmes that carry a photograph in the index. */
const featuredPaths = [
  "/outreach/robo-reach/",
  "/outreach/techstravaganza/",
  "/outreach/classes-with-curie/"
];
const featured = outreachChildren.filter((c) => featuredPaths.indexOf(c.path) !== -1);
const rest = outreachChildren.filter(
  (c) => featuredPaths.indexOf(c.path) === -1 && c.path !== "/outreach/open-access/" && c.path !== "/outreach/namma-bhoomi/"
);

const photoFor = {
  "/outreach/robo-reach/": { file: "outreach-robo-reach.jpg", alt: "Students running a robot demonstration table at a public library.", shot: "Robo Reach session in progress: students, robot, audience of children." },
  "/outreach/techstravaganza/": { file: "outreach-techstravaganza.jpg", alt: "The team's booth at Techstravaganza with visitors gathered around the robot.", shot: "The Techstravaganza booth, crowd around the robot." },
  "/outreach/classes-with-curie/": { file: "outreach-curie.jpg", alt: "A student instructor teaching a robotics class at a Curie Learning centre.", shot: "A Classes with Curie session, student teaching at a whiteboard or build table." }
};

/* Each workshop entry: full summary always visible, first two of each
   season carry a photograph. Nothing is collapsed. */
function workshopEntry(w, i, seasonKey) {
  const withPhoto = i < 2;
  const slug = seasonKey + "-" + w.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `<article class="ws${withPhoto ? " ws--photo" : ""}" data-season="${seasonKey}">
    ${withPhoto ? `<span class="ws__media frame frame--wide">${img({
      src: "/assets/img/ws-" + slug + ".jpg",
      alt: `${w.title} at ${w.venue}.`,
      w: 960, h: 540,
      shot: `${w.title}, ${w.venue}, ${w.date}.`
    })}</span>` : ""}
    <div class="ws__text">
      <div class="ws__meta">
        <span class="ws__date nums">${t(w.date)}</span>
        ${w.planned ? chip("Planned", true) : ""}
        ${w.audience ? chip(w.audience) : ""}
      </div>
      <h3>${t(w.title)}</h3>
      <p class="ws__venue">${icons.pin}<span>${t(w.venue)}</span></p>
      <p>${t(w.summary)}</p>
      ${w.detail ? `<p>${t(w.detail)}</p>` : ""}
      ${w.plan ? `<div class="ws__plan">
          <h4>What we run</h4>
          <ul>${w.plan.map((p) => `<li>${t(p)}</li>`).join("")}</ul>
        </div>` : ""}
      ${w.video ? `<p>${linkCta({ href: w.video, label: "Watch the session video", icon: "arrowUpRight", external: true })}</p>` : ""}
    </div>
  </article>`;
}

const eventSchema = workshops
  .filter((w) => w.dateISO)
  .slice(0, 12)
  .map((w) => ({
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: w.title,
    startDate: w.dateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: w.venue, address: { "@type": "PostalAddress", addressRegion: "VA", addressCountry: "US" } },
    description: w.summary,
    organizer: { "@type": "SportsTeam", name: `${site.fullName} FTC ${site.team}`, url: site.origin + "/" },
    isAccessibleForFree: true
  }));

const body = `

<section class="band band--open-top">
  <div class="wrap">
    ${crumbs([{ label: "Home", href: "/" }, { label: "Outreach", href: "/outreach/" }])}
    <div class="page-head">
      <h1>Outreach</h1>
      <p class="lede">
        ${t("Twenty-five workshops, ten or more FIRST teams mentored, and seven hundred students who have driven a competition robot because we brought one to them. This is the largest thing this team does, and every session on this page was run by students.")}
      </p>
    </div>

    <dl class="impact-strip">
      ${impact.map((s) => `<div class="impact-strip__cell">
        <dd class="nums">${s.value}</dd>
        <dt>${t(s.label)}</dt>
        <p class="meta">${t(s.note)}</p>
      </div>`).join("")}
    </dl>
  </div>
</section>

<!-- ======================== PROGRAMME INDEX ====================== -->
<section class="band band--tight">
  <div class="wrap">
    ${head({
      title: "The programmes",
      body: "Nine of them. Some run every term, some once a season, one runs on another continent."
    })}

    <!-- AZ-REGION:programmes -->
    <div class="prog-featured">
      ${featured.map((c, fi) => {
        const p = photoFor[c.path];
        return `<a class="prog-tile" href="${c.path}">
          <span class="prog-tile__media">${img({
            src: "/assets/img/" + p.file, alt: p.alt, w: 900, h: 640, priority: fi === 0, shot: p.shot
          })}</span>
          <span class="prog-tile__text">
            <h3>${t(c.title)}</h3>
            <p>${t(c.blurb)}</p>
            <span class="card__more">Read more${icons.arrowRight}</span>
          </span>
        </a>`;
      }).join("")}
    </div>

    <ul class="prog-list bare">
      ${rest.map((c) => `<li>
        <a class="prog-row" href="${c.path}">
          <span class="prog-row__title">${t(c.title)}</span>
          <span class="prog-row__blurb">${t(c.blurb)}</span>
          <span class="prog-row__go" aria-hidden="true">${icons.arrowRight}</span>
        </a>
      </li>`).join("")}
    </ul>
    <!-- /AZ-REGION:programmes -->
  </div>
</section>

<!-- ====================== WORKSHOPS BY SEASON ==================== -->
<section class="band band--raised rule-top" id="workshops">
  <div class="wrap">
    <div class="roster-head">
      <div class="head" style="margin-bottom:0">
        <span class="tick" aria-hidden="true"></span>
        <h2>Workshops, by season</h2>
        <p>${t("Every session we have planned, staffed and run. Choose a season.")}</p>
      </div>
      ${segmented({
        key: "season", target: "#ws-list", selected: "decode",
        ariaLabel: "Choose a competition season",
        options: seasons.map((s) => ({ value: s.key, label: s.label }))
      })}
    </div>

    <p class="season-legend meta">
      ${seasons.map((s) => `<span><strong>${t(s.label)}</strong> ${t(s.years)}</span>`).join("")}
    </p>

    <!-- AZ-REGION:workshops -->
    <div class="ws-list" id="ws-list">
      ${seasons.map((s) => {
        const list = workshops.filter((w) => w.season === s.key);
        return list.map((w, i) => workshopEntry(w, i, s.key)).join("\n");
      }).join("\n")}
      <p class="ws-empty" data-filter-empty hidden>${t("No workshops recorded for that season yet.")}</p>
    </div>
    <!-- /AZ-REGION:workshops -->

    ${note("BIOBUZZ dates are not confirmed yet. Send the booked dates and what each session will cover, and each one becomes a dated entry with its own page.")}
  </div>
</section>

<!-- ====================== INTERNATIONAL ACCESS =================== -->
<section class="band">
  <div class="wrap">
    <div class="split split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Access does not stop at the county line.</h2>
        <p>
          ${t("Almost everything on this page happens within about thirty miles of Ashburn. One programme does not. Namma Bhoomi is a residential campus in Karnataka, India, run by The Concerned for Working Children, and it educates children who have worked for a living. It has a computer lab and a vocational training institute. What it did not have was robotics.")}
        </p>
        <p>
          ${t("We send kits and we teach remotely. The instruction has to survive a nine and a half hour time difference and a room we have never stood in, which has made us considerably better at writing things down.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${btn({ href: "/outreach/namma-bhoomi/", label: "Read about Namma Bhoomi", variant: "ghost", icon: "arrowRight" })}
        </div>
      </div>
      <span class="frame frame--photo">${img({
        src: "/assets/img/outreach-namma-bhoomi-wide.jpg",
        alt: "Students at Namma Bhoomi working with a robotics kit in the campus computer lab.",
        w: 1000, h: 750,
        shot: "Namma Bhoomi students with a kit, or a screen capture from a remote teaching session."
      })}</span>
    </div>
  </div>
</section>

<!-- =========================== OPEN ACCESS ======================= -->
<section class="band band--tall band--card rule-top" id="open-access">
  <div class="wrap">
    <div class="open-access-lead">
      <span class="open-access-lead__glyph" aria-hidden="true">${icons.book}</span>
      <h2>Open Access</h2>
      <p class="lede">
        ${t("Every engineering notebook, every pit design, every build and programming guide we have written, published in full. No sign-up, no email wall, no request form. If it helped us, it is yours.")}
      </p>
      <p>
        ${t("This exists because of one afternoon in 2018 when a team we had never met explained OnBot Java to us and asked for nothing back. Open Access is what paying that back looks like at scale.")}
      </p>
      <div class="btn-row" style="margin-top:var(--space-lg)">
        ${btn({ href: "/outreach/open-access/", label: "Open the library", variant: "primary", icon: "arrowRight" })}
        ${btn({ href: site.pitUrl, label: "Pit design model", variant: "ghost", icon: "arrowUpRight", external: true })}
      </div>
    </div>
  </div>
</section>

<!-- ============================= CTA ============================= -->
<section class="band band--open-bottom">
  <div class="wrap-read cta-close">
    <h2>${t("Book us.")}</h2>
    <p class="lede">
      ${t("Libraries, schools, scout troops, learning centres and community events. Tell us the age group, the room and roughly how many students. We bring the robot. It costs nothing.")}
    </p>
    <div class="btn-row" style="margin-top:var(--space-lg)">
      ${btn({ href: "/contact/", label: "Get in touch", variant: "primary", icon: "arrowRight" })}
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/outreach/",
  slug: "outreach",
  title: "Outreach and Workshops | Absolute Zero FTC #12096",
  ogTitle: "Outreach and Workshops",
  description: "25+ robotics workshops, 700+ students reached and 10+ FIRST teams mentored across Northern Virginia. Browse every session by competition season.",
  trail: [{ label: "Home", href: "/" }, { label: "Outreach", href: "/outreach/" }],
  schema: eventSchema,
  priority: "0.9",
  body
};
