# Portfolio progress

HANDOFF-ANCHOR: a23ef66

Health: VERIFIED (2026-10-21, content-parity and copy pass). TypeScript and lint clean; /profile screenshotted at 375/768/1440px (`design-system/previews/screenshots/profile/parity-*.png`); blog box renders; no em dashes; no console errors; no horizontal scroll. Production build not run.

### Pass: homepage parity + writing guide (2026-10-21)
- Added from the homepage: "Kevin's Latest Blog Entries" box (all 7 published articles, reusing `publishedArticles` from `lib/data/caseStudies.ts`, nav link "Blog"); the GenAI accelerator's fourth metric (XFN); the hero summary line in the profile box; Catchr's Chrome Web Store link.
- Project windows now show real outbound links only (`links` array). Case studies, Stoke, Carro and SF Weekend have none, as on the homepage.
- Copy pass per Kevin's writing guide: removed invented details (2am build, dog meds, answering DMs, "fewer steps", dated bulletins). Bulletins now name the project and describe what it actually does. Lightly reworded "Who I'd like to meet" and removed "along the way". No em dashes remain.
- Catchr (2026-10-21): Kevin confirmed it is publicly released. Description on homepage and /profile now ends "Free and publicly released at jobcatchr.app." (was "for private users").
- Open question for Kevin: is the "I/O '22: Story featured at Google I/O keynote" metric accurate? It sits on the Google developer community case study (homepage and /profile), not the accelerator.

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
