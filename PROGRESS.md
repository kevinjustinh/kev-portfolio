# Portfolio progress

HANDOFF-ANCHOR: a23ef66

Health: VERIFIED (2026-10-21, content-parity and copy pass). TypeScript and lint clean; /profile screenshotted at 375/768/1440px (`design-system/previews/screenshots/profile/parity-*.png`); blog box renders; no em dashes; no console errors; no horizontal scroll. Production build not run.

### Pass: homepage parity + writing guide (2026-10-21)
- Added from the homepage: "Kevin's Latest Blog Entries" box (all 7 published articles, reusing `publishedArticles` from `lib/data/caseStudies.ts`, nav link "Blog"); the GenAI accelerator's fourth metric (XFN); the hero summary line in the profile box; Catchr's Chrome Web Store link.
- Project windows now show real outbound links only (`links` array). Case studies, Stoke, Carro and SF Weekend have none, as on the homepage.
- Copy pass per Kevin's writing guide: removed invented details (2am build, dog meds, answering DMs, "fewer steps", dated bulletins). Bulletins now name the project and describe what it actually does. Lightly reworded "Who I'd like to meet" and removed "along the way". No em dashes remain.
- Catchr (2026-10-21): Kevin confirmed it is publicly released. Description on homepage and /profile now ends "Free and publicly released at jobcatchr.app." (was "for private users").
- I/O '22 metric (2026-10-21): Kevin confirmed a story from his Google developer community work was featured in the I/O 2022 keynote. Metric stays as is. No open content questions remain.

Previous health (after removals, a23ef66): VERIFIED. TypeScript and lint clean; screenshots at 375/768/1440px; no console errors; no horizontal scroll.

## Current checkpoint — /profile test page (2026-10-21)

Kevin's Claude Design "Kevin Profile" (MySpace-style profile) is built as a separate route at `/profile`. The homepage is unchanged and does not link to it. The route is marked noindex.

- Route: `app/profile/` (page + scoped CSS). Components: `components/profile/`. Content: `lib/data/profile.ts`. Themes and slider maths: `lib/profile/`.
- Features: 16 layouts plus custom colors and share link, cursor trail, Top 8 (fixed order), 8 badges saved in the visitor's browser, résumé viewer, project windows.
- Removed at Kevin's request (2026-10-21), "for now": the 2006→2026 slider, Recruiter mode, and Top 8 reordering, plus their three badges. Full versions are in commit c9a60a3 (`components/profile/RecruiterView.tsx`, slider pill and drag code in `ProfileView.tsx` / `ProfileMain.tsx`). `lib/profile/look.ts` still supports the slider; the page passes era 0.
- Changes from the design, after read-only design review (REVISE): message form uses the existing contact email action with sending and error states and a hidden spam trap; reduced-motion users get no trail, marquee or glitter; windows trap focus and return it on close; fixed a design bug where picking a custom color reset other settings; local screenshots replace remote image links.
- Still placeholder from the design: profile song, and Music / Movies / Heroes interests.
- Not done from the review: contrast check of all 16 layouts.
- Screenshots: `design-system/previews/screenshots/profile/`.

## Next

Kevin reviews `/profile` locally (`npm run dev`, then localhost:3000/profile). Decide on placeholders and whether this replaces or sits alongside the homepage. Do not deploy from this branch.

## Done — link preview image (2026-10-21)

- Kevin chose one image for every shared link: the Default (blue MySpace) profile box, even for the homepage. No per-skin share images. Window animation stays as the current fade (grow-from-photo dropped). Site title unchanged.
- `public/og-image.png` (1200x630) added to `main` (commit a21725c, pushed, deploys live) and to this branch. Rendered once from HTML; not generated per request.
- Options explored are kept in `design-system/previews/share-previews.html`.

## Gaps and ideas (2026-10-21, not started)

Gaps found:
- FIXED 2026-10-21: missing link-preview image (see above).
- /profile: the three headline stats (4.9/5 CSAT, 520K+, 0→100 NPS) are only inside friend windows; not visible at a glance.
- /profile placeholders: profile song; Music / Movies / Heroes.
- /profile: contrast check of all 16 layouts still not done. Production build not run. Needs its own preview image if it goes public.

Ideas proposed to Kevin (classic feel, 2026 tech): AIM-style "Ask KevBot" AI chat grounded in his résumé (recommended first); real guestbook with moderation; real "last login" from GitHub activity; visitor hit counter; windows that morph open from Top 8 tiles (View Transitions); share links whose preview image shows the visitor's chosen skin; a reward for unlocking all 8 badges.

Kevin picked for /profile (2026-10-24, not started): references shown as friend comments with photo, name, title (needs 4-6 real quotes from Kevin); per-application links like /profile?for=stripe that greet the company and add its logo to the Top 8; working "Add to Friends" button (saves contact card or opens LinkedIn, then a "request accepted" toast); hidden message for people who view the page source. Maybe: "About Me" as a 50-question survey. Later: real profile song, once a legally usable track is found.

## New whole-site concepts (2026-10-24, brainstorm only, nothing built)

Kevin asked for fresh portfolio concepts beyond MySpace. Proposed:

- **Recommended: Discord server.** Site looks like a community you just joined: channels on the left (#welcome, #case-studies, #projects, #blog), work posted as messages, member list on the right showing past colleagues with job titles. Why first: for community/DevRel roles it doubles as proof he knows the hiring manager's world, and it reads instantly.
- **Kev Wrapped:** career as Spotify Wrapped tap-through slides (e.g. "Top skill: community building", "4.9/5 satisfaction"). Any "top 1%" style line must be a real claim.
- **Wii / Switch home menu:** projects as channel tiles, Mii avatar, cheerful menu feel. Scannable grid.
- **Group chat:** site as a text thread; visitor taps reply bubbles ("What have you built?") and Kev "types" back. Strong on phones.
- **Pokémon trainer card / Game Boy:** party = 6 best projects, moves = skills, gym badges = achievements.
- **BART map:** each job a station, side projects as branch lines. Bay Area nod.
- **Trading card pack:** open a pack, flip each project card for stats.
- **iPod Classic:** click wheel through Projects, Case Studies, Contact.

Kevin picked five to mock up in Claude Design (2026-10-24): Discord server, Kev Wrapped, Group chat, BART map, Trading card pack. Dropped: Wii/Switch, Pokémon, iPod.

Note: Kevin reports build requests for these were blocked. Likely cause (unconfirmed): prompts named real brands (Discord, Spotify, Nintendo, Pokémon, Apple, BART) or asked for made-up colleague quotes. Kevin then chose to keep brand names in the brief as style references ("inspired by"); the brief still asks for original designs with no real logos, and labels all people and quotes as placeholders. If blocked again, get the exact refusal wording.

## Earlier checkpoint — MySpace concepts (2026-10-15)


Six MySpace-inspired portfolio concepts are available in two standalone previews. Open directly in a browser; images and fonts are embedded.

- `design-system/previews/myspace-previews.html`: Classic profile, Work first, and The scrapbook. See `myspace-README.md` beside it.
- `design-system/previews/myspace-custom-previews.html`: Sunset Social, Midnight Mixtape, and Internet Garden. See `myspace-custom-README.md` beside it for rationale, verification, and screenshots.

Classic profile is recommended within the original set; Sunset Social is recommended within the more customized set. Midnight Mixtape is the most expressive nostalgic skin. All are design explorations; no final composition has been selected, and application components remain unchanged. The prior October 9 design explorations remain in `docs/design/2026-10-09/`.

This work is on `design/myspace-profile-preview`. Automatic Vercel deployment is disabled for that exact branch through `vercel.json`. The branch is a design checkpoint; do not deploy the redesign without selecting and documenting the final design first.

## Verification

Both sets received read-only design review: APPROVE. Each set's three layouts were checked at 375/768/1440px, all 24 project entry points and career disclosures checked, no broken visible images or unresolved internal anchors. Custom profiles also passed Enter/Escape and focus-return checks on every Top 8 tile. Browser console clean. The original checkpoint passed TypeScript checks; the custom follow-up changes HTML previews and records only. Full details and limits are in the two preview READMEs.

## Next

Review the concepts and refine the chosen composition. Profile imagery and soundtrack remain provisional. Prepare the selected design and implementation handoff in a design session; production implementation belongs in a fresh coding session.

## Existing workspace state

At session start, `docs/superpowers/plans/2026-07-05-v3-hybrid-redesign.md` was already staged. Several older preview HTML files and screenshots, original PNG project screenshots, and hero image assets were untracked. These were left intact and excluded from this checkpoint. This record was created because no previous PROGRESS.md or anchored handoff was present; the October 9 design README and latest commits supplied the prior design context.
