/* icons.js — one icon family, one stroke voice.
 *
 * All UI icons: 24x24 viewBox, 1.5 stroke, round cap and join, no fill.
 * Brand marks are the only filled paths, because a wordmark drawn in
 * outline stops being that brand's mark.
 * No emoji is used anywhere on this site.
 */

const stroke = (body, extra) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ` +
  `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra || ""}>${body}</svg>`;

const solid = (body) =>
  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${body}</svg>`;

const icons = {
  arrowRight: stroke('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: stroke('<path d="M8 16 16 8M9 8h7v7"/>'),
  arrowDown: stroke('<path d="M12 5v14M6 13l6 6 6-6"/>'),
  menu: stroke('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: stroke('<path d="M6 6l12 12M18 6L6 18"/>'),
  mail: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  pin: stroke('<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
  calendar: stroke('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  file: stroke('<path d="M14 3v5h5"/><path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7Z"/>'),
  download: stroke('<path d="M12 4v10M8 11l4 4 4-4"/><path d="M5 19h14"/>'),
  wrench: stroke('<path d="M15.5 4a5.5 5.5 0 0 0-5 7.7L4 18.2a2 2 0 1 0 2.8 2.8l6.5-6.5A5.5 5.5 0 1 0 15.5 4Z"/>'),
  code: stroke('<path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 5l-3 14"/>'),
  cpu: stroke('<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M9 1.5v2M15 1.5v2M9 20.5v2M15 20.5v2M1.5 9h2M1.5 15h2M20.5 9h2M20.5 15h2"/>'),
  users: stroke('<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19a6.2 6.2 0 0 1 12.4 0"/><path d="M16.2 5.4a3.2 3.2 0 0 1 0 6.2M17.5 13.6A6.2 6.2 0 0 1 21.2 19"/>'),
  globe: stroke('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 6 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-6-3.9-9S9.4 5.7 12 3Z"/>'),
  spark: stroke('<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>'),
  award: stroke('<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.6-1.3 7.2 4.8-2.6 4.8 2.6-1.3-7.2"/>'),
  book: stroke('<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5Z"/><path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19v-3"/>'),
  info: stroke('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  check: stroke('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  play: stroke('<circle cx="12" cy="12" r="9"/><path d="M10.2 8.8 15.5 12l-5.3 3.2Z"/>'),
  handshake: stroke('<path d="m12 8-2.2 2.2a1.7 1.7 0 0 0 0 2.4l.4.4a1.7 1.7 0 0 0 2.4 0L15 10.6"/><path d="M2.5 9.5 6 6.5l3.5 1 2.5-1 2.5 1L18 6.5l3.5 3-3 6-2-1-3 2.6-3-2.6-2 1Z"/>'),
  flag: stroke('<path d="M5 21V4M5 5h11l-1.6 3.5L16 12H5"/>'),
  route: stroke('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.5"/>'),
  clipboard: stroke('<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3.8A1.8 1.8 0 0 1 10.8 2h2.4A1.8 1.8 0 0 1 15 3.8v.7Z"/><path d="M9 11h6M9 15h4"/>'),
  target: stroke('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),

  youtube: solid('<path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1Z"/>'),
  instagram: solid('<path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.62.07 4.81s0 3.56-.07 4.81c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.56 2.2 15.19 2.2 12s0-3.56.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.44 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.44 8.5 3.43 8.86 3.43 12s.01 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4.01 15.14 4 12 4Zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.2-3.05a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>'),
  facebook: solid('<path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z"/>'),
  x: solid('<path d="M17.53 3h3.02l-6.6 7.55L21.7 21h-6.05l-4.74-6.2L5.48 21H2.46l7.05-8.07L2.3 3h6.2l4.29 5.67ZM16.47 19.2h1.67L7.6 4.7H5.81Z"/>')
};

/* The team mark. A six-fold snowflake, drawn once, used at every size.
   Not a logo replacement: the real logo drops in as an <img> when the
   asset folder lands. */
const flakeMark = (cls) =>
  `<svg class="${cls || "flake-mark"}" viewBox="0 0 32 32" fill="none" stroke="currentColor" ` +
  `stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` +
  `<path d="M16 2.5v27M4.31 9.25l23.38 13.5M4.31 22.75 27.69 9.25"/>` +
  `<path d="M16 7.4 12.9 4.6M16 7.4l3.1-2.8M16 24.6l-3.1 2.8M16 24.6l3.1 2.8"/>` +
  `<path d="m8.55 11.7-4.1.35M8.55 11.7 6.9 7.9M23.45 20.3l4.1-.35M23.45 20.3l1.65 3.8"/>` +
  `<path d="m8.55 20.3-4.1-.35M8.55 20.3 6.9 24.1M23.45 11.7l4.1.35M23.45 11.7l1.65-3.8"/>` +
  `<circle cx="16" cy="16" r="2.6"/></svg>`;

module.exports = { icons, flakeMark, stroke, solid };
