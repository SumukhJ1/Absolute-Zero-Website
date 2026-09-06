/* Open Access — macrostructure 11 Catalogue.
 * A uniform index of one kind of thing. The page IS the inventory.
 *
 * TODO(goutam): the PDF folder is not in place yet. Every entry below
 * carries pending:true, which renders an honest "file pending" state
 * rather than a broken link. When the folder lands, set pending:false and
 * add `file` plus `size` to each entry. Nothing else has to change.
 */

const { site } = require("../lib/config");
const { childHead, childFoot, childMeta } = require("../lib/child");
const U = require("../lib/ui");
const { t, icons, btn, note, head, linkCta, chip } = U;

const { groups, total } = require("../data/library");

function item(it) {
  const inner = `
    <span class="cat-item__icon" aria-hidden="true">${it.kind === "Web" ? icons.globe : icons.file}</span>
    <span class="cat-item__text">
      <span class="cat-item__title">${t(it.title)}</span>
      <span class="cat-item__meta">
        <span class="nums">${t(it.season)}</span>
        <span aria-hidden="true">/</span>
        <span>${t(it.kind)}</span>
        ${it.size ? `<span aria-hidden="true">/</span><span class="nums">${t(it.size)}</span>` : ""}
      </span>
    </span>
    <span class="cat-item__action">${it.pending
      ? `<span class="chip">File pending</span>`
      : `<span class="cat-item__go" aria-hidden="true">${it.external ? icons.arrowUpRight : icons.download}</span>`}</span>`;

  if (it.pending) {
    return `<li class="cat-item cat-item--pending">${inner}</li>`;
  }
  const ext = it.external ? ' target="_blank" rel="noopener"' : "";
  const dl = it.external ? "" : " download";
  return `<li class="cat-item"><a href="${it.href || it.file}"${ext}${dl}>${inner}</a></li>`;
}

const body = `
${childHead({
  path: "/outreach/open-access/",
  title: "Open Access",
  h1: "Open Access",
  kicker: "For other FIRST teams",
  lede: "This page is not for sponsors, judges or parents. It is for other teams. Every engineering notebook, pit design, build guide and programming guide we have written, published in full. No sign-up, no email wall, no request form. Take what is useful.",
  facts: [
    { k: "Who it is for", v: "Any FIRST team, anywhere" },
    { k: "Cost", v: "Free, no account needed" },
    { k: "Items", v: total + " and growing" }
  ],
  actions: U.btn({ href: site.pitUrl, label: "Open the pit model", variant: "primary", icon: "arrowUpRight", external: true })
})}

<section class="band band--tight rule-top">
  <div class="wrap">
    <div class="split split--narrow">
      <div>
        <span class="tick" aria-hidden="true"></span>
        <h2>Why this exists</h2>
      </div>
      <div class="stack">
        <p>
          ${t("In 2018 a team we had never met sat down with us and explained OnBot Java, because we did not know what a hub was and they did. They asked for nothing. We have been trying to pay that back ever since, and at some point the honest version of paying it back stopped being a favour we did for individual teams and became a folder we published.")}
        </p>
        <p>
          ${t("Nothing here is held back for competitive reasons. Teams who have used this material have beaten us. That is a fine outcome. The alliance selection at the end of a qualifier is not improved by one team hoarding a wiring diagram.")}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head({
      title: "The library",
      body: "Five groups. Season material is dated; the evergreen guides are maintained and rewritten when they stop being clear enough."
    })}

    <!-- AZ-REGION:catalogue -->
    <div class="catalogue">
      ${groups.map((g) => `
        <section class="cat-group" id="oa-${g.key}" aria-labelledby="oa-${g.key}-h">
          <div class="cat-group__head">
            <span class="cat-group__icon" aria-hidden="true">${icons[g.icon]}</span>
            <div>
              <h3 id="oa-${g.key}-h">${t(g.title)}</h3>
              <p>${t(g.blurb)}</p>
            </div>
          </div>
          <ul class="cat-items bare">
            ${g.items.map(item).join("")}
          </ul>
        </section>`).join("")}
    </div>
    <!-- /AZ-REGION:catalogue -->

    ${note("The document folder has not been uploaded yet, so every PDF above shows an honest file-pending state rather than a broken link. Drop the folder in and each entry becomes a working download.")}
  </div>
</section>

<section class="band band--raised rule-top">
  <div class="wrap">
    <div class="split split--even">
      <div>
        <h2>How to use any of this</h2>
        <p>
          ${t("Copy it. Adapt it. Put your own team number on it. You do not need to credit us and you do not need to ask, although we like hearing when something worked.")}
        </p>
        <p>
          ${t("The one thing we would ask is that if a guide is wrong or unclear, tell us. Every rewrite in this library came from somebody reporting that a step did not work.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${btn({ href: "/contact/", label: "Tell us what is broken", variant: "ghost", icon: "arrowRight" })}
        </div>
      </div>
      <div>
        <h2>If you would rather ask a person</h2>
        <p>
          ${t("We host a collaboration summit before the first qualifier every season: shared field time, a design review on every robot in the room, and a notebook exchange. It is free and you do not have to be local to come.")}
        </p>
        <div class="btn-row" style="margin-top:var(--space-md)">
          ${btn({ href: "/outreach/ftc-collaboration-summit/", label: "FTC Collaboration Summit", variant: "ghost", icon: "arrowRight" })}
        </div>
      </div>
    </div>
  </div>
</section>

${childFoot("/outreach/open-access/")}
`;

module.exports = Object.assign(childMeta({
  path: "/outreach/open-access/",
  slug: "open-access",
  title: "Open Access",
  description: "Every Absolute Zero engineering notebook, pit design, build guide and programming guide, published free for other FIRST teams. No sign-up, no email wall."
}), {
  body,
  priority: "0.7",
  schema: [{
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Absolute Zero Open Access library",
    description: "Engineering notebooks, pit designs and guides published free for other FIRST teams.",
    numberOfItems: total,
    itemListElement: groups.flatMap((g, gi) =>
      g.items.map((it, i) => ({
        "@type": "ListItem",
        position: gi * 10 + i + 1,
        name: it.title
      }))
    )
  }]
});
