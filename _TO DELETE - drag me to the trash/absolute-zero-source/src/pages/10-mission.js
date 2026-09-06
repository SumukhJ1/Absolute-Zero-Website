/* Mission and Vision — macrostructure 07 Manifesto.
 * Declaration energy. This page tells the reader what the team believes
 * before it tells them what the team does. The long-form half sits on a
 * single light reading canvas: one deliberate theme block, per plan §2.
 */

const U = require("../lib/ui");
const { t, icons, btn, linkCta, crumbs, head, note } = U;

/* Verbatim from firstinspires.org. Quoted, attributed, unaltered. */
const firstMission = "The mission of FIRST is to provide life-changing robotics programs that give young people the skills, confidence, and resilience to build a better world.";
const firstVision = "To transform our culture by creating a world where science and technology are celebrated and where young people dream of becoming science and technology leaders.";

const coreValues = [
  { name: "Discovery",  text: "We explore new skills and ideas." },
  { name: "Innovation", text: "We use creativity and persistence to solve problems." },
  { name: "Impact",     text: "We apply what we learn to improve our world." },
  { name: "Inclusion",  text: "We respect each other and embrace our differences." },
  { name: "Teamwork",   text: "We are stronger when we work together." },
  { name: "Fun",        text: "We enjoy and celebrate what we do." }
];

const commitments = [
  {
    icon: "spark",
    title: "Bring young people into FIRST",
    lead: "Not into robotics in the abstract. Into FIRST, by name, with a route in.",
    body: "A child who drives a competition robot for ninety seconds at a library has had a good afternoon. A child who leaves knowing that FIRST LEGO League exists, that there is a team near them, and that the season starts in the autumn has had something else. Every session we run ends with the second thing. We name the programme, we name the age bands, and we tell families exactly where to look.",
    practice: [
      "Every workshop closes by naming the FIRST programme that fits the age group in the room",
      "We hand over the route in: which programme, what age, when the season starts",
      "We follow up with the venue so families who missed it still get the information"
    ]
  },
  {
    icon: "flag",
    title: "Act as ambassadors for FIRST",
    lead: "FIRST asks its teams to represent the programme in public. We treat that as the job, not the extra credit.",
    body: "Being an ambassador is mostly unglamorous. It is refereeing an FLL regional on a Saturday. It is standing at an expo booth for six hours. It is explaining, for the ninth time that day, what gracious professionalism means and why an alliance partner's robot matters as much as ours. We have done all of that, at the National Air and Space Museum, at NASA headquarters, and at a folding table in a library meeting room, and the folding table counted just as much.",
    practice: [
      "Public demonstrations at expos, festivals and museum programmes",
      "Volunteering as referees and event support at FLL and WRO competitions",
      "Representing the other Robotics for Youth programmes alongside our own"
    ]
  },
  {
    icon: "handshake",
    title: "Mentor other teams, including our competitors",
    lead: "Ten or more FIRST teams have had a season shaped by ours. Several of them have beaten us since.",
    body: "The first thing anyone did for Absolute Zero was explain OnBot Java to a rookie team that did not know what a hub was. We have been paying that back ever since: presentations for new teams at ECPI University, notebook reviews before qualifiers, wiring cleanups in somebody else's pit, and scrimmages we host and staff ourselves. Every design we have ever run is published in full on this site. There is no version of this we keep back.",
    practice: [
      "Scrimmages we host: nine teams in one weekend, with a real match schedule",
      "Engineering notebook reviews and design feedback before qualifiers",
      "Every notebook, CAD file and pit design published openly, with no sign-up"
    ]
  }
];

const body = `

<!-- =========================== MANIFESTO ========================= -->
<section class="manifesto">
  <div class="wrap">
    ${crumbs([{ label: "Home", href: "/" }, { label: "Mission and Vision", href: "/mission-and-vision/" }])}

    <h1 class="manifesto__title">
      A robot is the excuse. The point is who else ends up building one.
    </h1>

    <div class="manifesto__cols">
      <p class="lede">
        ${t("Absolute Zero exists to show students that problem-solving, innovation and technology are not only useful skills but genuinely worth doing. We are a competitive team. We are also, and more importantly, a way into FIRST for people who did not know it was there.")}
      </p>
      <p>
        ${t("Everything below is what that commits us to. It is written down because a mission that is not written down is a mood.")}
      </p>
    </div>
  </div>
</section>

<!-- ============================ MISSION ========================== -->
<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Our mission</h2>
      </div>
      <div class="stack">
        <p class="statement">
          ${t("To inspire students to explore STEM by showing that problem-solving, innovation and technology are not only valuable skills, but exciting and rewarding pursuits.")}
        </p>
        <p>
          ${t("And to build a team culture on hard work, creativity and collaboration, where every member is encouraged to share ideas, to grow, and to support one another with respect and integrity.")}
        </p>
        <p>
          ${t("Those two halves are not separate. A team that treats its own newest member badly will not teach a stranger's child well, and a team that never leaves its workshop has nothing to teach anyone.")}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ============================ VISION =========================== -->
<section class="band band--raised">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Our vision</h2>
      </div>
      <div class="stack">
        <p class="statement">
          ${t("A Northern Virginia where every student who wants to build something has a team to build it with, and knows how to find one.")}
        </p>
        <p>
          ${t("That vision is deliberately aligned with the organisation we compete under. FIRST states it this way:")}
        </p>

        <blockquote class="pull">
          <p>${t(firstVision)}</p>
          <cite>FIRST, official vision statement</cite>
        </blockquote>

        <p>
          ${t("We take the second half of that sentence literally. Young people do not dream of becoming science and technology leaders because someone told them to. They do it because they met one, or because somebody handed them a controller and a broken mechanism and did not take it back.")}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ======================= THE COMMITMENTS ======================= -->
<section class="band band--canvas canvas">
  <div class="wrap">
    ${head({
      title: "Three commitments, and what each one actually costs us.",
      body: "A mission statement that does not name a cost is a slogan. Each of these takes real hours out of a build season, and each is worth it."
    })}

    <div class="commitments">
      ${commitments.map((c, i) => `
        <article class="commitment">
          <div class="commitment__head">
            <span class="commitment__icon" aria-hidden="true">${icons[c.icon]}</span>
            <div>
              <h3>${t(c.title)}</h3>
              <p class="commitment__lead">${t(c.lead)}</p>
            </div>
          </div>
          <div class="commitment__body">
            <p>${t(c.body)}</p>
            <h4 class="commitment__sub">In practice</h4>
            <ul>${c.practice.map((p) => `<li>${t(p)}</li>`).join("")}</ul>
          </div>
        </article>`).join("")}
    </div>
  </div>
</section>

<!-- ========================= FIRST VALUES ======================== -->
<section class="band">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>The values we are judged against</h2>
        <p class="muted" style="margin-top:var(--space-sm)">
          ${t("FIRST publishes six core values. They are not decoration on a judging rubric. They are the rubric.")}
        </p>
      </div>
      <div>
        <dl class="values">
          ${coreValues.map((v) => `
            <div class="value">
              <dt>${t(v.name)}</dt>
              <dd>${t(v.text)}</dd>
            </div>`).join("")}
        </dl>
        <p class="meta" style="margin-top:var(--space-md)">
          ${t("Quoted from FIRST. See")}
          <a href="https://www.firstinspires.org/about/vision-and-mission" target="_blank" rel="noopener">firstinspires.org</a>.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ====================== MISSION OF FIRST ======================= -->
<section class="band band--tight">
  <div class="wrap">
    <div class="panel panel--accent">
      <p class="statement" style="margin-bottom:var(--space-sm)">${t(firstMission)}</p>
      <p class="meta">${t("The mission of FIRST, quoted in full. Ours sits underneath it, not beside it.")}</p>
    </div>
  </div>
</section>

<!-- ============================= CTA ============================= -->
<section class="band band--open-bottom rule-top">
  <div class="wrap">
    <div class="split split--even">
      <div>
        <h2>See what it looks like in practice.</h2>
        <p>${t("Twenty-five workshops, ten or more teams mentored, and a resource library that anyone can take from without asking.")}</p>
        <div class="btn-row" style="margin-top:var(--space-lg)">
          ${btn({ href: "/outreach/", label: "Our outreach", variant: "primary", icon: "arrowRight" })}
          ${btn({ href: "/outreach/open-access/", label: "Open Access library", variant: "ghost" })}
        </div>
      </div>
      <div>
        <h2>Or bring it to your students.</h2>
        <p>${t("Libraries, schools, scout troops and learning centres. Tell us the age group and the room.")}</p>
        <div class="btn-row" style="margin-top:var(--space-lg)">
          ${btn({ href: "/contact/", label: "Book a workshop", variant: "ghost", icon: "arrowRight" })}
        </div>
      </div>
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/mission-and-vision/",
  slug: "mission",
  title: "Mission and Vision | Absolute Zero FTC #12096",
  ogTitle: "Mission and Vision",
  description: "Absolute Zero exists to bring young people into FIRST, to act as ambassadors, and to mentor other teams. Three commitments, and what each one costs.",
  trail: [{ label: "Home", href: "/" }, { label: "Mission and Vision", href: "/mission-and-vision/" }],
  body
};
