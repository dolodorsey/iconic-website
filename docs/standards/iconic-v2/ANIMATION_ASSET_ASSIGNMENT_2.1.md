# ICONIC Animation Asset Assignment Standard — v2.1.0

Status: ACTIVE. This record is additive to all earlier ICONIC UI standards; it changes animation assignment only and does not weaken any prior anti-regression rule.

## Locked homepage assignment

`ICONIC HOMESCREEN ANI(1).mp4` is the source animation for the homepage animation canvas. Do not replace it with `ICONIC CONCERT ANI(1).mp4`, an unrelated still, generic concert footage or generated substitute while this version is active.

The production delivery asset may be a web-optimized derivative of that exact source (for example an animated WebP or later a CDN-hosted muted MP4) provided the sequence is not creatively altered. Do not recolor it, redraw the ICONIC logo, alter people/faces, rename it into a different property or generate replacement footage and describe it as the source animation.

Current web delivery mapping:

- Homepage animation derivative: `iconic-homescreen-animation-v2.webp`
- Homepage paused/reduced-motion frame: `iconic-homescreen-poster-v2.webp`
- Source provenance: `ICONIC HOMESCREEN ANI(1).mp4`

## Homepage overlay rule remains absolute

Header/navigation is in its own region ABOVE the animation canvas. No interface headline, paragraph, CTA, badge, label, statistic, counter, caption or floating marketing text may be layered on top of the canvas. Page headline, copy and CTAs begin BELOW the animation. The pause/resume control also lives below/outside the canvas.

Persistent homepage motion must be pausable. `prefers-reduced-motion` displays the approved static poster rather than the moving derivative.

## Secondary animation assignment

`ICONIC CONCERT ANI(1).mp4` is the separate secondary source. It must live away from the homepage hero. Current approved placement is the `/events` visual opener, where it introduces the broader concert platform before event-specific property cards.

Current web delivery mapping:

- Events animation derivative: `iconic-concert-animation-v2.webp`
- Source provenance: `ICONIC CONCERT ANI(1).mp4`

The secondary animation does not authorize substituting platform concept art for Nightmare on Channelside, Soul Symphony, Pardon My French or any other property-specific creative. Cards still use each destination's approved original art.

## Automated protection

`scripts/validate-cinematic.mjs` must fail if:

1. the homepage mapping no longer points to the HOMESCREEN derivative;
2. the Events opener no longer points to the CONCERT derivative;
3. the two assignments are swapped;
4. the homepage canvas gains HTML marketing/interface text or interactive controls;
5. the homepage paused/reduced state loses its static poster; or
6. this v2.1 assignment document is removed.

## Change control

Changing either source assignment requires explicit owner approval and a new versioned standard. Do not silently edit the v2.1 history row or this document to make a future redesign pass.
