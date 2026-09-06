/* Genius In You — macrostructure 16 Feature Stack.
 * Sticky left pane, scroll-synced right pane. Pure CSS position:sticky,
 * no scroll listener, and it unsticks below 60rem.
 *
 * TODO(goutam): the team's actual involvement needs confirming.
 * GeniusInYou is described accurately: a private, family-run after-school
 * programme in Ashburn founded in 2023, running youth public speaking and
 * AET/AOS/TJ preparation. It is NOT a nonprofit, so this page does not
 * call it one.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, img, icons, btn, note, head, linkCta } = U;

const modules = [
  {
    key: "explain",
    title: "Explain the thing you built",
    body: "A student describes a mechanism they made to somebody who has never seen it. No jargon allowed, no gesturing at the object. Sixty seconds. It is harder than it sounds and it is the single most transferable skill in this programme.",
    detail: "Judged awards at FIRST Tech Challenge turn on this. So does every engineering interview any of these students will ever sit.",
    photo: { file: "giy-explain.jpg", alt: "A student explaining a robot mechanism to a small audience.", shot: "A student presenting a mechanism to a seated group." }
  },
  {
    key: "defend",
    title: "Defend a decision you regret",
    body: "Every design has a choice in it that turned out wrong. Students walk through one of ours: what we knew, what we chose, what happened, and what we would do again anyway. Explaining a failure honestly is a skill that has to be taught, because the instinct is to hide it.",
    detail: "This is the exercise that maps most directly onto an engineering notebook, which is why we run it early.",
    photo: { file: "giy-defend.jpg", alt: "Students reviewing an engineering notebook spread together.", shot: "Two students at a table with a notebook open between them." }
  },
  {
    key: "question",
    title: "Ask a better question",
    body: "Students are given a robot they have never seen and three minutes to find out how it works, by asking only. Most start with what does it do. The good ones get to why did you build it that way inside a minute.",
    detail: "The exercise the panel at a judging table is running on you, taught from the other side.",
    photo: { file: "giy-question.jpg", alt: "A student inspecting an unfamiliar robot while asking questions.", shot: "A student examining a robot they did not build." }
  },
  {
    key: "present",
    title: "Present under time",
    body: "A five-minute presentation, hard stopped at five minutes, in front of the whole room. Then the same content in ninety seconds. Cutting your own work down is the part nobody practises and everybody needs.",
    detail: "Ends with the same closing line every session in this programme ends with: what FIRST is, and how to join a team.",
    photo: { file: "giy-present.jpg", alt: "A student presenting to a room with a timer visible.", shot: "A student mid-presentation, audience and timer in frame." }
  }
];

const body = `
${childHead({
  path: "/outreach/genius-in-you/",
  title: "Genius In You",
  h1: "Genius In You",
  lede: "Engineering communication, taught with real robots. Genius In You is an Ashburn after-school programme built around public speaking and preparation for AET, AOS and TJ. We bring the hardware, and the students practise explaining it.",
  facts: [
    { k: "Where", v: "Ashburn, Virginia" },
    { k: "Focus", v: "Explaining technical work clearly" },
    { k: "Format", v: "Four exercises, run with real robot hardware" }
  ],
  actions: U.btn({ href: "/contact/", label: "Ask about a session", variant: "primary", icon: "arrowRight" })
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Why a robotics team teaches speaking</h2>
      </div>
      <div class="stack">
        <p>
          ${t("Because at a FIRST Tech Challenge event, roughly half of what a team is judged on is not how the robot performs. It is whether a fifteen year old can stand in front of three strangers and explain, clearly and without hiding anything, why the machine is built the way it is.")}
        </p>
        <p>
          ${t("Genius In You is a small, private, family-run programme in Ashburn that already teaches youth public speaking and prepares students for the region's competitive STEM schools. The obvious thing to add to that is something real to talk about. We have a robot.")}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="band band--raised">
  <div class="wrap">
    <div class="stack-stage">

      <div class="stack-stage__rail">
        <span class="tick" aria-hidden="true"></span>
        <h2>Four exercises</h2>
        <p>${t("Run in order. Each one uses hardware that was on a competition field this season.")}</p>
        <ol class="stack-stage__index bare">
          ${modules.map((m, i) => `<li><a href="#giy-${m.key}"><span class="nums">${i + 1}</span> ${t(m.title)}</a></li>`).join("")}
        </ol>
      </div>

      <div class="stack-stage__panes">
        ${modules.map((m, i) => `
          <article class="stack-pane" id="giy-${m.key}">
            <span class="stack-pane__media frame frame--wide">${img({
              src: "/assets/img/" + m.photo.file,
              alt: m.photo.alt, w: 960, h: 540, shot: m.photo.shot
            })}</span>
            <div class="stack-pane__text">
              <p class="stack-pane__n nums">${i + 1}</p>
              <h3>${t(m.title)}</h3>
              <p>${t(m.body)}</p>
              <p class="stack-pane__detail">${t(m.detail)}</p>
            </div>
          </article>`).join("")}
      </div>

    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="panel">
      <h2>What the students take away</h2>
      <p>
        ${t("Not a robot. A way of describing work that holds up in front of somebody who did not build it, which is the situation every one of them will be in at a judging table, an interview, or an admissions conversation for exactly the schools this programme prepares them for.")}
      </p>
      <div class="btn-row" style="margin-top:var(--space-md)">
        ${btn({ href: "/build-and-program/", label: "The work they are describing", variant: "ghost", icon: "arrowRight" })}
        ${linkCta({ href: "/outreach/open-access/", label: "Our notebooks" })}
      </div>
    </div>
    ${note("Confirm the team's real involvement with Genius In You and this page can name dates, cohorts and outcomes.")}
  </div>
</section>

${childFoot("/outreach/genius-in-you/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/genius-in-you/",
  slug: "genius-in-you",
  title: "Genius In You",
  description: "Engineering communication taught with real competition hardware at an Ashburn after-school programme. Four exercises in explaining technical work clearly."
}), { body });
