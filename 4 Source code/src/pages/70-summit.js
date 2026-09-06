/* FTC Collaboration Summit — macrostructure 13 Index-First.
 * A summit is an agenda. The list is the page.
 *
 * TODO(goutam): this programme has no public record anywhere. Everything
 * below describes the format we can evidence from the scrimmages the team
 * has actually hosted. Send the real dates, attendance and venue and the
 * placeholders come out.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, icons, btn, note, head, linkCta } = U;

const agenda = [
  { time: "Block one", title: "Field time", body: "Teams rotate through timed practice matches on a full field. Alliances are drawn randomly so nobody spends the day with the same partner." },
  { time: "Block two", title: "Design review", body: "Twenty minutes per robot in front of a mixed panel: two students from another team, one mentor. Not judging practice. An actual critique of an actual machine." },
  { time: "Block three", title: "Notebook exchange", body: "Teams swap engineering notebooks and write feedback on each other's. Reading somebody else's notebook is the fastest way to find out what is missing from yours." },
  { time: "Block four", title: "Open problems", body: "One table per open problem. Somebody's odometry drifts, somebody's intake jams on a specific game element. People who have solved it sit down with people who have not." },
  { time: "Close", title: "What we each take away", body: "Every team names one change they are making before the next event. Said out loud, in the room, which makes it considerably more likely to happen." }
];

const history = [
  { year: "2020", text: "We hosted nine FTC teams for a full scrimmage with a real match schedule ahead of states." },
  { year: "2020", text: "A six-team scrimmage with Xtreme Voltage 10515, focused on trading ideas rather than winning matches." },
  { year: "2020", text: "A practice and feedback exchange with Slice of Pi 13441 before their first qualifier." },
  { year: "2019", text: "A scrimmage with SWAT Team 16502 on scoring accuracy and alliance communication." }
];

const body = `
${childHead({
  path: "/outreach/ftc-collaboration-summit/",
  title: "FTC Collaboration Summit",
  h1: "FTC Collaboration Summit",
  lede: "A working day for area FTC teams before the first qualifier. Shared field time, an honest design review on every robot in the room, and a notebook exchange. We host it, we staff it, and it costs nothing to attend.",
  facts: [
    { k: "Who it is for", v: "FTC teams in Virginia, Maryland and West Virginia" },
    { k: "When", v: "Before the first qualifier of each season" },
    { k: "Cost", v: "Free" }
  ],
  actions: btn({ href: "/contact/", label: "Ask to be invited", variant: "primary", icon: "arrowRight" })
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>The idea</h2>
      </div>
      <div class="stack">
        <p>
          ${t("Qualifiers are a bad place to learn anything. Everybody is tense, the pits are loud, and the only feedback you get arrives after the result. A summit moves all of that to a Saturday in November when it is still possible to act on it.")}
        </p>
        <p>
          ${t("It is not a competition and no result is recorded. Teams that beat us later in the season have left this event with a fix we handed them, and that is the point. FIRST calls it gracious professionalism. In practice it means telling a rival exactly why their intake jams.")}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="band band--raised">
  <div class="wrap">
    ${head({ title: "The day, in order", body: "Five blocks. Nothing on this list is a presentation." })}
    <ol class="agenda bare">
      ${agenda.map((a) => `<li class="agenda__row">
        <span class="agenda__time">${t(a.time)}</span>
        <span class="agenda__body">
          <span class="agenda__title">${t(a.title)}</span>
          <span class="agenda__text">${t(a.body)}</span>
        </span>
      </li>`).join("")}
    </ol>
    ${note("Dates, venue and attendance for the upcoming summit are not confirmed. Send them and this becomes a dated event listing with structured data for search engines.")}
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>What it grew out of</h2>
        <p class="muted" style="margin-top:var(--space-sm)">
          ${t("The summit is a formalised version of something this team has done informally for years.")}
        </p>
      </div>
      <ul class="history bare">
        ${history.map((h) => `<li class="history__row">
          <span class="history__year nums">${h.year}</span>
          <span>${t(h.text)}</span>
        </li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="panel panel--accent">
      <h2>Bring your notebook.</h2>
      <p>${t("If you cannot make the summit, everything we would show you there is already published. Notebooks, CAD, pit designs, build and programming guides, all of it, free and without a sign-up.")}</p>
      <div class="btn-row" style="margin-top:var(--space-md)">
        ${btn({ href: "/outreach/open-access/", label: "Open Access library", variant: "primary", icon: "arrowRight" })}
      </div>
    </div>
  </div>
</section>

${childFoot("/outreach/ftc-collaboration-summit/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/ftc-collaboration-summit/",
  slug: "summit",
  title: "FTC Collaboration Summit",
  description: "A free pre-qualifier working day for FTC teams. Shared field time, a design review on every robot in the room, and a notebook exchange."
}), { body });
