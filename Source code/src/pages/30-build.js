/* Build and Program — macrostructure 14 Narrative Workflow.
 * Numbered stages, because a season genuinely is ordinal. This is the
 * one page on the site where numbering is earned; nowhere else uses it.
 */

const { site } = require("../lib/config");
const { seasons: record } = require("../data/record");
const U = require("../lib/ui");
const { t, img, icons, btn, linkCta, crumbs, head, note, figure } = U;

const stages = [
  {
    n: "1", key: "kickoff", title: "Kickoff and strategy",
    weeks: "Week 1",
    lead: "The game drops in September. Nobody touches a part for a week.",
    body: "We read the manual end to end, then we argue. Which scoring elements are worth the mechanism they cost? What does a realistic autonomous period look like for a team our size? The output of that week is not a robot idea, it is a scoring priority list, and every design decision for the next three months gets checked against it.",
    artefact: "Scoring priority list and a first strategy document"
  },
  {
    n: "2", key: "design", title: "Design and CAD",
    weeks: "Weeks 2 to 4",
    lead: "Every mechanism exists in CAD before it exists in aluminium.",
    body: "Concepts get sketched, argued over and then modelled. Modelling first is not perfectionism, it is arithmetic: it is the only way to find out that the intake and the lift want the same twelve millimetres before both have been built. Our mentors review the assemblies and push on tolerances and on whether a student can actually manufacture the part they have drawn.",
    artefact: "Full robot assembly, subsystem drawings, a bill of materials"
  },
  {
    n: "3", key: "build", title: "Build",
    weeks: "Weeks 4 to 9",
    lead: "The part of the season that looks like robotics and is mostly filing.",
    body: "Subsystems are built in parallel and integrated late, which is the standard trade: parallel is faster and integration is where everything goes wrong. Wiring is treated as a design problem in its own right rather than something to sort out afterwards, which is a lesson we learned the hard way in 2020 when a motor burned out mid-final.",
    artefact: "A competition robot, plus the spare parts to rebuild half of it"
  },
  {
    n: "4", key: "program", title: "Program",
    weeks: "Weeks 3 to 12, continuously",
    lead: "Java, on the robot, written by students. It starts before the robot is finished and it never stops.",
    body: "The teleoperated code has to be good enough that the drive team stops thinking about it. Autonomous has to be repeatable, which is a much harder standard than working. We iterate against the practice field, and we log everything, because a run that scores and a run that scores for a reason you understand are different results.",
    artefact: "Teleop, a repeatable autonomous routine, and the driver controls the drive team asked for"
  },
  {
    n: "5", key: "compete", title: "Compete, then change it",
    weeks: "December to March",
    lead: "The robot that turns up at states is not the robot that left the first qualifier.",
    body: "Every event produces a list. Some of it is mechanical, some of it is code, and a surprising amount is driver practice. Between events we rebuild. In the 2019 to 2020 season we went to two different state championships with a machine that changed substantially between them, and that only happened because the list was honest.",
    artefact: "A revision list after every event, and a rebuilt robot before the next one"
  }
];

const subteams = [
  { icon: "wrench", title: "Build", body: "Chassis, drivetrain, mechanisms, wiring. Owns manufacturability and owns the spares box.", count: "9 students" },
  { icon: "code",   title: "Programming", body: "Java on the control hubs. Teleop, autonomous, sensor integration and telemetry.", count: "2 students" },
  { icon: "cpu",    title: "CAD", body: "Full robot assembly and subsystem drawings. Everything is modelled before it is cut.", count: "1 student, with the build team" },
  { icon: "clipboard", title: "Notebook", body: "The engineering notebook runs the whole season, not the fortnight before judging.", count: "Everyone" }
];

const body = `

<section class="band band--open-top">
  <div class="wrap">
    ${crumbs([{ label: "Home", href: "/" }, { label: "Build and Program", href: "/build-and-program/" }])}
    <div class="page-head">
      <h1>How the robot gets built</h1>
      <p class="lede">
        ${t("Twelve weeks, five stages, and one rule that has survived every season: nothing gets built until somebody can say what it is for. Here is the whole loop, in the order it actually happens.")}
      </p>
      <div class="btn-row" style="margin-top:var(--space-lg)">
        ${btn({ href: "/outreach/open-access/", label: "Our notebooks and CAD", variant: "primary", icon: "arrowRight" })}
        ${btn({ href: site.pitUrl, label: "The pit design", variant: "ghost", icon: "arrowUpRight", external: true })}
      </div>
    </div>
  </div>
</section>

<!-- ========================= THE SEASON ========================== -->
<section class="band band--tight">
  <div class="wrap">
    <ol class="stages bare">
      ${stages.map((s) => `
        <li class="stage" id="stage-${s.key}">
          <span class="stage__n nums" aria-hidden="true">${s.n}</span>
          <div class="stage__body">
            <p class="stage__weeks">${t(s.weeks)}</p>
            <h2>${t(s.title)}</h2>
            <p class="stage__lead">${t(s.lead)}</p>
            <p>${t(s.body)}</p>
            <p class="stage__artefact">
              <span>${icons.file}</span>
              <span><strong>What it produces.</strong> ${t(s.artefact)}</span>
            </p>
          </div>
        </li>`).join("")}
    </ol>
  </div>
</section>

<!-- ========================== SUB-TEAMS ========================== -->
<section class="band band--raised rule-top">
  <div class="wrap">
    ${head({
      title: "Who does what.",
      body: "Four sub-teams, and nobody sits in only one of them. The overlap is deliberate: a programmer who has never filed a bracket writes worse code."
    })}
    <div class="grid grid-4">
      ${subteams.map((s) => `
        <div class="subteam">
          <span class="subteam__icon" aria-hidden="true">${icons[s.icon]}</span>
          <h3>${t(s.title)}</h3>
          <p>${t(s.body)}</p>
          <p class="meta">${t(s.count)}</p>
        </div>`).join("")}
    </div>
  </div>
</section>

<!-- ========================== NOTEBOOK =========================== -->
<section class="band">
  <div class="wrap">
    <div class="split split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>The engineering notebook is not paperwork.</h2>
        <p>
          ${t("Judged awards at FIRST Tech Challenge are decided substantially on the notebook, and teams treat it as a chore to be survived in the week before a qualifier. We write it as we go, because a decision recorded three weeks late is a decision nobody remembers the reason for.")}
        </p>
        <p>
          ${t("Ours records the strategy call, the concepts we rejected and why, the test data, and the failures. Especially the failures. A notebook with no failed prototypes in it is a notebook nobody believes.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${linkCta({ href: "/outreach/open-access/", label: "Read our notebooks in full" })}
        </div>
      </div>
      ${figure({
        src: "/assets/img/build-notebook.jpg",
        alt: "A spread from the team's engineering notebook showing a mechanism sketch beside test data.",
        w: 1000, h: 750, ratio: "photo",
        shot: "An open engineering notebook spread, sketch and data visible.",
        caption: "A notebook spread from the DECODE season. The rejected concepts stay in."
      })}
    </div>
  </div>
</section>

<!-- ============================ RECORD =========================== -->
<section class="band band--tight rule-top">
  <div class="wrap">
    ${head({
      title: "Every season, every award.",
      body: "Nine competition seasons. The judged awards lean toward Connect, Control and Inspire, which is what happens when a team spends as much of its season on other people as on its own machine."
    })}

    <!-- AZ-REGION:record -->
    <div class="seasons">
      ${record.map((s) => `
        <article class="season">
          <h3 class="season__title">
            <span>${t(s.game)}</span>
            <span class="meta nums">${s.years}</span>
          </h3>
          ${s.note ? `<p class="meta season__note">${t(s.note)}</p>` : ""}
          <dl class="season__events">
            ${s.events.map((e) => `
              <dt>${t(e.name)}</dt>
              <dd>${e.results.length
                ? `<ul class="bare">${e.results.map((r) => `<li>${icons.check}<span>${t(r)}</span></li>`).join("")}</ul>`
                : `<span class="meta">${t("Record not yet published.")}</span>`}</dd>`).join("")}
          </dl>
        </article>`).join("")}
    </div>
    <!-- /AZ-REGION:record -->

    ${note("The DECODE season results are not in our archive yet. Send the award list for Roanoke, Moorefield and states and this section fills itself in.")}
  </div>
</section>

<!-- ============================= PIT ============================= -->
<section class="band band--open-bottom">
  <div class="wrap">
    <div class="panel panel--accent pit-panel">
      <div>
        <h2>${t("The " + site.season.currentYears + " " + site.season.current + " pit, modelled before it was built.")}</h2>
        <p>
          ${t("Ten feet square. Every tool, charging station and spare-parts bin placed, with a three-table layout for states. You can orbit it, zoom in and click any piece of equipment to inspect it. It is public, and other teams are welcome to copy the layout wholesale.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${btn({ href: site.pitUrl, label: "Open the pit model", variant: "primary", icon: "arrowUpRight", external: true })}
        </div>
      </div>
      <span class="pit-panel__glyph" aria-hidden="true">${icons.cpu}</span>
    </div>
  </div>
</section>
`;

module.exports = {
  path: "/build-and-program/",
  slug: "build",
  navLabel: "Build and Program",
  title: "Build and Program | Absolute Zero FTC #12096",
  ogTitle: "How the robot gets built",
  description: "Twelve weeks, five stages: strategy, CAD, build, Java, and rebuilding between events. Plus nine seasons of results and our published notebooks.",
  trail: [{ label: "Home", href: "/" }, { label: "Build and Program", href: "/build-and-program/" }],
  body
};
