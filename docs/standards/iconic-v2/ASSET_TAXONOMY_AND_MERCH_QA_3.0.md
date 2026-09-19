# ICONIC Asset Taxonomy + Merchandise QA Standard
Version: 3.0
Date: 2026-09-19
Status: Production governance

## Core rule
No image is placed because it merely "looks like a concert." Every visual must have an explicit property assignment before use.

## Asset namespaces

### ICONIC_MASTER
Primary source: Google Drive folder `1ODlsm83tyrUQqv6MwQcpa5HoCh6dzJeD`

Visual language confirmed by image-by-image review:
- black + gold ICONIC arena architecture
- ICONIC-branded circular stage worlds
- gold waveform / monogram environments
- abstract neon stage worlds
- parent-brand audience and production scenes
- the seven inline references supplied on 2026-09-19

Allowed:
- ICONIC home
- corporate/about/platform storytelling
- generic Events, Experiences, Music, Creators, Media, Partners
- parent-brand merchandise atmosphere
- navigation/transition art

Forbidden:
- presenting these assets as Summer Walker, DJ Snake, Nightmare on Channelside, or another named property

### SOUL_SYMPHONY
Source: mixed Drive folder `1NijkRjwhB8BfiPG8Hc_s0fS7BNCtwilx`

Confirmed visual language:
- candlelit / orchestral gold stages
- piano / symphonic concert architecture
- Soul Symphony site comps

Allowed only:
- Summer Walker / Soul Symphony property surfaces
- a parent ICONIC property card that explicitly labels Soul Symphony

### PARDON_MY_FRENCH
Source: mixed Drive folder `1NijkRjwhB8BfiPG8Hc_s0fS7BNCtwilx`

Confirmed visual language:
- blue/red stadium scale
- Paris / Eiffel visual cues
- Pardon My French site comps

Allowed only:
- DJ Snake / Pardon My French property surfaces
- a parent ICONIC property card that explicitly labels Pardon My French

### NIGHTMARE_ON_CHANNELSIDE
Source: mixed Drive folder `1NijkRjwhB8BfiPG8Hc_s0fS7BNCtwilx` plus approved NOC media registry

Confirmed visual language:
- red blood moon
- Tampa/palm silhouettes
- horror arena / red smoke
- Nightmare on Channelside site comps

Allowed only:
- Nightmare on Channelside / Tampa Halloween property surfaces
- a parent ICONIC property card that explicitly labels Nightmare on Channelside

### REFERENCE_ONLY
The full-site screenshots/comps in the mixed folder are references for hierarchy and mood, not reusable production art.

## Placement gate
Before any new visual is committed, record:
1. namespace
2. property/event
3. route
4. role: hero / section / card / background / product
5. source file
6. mobile crop approval
7. desktop crop approval
8. copy context
9. QA reviewer/date

If any field is unknown, do not publish the asset.

## Merchandise rules
1. Product photography always comes from the live commerce product record.
2. Product cards route directly to the product, never through an artist collection slug.
3. Public "Shop by Artist" UI is disabled until taxonomy and visual identity QA are complete.
4. A collection tag is not proof that the pictured subject is correct.
5. Artist/subject collections may return only after:
   - exactly one approved subject assignment exists per artist-specific product;
   - title and subject assignment agree;
   - product front/back visuals are reviewed;
   - collection campaign art is reviewed separately;
   - zero unresolved mismatches remain.

## Live catalog audit — 2026-09-19
The rendered live catalog exposed 93 unique product records.

Structural counts:
- 21 Savage: 18
- Kodak Black: 11
- DaBaby: 11
- Meek Mill: 11
- Belly Gang Kush: 9
- Tampa: 7
- Nightmare on Channelside: 12
- All Artists: 14

Title-prefix vs. grouping result:
- 92 passed structural prefix matching
- 1 requires review:
  - Shopify product 8609205715135
  - title: NOC — FULL LINEUP BLOOD MOON HOODIE
  - current grouping: all-artists

This audit does not claim that faces/people shown in imagery are correctly identified. Visual subject QA remains a separate required step.

## Production behavior
Until the collection gate passes:
- ICONIC merch is product-first.
- NOC storefront is product-first.
- collection navigation is not exposed.
- /merch/worlds redirects to /merch/shop.
- Summer Walker and DJ Snake remain separate future-drop/property lanes.
