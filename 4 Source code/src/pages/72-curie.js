/* Classes with Curie — macrostructure 06 Conversational FAQ.
 * Parents arrive at this page with questions, so the page is questions.
 *
 * TODO(goutam): course content below is placeholder, as agreed. Curie
 * Learning is described accurately (a Northern Virginia K-12 enrichment
 * company with centres in Ashburn, Herndon and South Riding, which runs
 * its own Robotics Boot Camp). The partnership specifics need confirming.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, icons, btn, note, head, qa, linkCta } = U;

const syllabus = [
  { n: "1", title: "What a robot is, and the loop that makes one", body: "Define the problem, build the smallest thing that tests it, measure, change it. Students leave session one having failed at something on purpose." },
  { n: "2", title: "Drivetrains and gearing", body: "Why a fast robot loses to a strong one on some tasks and wins on others. Built, driven, and then rebuilt with different gearing so the difference is felt rather than described." },
  { n: "3", title: "Sensors and the first lines of code", body: "A robot that reacts to the world instead of repeating a script. Block-based first, then a look at the Java our own robot runs on." },
  { n: "4", title: "A scored challenge", body: "Run as a small competition, with alliances, a scoring rubric, and a judging conversation. The closest thing to a real FTC event that fits in a classroom." }
];

const values = [
  { name: "Discovery", how: "Session one is deliberately open-ended. Nobody is told the answer." },
  { name: "Innovation", how: "The scored challenge has more than one winning strategy, and we say so." },
  { name: "Inclusion", how: "Alliances are drawn, not chosen. No child picks a team and no child is picked last." },
  { name: "Teamwork", how: "Every build is a pair. The pairs rotate every session." },
  { name: "Impact", how: "The last ten minutes name the FIRST programme that fits the age group and how to join one." },
  { name: "Fun", how: "There is a timer, there is scoring, and there is an argument about strategy. That is the fun." }
];

const questions = [
  { q: "Who teaches it?",
    a: `<p>${t("Students from Absolute Zero, the ones who build and program the competition robot. A coach is present, but the instruction is student-led. That is deliberate: a fourteen year old explaining gearing to an eleven year old is more convincing than an adult doing it, and the fourteen year old learns it properly in the process.")}</p>` },
  { q: "What age is it for?",
    a: `<p>${t("Roughly nine to fourteen, which spans the top of FIRST LEGO League and the bottom of FIRST Tech Challenge. Groups are kept small enough that everybody gets hands on a robot in every session.")}</p>` },
  { q: "Does my child need any experience?",
    a: `<p>${t("No. Nothing is assumed. About half of our own roster had never touched a robot when they joined this team, and several of them now build the drivetrain.")}</p>` },
  { q: "Is this the same as Curie's own robotics camp?",
    a: `<p>${t("No. Curie Learning runs its own Robotics Boot Camp as part of its STEM programme. Our course sits alongside that and is taught by a competing FTC team, so it is built around the FIRST progression specifically: what LEGO League is, what Tech Challenge is, and how a student moves from one to the other.")}</p>` },
  { q: "What happens at the end?",
    a: `<p>${t("A scored challenge run like a small competition, and a conversation about what comes next. Every student leaves knowing which FIRST programme fits their age, when the season starts, and how to find a team. That last part is the point of the whole course.")}</p>` },
  { q: "Where does it run, and what does it cost?",
    a: `<p>${t("At Curie Learning's Northern Virginia centres. Curie handles enrolment and any fees; we provide the instructors and the curriculum. Write to us if you want to know more about the teaching side.")}</p>` }
];

const body = `
${childHead({
  path: "/outreach/classes-with-curie/",
  title: "Classes with Curie",
  h1: "Classes with Curie",
  lede: "A four-session robotics course taught by our students at Curie Learning, built around the FIRST progression from LEGO League into Tech Challenge. It is not a robot-building hobby class. It is a route into a programme.",
  facts: [
    { k: "Ages", v: "Roughly 9 to 14" },
    { k: "Length", v: "Four sessions" },
    { k: "Taught by", v: "Absolute Zero students" }
  ],
  actions: U.btn({ href: "/contact/", label: "Ask about the course", variant: "primary", icon: "arrowRight" })
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Who Curie are</h2>
      </div>
      <div class="stack">
        <p>
          ${t("Curie Learning is a Northern Virginia enrichment and test-prep company with centres in Ashburn, Herndon and South Riding, working with students from kindergarten through twelfth grade. Their STEM programme already includes a robotics boot camp, so the students who walk into our sessions are not starting cold on the idea that engineering is worth an evening.")}
        </p>
        <p>
          ${t("What a partner like Curie gives us is reach into a room of families who are already thinking about STEM but who have often never heard of FIRST by name. Closing that specific gap is what this course is for.")}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="band band--raised">
  <div class="wrap">
    ${head({ title: "The four sessions", body: "Each one ends with something built, tested and changed." })}
    <ol class="syllabus bare">
      ${syllabus.map((s) => `<li class="syllabus__row">
        <span class="syllabus__n nums" aria-hidden="true">${s.n}</span>
        <span class="syllabus__body">
          <span class="syllabus__title">${t(s.title)}</span>
          <span class="syllabus__text">${t(s.body)}</span>
        </span>
      </li>`).join("")}
    </ol>
    ${note("Session content above is a working draft. Replace it with the agreed syllabus and the term dates whenever they are settled.")}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head({
      title: "Built on the FIRST core values, not decorated with them.",
      body: "FIRST publishes six. Each one is a design constraint on how the course runs, not a poster on the wall."
    })}
    <dl class="values values--how">
      ${values.map((v) => `<div class="value">
        <dt>${t(v.name)}</dt>
        <dd>${t(v.how)}</dd>
      </div>`).join("")}
    </dl>
    <p class="meta" style="margin-top:var(--space-md)">
      ${t("Value names quoted from")} <a href="https://www.firstinspires.org/about/vision-and-mission" target="_blank" rel="noopener">FIRST</a>.
      ${t("The practice beside each one is ours.")}
    </p>
  </div>
</section>

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Questions</h2>
      </div>
      <div class="qa-list">
        ${qa(questions, "curie")}
      </div>
    </div>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="panel panel--accent">
      <h2>We also run this format elsewhere.</h2>
      <p>${t("Best Brains centres across Loudoun County run a shorter version for the eight to fourteen age group, and the same material shows up in the library series.")}</p>
      <div class="btn-row" style="margin-top:var(--space-md)">
        ${btn({ href: "/outreach/best-brains/", label: "Best Brains", variant: "ghost", icon: "arrowRight" })}
        ${btn({ href: "/outreach/robo-reach/", label: "Robo Reach", variant: "ghost", icon: "arrowRight" })}
      </div>
    </div>
  </div>
</section>

${childFoot("/outreach/classes-with-curie/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/classes-with-curie/",
  slug: "curie",
  title: "Classes with Curie",
  description: "A four-session robotics course taught by Absolute Zero students at Curie Learning, built around the FIRST progression from LEGO League into FTC."
}), {
  body,
  schema: [{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a.replace(/<[^>]+>/g, "") }
    }))
  }]
});
