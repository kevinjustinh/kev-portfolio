# Custom MySpace portfolio profiles

2026-10-15. Three additional standalone mockups exploring personalized MySpace skins.

Open [myspace-custom-previews.html](myspace-custom-previews.html) in a browser, or use `http://127.0.0.1:8766/design-system/previews/myspace-custom-previews.html` while the local server is running. Fonts and images are embedded. The original three concepts remain unchanged in [myspace-previews.html](myspace-previews.html).

## Directions

- **04 — Sunset Social (recommended):** Bay Area photo wallpaper, a panoramic postcard masthead, warm paper panels, navy accents, serif section headings, and a compact profile column.
- **05 — Midnight Mixtape:** checkerboard wallpaper, dark panels, cream and acid-yellow accents, a gig-poster masthead with a decorative record and sticker, wide identity band, and a prominent work gallery.
- **06 — Internet Garden:** sage gingham, forest-green navigation, a botanical masthead, taped notebook-style identity panel, and journal-like career entries above selected work.

Each keeps recognizable MySpace elements: profile identity, contact box, blurbs, Top 8, and personal details. Content and interactions reuse the first mockup’s project data. Career stories remain distinguished from personal projects, with Google via Cognizant attribution preserved. Proposed headings, mood copy, and decorative motifs describe a design direction; they are not new factual claims about personal hobbies or music tastes. Soundtrack is explicitly unselected. Bay imagery remains provisional profile imagery.

The design reviewer returned **APPROVE**, recommending Sunset Social. Guidance incorporated: preserve readable essential actions, use custom cover treatments rather than recoloring the default page, keep decoration away from project cards, avoid invented music preferences, and verify keyboard focus returns after dialogs close.

## Verification

- Playwright CLI checked all three designs at 375, 768, and 1440px with no horizontal document overflow or broken visible images.
- All 24 Top 8 entry points opened with Enter and closed with Escape; keyboard focus returned to the originating tile.
- Career disclosures toggled and all internal anchor targets resolved.
- Browser console: zero errors and warnings.
- Captured all concepts together at desktop, tablet, and phone widths; visually inspected the desktop comparison and each individual phone view.
- Corrected dark-theme text contrast, a decorative header overlap, wallpaper scrolling, and joined quote spacing during review.
- Production components and dependencies are unchanged. No production build or deployment was run for these HTML-only mockups.
- External destinations are inherited from existing portfolio content, not exhaustively availability-tested.

Screenshots: [desktop comparison](screenshots/myspace-custom-all-desktop.png), [tablet comparison](screenshots/myspace-custom-all-tablet.png), [phone comparison](screenshots/myspace-custom-all-mobile.png), [Sunset desktop](screenshots/myspace-custom-sunset-desktop.png), [Sunset phone](screenshots/myspace-custom-sunset-mobile.png), [Mixtape phone](screenshots/myspace-custom-mixtape-mobile.png), [Garden phone](screenshots/myspace-custom-garden-mobile.png).

Saved on the existing `design/myspace-profile-preview` branch, whose automatic deployment is disabled. This remains a design exploration, not a selected or approved production specification. Select and refine a direction before preparing the handoff for a separate implementation session.
