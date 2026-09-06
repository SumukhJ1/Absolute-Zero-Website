/* child.js — shared furniture for the nine Outreach sub-pages.
 * The header and the sibling footer are the same object on every child;
 * everything between them is a different macrostructure. */

const { outreachChildren, site } = require("./config");
const U = require("./ui");
const { t, icons, crumbs, btn } = U;

function childHead(o) {
  return `<section class="band band--open-top child-head">
  <div class="wrap">
    ${crumbs([
      { label: "Home", href: "/" },
      { label: "Outreach", href: "/outreach/" },
      { label: o.title, href: o.path }
    ])}
    <div class="page-head">
      ${o.kicker ? `<p class="child-head__kicker">${t(o.kicker)}</p>` : ""}
      <h1>${t(o.h1 || o.title)}</h1>
      <p class="lede">${t(o.lede)}</p>
      ${o.actions ? `<div class="btn-row" style="margin-top:var(--space-lg)">${o.actions}</div>` : ""}
    </div>
    ${o.facts ? `<dl class="child-facts">
      ${o.facts.map((f) => `<div><dt>${t(f.k)}</dt><dd>${t(f.v)}</dd></div>`).join("")}
    </dl>` : ""}
  </div>
</section>`;
}

/* Every child links back to the hub and on to one sibling, so no page in
   the section is more than two clicks from any other. */
function childFoot(currentPath) {
  const i = outreachChildren.findIndex((c) => c.path === currentPath);
  const next = outreachChildren[(i + 1) % outreachChildren.length];
  const prev = outreachChildren[(i - 1 + outreachChildren.length) % outreachChildren.length];

  return `<section class="band band--open-bottom rule-top">
  <div class="wrap">
    <div class="child-foot">
      <a class="child-foot__link child-foot__link--prev" href="${prev.path}">
        <span class="meta">Previous</span>
        <span class="child-foot__title">${t(prev.title)}</span>
      </a>
      <a class="child-foot__hub" href="/outreach/">
        ${icons.route}<span>All outreach programmes</span>
      </a>
      <a class="child-foot__link child-foot__link--next" href="${next.path}">
        <span class="meta">Next</span>
        <span class="child-foot__title">${t(next.title)}</span>
      </a>
    </div>
  </div>
</section>`;
}

function childMeta(o) {
  return {
    path: o.path,
    slug: o.slug,
    navLabel: "Outreach",
    title: `${o.title} | Outreach | Absolute Zero FTC #12096`,
    ogTitle: o.title,
    description: o.description,
    trail: [
      { label: "Home", href: "/" },
      { label: "Outreach", href: "/outreach/" },
      { label: o.title, href: o.path }
    ],
    priority: "0.6"
  };
}

module.exports = { childHead, childFoot, childMeta, site };
