# ICONIC — UI Production Standard + Anti-Regression SOP

Version: 1.0.0  
Status: LOCKED / PRODUCTION GOVERNANCE  
Applies to: ICONIC platform website only  
Primary production property: https://iconic-website-ten.vercel.app / iconic-website Vercel project (temporary URL until the custom domain is assigned)

## 1. Purpose

ICONIC cannot drift back into a generic dark website, a text-heavy directory, or a template-looking event site. Every release must preserve the cinematic, visual-first, premium standard while keeping each ICONIC property visually distinct.

This document is a release requirement, not a mood board. If a proposed change conflicts with these rules, the change does not ship until corrected or the standard is intentionally versioned by ownership.

## 2. Locked Non-Negotiables

### 2.1 Homepage animation is a clean visual canvas

- NO interface headline on top of the homepage animation.
- NO paragraph copy on top of the homepage animation.
- NO CTA buttons on top of the homepage animation.
- NO badges, chips, labels, counters, captions, promo text, floating copy or marketing overlays on top of the homepage animation.
- Navigation may remain in its own navigation region above the hero.
- All homepage headline, positioning copy and CTAs begin BELOW the animation canvas.
- Typography that is intentionally rendered inside an approved animation asset itself is treated as part of that asset; separate HTML/CSS overlays are forbidden.
- The animation must remain the visual entry moment. Do not darken it so aggressively that its imagery becomes unreadable merely to support overlay copy.

### 2.2 Cards must use the correct approved property art

Every event/property/tour card must use the real approved visual for the destination it represents.

Forbidden:
- generic stock photos;
- placeholder graphics;
- AI substitutes when approved art exists;
- imagery borrowed from another ICONIC property;
- stale event art;
- duplicated imagery used only to fill a layout;
- logo-only cards when approved visual artwork exists;
- unrelated artist imagery;
- a card visual that does not match the destination page.

Required:
- card visual is explicitly mapped to the destination slug;
- image/design is sourced from the approved property asset set;
- homepage card image matches or is an approved derivative of the corresponding property page visual;
- alt text describes the real property;
- crop and focal point are deliberately set;
- card imagery is reviewed on desktop and mobile before release.

Current flagship source-of-truth mapping:
- Nightmare on Channelside -> official NOC headliners visual from `NOC_MEDIA.headliners`.
- Summer Walker / Soul Symphony -> official `SUMMER_VISUAL` from `/summer-walker`.
- DJ Snake / Pardon My French -> official `DJ_VISUAL` from `/dj-snake-pardon-my-french`.

### 2.3 Property worlds remain separate

ICONIC is the operating platform. Nightmare on Channelside, Soul Symphony, Pardon My French and every future property are separate creative worlds.

Do not flatten them into one identical card template, one color palette, one typography treatment or one repeated background. ICONIC supplies hierarchy and navigation; each property supplies its own identity.

### 2.4 Visual-first hierarchy

- Lead with motion, photography, approved campaign artwork and environment.
- Copy supports the visual world; copy does not replace the visual world.
- Avoid giant empty black fields with small text floating inside them.
- Avoid repetitive spreadsheet-like rows as the dominant page language.
- Avoid endless identical bordered rectangles.
- Every major section should have a visual reason to exist, not simply another heading plus paragraph.
- Use whitespace intentionally, not as a substitute for design.

## 3. Asset Governance System

Every card or hero asset must have:
1. brand/property slug;
2. approved source URL or repository path;
3. role: hero, card, gallery, merch, city, artist, sponsor or background;
4. crop/focal-point instruction when needed;
5. approval status;
6. source-of-truth destination page;
7. last-reviewed date.

The source-of-truth asset must be referenced rather than recreated. When a source asset changes, dependent cards must be reviewed rather than silently inheriting a random replacement.

## 4. SOP 01 — Request / Design Intake

Before code is changed:
1. identify exact ICONIC page or property;
2. state the user goal for the page;
3. identify approved visuals already available;
4. identify which visuals are missing;
5. define desktop and mobile layout intent;
6. identify conversion action;
7. compare proposed layout against this standard.

A build cannot start from placeholder art if real approved art already exists.

## 5. SOP 02 — Homepage Animation Changes

Before changing the homepage hero:
1. confirm the animation/video/image source;
2. confirm it fills the intended hero canvas without distortion;
3. confirm there is no interface copy layered over the canvas;
4. move all headline/copy/CTA content into the next section below the canvas;
5. verify nav does not obscure critical animation content;
6. test desktop, tablet and mobile crop;
7. run `npm run validate:ui`.

Automatic failure conditions:
- `<h1>`-`<h6>` inside homepage hero;
- paragraph inside homepage hero;
- Link/button/CTA inside homepage hero;
- `ir-home-hero-copy` restored inside the hero.

## 6. SOP 03 — Card Creation / Replacement

For every new or modified flagship card:
1. identify destination route;
2. open destination page source;
3. locate its approved visual constant or asset registry entry;
4. map the card to that asset;
5. never infer a substitute from another page;
6. set intentional focal point;
7. preserve property-specific color and identity;
8. verify accessible label/alt text;
9. test at 1440px, 1024px, 768px, 430px and 390px widths;
10. run the UI validation gate.

If approved art is unavailable, do not manufacture a fake final state. Mark the card as blocked for approved creative or use an explicitly approved temporary treatment.

## 7. SOP 04 — Engineering Change

Every material UI change must:
1. occur on a branch, not as an unreviewed production edit;
2. include a clear commit message;
3. pass deterministic install;
4. pass `npm run validate:ui`;
5. pass TypeScript;
6. pass production build;
7. generate a Vercel preview;
8. receive visual QA on the preview;
9. preserve forms, links, analytics and conversion routes;
10. merge only after preview validation.

## 8. SOP 05 — Preview Visual QA

Review the actual Vercel preview, not screenshots of local code only.

Desktop checks:
- homepage animation has zero interface copy over it;
- cards use the correct artwork;
- no broken/blank images;
- no horizontal overflow;
- no giant dead zones;
- typography hierarchy is deliberate;
- visual cards are not duplicated accidentally;
- property identities remain distinct;
- CTAs route to correct destinations.

Mobile checks:
- hero crop preserves focal subject;
- animation remains readable and performant;
- card art is not cropped into nonsense;
- tap targets remain usable;
- headings do not create one-word stacks unless intentionally designed;
- no fixed element covers content;
- forms remain usable.

Functional checks:
- all internal links work;
- all forms render;
- event access paths work;
- merch routes work;
- Shopify status endpoint remains healthy;
- analytics/event-track guard remains healthy;
- lead endpoint same-origin guard remains healthy.

## 9. SOP 06 — Production Release

Release order:
1. approved branch/PR;
2. CI green;
3. Vercel preview green;
4. visual QA green;
5. merge to main;
6. wait for production deployment;
7. run production audit;
8. inspect production home, events, music, creators, merch and partners;
9. confirm production alias points to the expected deployment;
10. document release.

Never use production as the first place a new layout is visually reviewed.

## 10. SOP 07 — Post-Deploy Audit

Within the release window verify:
- homepage hero rule;
- flagship asset mappings;
- site navigation;
- sitemap routes;
- title + metadata;
- internal CTAs;
- forms;
- lead endpoint validation;
- event tracking;
- Shopify/NOC status;
- media proxy;
- production runtime errors.

A technically successful deployment is not a successful release if the UI has regressed.

## 11. SOP 08 — Rollback

Rollback immediately when any of the following is true:
- homepage animation receives text/CTA overlays;
- key approved visual disappears or is replaced by unrelated art;
- production layout materially breaks at mobile or desktop;
- major conversion path fails;
- a critical runtime/build error is introduced;
- navigation or property routing breaks.

Rollback method:
1. identify last known-good Vercel deployment/commit;
2. revert the offending PR/commit or promote the known-good deployment through the approved deployment process;
3. rerun UI gate and production audit;
4. record root cause;
5. patch on a new branch.

Do not patch a broken production design by weakening the quality standard.

## 12. Anti-Regression Automation

The repository must retain:
- `scripts/validate-ui-governance.mjs`;
- npm script `validate:ui`;
- CI execution of `npm run validate:ui` before TypeScript/build;
- production audit workflow after main deployments.

The UI governance check currently enforces:
- visual-only homepage hero;
- correct official visuals for the three flagship homepage cards;
- no stock/placeholder source inside the flagship card slate;
- explicit visual mapping for every flagship card;
- source governance comments remain in `HomeExperience.tsx`.

Future properties must be added to the same asset-governance system instead of bypassing it.

## 13. Definition of Done

A page is NOT done because it compiles.

Done means:
- it feels deliberately designed;
- it uses the correct approved creative;
- animation and imagery are given room to work;
- all states are responsive;
- links/forms work;
- CI passes;
- Vercel preview passes visual review;
- production audit passes after release;
- no rule in this standard has been weakened to make a release easier.

## 14. Forbidden Shortcuts

Do not:
- put marketing copy back on top of the homepage animation;
- use generic visuals to complete a grid;
- reuse one property's images for another property;
- ship blank visual placeholders as final UI;
- collapse every page into the same template;
- replace premium visual sections with plain text lists because they are easier to code;
- merge around a failing UI gate;
- disable the UI gate to ship faster;
- skip preview QA;
- treat `build passed` as equivalent to `design passed`.

## 15. Ownership Rule

This standard is the default until a newer version is deliberately approved. Any exception must be explicit, documented and property-specific. Silence is not approval to reduce the design standard.
