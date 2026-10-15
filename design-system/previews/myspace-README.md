# MySpace portfolio concepts

2026-10-15. Three standalone design previews, not a replacement for the live application.

Open [myspace-previews.html](myspace-previews.html) in a browser. It includes its font and images, so the mockup itself works offline. External project, résumé, and contact destinations require an internet connection. On this machine the preview is also served at `http://127.0.0.1:8766/design-system/previews/myspace-previews.html` while the local server is running.

## Directions

1. **Classic profile (recommended):** a compact identity/contact column beside blurbs, career outcomes, Top 8, and career entries. Closest to the familiar MySpace profile.
2. **Work first:** a narrow profile rail and expanded career stories above the project gallery. Prioritizes professional experience.
3. **The scrapbook:** a full-width identity introduction, large work gallery, and a secondary biography column. Prioritizes visual browsing.

The controls at the top switch between concepts. “Compare all” displays all three; on a wide display they appear side by side. Add `?view=all` to open comparison mode directly.

Top 8 tiles open native dialogs; Escape and Close dismiss them. Career entries expand in place. Contact and résumé links go to the current portfolio; no message is sent by the preview itself. The soundtrack panel is an explicitly labeled design placeholder, with no audio or playback control. Bay imagery is provisional profile imagery, not a portrait. Text is proposed copy grounded in the current portfolio data; project screenshots are existing assets, not a freshness or adoption claim. “Mood” is playful proposed copy, not a live status.

## Design rationale and sources

The visual reference is [Konrad Sopala’s Windows-themed portfolio](https://dontcheckthis.dev/): a familiar older web interface used consistently to organize actual work. This study instead uses a MySpace-style profile with blue navigation, square panels, orange section bars, and a Top 8 gallery. It does not reproduce the reference site’s assets or copy.

The new concept intentionally replaces the previous editorial palette for this preview. It retains DM Sans, clear résumé/contact actions, and accurate Google via Cognizant attribution. Career stories and personal projects are labeled separately. The first three tiles show professional work.

Content sources: `lib/data/about.ts`, `lib/data/caseStudies.ts`, and `lib/data/projects.ts`. The mockup is plain HTML/CSS/JavaScript; no dependencies were added and no Next.js application components changed.

Read-only design consultation returned **APPROVE**, recommending Classic profile. Incorporated guidance: show role and contact immediately, preserve career prominence, use clear action labels, distinguish career work from personal projects, avoid false counters/testimonials/presence, and place optional profile details after main work on mobile.

## Verification

- Playwright CLI: all three layouts checked at 375, 768, and 1440px; no horizontal document overflow or broken visible images.
- All 24 Top 8 entry points opened dialogs; Escape closed each. All three career disclosure controls toggled.
- Internal anchor targets all resolve. Browser console: zero errors and warnings on the mockup.
- Screenshots of all variants together saved at desktop (3000px comparison), tablet (768px), and mobile (375px), plus separate classic desktop/mobile images.
- Desktop comparison and classic mobile screenshots visually inspected. Excess sidebar space corrected before final captures.
- `npx tsc --noEmit` and `git diff --check` passed.
- Production build and deployment intentionally not run. External destinations were preserved from project content, not exhaustively availability-tested.

Screenshots: [all desktop](screenshots/myspace-all-desktop.png), [all tablet](screenshots/myspace-all-tablet.png), [all mobile](screenshots/myspace-all-mobile.png), [classic desktop](screenshots/myspace-classic-desktop.png), [classic mobile](screenshots/myspace-classic-mobile.png).

This design checkpoint is saved on `design/myspace-profile-preview`. `vercel.json` disables automatic deployment for exactly that branch, following [Vercel’s branch configuration documentation](https://vercel.com/docs/project-configuration/git-configuration). Other branches retain default behavior.

Next design step: select and refine a composition, choose profile imagery and optional soundtrack, then document the selected design for a separate implementation session. The preview is not an approved production specification.
