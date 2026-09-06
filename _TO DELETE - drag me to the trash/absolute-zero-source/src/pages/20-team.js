/* Our Team — macrostructure 18 Portfolio Grid.
 * Filterable by role, because "who on this team does programming" is the
 * question the old bare photo grid could not answer. Coaches, students
 * and mentors get real section headings, which the old page lacked.
 */

const { site } = require("../lib/config");
const { roles, coaches, students, mentors, counts } = require("../data/team");
const U = require("../lib/ui");
const { t, img, icons, btn, crumbs, head, note, segmented, linkCta } = U;

const filters = [
  { value: "all",      label: "Everyone" },
  { value: "build",    label: "Build" },
  { value: "program",  label: "Programming" },
  { value: "outreach", label: "Outreach" },
  { value: "drive",    label: "Drive team" }
];

/* The first row of portraits is above the fold at every tested width, so
   those five load eagerly. Lazy-loading an LCP candidate is a real cost. */
function memberCard(m, i) {
  const roleAttr = (m.roles || []).join(" ");
  return `<li class="member" data-role="${roleAttr}">
    <span class="member__photo frame frame--portrait">${img({
      src: "/assets/img/" + m.photo,
      alt: `${m.name}, ${m.line.toLowerCase()}.`,
      w: 640, h: 800, priority: i < 5,
      shot: `Portrait of ${m.name}. Head and shoulders, consistent framing across the roster.`
    })}</span>
    <span class="member__name">${t(m.name)}</span>
    <span class="member__role">${t(m.line)}</span>
  </li>`;
}

function adultCard(p) {
  return `<article class="adult">
    <span class="adult__photo frame frame--square">${img({
      src: "/assets/img/" + p.photo,
      alt: p.alt,
      w: 560, h: 560,
      shot: `Portrait of ${p.name}.` + (p.stale ? " CURRENT photo needed, the one on the old site is years out of date." : "")
    })}</span>
    <div class="adult__text">
      <h3>${t(p.name)}</h3>
      <p class="adult__line">${t(p.line)}</p>
      <p>${t(p.bio)}</p>
    </div>
  </article>`;
}

const personSchema = students.concat(coaches, mentors).map((p) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: p.name,
  memberOf: { "@type": "SportsTeam", name: `${site.fullName} FTC ${site.team}` },
  jobTitle: p.line || (p.roles || []).join(", ")
}));

const body = `

<section class="band band--open-top">
  <div class="wrap">
    ${crumbs([{ label: "Home", href: "/" }, { label: "Our Team", href: "/our-team/" }])}
    <div class="page-head">
      <h1>Our team</h1>
      <p class="lede">
        ${t(`${counts.students} students, two coaches and two mentors. Everybody on this page does at least two jobs, because a team this size has no room for specialists who only specialise.`)}
      </p>
    </div>
  </div>
</section>

<!-- =========================== STUDENTS ========================== -->
<section class="band band--tight">
  <div class="wrap">
    <div class="roster-head">
      <h2>Students</h2>
      ${segmented({
        key: "role", target: "#roster", selected: "all",
        ariaLabel: "Filter the roster by role",
        options: filters
      })}
    </div>

    <!-- AZ-REGION:roster -->
    <ul class="roster bare" id="roster">
      ${students.map((m, i) => memberCard(m, i)).join("\n")}
      <li class="roster__empty" data-filter-empty hidden>
        ${t("Nobody on the roster is listed under that role yet.")}
      </li>
    </ul>
    <!-- /AZ-REGION:roster -->

    <dl class="roster-counts">
      <div><dt>Build and CAD</dt><dd class="nums">${counts.build}</dd></div>
      <div><dt>Programming</dt><dd class="nums">${counts.program}</dd></div>
      <div><dt>Outreach</dt><dd class="nums">${counts.outreach}</dd></div>
    </dl>
  </div>
</section>

<!-- =========================== COACHES =========================== -->
<section class="band band--raised rule-top">
  <div class="wrap">
    ${head({
      title: "Coaches",
      body: "Both coaches sit on the board of Robotics for Youth, the nonprofit this team is part of. Neither of them drives the robot."
    })}
    <!-- AZ-REGION:coaches -->
    <div class="adults">
      ${coaches.map(adultCard).join("\n")}
    </div>
    <!-- /AZ-REGION:coaches -->
    ${note("Coach biographies and Coach Dinesh's portrait are carried over from the old site and need refreshing. Send updated text and a current photo and they drop straight in.")}
  </div>
</section>

<!-- =========================== MENTORS =========================== -->
<section class="band">
  <div class="wrap">
    ${head({
      title: "Mentors",
      body: "Working engineers who give us their evenings. They review what we design and tell us plainly when it will not survive a match."
    })}
    <!-- AZ-REGION:mentors -->
    <div class="adults">
      ${mentors.map(adultCard).join("\n")}
    </div>
    <!-- /AZ-REGION:mentors -->
  </div>
</section>

<!-- ============================ JOIN ============================= -->
<section class="band band--open-bottom rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Joining</h2>
      </div>
      <div class="stack">
        <p>
          ${t("FIRST Tech Challenge is for students in grades 7 to 12. You do not need to have built anything before. Roughly half of this roster had never touched a robot when they joined, and the fastest way onto the drive team has always been to show up on outreach days.")}
        </p>
        <p>
          ${t("If you are in Northern Virginia and want to find out what a season looks like, write to us. If you are somewhere else, we will help you find a team near you or start one.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${btn({ href: "/contact/", label: "Get in touch", variant: "primary", icon: "arrowRight" })}
          ${btn({ href: "/build-and-program/", label: "What a season looks like", variant: "ghost" })}
        </div>
      </div>
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/our-team/",
  slug: "team",
  title: "Our Team | Absolute Zero FTC #12096",
  ogTitle: "Our Team",
  description: `Meet Absolute Zero: ${counts.students} students, two coaches and two mentors from Northern Virginia. Filter the roster by build, programming, outreach or drive team.`,
  trail: [{ label: "Home", href: "/" }, { label: "Our Team", href: "/our-team/" }],
  schema: personSchema,
  body
};
