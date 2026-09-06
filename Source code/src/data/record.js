/* record.js — the competition record.
 *
 * Every line below is taken from the team's own season blogs. Nothing is
 * rounded up and nothing is inferred. Seasons with no published record
 * are listed as such rather than quietly omitted.
 *
 * TODO(goutam): the DECODE (2025-2026) season results are not on the old
 * site. Send the award list and finishes for Roanoke, Moorefield and
 * states and they drop straight into this file.
 */

const seasons = [
  {
    key: "decode", game: "DECODE", years: "2025-2026",
    events: [
      { name: "Roanoke qualifier", results: [] },
      { name: "Moorefield qualifier, West Virginia", results: [] },
      { name: "Virginia state championship", results: [] }
    ],
    note: "Results for this season are being compiled."
  },
  {
    key: "powerplay", game: "POWERPLAY", years: "2022-2023",
    events: [
      { name: "CHS-VA Mechanicsville qualifier 2", results: [
        "Connect Award, 2nd place",
        "Control Award sponsored by Arm Inc., 3rd place"
      ]},
      { name: "CHS-VA Harrisonburg qualifier 2", results: [
        "Innovate Award sponsored by Raytheon Technologies, 2nd place"
      ]},
      { name: "CHS-VA Herndon qualifier", results: [
        "Winning alliance, captain"
      ]},
      { name: "Chesapeake FTC Championship, Violet Division", results: [
        "Connect Award, 3rd place",
        "Promote Award, 3rd place",
        "Violet Division winning alliance, second team selected",
        "Finalist alliance, second team selected"
      ]}
    ]
  },
  {
    key: "skystone", game: "SKYSTONE", years: "2019-2020",
    events: [
      { name: "Oakton qualifier", results: [
        "Motivate Award",
        "Robot Design, 2nd place",
        "Alliance finalist"
      ]},
      { name: "Centreville qualifier", results: [
        "Inspire Award, qualified for states",
        "Ranked 1st, won all five qualification matches",
        "Elimination finalist",
        "Control Award, 2nd place",
        "Design Award, 3rd place"
      ]},
      { name: "DC qualifier, Maryland", results: [
        "Won the finals with Robot Uprising 14604 and Innovotics 8702",
        "Think Award",
        "Control Award, 2nd place",
        "Connect Award, 3rd place",
        "Advanced to Maryland states"
      ]},
      { name: "Virginia state championship", results: [] },
      { name: "Maryland state championship", results: [
        "Second state appearance of the season"
      ]}
    ]
  },
  {
    key: "roverruckus", game: "ROVER RUCKUS", years: "2018-2019",
    events: [
      { name: "Reston at Centreville regional qualifier", results: [
        "Semi-finalists",
        "Highest team score of the event, 322 points",
        "Highest individual score of the event, 200 points",
        "Connect Award, 1st place",
        "Collins Aerospace Innovate Award, 2nd place",
        "Control Award, 3rd place",
        "Inspire Award, 3rd place",
        "One of three teams advancing to the state championship"
      ]},
      { name: "Virginia state championship, Kamen Division", results: [
        "First pick of the first alliance",
        "Divisional finalists",
        "Highest score of the event, 400 points"
      ]}
    ]
  },
  {
    key: "relicrecovery", game: "RELIC RECOVERY", years: "2017-2018",
    events: [
      { name: "Shenandoah qualifier", results: [
        "Winning alliance",
        "Control Award"
      ]},
      { name: "Heritage High School regional", results: [
        "Control Award, 1st place",
        "Motivate Award, 2nd place",
        "Inspire Award, 2nd place",
        "Connect Award, 3rd place",
        "Won four of five qualification matches",
        "Fourth place in the finals"
      ]},
      { name: "Virginia state championship, Richmond", results: [
        "Semi-finalists",
        "Ranked 10th with a 3-2-0 record"
      ]}
    ]
  }
];

/* Awards, counted once each, for the summary line on the Build page. */
const awardTally = (() => {
  const names = {};
  seasons.forEach((s) => s.events.forEach((e) => e.results.forEach((r) => {
    const base = r.split(",")[0].trim();
    if (/Award$/.test(base)) names[base] = (names[base] || 0) + 1;
  })));
  return names;
})();

module.exports = { seasons, awardTally };
