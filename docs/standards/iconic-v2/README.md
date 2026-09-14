# ICONIC — Cinematic Website Standard v2.0.0

Status: active design and operating requirement. This is NOT a production-certification claim.

## Standards register — preserve, do not replace

Verified on September 14, 2026:

| Scope | Saved standard | Store | Action |
|---|---|---|---|
| ICONIC | ui_non_negotiables, v1.0.0 | Creative Engine / private.ui_governance_documents | Preserved |
| ICONIC | ui_release_anti_regression_sop, v1.0.0 | Same table | Preserved |
| Enterprise quality | flagship_web_standard, v1 | KOLLECTIVE BOH / public.website_governance_standards | Inherited quality requirements, not shared visual branding |
| Member's Elite only | members-elite-web-v2, v2 | BOH / public.website_governance_standards | Verified separately; unchanged and NOT applied to ICONIC |

Eight new ICONIC records are saved separately at version 2.0.0: ui_cinematic_composition; ui_homepage_motion_contract; ui_asset_registry_and_semantics; ui_commercial_truth; ui_responsive_accessibility; ui_preview_release_and_rollback; ui_page_storyboards; ui_standards_index. These are additive. The existing v1 repository SOP and original source are retained.

## 1. Visual standard

The site must feel like live entertainment, not a business directory. Use original ICONIC art at meaningful scale, restrained warm-metal accents, clear editorial typography, legible controls and varying section composition. No enormous empty black fields, oversized copy covering missing art, tiny logos marooned in rectangles or endless identical grids. Black is the interface foundation, not the creative idea.

One major visual has one job. Alternate full-bleed imagery, editorial splits, relevant campaign cards, concise explanatory modules and real conversion sections. No more than two consecutive image grids. Near-identical stage images count as repetition: do not use all ten just because ten were supplied. Gold in platform art does not authorize recoloring every tour or collection. Preserve each property's original visual identity.

## 2. Clean homepage motion — absolute

Header above the canvas. Animation canvas alone. H1, descriptive copy, CTAs and pause control BELOW it. No headings, paragraphs, links, badges, counters, labels or marketing overlays inside or over the canvas. The only rendered element inside the governed canvas is its approved image. Owner-approved lettering already embedded in the original artwork may remain; separate HTML/CSS marketing overlays may not.

The current supplied assets are still images. The initial implementation uses a subtle CSS camera drift, not fabricated concert footage. A future video must be independently supplied or approved, use the same-art poster, remain muted and retain graceful fallback. Persistent motion must be pausable outside the canvas. Honor reduced motion. Keep the stage and microphone focal point on mobile. Never obscure the image with a gradient just to make overlay copy possible.

## 3. Asset governance and semantic mapping

Every significant visual has an explicit brand, property, role, source and destination. src/app/_cinematic/assets.ts is the executable mapping. The ten originals are preserved in the conversation; optimized derivatives are individually hosted with iconic-v2 filenames. These are ICONIC platform campaign/concept artwork, not documentary proof, artist-tour substitutes, product photography or sponsor proof.

Canonical property art: Nightmare on Channelside uses NOC_MEDIA.headliners; Soul Symphony uses the exact SUMMER_VISUAL from its destination page; Pardon My French uses the exact DJ_VISUAL from its destination page. Original campaign cards are intentionally reused in property navigation on Home, Events and Partners to retain a consistent destination identity; do not use those images to illustrate another property.

Collection cards use their own COLLECTION_ART entries. Product cards use the actual catalog product's primary_image_url and price_cents. Hospitality uses hospitality imagery. Media uses relevant media-production imagery. No random selection, modulo, gallery slicing, generic stock, fictitious artwork replacement or changed faces/logos. Text-bearing campaign art uses contain/native ratio rather than cropping through words or faces. Missing creative is an asset gap, not permission to fabricate a finished card.

## 4. Content truth — mockups are not business records

Do not publish the mocks' invented HALLOWS, LEGACY, GLOBAL or ORIGINS event identities. Keep the actual property names. Do not publish invented Nike, Veuve Clicquot or Allianz Arena relationships. Do not treat iconic.world as an owned domain. Do not announce overseas markets from a rendered concept. Do not publish invented product names, prices, shipping coverage, audience numbers, case studies, represented talent, sellouts or partner logos.

Unannounced tours use update-request language. Dates, venue commitments, rights and purchase links require their own verified source. A campaign image alone proves none of those facts. Public copy should help the visitor; remove internal instructions such as 'No fake product grids', 'No recycled campaign photography' or 'Isolated catalog'.

## 5. Page storyboards

Home: clean motion canvas → short editorial introduction → original three property cards → backstage/platform editorial split → original NOC collection entry → hospitality-themed partnership conversion.

Events: distinct platform hero → event discovery → original property cards → Greek Ball/The Ball Series feature → distinct 21+/30+ series paths → verified existing destination routes → VIP request.

Music: performance-oriented artwork → artist, release and live-development process → services and programming → original music-intake contract.

Creators: artist/creative-stage artwork → disciplines by working role → transparent application process → original creator form. No invented talent roster.

Experiences: hospitality artwork → separate Nights, Experiences and Social formats → arrival and programming → booking and VIP paths.

Merch: actual NOC campaign introduction → actual artist collections → actual products/prices → event and city editions → future drop notifications → original cart/checkout. Do not confuse posters and garments.

Partners: platform-scale artwork → scoped partnership possibilities → property-specific inquiries → sponsorship form. No fabricated client case studies.

Media: media-production artwork → photography, film and campaign disciplines → clear concept-art distinction → press/licensing request.

The detailed event/venue/city/storefront/legal routes remain operational. Their presence is not a claim of a full redesign or independent certification.

## 6. Responsive and accessible quality

Review 1440×1000, 1024×900, 768×1024, 430×932, 390×844 and 375×812. Automated screenshots cover representative desktop/tablet/mobile/narrow widths; additional specified widths require review before final certification. Mobile is independently composed. No horizontal overflow, unreadable baked-in text, hidden navigation or cropped faces. Use exactly one main landmark and meaningful H1, real HTML core messaging, descriptive alt text, visible keyboard focus and labelled inputs. Inputs remain at a readable mobile size. Do not remove accessibility to make the screenshot cleaner.

Optimize derivatives without overwriting originals. Load the primary hero promptly and defer lower media. Record actual image decode and payload results. Performance targets and a passing build are not evidence of a measured Lighthouse score.

## 7. Engineering and release SOP

Owner: Dr. Dorsey approves creative-standard changes and property-specific exceptions. Engineer: implements on a scoped branch. QA: inspects actual screenshots and validates routes, crops, forms and commerce. Release owner: verifies exact commit, deployment, production alias and rollback path.

Read standards → record base SHA and known-good deployment → storyboard and asset map → isolated branch → source gate → dependency/security gate → TypeScript → production build → browser tests → rendered desktop/tablet/mobile inspection → immutable Vercel preview verification → approval → controlled merge → production deployment → alias/SHA verification → post-release smoke test and release evidence.

Source checks: scripts/validate-cinematic.mjs. Browser checks/screenshots: scripts/cinematic-browser-qa.mjs. Legacy v1 tests and SOP remain. Source-build screenshots and Vercel-preview screenshots must be labelled accurately. Mocked form tests do not prove Supabase persistence. Test backend insertion separately with rollback/test-record isolation; never claim a form is working from its visual appearance alone.

A score of 96/100 remains the enterprise review target, not a number to manufacture. Any blocker wins over the score. A workflow is not branch protection: main was observed unprotected during this execution. Required-check repository rules must be configured and verified separately before claiming bypass is technically prevented.

## 8. Blockers and rollback

Block release for overlay text on the homepage canvas, wrong event/artist/product creative, broken media, cropped campaign text, fake commercial claims, bad mobile layout, broken navigation/form/cart/checkout, cross-brand routing or new runtime failures. Do not remove features, suppress tests or lower art quality to pass.

Restore the recorded known-good deployment or revert only the scoped change. Preserve lead/product data, previous governance rows and original assets. Record cause, exact SHA, deployment and corrective action. Do not call an untested preview 'deployed to production' or call build READY 'production certified'.

## Technical references

Playwright screenshot review: https://playwright.dev/docs/test-snapshots
Motion controls: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide
Deployment lifecycle: https://vercel.com/docs/deployments

## Release evidence template

Version / base SHA / head SHA / preview deployment ID / production deployment ID / alias / screenshot paths / checked viewports / image decode report / route checks / form UI tests / backend persistence test / cart checkout boundary / unresolved blockers / reviewer / rollback target.
