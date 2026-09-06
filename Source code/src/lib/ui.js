/* ui.js — small markup helpers. Every page composes from these so the
 * same shape is never re-typed with a different class list. */

const { icons, flakeMark } = require("./icons");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
           .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Typographic clean-up applied to every string that reaches the page.
   Curly quotes, real ellipsis, real apostrophes. Note that em-dash and
   en-dash are absent by policy, so nothing here produces one. */
function typo(s) {
  return String(s)
    .replace(/\.\.\./g, "…")
    .replace(/(\w)'(\w)/g, "$1’$2")
    .replace(/(^|[\s(\[])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(^|[\s(\[])'/g, "$1‘")
    .replace(/'/g, "’");
}

const t = typo;

/* --- media ----------------------------------------------------------- *
 * Every image slot names the shot it is waiting for, in a comment the
 * team can grep, and carries real alt text now so nothing has to be
 * retro-fitted when the photo folder lands.
 * ---------------------------------------------------------------------*/
function img(o) {
  const cls = o.class ? ` class="${o.class}"` : "";
  const loading = o.priority ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"';
  const todo = o.shot ? `\n<!-- PHOTO SLOT: ${o.shot} | target ${o.w}x${o.h} | drop file at assets/img/${o.src.split("/").pop()} -->\n` : "";
  return `${todo}<img${cls} src="${o.src}" alt="${esc(o.alt)}" width="${o.w}" height="${o.h}"${loading}>`;
}

function frame(o) {
  const ratio = o.ratio || "photo";
  return `<figure class="frame frame--${ratio}${o.class ? " " + o.class : ""}">${img(o)}</figure>`;
}

function figure(o) {
  return `<figure class="${o.wrapClass || ""}">
      <span class="frame frame--${o.ratio || "photo"}">${img(o)}</span>
      ${o.caption ? `<figcaption>${t(o.caption)}</figcaption>` : ""}
    </figure>`;
}

/* --- text blocks ------------------------------------------------------*/

/* The accent rule is opt-in. It was on every section head, which turned a
   deliberate mark into a tic. */
function head(o) {
  return `<div class="head${o.wide ? " head--wide" : ""}">
      ${o.tick ? '<span class="tick" aria-hidden="true"></span>' : ""}
      <${o.level || "h2"}>${t(o.title)}</${o.level || "h2"}>
      ${o.body ? `<p>${t(o.body)}</p>` : ""}
    </div>`;
}

function note(text) {
  return `<p class="note">${icons.info}<span>${t(text)}</span></p>`;
}

/* --- controls ---------------------------------------------------------*/

function btn(o) {
  const variant = o.variant || "ghost";
  const icon = o.icon ? icons[o.icon] : "";
  const ext = o.external ? ' target="_blank" rel="noopener"' : "";
  return `<a class="btn btn--${variant}${o.class ? " " + o.class : ""}" href="${o.href}"${ext}>` +
         `<span>${t(o.label)}</span>${icon}</a>`;
}

function linkCta(o) {
  const ext = o.external ? ' target="_blank" rel="noopener"' : "";
  return `<a class="link-cta" href="${o.href}"${ext}><span>${t(o.label)}</span>${icons[o.icon || "arrowRight"]}</a>`;
}

function chip(label, accent) {
  return `<span class="chip${accent ? " chip--accent" : ""}">${t(label)}</span>`;
}

/* --- surfaces ---------------------------------------------------------*/

function card(o) {
  const tag = o.href ? "a" : "div";
  const attrs = o.href ? ` href="${o.href}" class="card card--link${o.class ? " " + o.class : ""}"` :
                         ` class="card${o.class ? " " + o.class : ""}"`;
  return `<${tag}${attrs}>
      ${o.eyebrow ? `<span class="card__eyebrow">${t(o.eyebrow)}</span>` : ""}
      <h3>${t(o.title)}</h3>
      ${o.body ? `<p>${t(o.body)}</p>` : ""}
      ${o.extra || ""}
      ${o.more ? `<span class="card__more">${t(o.more)}${icons.arrowRight}</span>` : ""}
    </${tag}>`;
}

function stat(o) {
  return `<div class="stat">
      <span class="stat__value">${esc(o.value)}</span>
      <span class="stat__label">${t(o.label)}</span>
      ${o.note ? `<span class="stat__note">${t(o.note)}</span>` : ""}
    </div>`;
}

function qa(items, idPrefix) {
  return items.map((item, i) => {
    const id = `${idPrefix}-${i}`;
    const open = i === 0;
    return `<div class="qa">
      <h3>
        <button class="qa__q" data-qa-toggle type="button" id="${id}-q"
                aria-expanded="${open}" aria-controls="${id}-a">
          <span>${t(item.q)}</span>
          <span class="qa__sign" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="qa__a" id="${id}-a" role="region" aria-labelledby="${id}-q">
        <div><div>${item.a}</div></div>
      </div>
    </div>`;
  }).join("\n");
}

/* --- filters ----------------------------------------------------------*/

function segmented(o) {
  const buttons = o.options.map((opt) =>
    `<button class="segmented__btn" type="button" role="tab" data-value="${esc(opt.value)}" ` +
    `aria-selected="${opt.value === o.selected}" tabindex="${opt.value === o.selected ? 0 : -1}">` +
    `${t(opt.label)}</button>`
  ).join("");
  return `<div class="filter-bar">
      <div class="segmented" role="tablist" aria-label="${esc(o.ariaLabel)}"
           data-filter-group="${esc(o.key)}" data-filter-target="${esc(o.target)}">
        ${buttons}
        <span class="visually-hidden" role="status" data-filter-live></span>
      </div>
    </div>`;
}

/* --- navigation -------------------------------------------------------*/

function crumbs(trail) {
  const items = trail.map((c, i) => {
    const last = i === trail.length - 1;
    return `<li>${last
      ? `<span aria-current="page">${t(c.label)}</span>`
      : `<a href="${c.href}">${t(c.label)}</a>`}</li>`;
  }).join("");
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
}

module.exports = {
  esc, typo, t, img, frame, figure, head, note,
  btn, linkCta, chip, card, stat, qa, segmented, crumbs,
  icons, flakeMark
};
