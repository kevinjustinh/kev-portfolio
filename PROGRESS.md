# Portfolio progress

HANDOFF-ANCHOR: a8109e8

Health: VERIFIED — /profile test page, 2026-10-21. TypeScript and lint clean on new files; screenshots at 375/768/1440px; no console errors; no horizontal scroll. Contact form not submitted during testing (it sends a real email). Production build not run.

## Current checkpoint — /profile test page (2026-10-21)

Kevin's Claude Design "Kevin Profile" (MySpace-style profile) is built as a separate route at `/profile`. The homepage is unchanged and does not link to it. The route is marked noindex.

- Route: `app/profile/` (page + scoped CSS). Components: `components/profile/`. Content: `lib/data/profile.ts`. Themes and slider maths: `lib/profile/`.
- Features ported: 16 layouts plus custom colors and share link, cursor trail, 2006→2026 slider, Recruiter mode (also `?recruiter=1`), draggable Top 8 (Alt+arrow keys also reorder), badges saved in the visitor's browser, résumé viewer, project windows.
- Changes from the design, after read-only design review (REVISE): Recruiter mode link added to the top bar; message form uses the existing contact email action with sending and error states and a hidden spam trap; reduced-motion users get no trail, marquee or glitter; windows trap focus and return it on close; fixed a design bug where picking a custom color reset other settings; local screenshots replace remote image links.
- Still placeholder from the design: profile song, and Music / Movies / Heroes interests.
- Not done from the review: contrast check of all 16 layouts; touch-friendly reordering for Top 8.
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
