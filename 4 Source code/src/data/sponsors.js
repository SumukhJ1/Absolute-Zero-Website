/* sponsors.js
 *
 * Every sponsor carries a text name and real alt text. The old site
 * shipped seven logo images with neither, which meant no search engine
 * and no screen reader could tell who supports this team.
 *
 * TODO(goutam): confirm the tier each supporter belongs in, and send the
 * two logos that were unidentifiable on the old site.
 */

const tiers = [
  {
    key: "platinum",
    name: "Platinum",
    amount: "$1,500 and above",
    benefits: [
      "Logo on the robot and on team apparel",
      "Logo on the team banner, displayed at every competition",
      "Named on this page",
      "A thank-you post across our social channels"
    ]
  },
  {
    key: "gold",
    name: "Gold",
    amount: "$1,000 to $1,499",
    benefits: [
      "Logo on team apparel",
      "Logo on the team banner",
      "Named on this page",
      "A thank-you post across our social channels"
    ]
  },
  {
    key: "silver",
    name: "Silver",
    amount: "$500 to $999",
    benefits: [
      "Logo on the team banner",
      "Named on this page",
      "A thank-you post across our social channels"
    ]
  },
  {
    key: "bronze",
    name: "Bronze",
    amount: "$200 to $499",
    benefits: [
      "Named on this page",
      "A thank-you post across our social channels"
    ]
  },
  {
    key: "snowflake",
    name: "Snowflake",
    amount: "Personal donation, any amount",
    benefits: [
      "Named on this page",
      "A thank-you post across our social channels"
    ]
  }
];

const supporters = [
  { name: "Fannie Mae",          logo: "sponsor-fannie-mae.png",   url: "",                              kind: "Corporate",   since: "" },
  { name: "Leidos",              logo: "sponsor-leidos.png",       url: "https://www.leidos.com/",       kind: "Corporate",   since: "" },
  { name: "Robotics for Youth",  logo: "sponsor-rfy.png",          url: "https://roboticsforyouth.org/", kind: "Parent nonprofit", since: "" },
  { name: "Curie Learning",      logo: "sponsor-curie.png",        url: "https://curielearning.com/",    kind: "Program partner", since: "" },
  { name: "Best Brains",         logo: "sponsor-best-brains.png",  url: "https://bestbrains.com/",       kind: "Program partner", since: "" },
  { name: "Best Runners",        logo: "sponsor-best-runners.png", url: "https://www.bestrunners.org/",  kind: "Community partner", since: "" },
  { name: "FIRST",               logo: "sponsor-first.png",        url: "https://www.firstinspires.org/", kind: "Program",     since: "" }
];

/* What sponsorship actually pays for. Costs are ranges, not invented
   precision, and every line is a thing the team really buys.
   TODO(goutam): replace the ranges with this season's real budget. */
const costs = [
  { item: "FIRST team registration and event entry", note: "Every season, before a single part is ordered." },
  { item: "Control system, motors and structure",    note: "Rebuilt or replaced as the game demands." },
  { item: "Practice field and game elements",        note: "A season of driver practice needs a real field." },
  { item: "Outreach materials and demo kits",        note: "The LEGO sets and demo robots that go out to libraries." },
  { item: "Travel to qualifiers and championships",  note: "Roanoke, Moorefield, Richmond and beyond." }
];

module.exports = { tiers, supporters, costs };
