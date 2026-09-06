/* Robo Reach — macrostructure 08 Photographic.
 * Look before read. Large images carry the page, text is annotation.
 *
 * TODO(goutam): "Robo Reach" has no public footprint, and roboreach.tech
 * already exists with an overlapping mission. Worth a name check before
 * this goes out. Content below describes the library programme the team
 * demonstrably runs.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, img, icons, btn, note, head, linkCta, figure } = U;

const shots = [
  { file: "rr-driving.jpg", ratio: "wide",
    alt: "A child at the driver station operating the competition robot while other children watch.",
    shot: "The moment a child takes the controls. This is the money shot for this page.",
    caption: "Ninety seconds on the controls does more than an hour of explanation." },
  { file: "rr-mechanism.jpg", ratio: "photo",
    alt: "Students showing a robot intake mechanism to a small group of children.",
    shot: "A team member holding a mechanism, children leaning in.",
    caption: "Every session includes a mechanism taken apart on the table." },
  { file: "rr-build-table.jpg", ratio: "photo",
    alt: "Children building a small robot at a workshop build table.",
    shot: "The build table with kits out and children working.",
    caption: "The build challenge is timed, which turns out to matter." },
  { file: "rr-room.jpg", ratio: "wide",
    alt: "A library meeting room full of families during a robotics workshop.",
    shot: "Wide room shot showing scale of attendance.",
    caption: "Ashburn, Cascades and Gum Spring libraries, term after term." }
];

const kit = [
  { icon: "cpu", title: "The competition robot", body: "The actual machine that competed this season, with a driver station and a scoring element. Not a demo bot." },
  { icon: "wrench", title: "A mechanism, in pieces", body: "One subsystem taken off the robot and taken apart, so a child can hold the gear that makes the arm move." },
  { icon: "book", title: "Build kits", body: "Enough kits for the room, and a timed challenge that everybody can finish." },
  { icon: "route", title: "The route in", body: "Which FIRST programme fits the age group, when the season starts, and where the nearest team is." }
];

const body = `
${childHead({
  path: "/outreach/robo-reach/",
  title: "Robo Reach",
  h1: "Robo Reach",
  lede: "Our travelling workshop. We load a competition robot, a driver station and a build table into a car and take them to a library, a school or a community room. Every child in the room drives the robot. Nobody watches from the back.",
  facts: [
    { k: "Ages", v: "7 to 13, adjusted to the room" },
    { k: "Runs", v: "Every term, across Loudoun County" },
    { k: "Cost", v: "Free" }
  ],
  actions: U.btn({ href: "/contact/", label: "Book a session", variant: "primary", icon: "arrowRight" })
})}

<section class="band band--tight">
  <div class="wrap">
    <div class="photo-lead">
      ${figure(Object.assign({ src: "/assets/img/" + shots[0].file, w: 1600, h: 900, priority: true }, shots[0]))}
    </div>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>How a session runs</h2>
      </div>
      <div class="stack">
        <p>
          ${t("It opens with the robot moving, because nothing we could say first would compete with that. Then the room splits: half drive, half build, and they swap. The build challenge is timed and scored, which converts a craft activity into an engineering one, and it is the part children argue about on the way out.")}
        </p>
        <p>
          ${t("The last five minutes are the ones that matter. We name the FIRST programme that fits the age group in the room, we say when the season starts, and we tell families where to find a team near them. A workshop that ends without that is entertainment.")}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="band band--raised rule-top">
  <div class="wrap">
    <div class="photo-pair">
      ${figure(Object.assign({ src: "/assets/img/" + shots[1].file, w: 1000, h: 750 }, shots[1]))}
      ${figure(Object.assign({ src: "/assets/img/" + shots[2].file, w: 1000, h: 750 }, shots[2]))}
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head({ title: "What comes out of the car", body: "Four things, and the fourth is the one that has a lasting effect." })}
    <ul class="kit-list bare">
      ${kit.map((k) => `<li class="kit">
        <span class="kit__icon" aria-hidden="true">${icons[k.icon]}</span>
        <h3>${t(k.title)}</h3>
        <p>${t(k.body)}</p>
      </li>`).join("")}
    </ul>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    ${figure(Object.assign({ src: "/assets/img/" + shots[3].file, w: 1600, h: 900 }, shots[3]))}
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="panel">
      <h2>Hosting one</h2>
      <p>
        ${t("We need a room, tables, a power outlet and about ninety minutes. A hard floor is better than carpet for driving. We handle everything else, including the kits, and there is no charge at any point.")}
      </p>
      <div class="btn-row" style="margin-top:var(--space-md)">
        ${btn({ href: "/contact/", label: "Book a session", variant: "primary", icon: "arrowRight" })}
        ${linkCta({ href: "/outreach/#workshops", label: "All our workshops" })}
      </div>
    </div>
  </div>
</section>

${childFoot("/outreach/robo-reach/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/robo-reach/",
  slug: "robo-reach",
  title: "Robo Reach",
  description: "Our travelling robotics workshop. We bring a real FTC competition robot and a build table to libraries and schools across Loudoun County. Free."
}), { body });
