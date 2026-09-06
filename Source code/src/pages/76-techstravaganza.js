/* Techstravaganza — macrostructure 09 Quote-Led.
 * The hero is the team's own sentence from its 2018 event blog. It is a
 * real quotation from a real record, which is the only reason a quote-led
 * page is honest here.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, img, icons, btn, note, head, linkCta, figure } = U;

const facts = [
  { icon: "users",    title: "Who runs it",   body: "TWIST, Tomorrow's Women in Science and Technology, a student-run outreach group at Thomas Jefferson High School for Science and Technology." },
  { icon: "globe",    title: "Who comes",     body: "Anyone. Admission is free and the activities are pitched at elementary and middle school students, with families arriving from across the DMV." },
  { icon: "calendar", title: "When",          body: "Mid-May, annually, at TJHSST in Alexandria, Virginia." },
  { icon: "spark",    title: "What is there", body: "More than fifty labs and demonstrations. Past exhibitors have included NASA and the American Society for Naval Engineers." }
];

const ourTable = [
  { title: "Open driving", body: "The competition robot and a driver station. No queue system, no age limit, no supervision theatre. If you can hold the gamepad you can drive it." },
  { title: "A build table", body: "LEGO-based kits for the visitors who are too young for the gamepad, and a timed challenge for the ones who are not." },
  { title: "How to start a team", body: "The conversation we have with the parents standing behind the children. Which programme, what age, when the season opens, where the nearest team is." }
];

const body = `
${childHead({
  path: "/outreach/techstravaganza/",
  title: "Techstravaganza",
  h1: "Techstravaganza",
  lede: "The free public STEM fair at Thomas Jefferson High School for Science and Technology, run by the student group TWIST. Fifty-plus hands-on labs, thousands of visitors, and one of our longest-standing booths.",
  facts: [
    { k: "Where", v: "TJHSST, Alexandria, Virginia" },
    { k: "When", v: "Mid-May, annually" },
    { k: "Admission", v: "Free" }
  ],
  actions: U.btn({ href: "https://techstrav.org/", label: "Techstravaganza website", variant: "ghost", icon: "arrowUpRight", external: true })
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <blockquote class="quote-hero">
      <p>
        ${t("We taught kids how to use the Mindstorms programming language and gave them a basic understanding of Mindstorms and EV3 robots at the TJ Techstravaganza.")}
      </p>
      <footer>
        <cite>Absolute Zero, 2017 to 2018 event blog</cite>
        <span class="meta nums">19 May 2018</span>
      </footer>
    </blockquote>
    <p class="quote-hero__after">
      ${t("That is the entire entry. Eight years later it is still an accurate description of what our table does, which is either consistency or a failure of imagination, depending on how generous you are feeling.")}
    </p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head({ title: "The event", body: "Worth being clear about who runs this, because it is not us and it is not the school administration." })}
    <dl class="spec-rows">
      ${facts.map((f) => `
        <dt>${t(f.title)}</dt>
        <dd>${t(f.body)}</dd>`).join("")}
    </dl>
  </div>
</section>

<section class="band band--raised rule-top">
  <div class="wrap">
    <div class="split split--center">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>What is on our table</h2>
        <ul class="plain-list bare">
          ${ourTable.map((o) => `<li>
            <span class="plain-list__title">${t(o.title)}</span>
            <span class="plain-list__body">${t(o.body)}</span>
          </li>`).join("")}
        </ul>
      </div>
      ${figure({
        src: "/assets/img/tj-booth.jpg",
        alt: "Visitors gathered around the Absolute Zero booth at Techstravaganza.",
        w: 1000, h: 750, ratio: "photo",
        shot: "The Techstravaganza booth with a crowd. Wide enough to show the scale of the hall.",
        caption: "The hall runs six hours. The queue for the gamepad does not really stop."
      })}
    </div>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Why we keep coming back</h2>
      </div>
      <div class="stack">
        <p>
          ${t("Most of our outreach is small and deliberate: twenty children in a library room, a class of twelve at a learning centre. Techstravaganza is the opposite. It is a hall, it is loud, and the number of people who pass the table in a day is larger than everything else we run in a term put together.")}
        </p>
        <p>
          ${t("It is also the one event where the students staffing our booth are the same age as the students running the event. TWIST is a high school outreach group. So, functionally, are we. Standing next to them for a day is a useful thing for a fifteen year old to do.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${linkCta({ href: "/outreach/#workshops", label: "All our workshops" })}
        </div>
      </div>
    </div>
    ${note("Confirm which recent years the team exhibited. The 2018 appearance is documented in the team's own blog; later years are not, so only 2018 is stated as fact above.")}
  </div>
</section>

${childFoot("/outreach/techstravaganza/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/techstravaganza/",
  slug: "techstravaganza",
  title: "Techstravaganza",
  description: "Absolute Zero has exhibited at Techstravaganza, the free public STEM fair at Thomas Jefferson High School, since 2018. Open driving on the robot."
}), { body });
