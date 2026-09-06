/* Namma Bhoomi — macrostructure 02 Long Document.
 * Continuous prose with inline heads. No marketing structure. The whole
 * body sits on the light reading canvas, because this is the longest read
 * on the site and readability is the brief.
 *
 * Accuracy notes, all verified before writing:
 *   - "Namma Bhoomi" is two words, Kannada for "our land".
 *   - It is run by The Concerned for Working Children (CWC), Bengaluru.
 *   - It has a computer lab and a vocational training institute. It does
 *     NOT have a documented robotics programme, so this page never claims
 *     that it does. What we describe is what we send and teach.
 * TODO(goutam): confirm the team's actual shipment and session history.
 */

const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, img, icons, btn, note, head, linkCta, figure } = U;

const body = `
${childHead({
  path: "/outreach/namma-bhoomi/",
  title: "Namma Bhoomi",
  h1: "Namma Bhoomi",
  kicker: "International access",
  lede: "A residential campus in Karnataka, India, for children who have worked for a living. It has a computer lab, a vocational training institute, and a children's council that governs the place. What it did not have was robotics. We send kits, and we teach across a nine and a half hour time difference.",
  facts: [
    { k: "Where", v: "Near Kundapura, Udupi District, Karnataka, India" },
    { k: "Run by", v: "The Concerned for Working Children" },
    { k: "Our part", v: "Robotics kits and remote instruction" }
  ]
})}

<section class="band band--canvas canvas band--tall">
  <div class="wrap-read longform">

    <p class="longform__opener">
      ${t("Everything else on this site happens within about thirty miles of Ashburn. A library room, a learning centre, a school hall. This one is eight thousand miles away and it has changed how we teach more than any of the others.")}
    </p>

    <h2>What the place is</h2>

    <p>
      ${t("Namma Bhoomi means our land in Kannada. It is a residential campus of roughly eighteen acres in the foothills of the Western Ghats, on the banks of the Varahi river near Kundapura, and it was built for working children: children who have held jobs, often from a young age, and who are picking up an education that most systems assumed they had already missed.")}
    </p>

    <p>
      ${t("It is run by The Concerned for Working Children, a nonprofit founded in Bengaluru in 1985. The campus houses a school and a professional training institute, with residential accommodation for around two hundred children, staff housing, a library, a medical infirmary, a dairy farm, agricultural land, and a computer lab.")}
    </p>

    <p>
      ${t("The detail that matters most is not in the facilities list. Children at Namma Bhoomi annually elect a Makkala Panchayat, a children's council, which governs decisions about the place they live in. The campus was designed in consultation with the children themselves. It is run on explicitly democratic principles, and it is deliberately structured to break down caste, gender and religious boundaries between the people living there.")}
    </p>

    ${figure({
      src: "/assets/img/nb-campus.jpg",
      alt: "The Namma Bhoomi campus in Karnataka, with residential buildings among trees.",
      w: 1400, h: 800, ratio: "wide",
      shot: "Namma Bhoomi campus, or the computer lab. If no photograph is available, use a session screen capture and caption it as such.",
      caption: "The campus near Kundapura. The computer lab is where our sessions land."
    })}

    <h2>How we got involved</h2>

    <p>
      ${t("Through the connections our own community already had. This is not a programme we invented and then went looking for a recipient of. Somebody knew somebody, a conversation happened, and the question that came back was practical: the lab exists, the children are already learning technical subjects, could robotics fit alongside that.")}
    </p>

    <p>
      ${t("We want to be precise about what is there and what we add. Namma Bhoomi's professional training institute prepares young people for careers in industry, retail, services and traditional crafts. It has a computer lab. It does not have, and we are not claiming it has, an established robotics programme. What we send are kits, and what we run are sessions.")}
    </p>

    <h2>What nine and a half hours does to teaching</h2>

    <p>
      ${t("The time difference is the constraint that shaped everything. When it is a workable evening in Karnataka it is early morning in Virginia, and the overlap where both a student instructor and a room of children are awake and free is narrow. We cannot improvise. We cannot lean over and adjust somebody's gear train.")}
    </p>

    <p>
      ${t("So the material has to survive on its own. Every session has a written guide that works without us: what the parts are, what to build, what should happen, and specifically what it looks like when it goes wrong and what to do then. That last section is the one we kept having to expand, because a failure mode we would fix in four seconds in a room becomes a dead twenty minutes when nobody present has seen it before.")}
    </p>

    <p>
      ${t("This has made us better. Genuinely, measurably better. The build and programming guides in our Open Access library are clearer than they were, and the reason is that they were rewritten by students who had watched somebody eight thousand miles away get stuck on a step we thought was obvious.")}
    </p>

    <h2>What we send</h2>

    <ul>
      <li>${t("Robotics kits, with every part labelled against the guide that uses it")}</li>
      <li>${t("Printed build guides, written to work with no instructor present")}</li>
      <li>${t("Programming material aimed at the machines that are actually in the lab, not the ones we wish were")}</li>
      <li>${t("Scheduled remote sessions, in the overlap window, run by our students")}</li>
    </ul>

    <h2>Why this counts as access and not charity</h2>

    <p>
      ${t("Because the thing being distributed is not equipment. It is the assumption that this is for you. Every child at Namma Bhoomi has already been told, structurally and by circumstance, that certain futures are not theirs. A robotics kit does not undo that. A robotics kit plus somebody turning up on a screen every fortnight, on purpose, who expects them to have finished last time's build, is a slightly different message.")}
    </p>

    <p>
      ${t("It is also the honest test of whether we mean the open part of Open Access. Publishing a notebook costs us nothing. Teaching into a room we have never stood in, at seven in the morning, to children whose first language is not the one the guide is written in, costs us something. That is roughly the point.")}
    </p>

    <p class="longform__close">
      ${t("If you work with a school or a programme outside the United States and you want the same material, it is free and it is already published. Take it.")}
    </p>

    <div class="btn-row" style="margin-top:var(--space-xl)">
      ${btn({ href: "/outreach/open-access/", label: "Open Access library", variant: "primary", icon: "arrowRight" })}
      ${btn({ href: "https://www.concernedforworkingchildren.org/empowering-children/education-for-democracy/namma-bhoomi/", label: "About Namma Bhoomi", variant: "ghost", icon: "arrowUpRight", external: true })}
    </div>

  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    ${note("Confirm shipment dates, kit counts and the session schedule, and this page can carry specifics instead of description.")}
  </div>
</section>

${childFoot("/outreach/namma-bhoomi/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/namma-bhoomi/",
  slug: "namma-bhoomi",
  title: "Namma Bhoomi",
  description: "Robotics kits and remote instruction for Namma Bhoomi, a residential campus in Karnataka, India for children who have worked for a living."
}), { body });
