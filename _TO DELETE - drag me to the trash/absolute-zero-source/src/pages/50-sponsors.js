/* Sponsors and Donors — macrostructure 15 Split Studio.
 * Alternating diptych: the ask on one side, the proof on the other, the
 * direction flipping down the page. Tiers are a comparison table, not
 * three identical pricing cards.
 */

const { site } = require("../lib/config");
const { tiers, supporters, costs } = require("../data/sponsors");
const { impact } = require("../data/outreach");
const U = require("../lib/ui");
const { t, img, icons, btn, linkCta, crumbs, head, note } = U;

const body = `

<section class="band band--open-top">
  <div class="wrap">
    ${crumbs([{ label: "Home", href: "/" }, { label: "Sponsors and Donors", href: "/sponsors-and-donors/" }])}
    <div class="page-head">
      <h1>Sponsors and donors</h1>
      <p class="lede">
        ${t("FIRST Tech Challenge is a grades 7 to 12 robotics programme, and a season costs thousands of dollars before a single student touches a part. Sponsorship is the difference between competing and watching.")}
      </p>
      <div class="btn-row" style="margin-top:var(--space-lg)">
        ${btn({ href: "mailto:" + site.email + "?subject=Sponsoring%20Absolute%20Zero%20FTC%2012096", label: "Sponsor the team", variant: "primary", icon: "mail" })}
      </div>
    </div>
  </div>
</section>

<!-- ============================ THE ASK ========================== -->
<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Why sponsor Absolute Zero.</h2>
        <p>
          ${t("Because the money does two jobs. It puts a competition robot on a field, and it pays for the twenty-five workshops that robot travels to afterwards. Sponsoring this team is not sponsoring nine students. It is sponsoring the seven hundred who met them.")}
        </p>
        <p>
          ${t("We are part of Robotics for Youth, a registered 501(c)(3) nonprofit, so corporate and personal contributions are handled properly and acknowledged in writing.")}
        </p>
      </div>
      <div class="proof-card">
        <h3>What a season of sponsorship reaches</h3>
        <dl class="proof-list">
          ${impact.map((s) => `<div><dt>${t(s.label)}</dt><dd class="nums">${s.value}</dd></div>`).join("")}
        </dl>
        <p class="meta">${t("Figures are the team's own count across all outreach programmes.")}</p>
      </div>
    </div>
  </div>
</section>

<!-- ========================= WHAT IT BUYS ======================== -->
<section class="band band--raised">
  <div class="wrap">
    <div class="split split--reverse split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Where the money goes.</h2>
        <p>${t("Five lines, and no administration overhead hiding in any of them. Students order the parts.")}</p>
        <ol class="cost-list bare">
          ${costs.map((c) => `<li>
            <span class="cost-list__item">${t(c.item)}</span>
            <span class="cost-list__note">${t(c.note)}</span>
          </li>`).join("")}
        </ol>
        ${note("This season's real budget figures can replace the descriptions above whenever you send them.")}
      </div>
      <span class="frame frame--photo">${img({
        src: "/assets/img/sponsor-workshop.jpg",
        alt: "Team members running a robotics workshop for children, with the competition robot on the table.",
        w: 1000, h: 750,
        shot: "Outreach in action, ideally with sponsor logos visible on team shirts or the robot."
      })}</span>
    </div>
  </div>
</section>

<!-- =========================== THE TIERS ========================= -->
<section class="band">
  <div class="wrap">
    ${head({
      title: "Sponsorship tiers",
      body: "Five levels, and the same acknowledgement promise at every one: your name goes on this page and stays there."
    })}

    <!-- AZ-REGION:tiers -->
    <div class="tier-table" role="table" aria-label="Sponsorship tiers and what each includes">
      ${tiers.map((tier) => `
        <div class="tier" role="row">
          <div class="tier__head" role="rowheader">
            <h3>${t(tier.name)}</h3>
            <p class="tier__amount nums">${t(tier.amount)}</p>
          </div>
          <ul class="tier__benefits bare" role="cell">
            ${tier.benefits.map((b) => `<li>${icons.check}<span>${t(b)}</span></li>`).join("")}
          </ul>
        </div>`).join("")}
    </div>
    <!-- /AZ-REGION:tiers -->

    <div class="btn-row" style="margin-top:var(--space-xl)">
      ${btn({ href: "mailto:" + site.email + "?subject=Sponsoring%20Absolute%20Zero%20FTC%2012096", label: "Start a conversation", variant: "primary", icon: "mail" })}
      ${linkCta({ href: "/outreach/", label: "See what the last season reached" })}
    </div>
  </div>
</section>

<!-- ========================== SUPPORTERS ========================= -->
<section class="band band--tight rule-top">
  <div class="wrap">
    ${head({
      title: "Who supports us",
      body: "Corporate sponsors, program partners and the nonprofit this team belongs to."
    })}

    <!-- AZ-REGION:supporters -->
    <ul class="supporter-grid bare">
      ${supporters.map((s) => `<li class="supporter">
        ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">` : "<span>"}
          ${img({ src: "/assets/img/" + s.logo, alt: s.name, w: 320, h: 140,
                  shot: s.name + " logo, light-on-dark, transparent PNG" })}
        ${s.url ? "</a>" : "</span>"}
      </li>`).join("")}
    </ul>
    <!-- /AZ-REGION:supporters -->

    <p class="meta" style="margin-top:var(--space-lg);max-width:60ch">
      ${t("Robotics for Youth is a registered 501(c)(3), EIN " + site.parentOrg.ein + ". FIRST is the programme we compete under, not a financial sponsor of this team.")}
    </p>
  </div>
</section>

<!-- ========================= PERSONAL GIFTS ====================== -->
<section class="band band--open-bottom">
  <div class="wrap">
    <div class="panel panel--accent">
      <div class="split split--center" style="gap:var(--space-lg)">
        <div>
          <h2>Snowflake donations</h2>
          <p>
            ${t("Not every supporter is a company. A personal gift of any size is a Snowflake donation: you get named on this page, thanked publicly, and told exactly what your contribution paid for.")}
          </p>
        </div>
        <div class="btn-row">
          ${btn({ href: "mailto:" + site.email + "?subject=Snowflake%20donation", label: "Make a donation", variant: "primary", icon: "mail" })}
        </div>
      </div>
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/sponsors-and-donors/",
  slug: "sponsors",
  navLabel: "Sponsors and Donors",
  title: "Sponsors and Donors | Absolute Zero FTC #12096",
  ogTitle: "Sponsor Absolute Zero",
  description: "Sponsoring FTC Team 12096 funds a competition robot and the 25+ free robotics workshops it travels to. Five tiers, plus personal Snowflake donations.",
  trail: [{ label: "Home", href: "/" }, { label: "Sponsors and Donors", href: "/sponsors-and-donors/" }],
  priority: "0.9",
  body
};
