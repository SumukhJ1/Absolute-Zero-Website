/* config.js — one source of truth for identity, navigation and contact. */

const site = {
  name: "Absolute Zero",
  fullName: "Absolute Zero Robotics",
  team: "12096",
  tagline: "Pushing our limits to accomplish the impossible.",
  origin: "https://azrobotics.org",
  locale: "en_US",
  region: "Northern Virginia",
  founded: "2016",
  email: "absolutezeroftc@gmail.com",
  season: { current: "BIOBUZZ", currentYears: "2026-2027", previous: "DECODE", previousYears: "2025-2026" },
  pitUrl: "https://absolutezero-pit.vercel.app",
  parentOrg: { name: "Robotics for Youth", url: "https://roboticsforyouth.org/", ein: "47-5340842" },
  socials: [
    { label: "YouTube",   handle: "Absolute Zero FTC",     url: "https://www.youtube.com/channel/UCWrKwtolC-khsTPuwrAJqjw", icon: "youtube" },
    { label: "Instagram", handle: "@absolutezeroftc",      url: "https://www.instagram.com/absolutezeroftc/",              icon: "instagram" },
    { label: "Facebook",  handle: "Absolute Zero Robotics", url: "https://www.facebook.com/absolutezerorobotics/",          icon: "facebook" },
    { label: "X",         handle: "@absolutezeroftc",      url: "https://twitter.com/absolutezeroftc",                     icon: "x" }
  ]
};

/* Nav labels are short on purpose: the bar must render on one line at
   desktop, and shortening the label is the first fix for a wrapping
   affordance. Full names live in <title> and each page's h1. */
const nav = [
  { label: "Home",     short: "Home",     path: "/",                      title: "Home" },
  { label: "Mission",  short: "Mission",  path: "/mission-and-vision/",   title: "Mission and Vision" },
  { label: "Team",     short: "Team",     path: "/our-team/",             title: "Our Team" },
  { label: "Build",    short: "Build",    path: "/build-and-program/",    title: "Build and Program" },
  { label: "Outreach", short: "Outreach", path: "/outreach/",             title: "Outreach" },
  { label: "Sponsors", short: "Sponsors", path: "/sponsors-and-donors/",  title: "Sponsors and Donors" },
  { label: "Contact",  short: "Contact",  path: "/contact/",              title: "Contact" }
];

const outreachChildren = [
  { path: "/outreach/ftc-collaboration-summit/", title: "FTC Collaboration Summit",
    blurb: "A working day for area FTC teams: shared field time, honest feedback, and a notebook exchange before qualifiers." },
  { path: "/outreach/robo-reach/", title: "Robo Reach",
    blurb: "Our travelling workshop. We bring a competition robot, a driver station, and a build table to libraries and schools." },
  { path: "/outreach/classes-with-curie/", title: "Classes with Curie",
    blurb: "A robotics course we run with Curie Learning, built around the FIRST progression from LEGO to FTC." },
  { path: "/outreach/best-brains/", title: "Best Brains",
    blurb: "Introductory robotics and coding sessions for the 8 to 14 age group at Best Brains centres across Loudoun County." },
  { path: "/outreach/genius-in-you/", title: "Genius In You",
    blurb: "Engineering-communication sessions with an Ashburn after-school programme, aimed at students preparing for AET, AOS and TJ." },
  { path: "/outreach/run4charity/", title: "Run4Charity 5K",
    blurb: "We volunteer at the Best Runners charity race in Aldie and run a robotics table at the finish line." },
  { path: "/outreach/techstravaganza/", title: "Techstravaganza",
    blurb: "The free public STEM fair at Thomas Jefferson High School. We have been running a booth there since 2018." },
  { path: "/outreach/namma-bhoomi/", title: "Namma Bhoomi",
    blurb: "Robotics kits and remote instruction for a residential school for working children in Karnataka, India." },
  { path: "/outreach/open-access/", title: "Open Access",
    blurb: "Our engineering notebooks, pit designs and build guides, published for any team that wants them." }
];

/* Every legacy URL the old WordPress.com site exposed, mapped forward.
   SEO migration is the single largest risk in a rebuild. */
const redirects = [
  ["/our-team-2/",                "/our-team/"],
  ["/outreach-workshops/",        "/outreach/"],
  ["/sponsors-donors/",           "/sponsors-and-donors/"],
  ["/sponsors/",                  "/sponsors-and-donors/"],
  ["/our-socials/",               "/contact/"],
  ["/mission/",                   "/mission-and-vision/"],
  ["/outreach/",                  "/outreach/"],
  ["/ftc-collaboration-summit-2/", "/outreach/ftc-collaboration-summit/"],
  ["/ftc-collaboration-summit/",  "/outreach/ftc-collaboration-summit/"],
  ["/videos/",                    "/outreach/"]
];

module.exports = { site, nav, outreachChildren, redirects };
