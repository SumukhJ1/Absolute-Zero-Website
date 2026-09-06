/* library.js — the Open Access catalogue.
 *
 * Every entry carries pending:true until the document folder lands. That
 * renders an honest "file pending" state rather than a broken link. When
 * the PDFs arrive, set pending:false and add `file` plus `size`.
 */

const { site } = require("../lib/config");

const groups = [
  {
    key: "notebooks",
    title: "Engineering notebooks",
    blurb: "Complete season notebooks, including the rejected concepts and the failed prototypes. A notebook with no failures in it is a notebook nobody believes.",
    icon: "book",
    items: [
      { title: "DECODE season notebook", season: "2025-2026", kind: "PDF", pending: true },
      { title: "POWERPLAY season notebook", season: "2022-2023", kind: "PDF", pending: true },
      { title: "SKYSTONE season notebook", season: "2019-2020", kind: "PDF", pending: true },
      { title: "ROVER RUCKUS season notebook", season: "2018-2019", kind: "PDF", pending: true }
    ]
  },
  {
    key: "pit",
    title: "Pit designs",
    blurb: "Ten feet square, every tool and charging station placed, with a three-table layout for states. The current season is an interactive 3D model you can orbit.",
    icon: "cpu",
    items: [
      { title: "BIOBUZZ pit, interactive 3D model", season: "2026-2027", kind: "Web", href: site.pitUrl, external: true },
      { title: "Pit layout drawings and dimensions", season: "2026-2027", kind: "PDF", pending: true },
      { title: "Pit build parts list", season: "2026-2027", kind: "PDF", pending: true }
    ]
  },
  {
    key: "build",
    title: "Build guides",
    blurb: "Written by our own newest members in the season they learned it, then rewritten after we watched students eight thousand miles away get stuck on the steps we thought were obvious.",
    icon: "wrench",
    items: [
      { title: "Building your first FTC drivetrain", season: "Evergreen", kind: "PDF", pending: true },
      { title: "Wiring discipline and power budgeting", season: "Evergreen", kind: "PDF", pending: true },
      { title: "Mechanism prototyping on a parts budget", season: "Evergreen", kind: "PDF", pending: true }
    ]
  },
  {
    key: "program",
    title: "Programming guides",
    blurb: "Java on the control hubs. The OnBot Java material grew out of the presentation we have given rookie teams at ECPI University since 2018.",
    icon: "code",
    items: [
      { title: "OnBot Java for rookie teams", season: "Evergreen", kind: "PDF", pending: true },
      { title: "Writing an autonomous that repeats", season: "Evergreen", kind: "PDF", pending: true },
      { title: "Telemetry and logging that is worth reading", season: "Evergreen", kind: "PDF", pending: true }
    ]
  },
  {
    key: "outreach",
    title: "Outreach materials",
    blurb: "The session plans, run sheets and closing scripts we use ourselves. If you want to run a library workshop and do not know where to start, start here.",
    icon: "users",
    items: [
      { title: "Library workshop run sheet, 90 minutes", season: "Evergreen", kind: "PDF", pending: true },
      { title: "Timed build challenge, rules and scoring", season: "Evergreen", kind: "PDF", pending: true },
      { title: "The closing five minutes, and why they matter", season: "Evergreen", kind: "PDF", pending: true }
    ]
  }
];


const total = groups.reduce((n, g) => n + g.items.length, 0);

module.exports = { groups, total };
