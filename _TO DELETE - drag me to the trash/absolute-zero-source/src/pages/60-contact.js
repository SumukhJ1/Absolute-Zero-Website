/* Contact — macrostructure 12 Letter.
 * First person, written, no buttons in the fold. The old page was six
 * emoji headings and four links; this one reads like a person wrote it,
 * because one did.
 */

const { site } = require("../lib/config");
const U = require("../lib/ui");
const { t, icons, btn, crumbs, linkCta } = U;

const reasons = [
  {
    icon: "users",
    title: "You want us to run a workshop",
    body: "Tell us the age group, roughly how many students, and the room. We bring the competition robot, a driver station and a build table. Libraries, schools, scout troops, learning centres and community events all work. There is no charge."
  },
  {
    icon: "handshake",
    title: "You are another FIRST team",
    body: "Ask us anything. Notebook feedback, a wiring problem, help getting a rookie team through their first qualifier, or a scrimmage. Our notebooks and CAD are already published in the Open Access library, so start there if you would rather not wait for a reply."
  },
  {
    icon: "award",
    title: "You want to sponsor us",
    body: "A season costs thousands before a part is ordered, and every dollar also funds the outreach programme. We are part of a registered 501(c)(3), so contributions are acknowledged properly."
  },
  {
    icon: "spark",
    title: "You are a student who wants to join",
    body: "FTC is grades 7 to 12 and you do not need to have built anything before. Roughly half this roster had not. Write to us and we will tell you when the next open build session is."
  }
];

const body = `

<section class="band band--open-top">
  <div class="wrap-read">
    ${crumbs([{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }])}

    <div class="letter">
      <h1 class="letter__greeting">Hello,</h1>

      <p class="letter__lede">
        ${t("This inbox is read by a student, usually within a day or two. It is the same address whether you want to book a workshop, ask about a mechanism, offer sponsorship or join the team, so there is no wrong way to start.")}
      </p>

      <p class="letter__address">
        <a class="letter__email" href="mailto:${site.email}">${site.email}</a>
      </p>

      <p>
        ${t("If you are writing about a workshop, the three things that help most are the age group, the approximate number of students and the date you have in mind. Everything else we can work out together.")}
      </p>

      <p class="letter__signoff">
        ${t("Yours,")}<br>
        <span>${t("Absolute Zero, FIRST Tech Challenge Team " + site.team)}</span><br>
        <span class="meta">${t(site.region)}</span>
      </p>
    </div>
  </div>
</section>

<!-- ======================== WHY YOU MIGHT WRITE ================== -->
<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="reasons">
      ${reasons.map((r) => `
        <article class="reason">
          <span class="reason__icon" aria-hidden="true">${icons[r.icon]}</span>
          <h2>${t(r.title)}</h2>
          <p>${t(r.body)}</p>
        </article>`).join("")}
    </div>
  </div>
</section>

<!-- ============================ SOCIALS ========================== -->
<section class="band band--raised">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Elsewhere</h2>
        <p class="muted" style="margin-top:var(--space-sm)">
          ${t("Build logs, season updates and workshop recaps. The YouTube channel has the full introduction video we show at schools.")}
        </p>
      </div>
      <ul class="social-list bare">
        ${site.socials.map((s) => `<li>
          <a class="social-list__row" href="${s.url}" target="_blank" rel="noopener">
            <span class="social-list__icon" aria-hidden="true">${icons[s.icon]}</span>
            <span class="social-list__name">${t(s.label)}</span>
            <span class="social-list__handle">${t(s.handle)}</span>
            <span class="social-list__go" aria-hidden="true">${icons.arrowUpRight}</span>
          </a>
        </li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<!-- ============================= WHERE =========================== -->
<section class="band band--open-bottom">
  <div class="wrap">
    <div class="split split--even">
      <div>
        <h2>Where we are</h2>
        <p>
          ${t("Northern Virginia. Most of our outreach happens across Loudoun County, at the Ashburn, Cascades and Gum Spring libraries, and at partner learning centres in Ashburn, Herndon and South Riding. We compete across Virginia, Maryland and West Virginia.")}
        </p>
      </div>
      <div>
        <h2>Who we are part of</h2>
        <p>
          ${t("Absolute Zero is a programme of Robotics for Youth, a registered 501(c)(3) nonprofit based in Chantilly, Virginia, EIN " + site.parentOrg.ein + ".")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${linkCta({ href: site.parentOrg.url, label: "Robotics for Youth", icon: "arrowUpRight", external: true })}
        </div>
      </div>
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/contact/",
  slug: "contact",
  title: "Contact | Absolute Zero FTC #12096",
  ogTitle: "Contact Absolute Zero",
  description: `Write to ${site.email} to book a free robotics workshop, ask another FIRST team's question, offer sponsorship, or join the team. A student reads it.`,
  trail: [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }],
  schema: [{
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Absolute Zero FTC 12096",
    url: site.origin + "/contact/"
  }],
  body
};
