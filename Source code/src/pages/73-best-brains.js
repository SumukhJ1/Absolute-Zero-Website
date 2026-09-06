/* Best Brains — macrostructure 01 Bento Grid.
 * Asymmetric tiles, mixed spans, real visual variation in three cells.
 * Cell count equals content count. No blank tiles.
 *
 * TODO(goutam): session content is placeholder, as agreed. Best Brains
 * itself is described accurately: a franchised learning-centre network
 * for ages 3 to 14, with four Loudoun County locations.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, img, icons, btn, note, head, linkCta } = U;

const centres = ["Ashburn", "Ashburn West", "Brambleton", "South Riding"];

const body = `
${childHead({
  path: "/outreach/best-brains/",
  title: "Best Brains",
  h1: "Best Brains",
  lede: "Introductory robotics and coding sessions at Best Brains learning centres across Loudoun County, pitched at the eight to fourteen age group. For most of the room it is the first time they have heard the word FIRST.",
  facts: [
    { k: "Ages", v: "8 to 14" },
    { k: "Centres", v: centres.join(", ") },
    { k: "Format", v: "Short sessions, run in term" }
  ],
  actions: U.btn({ href: "/contact/", label: "Ask about a session", variant: "primary", icon: "arrowRight" })
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="bento">

      <div class="bento__cell bento__cell--lead">
        <h2>Why this age group specifically.</h2>
        <p>
          ${t("Best Brains works with children from three to fourteen. That ceiling is exactly where FIRST LEGO League ends and FIRST Tech Challenge begins, which makes their older cohort the single best-timed audience we have. A twelve year old who meets a competition robot in a Best Brains classroom has two clear years to join a team before high school makes the decision for them.")}
        </p>
      </div>

      <div class="bento__cell bento__cell--photo">
        ${img({
          src: "/assets/img/bb-session.jpg",
          alt: "Children at a Best Brains centre programming a small robot on a table.",
          w: 900, h: 900,
          shot: "A Best Brains session: children at a table with a small robot and laptops."
        })}
      </div>

      <div class="bento__cell bento__cell--stat">
        <span class="bento__stat nums">3 to 14</span>
        <p>${t("The age range Best Brains serves. The top of it is where FIRST Tech Challenge starts.")}</p>
      </div>

      <div class="bento__cell">
        <span class="bento__icon" aria-hidden="true">${icons.code}</span>
        <h3>Block coding first</h3>
        <p>${t("A drivable robot and a block editor. Sequence, loop, condition, and then a robot that reacts to a sensor rather than repeating a script.")}</p>
      </div>

      <div class="bento__cell">
        <span class="bento__icon" aria-hidden="true">${icons.wrench}</span>
        <h3>A build with a fixed parts budget</h3>
        <p>${t("Constraint is the lesson. A fixed budget forces a trade, and a trade forces a conversation about what the robot is actually for.")}</p>
      </div>

      <div class="bento__cell bento__cell--photo">
        ${img({
          src: "/assets/img/bb-build.jpg",
          alt: "A completed student-built robot on a classroom table beside its parts kit.",
          w: 900, h: 640,
          shot: "A finished student build at a Best Brains session, kit visible."
        })}
      </div>

      <div class="bento__cell bento__cell--accent">
        <span class="bento__icon" aria-hidden="true">${icons.route}</span>
        <h3>The route in</h3>
        <p>${t("Every session ends the same way: this is FIRST LEGO League, this is FIRST Tech Challenge, here is when the season opens and here is how to find a team. Named, dated, written down.")}</p>
      </div>

      <div class="bento__cell bento__cell--wide">
        <h3>Where it runs</h3>
        <ul class="chip-row" style="margin-top:var(--space-2xs)">
          ${centres.map((c) => `<li>${U.chip(c)}</li>`).join("")}
        </ul>
        <p style="margin-top:var(--space-sm)">
          ${t("Four Best Brains centres sit inside our home county, which means a family that meets us at one of them is already within driving distance of a team.")}
        </p>
      </div>

    </div>

    ${note("Session content is a working draft, as agreed. Send the agreed format and the term dates and this page becomes specific.")}
  </div>
</section>

<section class="band band--raised">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>How this fits the mission</h2>
      </div>
      <div class="stack">
        <p>
          ${t("FIRST asks its teams to grow the programme. The honest way to do that is not to talk about robotics in general to whoever is available. It is to find the rooms where children of exactly the right age are already sitting down to learn something, and to walk into those rooms with a real robot and a specific invitation.")}
        </p>
        <p>
          ${t("Best Brains is one of those rooms. Curie Learning is another. The libraries are a third. The material changes slightly; the last five minutes never do.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${linkCta({ href: "/mission-and-vision/", label: "The commitment behind this" })}
        </div>
      </div>
    </div>
  </div>
</section>

${childFoot("/outreach/best-brains/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/best-brains/",
  slug: "best-brains",
  title: "Best Brains",
  description: "Introductory robotics and coding sessions run by Absolute Zero students at Best Brains centres in Ashburn, Brambleton and South Riding, for the 8 to 14 age group."
}), { body });
