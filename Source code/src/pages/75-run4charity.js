/* Run4Charity — macrostructure 04 Stat-Led.
 * A giant real number is the hero and everything after it qualifies that
 * number. Only figures Best Runners publishes themselves appear here.
 *
 * TODO(goutam): the team's own role at the race needs confirming. The
 * event is real and correctly named here: Best Runners organise the
 * Run4Charity 1K/5K in Aldie, Virginia. It is a hunger-and-education
 * charity race, NOT a STEM fundraiser, so this page does not claim it is.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, img, icons, btn, note, head, stat, linkCta, figure } = U;

const supporting = [
  { value: "5K", label: "And a 1K, so younger runners have a distance too" },
  { value: "10th", label: "Year the race has run, per the organisers" },
  { value: "$0", label: "Administrative overhead, per Best Runners" }
];

const beneficiaries = [
  "Embry Rucker Shelter, Reston",
  "St. Timothy's Food Pantry, Chantilly",
  "Patrick Henry Family Shelter, Falls Church",
  "SERVE, Northern Virginia Family Service",
  "Loudoun Hunger Relief",
  "Loudoun Abused Women's Shelter"
];

const body = `
${childHead({
  path: "/outreach/run4charity/",
  title: "Run4Charity 5K",
  h1: "Run4Charity",
  lede: "A volunteer-run charity race in Aldie, organised by Best Runners. We marshal the course, help at registration, and put a robot on a table near the finish line for the families waiting on runners.",
  facts: [
    { k: "Where", v: "Aldie, Loudoun County, Virginia" },
    { k: "When", v: "September" },
    { k: "Our role", v: "Course and registration volunteers, plus a robot demo table" }
  ]
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="stat-hero">
      <p class="stat-hero__value nums">100%</p>
      <div class="stat-hero__text">
        <h2>volunteer driven.</h2>
        <p class="lede">
          ${t("That figure is the organisers', not ours. Best Runners describe the race as one hundred percent volunteer driven, with fully transparent fund management and no administrative overhead. It is the reason we turn up.")}
        </p>
      </div>
    </div>

    <div class="stat-strip" style="margin-top:var(--space-2xl)">
      ${supporting.map((s) => stat(s)).join("")}
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="split split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>This one is not about robotics.</h2>
        <p>
          ${t("Almost every other programme on this site exists to get somebody into FIRST. This one does not. Run4Charity raises money against hunger and for school infrastructure and student enrichment across Northern Virginia, and it is run entirely by volunteers who are not paid to be there.")}
        </p>
        <p>
          ${t("FIRST publishes six core values and one of them is Impact: we apply what we learn to improve our world. A team that only ever shows up where it gets to talk about itself has not really understood that one. So we marshal a course.")}
        </p>
        <p>
          ${t("The robot table at the finish line is the small exception, and it earns its place: a five kilometre race produces a lot of families standing around waiting, and a competition robot is a good thing to have in front of a bored eight year old.")}
        </p>
      </div>
      ${figure({
        src: "/assets/img/r4c-course.jpg",
        alt: "Team members volunteering as course marshals at a community charity race.",
        w: 1000, h: 750, ratio: "photo",
        shot: "Team members in team shirts marshalling the race course or working registration.",
        caption: "Course marshalling in Aldie. The robot comes out later."
      })}
    </div>
  </div>
</section>

<section class="band band--raised rule-top">
  <div class="wrap">
    ${head({
      title: "Where the money goes",
      body: "The organisations Best Runners name as beneficiaries of the race."
    })}
    <ul class="beneficiaries bare">
      ${beneficiaries.map((b) => `<li>${icons.check}<span>${t(b)}</span></li>`).join("")}
    </ul>
    <p class="meta" style="margin-top:var(--space-lg)">
      ${t("Beneficiary list published by")}
      <a href="https://www.bestrunners.org/" target="_blank" rel="noopener">Best Runners</a>.
      ${t("Absolute Zero volunteers at the event; we do not administer the funds.")}
    </p>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="panel">
      <h2>Running it, or volunteering</h2>
      <p>
        ${t("Registration and race-day details come from the organisers rather than from us. If you want to volunteer alongside our students, write to us and we will tell you which shifts we are covering.")}
      </p>
      <div class="btn-row" style="margin-top:var(--space-md)">
        ${btn({ href: "https://www.bestrunners.org/", label: "Best Runners", variant: "ghost", icon: "arrowUpRight", external: true })}
        ${btn({ href: "/contact/", label: "Volunteer with us", variant: "primary", icon: "arrowRight" })}
      </div>
    </div>
    ${note("Confirm which shifts the team covers and whether the robot table is a standing arrangement, and this page can carry a date and a sign-up.")}
  </div>
</section>

${childFoot("/outreach/run4charity/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/run4charity/",
  slug: "run4charity",
  title: "Run4Charity 5K",
  description: "Absolute Zero volunteers at the Best Runners Run4Charity 1K/5K in Aldie, Virginia: course marshalling and a robot demo table at the finish line."
}), { body });
