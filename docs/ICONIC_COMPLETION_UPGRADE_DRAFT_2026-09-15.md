# ICONIC — Page-by-Page Completion Upgrade Draft

Date: 2026-09-15
Status: implementation instruction, not production certification
Base production SHA: c594cf5aee873168a1d521ab02e5c2e1603748a8
Working branch: iconic-page-by-page-completion-20260915

## Goal
Finish the current ICONIC website without restarting it. Preserve the clean animation canvas, working navigation, NOC commerce, existing intake contracts, approved property identities and truthful commercial boundaries. Upgrade incomplete or internally worded routes into visitor-ready, image-led experiences and verify every route before production release.

## Audit summary
- Home / Events / Experiences / Music / Creators / Media / Partners / Merch: strong v2 foundation. Preserve architecture, correct property art, verify links and forms.
- Soul Symphony: current public card uses incorrect artwork and public copy exposes internal campaign/monetization language. Replace art everywhere and rewrite for visitors.
- Pardon My French: current public card uses unrelated artwork and public copy exposes internal scarcity/revenue instructions. Replace art everywhere and rewrite for visitors.
- Atlanta Halloween incorrectly uses the Tampa property name Nightmare on Channelside. Separate the Atlanta planning concept from the Tampa flagship.
- Atlanta / Vegas / DC / Southlake / New York / series pages are operational but many older pages read as sparse planning decks. Keep HOLD / concept truth, align navigation, and add approved visual context only where it does not imply documentary proof.
- About / Book / Social / Contact / Access are functional but visually flatter than the v2 platform. Add relevant ICONIC platform imagery and visitor-facing copy.
- The public lead policy currently rejects a normal email because the email regex requires a literal backslash before the period. Correct the policy and independently test persistence.

## Non-negotiables
1. One dominant image per major section; black supports imagery rather than replacing it.
2. Property art maps exactly to the destination. No cross-property images.
3. Text-bearing tour artwork uses native-ratio / contain presentation or an approved safe crop.
4. Homepage animation remains free of HTML/CSS marketing copy and controls.
5. Nightmare remains Tampa red/black; Soul Symphony remains burgundy/blush/candlelight; PMF remains black/red/global-stadium.
6. Unannounced dates/venues stay labelled as concepts, holds or updates.
7. Existing NOC product catalog, variants, cart and checkout remain intact.
8. Desktop/mobile screenshot inspection is mandatory; build success alone is not completion.

## Public-copy cleanup
Remove internal phrases such as “One clear world. No filler.”, revenue-stack instructions, “make them chase it”, and internal launch/sell/remarketing mechanics. Replace them with visitor-facing descriptions of the experience, current announcement status, update/VIP/merch/partner actions and what happens next.

## Engineering instructions
- Centralize canonical Soul Symphony and PMF artwork in `src/app/_cinematic/assets.ts` using the verified Google Drive media IDs.
- Extend `LivePropertyPage` with poster-layout and configurable visitor-facing section headings.
- Keep one meaningful H1 per route even when logo artwork is used as the visual title.
- Remove nested main landmarks in the PlatformShell family.
- Align legacy Shell navigation with the core ICONIC platform navigation.
- Add a final scoped completion stylesheet imported last; do not weaken existing v1/v2 standards.
- Correct the Supabase `public_can_submit_iconic_live_leads` policy email validation, then submit and delete labelled QA rows.

## Release acceptance
- All discoverable routes return expected status, no console runtime errors.
- Every route gets a lightweight desktop/mobile check; each unique template gets saved screenshots.
- Primary templates additionally checked at 1024/768/430/375/320.
- No wrong property art, broken images, cropped baked text, missing H1, duplicate main landmark or horizontal overflow.
- Inquiry context, mobile navigation, catalog/cart and checkout boundary remain operational.
- Candidate typecheck/build/security/browser checks pass before merge.
- Production alias resolves to exact merge SHA and production screenshots are inspected again.
