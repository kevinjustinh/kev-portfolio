# Astra Findings: Portfolio Review, September 17, 2026

**Repository:** `kevinjustinh/kev-portfolio`  
**Site inspected:** https://kevinjhernandez.com  
**Reviewed commit:** `1f635e31db1cb80deb1b20fdd27ffb01d4318470`  
**Scope:** design, positioning, content, information architecture, accessibility, interactions, responsive implementation, contact reliability, performance, metadata, and maintainability.  
**Change scope of this review:** documentation only. Findings are recommendations, not implemented fixes.

## Verdict

There is strong material here: credible program experience, specific outcomes, published writing, and working software. The portfolio already has a recognizable cream, charcoal, and orange identity. Keep that foundation.

The biggest problem is the gap between the quality of the work and the way visitors encounter it. The site invests heavily in atmosphere, animated transitions, very small typography, and repeated labels, while the evidence is brief or hidden behind interactions. Calling the projects “Vibe Coding” and describing yourself as “figuring out what to build next” further weakens the impression of deliberate, capable execution.

My recommendation is a more personal, evidence-led editorial portfolio: clear positioning, two or three strong stories, larger readable text, real artifacts, explicit project links, and normal scrolling. The highest-value changes are not a new framework or another animation library. They are reliable access to your work and a clearer explanation of your judgment and contribution.

Fix the contact form and accessibility failures before polishing the visuals. A hiring portfolio must reliably let someone read the evidence and reach you.

## Evidence and limits

Reviewed application source, data files, configuration, public asset inventory, and repository instructions. Inspected the live desktop site at a reported viewport of 1363 × 936, including screenshots of the hero, case-study entrance, and project section. Exercised the hero CTA, keyboard page navigation, project overlay, Shift+Tab, Escape, and iOS filter. Inspected rendered DOM semantics and form label associations.

| Check | Result |
|---|---|
| Production build, `npm run build` | PASS; Next.js 16.2.1 compiled and prerendered successfully |
| Type checking, `npx tsc --noEmit` | PASS |
| Lint, `npm run lint` | FAIL; 2 errors, 3 warnings |
| Contact action with mocked provider rejection | FAIL; returned `{ status: "success" }` |
| Project cards in live DOM | No focusable controls; article `tabIndex` is -1 |
| Shift+Tab from open overlay close button | Focus escaped to underlying “Web” filter |
| Contact input labels | All four controls had zero associated label elements |
| Closed mobile menu on desktop | Five invisible links remained tabbable |
| Case studies after CTA and Page Down | Heading/content remained `visibility: hidden`; heading wrapper opacity 0 |
| `GET /og-image.png` | 404 |
| `GET /resume.pdf` | 200, application/pdf |
| `GET /robots.txt`, `/sitemap.xml` | Both 404 |
| White text on accent orange | Calculated contrast 3.37:1 |

The email test transpiled the actual action and substituted a mocked Resend client locally. No email was sent. This demonstrates the error-handling defect, not that any particular real message was lost. Provider credentials, sender verification, delivery history, analytics dashboards, and hosting configuration were not inspected.

Mobile findings below are source-based risks, not claims of completed iPhone/Safari testing. This browser session did not expose viewport/device emulation. Reduced-motion failure is established by the source control flow; it was not exercised using an OS accessibility setting. One wheel gesture timed out in browser automation, so this review does not use that timeout as proof of a universal scroll freeze. No Lighthouse/Core Web Vitals score, exhaustive external-link audit, or screen-reader certification is claimed. Browser logs inspected included extension-origin errors; these are not attributed to the portfolio. The live content matches the reviewed source, but the deployment SHA was not independently verified.

## How to use this backlog

IDs remain stable even if priorities change. Mark an item complete only with its validation evidence and fixing commit or PR. P1 means fix first because it blocks access, contact, or core credibility; P2 is the next improvement batch; P3 is polish or maintenance. Effort estimates are rough: S = a few hours, M = about a day, L = several days including content and review.

| ID | Priority | Finding | Evidence | Effort | Status |
|---|---|---|---|---|---|
| AF-01 | P1 | Contact reports success on provider failure | Local reproduction + source | S | Open |
| AF-02 | P1 | Case-study visibility depends on wheel animation | Live keyboard path + source | M | Open |
| AF-03 | P1 | Project cards cannot be opened with keyboard | Live DOM + source | S | Open |
| AF-04 | P1 | Dialog focus escapes to background | Live reproduction | S–M | Open |
| AF-05 | P1 | Hidden navigation remains keyboard-accessible | Live DOM + source | S | Open |
| AF-06 | P1 | Contact form labels and feedback are inaccessible | Live DOM + source | S | Open |
| AF-07 | P2 | Contact input handling and abuse protection need hardening | Source | M | Open |
| AF-08 | P2 | Social preview image is missing | Live HTTP + source | S | Open |
| AF-09 | P2 | Orange button text fails normal-text contrast | Calculated | S | Open |
| AF-10 | P2 | Hero grid exceeds its available width | Source + desktop screenshot | S | Open |
| AF-11 | P2 | Mobile/zoom layouts need a focused correction pass | Source-based risks | M | Open |
| AF-12 | P2 | Motion policy is inconsistent | Source | M | Open |
| AF-13 | P2 | Animation cleanup leaves stale work | Source | S | Open |
| AF-14 | P2 | Lint is not green | Executed check | S | Open |
| AF-15 | P1 | “Vibe Coding” framing undersells the work | Editorial judgment | S | Open |
| AF-16 | P2 | Hero positioning is broad and repetitive | Editorial judgment | S | Open |
| AF-17 | P1 | Case studies need evidence and ownership detail | Content review | L | Open |
| AF-18 | P2 | Metrics need definitions and honest context | Content review | M | Open |
| AF-19 | P2 | Project details repeat cards instead of adding depth | Live + content review | L | Open |
| AF-20 | P2 | Current work and project availability are unclear | Content review | S–M | Open |
| AF-21 | P2 | Information hierarchy should put proof sooner | Design judgment | M | Open |
| AF-22 | P2 | Decoration competes with personal credibility | Visual judgment | M | Open |
| AF-23 | P2 | Type is too small and light in important places | Source + screenshots | M | Open |
| AF-24 | P2 | Project screenshots need consistent art direction | Visual judgment | M | Open |
| AF-25 | P2 | Contact and resume paths need clearer expectations | Content + source | S | Open |
| AF-26 | P2 | Work lacks individual shareable URLs | Route/data review | M–L | Open |
| AF-27 | P2 | Media costs exceed their visible value | Asset/source review | M | Open |
| AF-28 | P3 | Styling and markup duplication invite drift | Source | M | Open |
| AF-29 | P3 | Repository onboarding and quality gates are thin | Repository tree | S–M | Open |
| AF-30 | P3 | Measurement should answer portfolio questions | Source/recommendation | S–M | Open |

## Confirmed defects and implementation risks

### AF-01: Contact can say “sent” when nothing was accepted

**Where:** `app/actions/contact.ts:32–47`; `components/Contact.tsx` submission handler.

The action awaits `resend.emails.send()` but discards its returned result. Resend can return `{ data: null, error: ... }` instead of throwing. The installed SDK's `fetchRequest` implementation confirms this. The action then returns success, and the UI resets the visitor's message. The local mocked rejection returned success exactly as predicted.

**Change:** inspect `error` and the expected success data before returning success. Preserve the form on failure. Catch transport/action failures in the client too. Log a safe provider error code and correlation ID without message contents. Validate configuration at the appropriate server boundary. A provider acceptance is not proof of final inbox delivery, so keep wording accurate.

**Done when:** mocked success, returned error, and thrown error all yield the correct state; only success clears the form. Then perform one owner-controlled delivery test and verify receipt. Do not send test messages as part of an unauthorised bulk test. [Resend's official example](https://resend.com/) handles `data` and `error` explicitly.

### AF-02: Core work is gated behind a wheel interaction

**Where:** `components/CaseStudiesExpansion.tsx:442–448, 480, 630` and `.exp-card` inline opacity.

Desktop cards begin hidden. Reduced motion causes the setup effect to return without showing them. The static layout is selected only for `(hover: none) and (pointer: coarse)`, not for reduced motion or narrow desktop windows. Keyboard Page Down after the CTA left the content hidden in the live check. The component requires wheel-driven progress before `dock()` reveals the cards. The CSS reduced-motion fallback targets `[data-reveal]`, which does not repair these hidden wrappers.

**Change:** make content visible by default. Prefer using the static layout everywhere and treating any animation as optional decoration. If the effect survives, explicitly reveal everything for reduced motion, keyboard navigation, unsupported animation, and failed initialization. Never require wheel input to read professional evidence.

**Done when:** all five case studies and article links are readable on a fresh load using keyboard only, reduced motion, touch, a narrow mouse-driven window, and direct `#case-studies` navigation. Disabling JS must not hide the professional work.

### AF-03: Project cards are mouse-only controls

**Where:** `components/ProjectCard.tsx:26,258`.

Both variants attach `onClick` to an `<article>`. There is no button/link, keyboard handler, or tab stop. Live cards had zero descendant buttons/links and `tabIndex: -1`. This also makes their purpose unclear to assistive technology.

**Change:** add an explicit native “View project” link to a project page, or a native button opening the dialog. Preserve article semantics around it. Avoid wrapping other interactive links inside a button.

**Done when:** every project can be reached and opened with Tab and Enter/Space as appropriate, and has a visible focus indicator and meaningful accessible name.

### AF-04: The project dialog is not truly modal

**Where:** `components/ProjectOverlay.tsx:36–52` and its dialog wrapper.

The dialog has `aria-modal`, Escape support, and initial focus, which are good starts. However, Shift+Tab from its close control moved focus to the underlying Web filter. No focus containment, background inertness, or opener restoration is implemented. Scroll locking only sets body overflow and is not coordinated with the site's Lenis controller.

**Change:** use a tested dialog implementation or native dialog with the required behavior. Contain focus, disable background interaction, restore focus to the exact opener, and verify nested scrolling with Lenis. Keep Escape and backdrop close.

**Done when:** Tab and Shift+Tab stay inside; Escape closes; focus returns to the same project; background cannot scroll or activate; long content remains reachable. See the [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### AF-05: Invisible menu links stay in the tab sequence

**Where:** `components/Nav.tsx`, `.nav-mobile-menu`.

The closed menu uses opacity, max-height, and pointer-events, but its links remain focusable. Live DOM inspection found all five invisible links with tabIndex 0 on desktop. Pointer-events does not disable keyboard interaction.

**Change:** hide or unmount the closed content, or use `inert` correctly through the transition. Suppress the mobile menu at desktop widths. Add `aria-controls`, Escape behavior, and predictable focus return. Ensure the auto-hiding header stays visible while it contains focus. Add a skip-to-content link.

**Done when:** a complete keyboard pass never lands on invisible links; opening/closing the mobile menu remains understandable and usable.

### AF-06: Contact labels are visually present but unassociated

**Where:** `components/Contact.tsx`, `FormField`, form feedback, and `inputStyle`.

Labels are siblings of inputs without `htmlFor`/IDs; none of the four controls had an associated label in the browser. Placeholders are carrying the accessible names. `noValidate` suppresses native validation, while errors have no field associations, focus management, or live status region. Inline `outline: none` also suppresses the general focus outline.

**Change:** associate labels and IDs, add autocomplete for name/email, use field-specific errors with `aria-describedby`/`aria-invalid`, announce submission results, and focus the first invalid field. Provide a strong visible input focus state. Allow the message textarea to resize vertically.

**Done when:** clicking each label focuses its field, errors are announced and linked to the relevant input, and keyboard users can see focus and recover without losing text.

### AF-07: Harden the public contact action

**Where:** `app/actions/contact.ts:5,13–16,33–44`.

User values are inserted into HTML without escaping. This permits email markup manipulation; it is not evidence of script execution in the website. The cast to `string` does not validate runtime FormData types: a File entry can make `.trim()` throw before the try/catch. No application-level length bounds, rate limit, or honeypot are present. Hosting protections may exist but were not inspected. The sender is still `onboarding@resend.dev`; actual account restrictions/delivery have not been verified.

**Change:** validate types and bounded lengths on the server, escape HTML or send plain text, add a quiet honeypot and suitable server-side abuse limits, handle missing configuration cleanly, and verify a production sender/domain. Keep the recipient server-configured. Do not add a CAPTCHA unless simpler controls prove insufficient.

**Done when:** non-string, blank, oversized, malformed-email, and markup-bearing inputs behave predictably; repeated submissions are bounded; no raw user HTML is interpreted; logs avoid visitor message contents.

### AF-08: The configured social image does not exist

**Where:** `app/layout.tsx:32`; public asset inventory.

Metadata references `/og-image.png`, but the asset is absent and the live URL returns 404. This is especially relevant when sharing your portfolio with recruiters.

**Change:** create a deliberate 1200 × 630 image using your name, role positioning, and restrained brand elements. Verify title/description and a social-card fallback. Add a canonical URL. Robots and sitemap endpoints also return 404; add them when useful, especially after creating project routes. Their absence alone does not establish an indexing failure for a one-page site.

**Done when:** the image returns 200 and the deployed page's metadata resolves to it; preview tools display the intended card.

### AF-09: Orange buttons need a more accessible color pairing

**Where:** `app/globals.css` accent token; primary links/buttons in Hero, Contact, and ProjectOverlay.

White on `#E8631A` measures 3.37:1. The actual button labels are small text, below the 4.5:1 normal-text threshold. Keep bright orange as a decorative accent, but use a darker action color or dark text on the orange fill. Audit orange small text on cream as well. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) distinguishes normal and large text.

**Done when:** all normal action labels meet 4.5:1 in default, hover, and focus states. Do not assume a large heading's passing contrast makes tiny labels acceptable.

### AF-10: The hero grid adds a gap to 100% of its width

**Where:** `components/Hero.tsx:184`.

The desktop grid specifies `55% 45%` plus `md:gap-16`. The tracks already consume the available width; the gap adds another 4rem. The inspected desktop screenshot shows the metrics card pushed outside the intended right content gutter. The hero's overflow clipping can mask the underlying sizing error.

**Change:** use fractional tracks such as `minmax(0, 1.1fr) minmax(0, .9fr)` so the gap participates in sizing. Use a shared content gutter.

**Done when:** both edges align at 768, 1024, 1280, and 1440 widths, without clipping or horizontal overflow.

### AF-11: Mobile and zoom need targeted validation

These are source-based risks to reproduce, not completed device tests:

- `app/page.tsx:19` locks hero plus status to `height: 100dvh`. Combined with a stacked hero, three-column metrics, and multi-row status bar, short phone screens and enlarged text can exceed the available height. Use natural height with a minimum rather than a hard content budget.
- Hero actions use a non-wrapping flex row with a 2rem gap. The global 40px side padding leaves little usable width at 320–375px. Stack or wrap actions and use a smaller mobile gutter.
- `PublishedBand` reserves at least 200px for publication name and adds title/arrow gaps with no mobile stacking rule. Long article titles need a stacked mobile layout and wrapping.
- The desktop status layout has several non-shrinking padded cells from 768px upward, while navigation keeps all desktop links until 640px. Check the intermediate tablet widths for crowding and overflow.
- The mobile hamburger stays ink-colored even over the dark hero; match the light top-of-page navigation treatment.
- Mobile screenshot selectors are 24 × 3px buttons. Increase their real hit area and show selected state accessibly; the visible bar can remain small.
- Check mobile overlay image/metadata height allocation and scrollability in landscape and with the keyboard open. The outer panel and stack both clip overflow.

**Done when:** 320, 375, 390, 768, and 1024 widths, phone landscape, and 200% zoom preserve all text, links, and actions; no unintended horizontal scroll; all screenshots remain selectable by touch.

### AF-12: Reduced motion should govern the whole experience

**Where:** `components/Hero.tsx`, `components/SmoothScrollProvider.tsx`, `lib/lenis.ts`.

Hero entrance effects respect reduced motion, but desktop background video and crossfading do not. Lenis initializes smooth scrolling unconditionally. The two-video loop has no visible pause control and no visibility/offscreen pause policy.

**Change:** start with a still image; disable nonessential motion for reduced motion and offer a way to pause ongoing decorative motion if retained. Pause video when offscreen or the tab is hidden. Prefer native scrolling for this portfolio.

**Done when:** reduced-motion visitors get readable static content, a still hero, and predictable scrolling; ordinary visitors can pause ongoing motion.

### AF-13: Fix animation lifecycle cleanup

**Where:** `components/SmoothScrollProvider.tsx` ticker registration/cleanup; `CaseStudiesExpansion.tsx:370`; Hero crossfade.

Ticker cleanup passes a new arrow function to `gsap.ticker.remove`, not the callback originally registered. This leaves the old callback registered after cleanup and can accumulate callbacks across remounts. The case-study docking timeout is not cleared on teardown. Crossfade tweens also need explicit ownership and cleanup if retained.

**Change:** keep stable callback references and cancel timers/tweens on teardown. Simplifying the case-study interaction may remove much of this code.

**Done when:** mount/unmount/remount cycles leave exactly one active ticker callback and no delayed writes after teardown. Do not “fix” this by suppressing lint rules.

### AF-14: Restore a clean lint baseline

Executed lint reported errors for accessing `onWheel` before declaration in CaseStudiesExpansion and synchronous state setting in Hero's effect. Warnings: unused disable directive, raw hero `<img>`, and unused `isLastOdd`. Build and TypeScript both pass; they do not substitute for lint.

**Change:** resolve the actual effect/listener structure, use an intentional media-query strategy, remove unused props/directives, and evaluate the image warning in context. A raw image warning is not itself proof of poor LCP.

**Done when:** lint passes with documented intentional exceptions only; build and type checking remain green.

## Content and positioning

### AF-15: Replace “Vibe Coding” with a stronger frame

**Where:** Nav, Projects, Footer, `lib/data/about.ts`.

The label invites the reader to interpret substantial work as casual experimentation. The bio compounds this with “on the side” and “figuring out what to build next.” For a personal conversation that can be charming; for a hiring portfolio it hides your agency.

Use **Selected Builds**, **Products & Experiments**, or simply **Projects**. Be open about AI-assisted development inside project stories, explaining what you designed, integrated, tested, debugged, and maintained. Do not imply solo manual authorship if that is inaccurate.

**Done when:** the navigation, heading, bio, metadata, and footer tell a consistent professional story without apologizing for the tools used.

### AF-16: Make the opening more specific

“Programs and communities people actually care about” is readable but difficult to substantiate and common in portfolios. “A decade building communities and programs…” repeats the same premise. Your combination of program operations, developer communities, founder experience, and hands-on building is more specific.

Possible direction, to edit in your own voice:

> I build programs for people building things.
>
> I've run developer communities, startup programs, and operations at Google via Cognizant, Springboard, and Draper University. I also build software to solve problems I run into myself.

Alternative direct headline: **Program operator. Community builder. Hands-on maker.** Keep one primary statement, one supporting sentence, and obvious work/resume actions. Use “Google via Cognizant” consistently where employment attribution matters.

**Done when:** a first-time reader can identify the work you want, why you are credible, and where to inspect proof within one screen.

### AF-17: Turn achievement summaries into actual case studies

`lib/data/caseStudies.ts` contains short descriptions and metrics; CaseStudyCard has no deeper destination. These are useful highlights, but do not yet show your reasoning.

Develop three strong stories first: the GenAI Accelerator, the Springboard turnaround, and either developer storytelling or a shipped product depending on target roles. Each should explain the problem, your remit, constraints, decisions, execution, outcome, and lesson. Include a real artifact: a redacted run-of-show, onboarding flow, process diagram, public article, product workflow, or approved testimonial. Do not publish confidential employer material.

For the accelerator, distinguish your owned operational work from broader program leadership. For the turnaround, explain how mentor interviews led to specific changes. For community content, connect an actual linked article to your writing/editorial contribution. Draper University is listed but has no case study; consider one if you have stronger evidence there than in the generic onboarding card.

**Done when:** each featured story includes at least one concrete decision and artifact, explicit personal ownership, and a defensible outcome. Avoid expanding five thin cards into five longer vague pages.

### AF-18: Make the metrics credible on inspection

- **0→100 NPS:** identify whose NPS, period, response count if available, and whether the samples are comparable. A perfect score without context can raise more questions than it answers.
- **4.9/5 CSAT:** clarify what event/program touchpoint was rated and by whom; do not imply a broader measurement than the evidence supports.
- **520K+:** distinguish combined channel audience/follower totals from actual reach, unique people, or growth caused by your work. Current wording varies between “audience written to” and “followers managed.”
- **XFN and E2E:** these are work descriptors, not outcome metrics. Put them in narrative copy.
- **Down-arrow churn:** provide a verified magnitude/timeframe or describe the qualitative process improvement without implying a measured result.
- **$25K funding:** useful founder proof; explain stage and your role rather than leaving it as an isolated number.

These are substantiation requests, not accusations that the claims are false. Never invent missing sample sizes, percentages, clients, users, or testimonials.

**Done when:** all prominent numbers have clear definitions and evidence Kevin can defend in an interview; unsupported measurement claims are softened or removed.

### AF-19: Give project details something new to say

The overlay repeats the same description and stack shown on the card. Screenshots are valuable, but opening the project should reveal your thinking.

Use a short outcome-oriented card, then a detail page with: why it exists, who uses it, your role, one difficult tradeoff, how the integration works, reliability/testing work, present limitations, and next step. For Blue42, explain how retrieved football information becomes a useful recommendation. For Catchr, show listing → saved record → fit/prep workflow and how you handle model failure. Confirm current behavior against those projects before making new claims.

**Done when:** the detail view adds unique evidence; a hiring manager can explain what you contributed without parsing a technology list.

### AF-20: Explain current work and availability

The experience list ends in 2024 despite an active software portfolio. Add an accurately dated current independent-builds entry if it reflects your work; do not fabricate a consultancy or paid employment. Keep project maturity explicit: live, private beta, prototype, or archived. Clarify Catchr's “Published ... for private users” wording so visitors know whether they can install it. Stoke, Carro, and SF Weekend need an honest explanation when there is no public link.

Review “Available immediately” and “Full-time · Contract” periodically. A simple content review date in project data can help avoid stale claims.

**Done when:** visitors can distinguish present work from past roles and know what they can actually try.

## Design and layout direction

### AF-21: Put the evidence earlier

Recommended sequence:

1. Compact introduction with positioning, work CTA, and resume.
2. Selected work: three strong stories spanning programs/community and software.
3. Short supporting project list or gallery.
4. About and concise experience timeline.
5. Selected published writing, with your contribution explained.
6. Direct contact and resume access.

Currently the full-screen hero, status band, About section, and full-screen illustrated case-study entrance delay the substance. The primary CTA lands on an illustration asking for more scrolling rather than immediately presenting proof. Keep a recognizable anchor for Work and let readers skim freely.

**Done when:** the primary CTA lands on readable work; the strongest evidence is not gated by choreography.

### AF-22: Reduce the “assembled from trends” impression

This is an aesthetic judgment, not a claim about how the site was made. The large serif statement with orange italic emphasis, glassy metric panel, numbered micro-navigation, illustrated startup collage, dark dot-grid section, pills, and pulsing availability all compete to signal design effort.

Keep the cream/ink/orange palette and serif/sans pairing. Choose one expressive device, perhaps a smaller Bay Area illustration. Replace generic startup imagery with a real portrait, a candid work/event photo you can publish, and authentic artifacts. The dense case-study collage repeats labels such as “startup” and “portfolio” without supplying evidence about your work. Remove its full-screen scroll ceremony. Remove the dot grid if it adds no meaning. Limit “Featured” badges and repeated availability indicators.

**Done when:** every major image or decorative element either identifies you, explains a project, or establishes one intentional visual motif. The page should feel authored through selection and specificity.

### AF-23: Increase reading comfort

Body defaults are 0.9rem/weight 300; card text can be 0.82rem; labels are often 0.55–0.65rem. At a normal 16px root size that puts important labels near 9–10px and descriptions around 13–14px. Screenshots confirm that the metric explanations, stack text, and navigation are visually subordinate to an extreme degree.

Suggested scale: 16–18px body, 14–16px card descriptions, 12–13px secondary labels, 32–48px section headings, responsive 44–72px hero. Use weight 400 for reading text, sentence case for ordinary controls, and uppercase sparingly. Keep paragraphs around 55–70 characters wide. Reserve serif display styling for major titles; use the sans face for dense evidence.

**Done when:** content is comfortably readable at normal zoom on a laptop and phone, without relying on zoom to decode metrics. Validate actual line breaks and contrast, not just token values.

### AF-24: Art-direct screenshots around the task

The real screenshots are one of the strongest assets. However, large saturated color slabs and small whole-screen captures can make the portfolio look like a collection of mockups. The featured mobile image is only 120px high, while full phone captures spend much of their area on device chrome.

Use consistent screenshot framing and show the useful interaction at a readable scale. Feature one key screen per project, add a concise caption explaining what it proves, and offer full-resolution inspection for details. For a workflow, use two or three numbered steps rather than nine unexplained thumbnails. Add descriptive captions/alt text instead of only “screenshot 3.” Keep project accents subordinate to the portfolio palette.

**Done when:** each image answers “what does this do?” without requiring the reader to decipher tiny UI text.

### AF-25: Make reaching you low-friction

“Somehow people remember me too” is less useful than a concrete invitation. Example: “I'm looking for program operations, community, and developer relations roles. If that sounds like your team, I'd like to talk.” Preserve your personality elsewhere through specific stories.

Make Subject optional or remove it. Provide a direct email link if you are comfortable publishing the address; retain LinkedIn as another fallback. Add a brief explanation of what happens to submitted contact information. The hero says “Download resume” but opens the PDF in a new tab without a download attribute; either label it “View resume” or implement a deliberate download. The PDF is reachable, but its content freshness and PDF accessibility were not audited here.

**Done when:** visitors have a reliable alternative to the form; labels accurately describe actions; the resume's content is checked against current site claims.

### AF-26: Give your work URLs

The app has one portfolio page and overlays, with no project/case-study detail routes. You cannot send a recruiter directly to a particular project story, and opening a project does not encode the state in a URL.

Add `/work/<slug>` or equivalent routes with unique titles, descriptions, share images, and direct links back to selected work. Keep an overlay only as an optional preview. Use project slugs in the data rather than deriving identity from display names.

**Done when:** a story can be opened directly, refreshed, shared, and navigated with browser Back without losing context.

## Performance and engineering quality

### AF-27: Spend bandwidth where it improves the portfolio

`public/video/v3-loop-90.mp4` is 9,429,080 bytes, about 9.4 MB. Two video elements use the same URL for crossfading; this does not prove two full network downloads because caching may share the response, but it adds media/animation complexity. The result is displayed at roughly 10% opacity. The static still is about 206 KB. The case-study illustration is about 483 KB and is explicitly `priority` and `unoptimized` even below the fold.

Several original photographs and hero PNGs are multi-megabyte files. Repo size is not page-transfer size: do not count unused originals or optimized Next.js source images as bytes necessarily sent to every visitor.

Prefer the still hero, remove below-fold preload pressure, size responsive images appropriately, and archive unused source assets outside production `public` when practical. If retaining video, justify it with measured experience and pause it offscreen. Measure cold-cache mobile performance before and after; do not invent a score from source inspection.

**Done when:** a saved network/Lighthouse run shows the actual transfer and loading behavior, the important text and image load promptly, and removing motion does not reduce access to content.

### AF-28: Consolidate styles and responsive markup

The stylesheet says tokens should be centralized, but components contain many repeated inline colors, font sizes, spacing values, and mouse-event style mutations. Featured project/case-study cards and overlay content duplicate desktop/mobile markup. This increases the chance that links, wording, accessibility, and styles diverge.

Create a small shared type/spacing/color system and reusable action/label styles. Prefer CSS hover/focus states. Render one semantic content structure where CSS can handle responsiveness. Extract screenshot gallery behavior from project narrative. Framer Motion is declared but no application import was found; remove it if truly unused. Do not infer unused dependency presence means it ships to the browser.

**Done when:** a content change is made once; common controls share focus/hover/disabled behavior; redundant dependencies and dead props are removed without broad unrelated rewrites.

### AF-29: Add practical project documentation and gates

README is still create-next-app boilerplate and describes Geist despite the app using Instrument Serif and DM Sans. The reviewed tree has no `.github/workflows` and no test files. This does not rule out external Vercel checks, but repo-owned checks are absent.

Document purpose, deployed URL, development commands, env variable names only, content editing locations, asset handling, deployment process, and this report. Add a small CI gate for lint, type checking, and production build. Add targeted regressions for contact result handling and keyboard/content access rather than snapshotting every stylistic choice. Follow AGENTS.md's installed Next.js documentation instruction when implementing framework changes.

**Done when:** another coder can run the site without guessing configuration, and a PR cannot look green merely because it skipped the checks that currently fail.

### AF-30: Measure outcomes instead of adding decorative features

Analytics and Speed Insights are already installed. The owner exclusion reads `localStorage` directly; guard it so restricted storage does not break that callback. No custom portfolio conversion events were found in source.

Track a minimal set of non-sensitive actions if useful: selected-work opened, resume viewed, project demo clicked, contact provider acceptance. Do not log names, emails, message text, or full form contents. Review which stories get attention and whether people reach contact. Traffic alone is not hiring conversion evidence.

**Done when:** a small dashboard answers which work people inspect and which contact paths they use; owner traffic is excluded safely where configured.

## Recommended implementation sequence

### Batch 1: Make the current site dependable

AF-01 through AF-06, AF-08 through AF-10, AF-13, and AF-14. Add only the tests necessary to protect these behavior fixes. Simplify the case-study animation immediately if that is faster and safer than repairing it. Keep this as a focused functional PR.

### Batch 2: Correct positioning and prove the strongest work

AF-15 through AF-20 and AF-25. Kevin supplies metric context, ownership details, accurate dates, and publishable artifacts; the coder implements the content structure. Start with the accelerator, Springboard turnaround, and one strong software project. Remove unsupported precision instead of waiting indefinitely for unavailable numbers.

### Batch 3: Simplify layout and improve reading

AF-11, AF-12, AF-21 through AF-24, and AF-27. Make a static desktop/mobile design first. Approve hierarchy, type, imagery, and work prominence before introducing optional animation. Compare against the current site at the same widths.

### Batch 4: Durable project pages and maintenance

AF-07, AF-26, AF-28 through AF-30. Move AF-07 earlier if the form is receiving abuse. Establish stable URLs and a small ongoing check process. Avoid a simultaneous framework migration, CMS migration, and redesign.

## What I would not add now

A chatbot about Kevin, skill-percentage meters, more carousels, custom cursors, a fake terminal, an automatic GitHub activity feed, a large blog commitment, a database-backed CMS, or another motion library. Each adds maintenance or distraction before the core portfolio story is strong. A verified testimonial, a clear architecture/workflow explanation, and one excellent case study would contribute more.

## Release checklist for the coder

- [ ] Read this report and compare the current commit to the reviewed baseline; revalidate findings against newer code.
- [ ] Run lint, type checks, and a production build.
- [ ] Verify form success, returned provider failure, thrown failure, validation errors, and preservation of entered text using mocks.
- [ ] Read every section using keyboard only, including closed/open navigation and every project.
- [ ] Confirm reduced motion and disabled-JS content visibility.
- [ ] Test focus containment, Escape, focus restoration, and scrolling in project details.
- [ ] Test mobile Safari on a real phone, desktop Chrome/Safari, intermediate widths, landscape, and 200% zoom.
- [ ] Check long titles, long form errors, and narrow published-article rows.
- [ ] Verify deployed resume, OG image, case-study URLs, and advertised public project links.
- [ ] Confirm all prominent metrics and employment/project dates with Kevin.
- [ ] Record before/after screenshots and an actual performance run for the media/layout batch.
- [ ] Update the finding status with a commit/PR and evidence; distinguish implemented from verified.

## Reusable coder handoff

> Read `AGENTS.md` and `docs/reviews/ASTRA-FINDINGS-2026-09-17-PORTFOLIO.md`. Compare the current repository with reviewed commit `1f635e31db1cb80deb1b20fdd27ffb01d4318470`. Start with Batch 1. Reproduce each finding before changing code, preserve existing user work, and keep fixes scoped. Prefer visible static content and native accessible interactions. Do not invent resume facts, metrics, testimonials, or project capabilities. Run the relevant behavior checks, lint, TypeScript, and build. Update the stable finding IDs with evidence and a PR/commit reference. List anything that still needs Kevin's content input or a real-device check. Do not claim an issue is verified solely because the build passes.

## Resolution log

| Date | Finding IDs | Change / decision | Commit or PR | Verification |
|---|---|---|---|---|
| 2026-09-17 | AF-01–AF-30 | Initial review recorded; no implementation changes | Documentation commit | See evidence table above |
