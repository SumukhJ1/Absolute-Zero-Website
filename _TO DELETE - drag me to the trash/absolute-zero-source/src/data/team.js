/* team.js — the roster.
 *
 * Roles are normalised to four values so the filter is meaningful:
 *   build · program · outreach · drive
 * Coaches and mentors carry their own group.
 *
 * TODO(goutam): coach bios below are carried over from the old site and
 * are out of date. Coach Dinesh's photo needs replacing outright.
 */

const roles = {
  build:    "Build",
  program:  "Programming",
  outreach: "Outreach",
  drive:    "Drive team",
  cad:      "CAD"
};

const coaches = [
  {
    name: "Coach Dinesh",
    group: "coach",
    roles: ["Head coach"],
    line: "Software developer, and a board member of Robotics for Youth.",
    bio: "Has coached Absolute Zero since the team's early seasons. Spends most of a build season asking students the question behind the question rather than answering the first one.",
    photo: "coach-dinesh.jpg",
    alt: "Coach Dinesh at a team build session.",
    stale: true
  },
  {
    name: "Coach Saji",
    group: "coach",
    roles: ["Coach"],
    line: "Software engineer, and a board member of Robotics for Youth.",
    bio: "Coached FLL team 1540 for four seasons before joining Absolute Zero, and still runs the introductory sessions that bring middle schoolers into FIRST.",
    photo: "coach-saji.jpg",
    alt: "Coach Saji working with students at the practice field.",
    stale: true
  }
];

const students = [
  { name: "Amit",      roles: ["cad", "build"],        line: "CAD and mechanical design",       photo: "member-amit.jpg" },
  { name: "Vishishya", roles: ["build"],               line: "Mechanical build",                 photo: "member-vishishya.jpg" },
  { name: "Gaurav",    roles: ["build", "drive"],      line: "Mechanical build, driver",         photo: "member-gaurav.jpg" },
  { name: "Keerthana", roles: ["build", "outreach"],   line: "Mechanical build, outreach lead",  photo: "member-keerthana.jpg" },
  { name: "Nabhya",    roles: ["build"],               line: "Mechanical build",                 photo: "member-nabhya.jpg" },
  { name: "Sumukh",    roles: ["outreach", "build"],   line: "Outreach, mechanical build",       photo: "member-sumukh.jpg" },
  { name: "Anirudh",   roles: ["build"],               line: "Mechanical build",                 photo: "member-anirudh.jpg" },
  { name: "Eshanth",   roles: ["build", "program"],    line: "Mechanical build, programming",    photo: "member-eshanth.jpg" },
  { name: "Prisha",    roles: ["build", "outreach"],   line: "Mechanical build, outreach",       photo: "member-prisha.jpg" },
  { name: "Neeva",     roles: ["outreach"],            line: "Outreach",                         photo: "member-neeva.jpg" },
  { name: "Cheytna",   roles: ["outreach", "build"],   line: "Outreach, mechanical build",       photo: "member-cheytna.jpg" },
  { name: "Goutam",    roles: ["outreach", "program"], line: "Outreach, programming",            photo: "member-goutam.jpg" },
  { name: "Sreehitha", roles: ["build"],               line: "Mechanical build",                 photo: "member-sreehitha.jpg" },
  { name: "Kunwoo",    roles: ["build"],               line: "Mechanical build",                 photo: "member-kunwoo.jpg" },
  { name: "Nikitha",   roles: ["outreach"],            line: "Outreach",                         photo: "member-nikitha.jpg" }
];

const mentors = [
  {
    name: "Haresh Umaretiya",
    group: "mentor",
    roles: ["Mentor"],
    line: "Co-founder, Astute Engineering.",
    bio: "Reviews mechanism concepts with the build sub-team and pushes hard on tolerances and manufacturability.",
    photo: "mentor-haresh.jpg",
    alt: "Mentor Haresh Umaretiya reviewing a mechanism with students."
  },
  {
    name: "Giri Tanguturi",
    group: "mentor",
    roles: ["Mentor"],
    line: "Electrical engineer. Tesla, previously Sun Microsystems.",
    bio: "Works with the team on wiring discipline, power budgeting and the electrical section of the engineering notebook.",
    photo: "mentor-giri.jpg",
    alt: "Mentor Giri Tanguturi checking a robot wiring harness."
  }
];

/* Counts derived, never typed twice. */
const counts = {
  students: students.length,
  build: students.filter((s) => s.roles.indexOf("build") !== -1 || s.roles.indexOf("cad") !== -1).length,
  program: students.filter((s) => s.roles.indexOf("program") !== -1).length,
  outreach: students.filter((s) => s.roles.indexOf("outreach") !== -1).length
};

module.exports = { roles, coaches, students, mentors, counts };
