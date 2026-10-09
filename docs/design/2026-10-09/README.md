# Portfolio design explorations

October 9, 2026. Nine exploratory directions for Kevin J Hernandez's portfolio.

These are concept previews, not changes to the live application. Copy is proposed. Screenshots come from the existing portfolio and may need refreshing before release. No new outcomes, testimonials, or adoption metrics are asserted.

## Open the previews

Download or clone the repository and open [index.html](index.html) in a browser. No build or API keys are required. GitHub's normal file view shows HTML source rather than rendering the preview.

Each set has a picker below the design to switch among three variants. Expand the details inside individual designs; After Hours also has a Blue42/Catchr switch. The exports include the carousel runtime and embedded project images. Some auxiliary runtime resources reference public CDNs, so an internet connection is recommended. These are standalone exports, not externally hosted preview URLs.

| Preview | Directions |
|---|---|
| [First set](first-directions.html) | Working Index, Personal Editorial, Project Studio |
| [Second set](second-directions.html) | Bold Type, After Hours, Field Journal |
| [Third set](third-directions.html) | Gallery, A Personal Letter, Workshop |

Editable fragments are in [sources](sources/). The standalone documents include an iframe wrapper and the visualization export runtime. Edit the fragments as the design source, then regenerate the export rather than manually editing escaped iframe markup. These files are design references; do not copy their export runtime into the production Next.js app.

## Direction comparison

| Direction | Defining choices | Best use | Tradeoff |
|---|---|---|---|
| Working Index | Identity rail, clear work rows, restrained forest palette | Balanced program-operator and builder positioning | Can feel too administrative if overloaded with labels |
| Personal Editorial | Warm paper, serif headlines, conversational story framing | Community and program roles where personality matters | Needs specific stories to avoid generic personal-brand prose |
| Project Studio | Large graphic heading, cool blue, screenshot-led project feature | Emphasizing current product-building ability | Can underweight professional program experience |
| Bold Type | Oversized name, vermilion, strong typographic grid | Memorable personal identity with minimal decoration | Large type needs careful mobile tuning |
| After Hours | Dark green-charcoal, restrained lime, switchable project feature | More technical and product-oriented presentation | Keep program work visible; avoid drifting into a generic SaaS landing page |
| Field Journal | Newspaper-like masthead, serif stories, a modest current-work note | Personal narrative and published writing | Requires editorial discipline as content grows |
| Gallery | Cool neutral surfaces, asymmetric screenshot mounts, minimal metadata | Letting real products and visual work carry the page | Program stories need equally tangible evidence |
| A Personal Letter | Narrow reading column, first-person introduction, compact project list | Most direct and personal presentation | Less immediate visual impact; avoid making visitors read too much |
| Workshop | Warm split composition, prominent personal introduction, ongoing-work list | Connecting approachable personality with practical building | The identity column must collapse cleanly on mobile |

## Recommendation

For balanced hiring use, shortlist **Working Index**, **Bold Type**, and **Workshop**. Working Index is the strongest organizational starting point; Bold Type has the clearest visual identity; Workshop adds warmth without relying on stock illustration. A Personal Letter is a useful alternative if Kevin wants the site to feel especially personal and understated.

Choose a composition first. Then refine typography, palette, copy, and imagery within that composition. Do not combine every concept's decorative features. The final design should include clear contact/resume paths and real detail-page links; these previews mostly use local navigation and expandable examples to explore structure.

## Implementation guardrails

- Refer to [Astra redesign findings](../../reviews/ASTRA-FINDINGS-2026-10-09-REDESIGN.md) for content requirements and the functional backlog.
- Preserve accurate ownership and Google via Cognizant attribution.
- Make all professional evidence visible without animation or wheel input.
- Use native keyboard-operable links and controls.
- Replace prototype descriptions with substantiated project stories.
- Verify project status and screenshot freshness before release.
- Keep relevant program experience prominent even in product-led designs.
- Treat screenshots as existing portfolio assets, not proof of present capabilities or adoption.
- Validate the selected design on mobile, at intermediate widths, and at 200% zoom before implementation sign-off.

## Validation of this package

Static validation checks fragment size, unique IDs, local anchor targets, variant counts, export structure, embedded image presence, and JavaScript syntax. This is not a new production build, browser rendering audit, or mobile-device test. No application source is changed by this package.
