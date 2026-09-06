/* outreach.js — seasons, the workshop record, and the programme list.
 *
 * Everything dated below is drawn from the team's own event blogs. Where
 * a date or a number could not be confirmed it is left out rather than
 * estimated, and the gap is marked with a TODO.
 */

const seasons = [
  { key: "biobuzz",     label: "BIOBUZZ",     years: "2026-2027", state: "planned" },
  { key: "decode",      label: "DECODE",      years: "2025-2026", state: "complete", default: true },
  { key: "centerstage", label: "CENTERSTAGE", years: "2023-2024", state: "complete" },
  { key: "earlier",     label: "Earlier",     years: "2017-2023", state: "complete" }
];

/* Headline outreach figures, per the team's own count. */
const impact = [
  { value: "700+", label: "Students reached",   note: "Across libraries, schools, expos and partner centres." },
  { value: "25+",  label: "Workshops hosted",   note: "Sessions we planned, staffed and ran ourselves." },
  { value: "10+",  label: "FIRST teams mentored", note: "Rookie FTC and FLL teams we have coached through a season." },
  { value: "2",    label: "Countries",          note: "Northern Virginia, and a residential school in Karnataka, India." }
];

const workshops = [
  /* ---------------- BIOBUZZ 2026-2027 (planned) ------------------- */
  {
    season: "biobuzz", title: "Loudoun library series, autumn block",
    venue: "Ashburn, Cascades and Gum Spring libraries", date: "Autumn 2026", dateISO: "",
    planned: true, audience: "Ages 7 to 13",
    summary: "A three-stop return of the library series. Each session opens with a driving slot on the competition robot, then moves to a build challenge using the same design loop we use on the real machine.",
    plan: [
      "Drive the BIOBUZZ robot on a scoring element",
      "Take apart a mechanism and explain what each part does",
      "Build and test one intake concept against a timer"
    ]
  },
  {
    season: "biobuzz", title: "FTC Collaboration Summit",
    venue: "To be confirmed", date: "Pre-qualifier, winter 2026", dateISO: "",
    planned: true, audience: "Area FTC teams",
    summary: "Shared practice field, a structured feedback round on each robot, and a notebook exchange before the first qualifier of the season.",
    plan: [
      "Timed practice matches between attending teams",
      "Twenty-minute design review per robot, run by a mixed panel",
      "Engineering notebook swap and written feedback"
    ]
  },
  {
    season: "biobuzz", title: "Classes with Curie",
    venue: "Curie Learning, Ashburn", date: "Term dates to be confirmed", dateISO: "",
    planned: true, audience: "Ages 9 to 14",
    summary: "A short robotics course taught by our students, built around the FIRST progression from LEGO-based robotics into FTC.",
    plan: [
      "Session one: what a robot actually is, and the design loop",
      "Session two: drivetrains, gearing and why it matters",
      "Session three: sensors and the first line of code",
      "Session four: a scored challenge run as a mini-competition"
    ]
  },
  {
    season: "biobuzz", title: "Best Brains introductory robotics",
    venue: "Best Brains, Loudoun County centres", date: "Term dates to be confirmed", dateISO: "",
    planned: true, audience: "Ages 8 to 14",
    summary: "Introductory robotics and block-coding sessions for students who have not met FIRST before, pitched at the age group Best Brains already serves.",
    plan: [
      "Block coding on a small drivable robot",
      "A build-and-test challenge with a fixed parts budget",
      "What FIRST LEGO League looks like, and how to join one"
    ]
  },
  {
    season: "biobuzz", title: "Techstravaganza 2027",
    venue: "Thomas Jefferson High School for Science and Technology, Alexandria",
    date: "May 2027", dateISO: "", planned: true, audience: "Open to the public",
    summary: "A booth at the free public STEM fair run by TWIST. We bring the competition robot and a driver station and let visitors take the controls.",
    plan: [
      "Open driving on the competition robot",
      "A LEGO-based build table for younger visitors",
      "A short talk on how to start an FTC team"
    ]
  },
  {
    season: "biobuzz", title: "Run4Charity",
    venue: "Aldie, Virginia", date: "September 2026", dateISO: "",
    planned: true, audience: "Community event",
    summary: "Volunteering at the Best Runners charity race, and running a robotics table near the finish line for families waiting on runners.",
    plan: [
      "Course marshalling and registration support",
      "A robot demo table at the finish area"
    ]
  },

  /* ---------------- DECODE 2025-2026 ------------------------------ */
  {
    season: "decode", title: "Ashburn Library workshop",
    venue: "Ashburn Library", date: "March 2026", dateISO: "2026-03-28",
    audience: "Ages 7 to 13",
    summary: "Visitors operated a real competition robot and got a first look at what FIRST robotics involves.",
    detail: "We set up a driver station beside a scoring element and let every child who wanted a turn take the controls. Most of the questions that followed were about how the arm moved, which is the right question to be asked."
  },
  {
    season: "decode", title: "Cascades Library workshop",
    venue: "Cascades Library", date: "March 2026", dateISO: "2026-03-21",
    audience: "Ages 7 to 13",
    summary: "A session built around the engineering design process rather than the finished robot.",
    detail: "Students worked through define, build, test and revise on a small challenge, then compared what they had built against what they had planned. Nobody's first attempt worked, which was the point."
  },
  {
    season: "decode", title: "Cascades Library series",
    venue: "Cascades Library", date: "2025 to 2026", dateISO: "2026-02-01",
    audience: "Ages 7 to 13",
    summary: "A recurring block of hands-on robotics sessions across the season."
  },
  {
    season: "decode", title: "Gum Spring Library series",
    venue: "Gum Spring Library", date: "2025 to 2026", dateISO: "2026-02-15",
    audience: "Ages 7 to 13",
    summary: "The same series, run for a second branch and a second set of families."
  },

  /* ---------------- CENTERSTAGE 2023-2024 ------------------------- */
  {
    season: "centerstage", title: "Girl Scouts troop meet-up",
    venue: "Local Girl Scout troop", date: "January 2024", dateISO: "2024-01-24",
    audience: "Girl Scout troop",
    summary: "An introduction to FTC for a local troop, ending with a complete robot the troop had built together.",
    detail: "We ran a presentation on what the competition is, then a build activity. By the end the troop had assembled a working robot with a chassis, wheels and an arm. We also showed the robotics introduction video the team made for the session.",
    video: "https://www.youtube.com/watch?v=-4qR3eIjdy4"
  },

  /* ---------------- Earlier seasons -------------------------------- */
  {
    season: "earlier", title: "Robot build and programming guides",
    venue: "Published online", date: "January 2022", dateISO: "2022-01-09",
    audience: "Rookie teams",
    summary: "Five new members each wrote a guide covering what they had just learned about building and programming a robot, so the next rookie would not start from nothing."
  },
  {
    season: "earlier", title: "World Robot Olympiad preparation workshops",
    venue: "Online", date: "April to May 2020", dateISO: "2020-05-04",
    audience: "WRO competitors",
    summary: "Four weeks of online workshops for students preparing EV3 challenges for the 2020 WRO season, covering game strategy and open question time. The presentations were streamed on the team's YouTube channel."
  },
  {
    season: "earlier", title: "Algonkian Elementary STEM showcase",
    venue: "Algonkian Elementary School", date: "February 2020", dateISO: "2020-02-26",
    audience: "Elementary school",
    summary: "A returning invitation to the school's annual STEM showcase, presenting FTC alongside the other Robotics for Youth programmes."
  },
  {
    season: "earlier", title: "Absolute Zero scrimmage",
    venue: "Hosted by Absolute Zero", date: "February 2020", dateISO: "2020-02-15",
    audience: "Nine FTC teams",
    summary: "We hosted nine FTC teams for a full scrimmage with a real match schedule, so everyone got competition reps before states."
  },
  {
    season: "earlier", title: "Haymaker STEAM Expo",
    venue: "Battlefield High School", date: "January 2020", dateISO: "2020-01-25",
    audience: "Open to the public",
    summary: "Demonstrations of drones, a secondary robot, a Raspberry Pi arcade and EV3 kits, volunteering alongside FRC team ILITE."
  },
  {
    season: "earlier", title: "Six-team scrimmage",
    venue: "Hosted by Xtreme Voltage 10515", date: "January 2020", dateISO: "2020-01-25",
    audience: "Six FTC teams",
    summary: "A shared practice day with five other teams, focused on trading ideas rather than winning matches."
  },
  {
    season: "earlier", title: "Collaboration with Slice of Pi 13441",
    venue: "Robotics for Youth", date: "January 2020", dateISO: "2020-01-04",
    audience: "One FTC team",
    summary: "A practice and feedback exchange with a fellow Robotics for Youth team before their first qualifier."
  },
  {
    season: "earlier", title: "Scrimmage with SWAT Team 16502",
    venue: "Hosted by Absolute Zero", date: "December 2019", dateISO: "2019-12-13",
    audience: "One FTC team",
    summary: "Alliance practice with a focus on scoring accuracy and driver communication between matches."
  },
  {
    season: "earlier", title: "OnBot Java presentation",
    venue: "ECPI University", date: "September 2019", dateISO: "2019-09-21",
    audience: "Rookie FTC teams",
    summary: "Our second year giving this presentation. A year of extra season experience made the advice considerably more useful than the first time."
  },
  {
    season: "earlier", title: "Mentoring the Gearbox Gators",
    venue: "Rookie team visit", date: "December 2018", dateISO: "2018-12-01",
    audience: "One rookie FTC team",
    summary: "Driving practice, wiring cleanup and engineering notebook advice for a rookie team days before their qualifier."
  },
  {
    season: "earlier", title: "NASA Moon to Mars live show",
    venue: "NASA Headquarters, Washington DC", date: "November 2018", dateISO: "2018-11-29",
    audience: "Press and public",
    summary: "Invited to explain FIRST programmes at a NASA news conference on the return to the Moon."
  },
  {
    season: "earlier", title: "FIRST LEGO League refereeing",
    venue: "Mary Ellen Henderson regional", date: "November 2018", dateISO: "2018-11-10",
    audience: "FLL competitors",
    summary: "Three team members refereed a regional FLL competition, which turned out to be the clearest lesson in the FIRST core values any of us had had."
  },
  {
    season: "earlier", title: "Star Wars Reads",
    venue: "Community event", date: "November 2018", dateISO: "2018-11-03",
    audience: "Families",
    summary: "A scrimmage, a demo robot for visitors to drive and an EV3 programming station, run with FLL team Cascades Thunderbots."
  },
  {
    season: "earlier", title: "MineFaire Expo",
    venue: "MineFaire", date: "October 2018", dateISO: "2018-10-06",
    audience: "Open to the public",
    summary: "A second year at the expo. Robot demos, mBot soccer and EV3 programming, aimed squarely at raising awareness of FLL."
  },
  {
    season: "earlier", title: "STEM in 30",
    venue: "National Air and Space Museum", date: "September 2018", dateISO: "2018-09-05",
    audience: "Broadcast audience",
    summary: "Team members were invited onto the museum's educational programme to talk about FIRST LEGO League. The episode was recorded and aired."
  },
  {
    season: "earlier", title: "Techstravaganza",
    venue: "Thomas Jefferson High School for Science and Technology", date: "May 2018", dateISO: "2018-05-19",
    audience: "Open to the public",
    summary: "We taught visitors the Mindstorms programming language and gave them a working understanding of EV3 robots."
  },
  {
    season: "earlier", title: "USA Science and Engineering Festival",
    venue: "Washington DC", date: "April 2018", dateISO: "2018-04-07",
    audience: "Open to the public",
    summary: "FIRST invited us to display and run our robot at the festival across two days, with a booth and a demo robot visitors could drive."
  },
  {
    season: "earlier", title: "World Robot Olympiad regional tournament",
    venue: "Regional tournament", date: "2018", dateISO: "2018-05-01",
    audience: "Open to the public",
    summary: "Workshops, tutorials and hands-on robot demonstrations at a regional WRO tournament attended by over five hundred people."
  },
  {
    season: "earlier", title: "Haymaker Expo",
    venue: "Battlefield High School", date: "January 2018", dateISO: "2018-01-27",
    audience: "Open to the public",
    summary: "An FTC station with hands-on demos for more than fifty children, with a plexiglass panel added to the robot so our sponsors travelled with it."
  }
];

module.exports = { seasons, impact, workshops };
