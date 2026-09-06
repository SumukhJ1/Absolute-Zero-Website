# Content still needed

Generated from the markers in the code by `node tools/todo.mjs`, so it
cannot drift from the site. Everything listed here has a working
placeholder in place: nothing is broken while it waits.

Photograph slots: **55** · Visible notes on the site: **12** · Source TODOs: **12**

## 1. Facts and copy to confirm

Each of these renders a visible dashed note on the page until it is resolved,
so a visitor never sees an unmarked guess.

- **/build-and-program/** The DECODE season results are not in our archive yet. Send the award list for Roanoke, Moorefield and states and this section fills itself in.
- **/our-team/** Coach biographies and Coach Dinesh’s portrait are carried over from the old site and need refreshing. Send updated text and a current photo and they drop straight in.
- **/outreach/best-brains/** Session content is a working draft, as agreed. Send the agreed format and the term dates and this page becomes specific.
- **/outreach/classes-with-curie/** Session content above is a working draft. Replace it with the agreed syllabus and the term dates whenever they are settled.
- **/outreach/ftc-collaboration-summit/** Dates, venue and attendance for the upcoming summit are not confirmed. Send them and this becomes a dated event listing with structured data for search engines.
- **/outreach/genius-in-you/** Confirm the team’s real involvement with Genius In You and this page can name dates, cohorts and outcomes.
- **/outreach/** BIOBUZZ dates are not confirmed yet. Send the booked dates and what each session will cover, and each one becomes a dated entry with its own page.
- **/outreach/namma-bhoomi/** Confirm shipment dates, kit counts and the session schedule, and this page can carry specifics instead of description.
- **/outreach/open-access/** The document folder has not been uploaded yet, so every PDF above shows an honest file-pending state rather than a broken link. Drop the folder in and each entry becomes a working download.
- **/outreach/run4charity/** Confirm which shifts the team covers and whether the robot table is a standing arrangement, and this page can carry a date and a sign-up.
- **/outreach/techstravaganza/** Confirm which recent years the team exhibited. The 2018 appearance is documented in the team’s own blog; later years are not, so only 2018 is stated as fact above.
- **/sponsors-and-donors/** This season’s real budget figures can replace the descriptions above whenever you send them.

## 2. Notes left in the source

- **`src/data/record.js`** the DECODE (2025-2026) season results are not on the old site. Send the award list and finishes for Roanoke, Moorefield and states and they drop straight into this file.
- **`src/data/sponsors.js`** confirm the tier each supporter belongs in, and send the two logos that were unidentifiable on the old site.
- **`src/data/sponsors.js`** replace the ranges with this season's real budget.
- **`src/data/team.js`** coach bios below are carried over from the old site and are out of date. Coach Dinesh's photo needs replacing outright.
- **`src/pages/70-summit.js`** this programme has no public record anywhere. Everything below describes the format we can evidence from the scrimmages the team has actually hosted. Send the real dates, attendance and venue and the placeholders come out.
- **`src/pages/71-robo-reach.js`** "Robo Reach" has no public footprint, and roboreach.tech already exists with an overlapping mission. Worth a name check before this goes out. Content below describes the library programme the team demonstrably runs.
- **`src/pages/72-curie.js`** course content below is placeholder, as agreed. Curie Learning is described accurately (a Northern Virginia K-12 enrichment company with centres in Ashburn, Herndon and South Riding, which runs its own Robotics Boot Camp). The partnership specifics need confirming.
- **`src/pages/73-best-brains.js`** session content is placeholder, as agreed. Best Brains itself is described accurately: a franchised learning-centre network for ages 3 to 14, with four Loudoun County locations.
- **`src/pages/74-genius-in-you.js`** the team's actual involvement needs confirming. GeniusInYou is described accurately: a private, family-run after-school programme in Ashburn founded in 2023, running youth public speaking and AET/AOS/TJ preparation. It is NOT a nonprofit, so this page does not call it one.
- **`src/pages/75-run4charity.js`** the team's own role at the race needs confirming. The event is real and correctly named here: Best Runners organise the Run4Charity 1K/5K in Aldie, Virginia. It is a hunger-and-education charity race, NOT a STEM fundraiser, so this page does not claim it is.
- **`src/pages/77-namma-bhoomi.js`** confirm the team's actual shipment and session history.
- **`src/pages/78-open-access.js`** the PDF folder is not in place yet. Every entry below carries pending:true, which renders an honest "file pending" state rather than a broken link. When the folder lands, set pending:false and add `file` plus `size` to each entry. Nothing else has to change.

## 3. Photographs

Drop a file with the exact name into `assets/img/` (static build) or upload it
as the featured image on the matching post (WordPress). Sizes are the layout's
target; anything larger with the same aspect ratio is fine.

### /

| File | Size | The shot |
|---|---|---|
| `hero-team.jpg` | 2000x1200 | The full team behind the competition robot, in the pit or the build space. Wide, low light, faces visible. |
| `outreach-library.jpg` | 1200x800 | A child holding the driver station gamepad at a library workshop, robot in frame. |
| `outreach-namma-bhoomi.jpg` | 900x900 | Namma Bhoomi students with a robotics kit, or a screenshot of a remote session if no photo exists. |
| `sponsor-best-brains.png` | 320x140 | Best Brains logo, monochrome or light-on-dark, transparent PNG |
| `sponsor-best-runners.png` | 320x140 | Best Runners logo, monochrome or light-on-dark, transparent PNG |
| `sponsor-curie.png` | 320x140 | Curie Learning logo, monochrome or light-on-dark, transparent PNG |
| `sponsor-fannie-mae.png` | 320x140 | Fannie Mae logo, monochrome or light-on-dark, transparent PNG |
| `sponsor-first.png` | 320x140 | FIRST logo, monochrome or light-on-dark, transparent PNG |
| `sponsor-leidos.png` | 320x140 | Leidos logo, monochrome or light-on-dark, transparent PNG |
| `sponsor-rfy.png` | 320x140 | Robotics for Youth logo, monochrome or light-on-dark, transparent PNG |

### /build-and-program/

| File | Size | The shot |
|---|---|---|
| `build-notebook.jpg` | 1000x750 | An open engineering notebook spread, sketch and data visible. |

### /our-team/

| File | Size | The shot |
|---|---|---|
| `coach-dinesh.jpg` | 560x560 | Portrait of Coach Dinesh. CURRENT photo needed, the one on the old site is years out of date. |
| `coach-saji.jpg` | 560x560 | Portrait of Coach Saji. CURRENT photo needed, the one on the old site is years out of date. |
| `member-amit.jpg` | 640x800 | Portrait of Amit. Head and shoulders, consistent framing across the roster. |
| `member-anirudh.jpg` | 640x800 | Portrait of Anirudh. Head and shoulders, consistent framing across the roster. |
| `member-cheytna.jpg` | 640x800 | Portrait of Cheytna. Head and shoulders, consistent framing across the roster. |
| `member-eshanth.jpg` | 640x800 | Portrait of Eshanth. Head and shoulders, consistent framing across the roster. |
| `member-gaurav.jpg` | 640x800 | Portrait of Gaurav. Head and shoulders, consistent framing across the roster. |
| `member-goutam.jpg` | 640x800 | Portrait of Goutam. Head and shoulders, consistent framing across the roster. |
| `member-keerthana.jpg` | 640x800 | Portrait of Keerthana. Head and shoulders, consistent framing across the roster. |
| `member-kunwoo.jpg` | 640x800 | Portrait of Kunwoo. Head and shoulders, consistent framing across the roster. |
| `member-nabhya.jpg` | 640x800 | Portrait of Nabhya. Head and shoulders, consistent framing across the roster. |
| `member-neeva.jpg` | 640x800 | Portrait of Neeva. Head and shoulders, consistent framing across the roster. |
| `member-nikitha.jpg` | 640x800 | Portrait of Nikitha. Head and shoulders, consistent framing across the roster. |
| `member-prisha.jpg` | 640x800 | Portrait of Prisha. Head and shoulders, consistent framing across the roster. |
| `member-sreehitha.jpg` | 640x800 | Portrait of Sreehitha. Head and shoulders, consistent framing across the roster. |
| `member-sumukh.jpg` | 640x800 | Portrait of Sumukh. Head and shoulders, consistent framing across the roster. |
| `member-vishishya.jpg` | 640x800 | Portrait of Vishishya. Head and shoulders, consistent framing across the roster. |
| `mentor-giri.jpg` | 560x560 | Portrait of Giri Tanguturi. |
| `mentor-haresh.jpg` | 560x560 | Portrait of Haresh Umaretiya. |

### /outreach/

| File | Size | The shot |
|---|---|---|
| `outreach-curie.jpg` | 900x640 | A Classes with Curie session, student teaching at a whiteboard or build table. |
| `outreach-namma-bhoomi-wide.jpg` | 1000x750 | Namma Bhoomi students with a kit, or a screen capture from a remote teaching session. |
| `outreach-robo-reach.jpg` | 900x640 | Robo Reach session in progress: students, robot, audience of children. |
| `outreach-techstravaganza.jpg` | 900x640 | The Techstravaganza booth, crowd around the robot. |
| `ws-biobuzz-ftc-collaboration-summit.jpg` | 960x540 | FTC Collaboration Summit, To be confirmed, Pre-qualifier, winter 2026. |
| `ws-biobuzz-loudoun-library-series-autumn-block.jpg` | 960x540 | Loudoun library series, autumn block, Ashburn, Cascades and Gum Spring libraries, Autumn 2026. |
| `ws-centerstage-girl-scouts-troop-meet-up.jpg` | 960x540 | Girl Scouts troop meet-up, Local Girl Scout troop, January 2024. |
| `ws-decode-ashburn-library-workshop.jpg` | 960x540 | Ashburn Library workshop, Ashburn Library, March 2026. |
| `ws-decode-cascades-library-workshop.jpg` | 960x540 | Cascades Library workshop, Cascades Library, March 2026. |
| `ws-earlier-robot-build-and-programming-guides.jpg` | 960x540 | Robot build and programming guides, Published online, January 2022. |
| `ws-earlier-world-robot-olympiad-preparation-workshops.jpg` | 960x540 | World Robot Olympiad preparation workshops, Online, April to May 2020. |

### /outreach/best-brains/

| File | Size | The shot |
|---|---|---|
| `bb-build.jpg` | 900x640 | A finished student build at a Best Brains session, kit visible. |
| `bb-session.jpg` | 900x900 | A Best Brains session: children at a table with a small robot and laptops. |

### /outreach/genius-in-you/

| File | Size | The shot |
|---|---|---|
| `giy-defend.jpg` | 960x540 | Two students at a table with a notebook open between them. |
| `giy-explain.jpg` | 960x540 | A student presenting a mechanism to a seated group. |
| `giy-present.jpg` | 960x540 | A student mid-presentation, audience and timer in frame. |
| `giy-question.jpg` | 960x540 | A student examining a robot they did not build. |

### /outreach/namma-bhoomi/

| File | Size | The shot |
|---|---|---|
| `nb-campus.jpg` | 1400x800 | Namma Bhoomi campus, or the computer lab. If no photograph is available, use a session screen capture and caption it as such. |

### /outreach/robo-reach/

| File | Size | The shot |
|---|---|---|
| `rr-build-table.jpg` | 1000x750 | The build table with kits out and children working. |
| `rr-driving.jpg` | 1600x900 | The moment a child takes the controls. This is the money shot for this page. |
| `rr-mechanism.jpg` | 1000x750 | A team member holding a mechanism, children leaning in. |
| `rr-room.jpg` | 1600x900 | Wide room shot showing scale of attendance. |

### /outreach/run4charity/

| File | Size | The shot |
|---|---|---|
| `r4c-course.jpg` | 1000x750 | Team members in team shirts marshalling the race course or working registration. |

### /outreach/techstravaganza/

| File | Size | The shot |
|---|---|---|
| `tj-booth.jpg` | 1000x750 | The Techstravaganza booth with a crowd. Wide enough to show the scale of the hall. |

### /sponsors-and-donors/

| File | Size | The shot |
|---|---|---|
| `sponsor-workshop.jpg` | 1000x750 | Outreach in action, ideally with sponsor logos visible on team shirts or the robot. |

## 4. Open Access documents

Each entry shows an honest "file pending" state until a file is attached.
In WordPress: Open Access library, open the item, paste the media URL into
"File or link".

**Engineering notebooks**

- DECODE season notebook (2025-2026)
- POWERPLAY season notebook (2022-2023)
- SKYSTONE season notebook (2019-2020)
- ROVER RUCKUS season notebook (2018-2019)

**Pit designs**

- Pit layout drawings and dimensions (2026-2027)
- Pit build parts list (2026-2027)

**Build guides**

- Building your first FTC drivetrain (Evergreen)
- Wiring discipline and power budgeting (Evergreen)
- Mechanism prototyping on a parts budget (Evergreen)

**Programming guides**

- OnBot Java for rookie teams (Evergreen)
- Writing an autonomous that repeats (Evergreen)
- Telemetry and logging that is worth reading (Evergreen)

**Outreach materials**

- Library workshop run sheet, 90 minutes (Evergreen)
- Timed build challenge, rules and scoring (Evergreen)
- The closing five minutes, and why they matter (Evergreen)
