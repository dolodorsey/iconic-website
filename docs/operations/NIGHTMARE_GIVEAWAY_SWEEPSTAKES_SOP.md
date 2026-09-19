# NIGHTMARE ON CHANNELSIDE — GIVEAWAY / SWEEPSTAKES OPERATING SYSTEM

**Event:** Nightmare on Channelside  
**Producer:** ICONIC LIVE  
**Date:** October 31, 2026  
**Venue:** Benchmark International Arena, Tampa, Florida  
**Event key:** `nightmare_on_channelside_2026`  
**Primary public identity:** @THEICONICLIVE / 775-542-6642 / 77-55-ICONIC  
**Operating owner:** DIESEL  
**System status:** Backend + secure intake endpoint built and prelaunch gate verified. Main-program provisional ARV is **$13,200**, so operations are treating it as Florida filing/security-required unless final approved values/structure establish otherwise. Earliest planned chance-based launch is **September 27, 2026**, and remains blocked until all gates clear.

## 1. Operating decision

Externally, use **Official Giveaway** or **Promotional Sweepstakes** rather than casually calling the program a raffle. No purchase is required and buying a ticket cannot improve a person's odds.

The system is split into two controlled programs:
1. **Main Sweepstakes** — text, call-in, Instagram, radio/podcast partner, web.
2. **Activation Giveaways** — street/event QR activations and the on-site spin wheel.

A radio/podcast partner that is contractually promised its own winner must receive a separately scoped partner promotion instance and rules/draw scope. Do not secretly carve a winner out of the main random pool.

## 2. Launch gates

Nothing public moves from DRAFT/QA to LIVE until all applicable gates are green:
- Official Rules finalized and versioned.
- Every advertised prize has exact quantity, ARV, restrictions, inventory owner and fulfillment owner.
- Florida FDACS filing/security is either completed or documented as not required.
- Ticket inventory approved.
- VIP booth package approved by venue/VIP operations.
- Meet & Greet has written artist-management approval.
- After-party venue, capacity, age requirement and inventory approved.
- Public entry form and server-side intake tested.
- HighLevel giveaway pipeline/workflows materialized and tested.
- Dedupe, eligibility, selection, winner verification and fulfillment QA passed.
- Public page/social graphics include the required material terms.

## 3. Planned prize architecture

### Main Sweepstakes
| Prize | Planning allocation | Public status now | Release gate |
|---|---:|---|---|
| Nightmare Ticket Pair | 12 pairs / 24 tickets | Candidate | Ticket inventory + ARV |
| Food + Non-Alcoholic Beverage Credit | 20 | Candidate | Venue redemption method + ARV |
| Nightmare Merch Pack | 12 | Candidate | Exact contents + ARV |
| VIP Booth Experience | 2 | HIDDEN | Venue inventory, inclusions, guest count + ARV |
| Meet & Greet — winner + guest | 1 | HIDDEN | Written artist-management approval |
| Official After-Party Entry — winner + guest | 8 | HIDDEN | Venue/capacity + 21+ rule + inventory |

### Activation / Wheel
| Prize | Planning allocation | Rule |
|---|---:|---|
| Instant Merch Win | 30 | Approved inventory only |
| Food + Non-Alcoholic Beverage Credit | 30 | Exact redemption + ARV required |
| Same-Day Ticket / Seat Upgrade | up to 6 | Only when ticketing/venue releases inventory |

**Alcohol:** do not make alcohol the default drink prize. If any alcoholic prize is ever added, it must have explicit 21+ eligibility, venue/licensing approval and separate compliance review.

## 4. Entry channels

### A. TEXT IN
**Keyword:** NIGHTMARE  
**Number:** 775-542-6642

Flow:
1. Fan texts NIGHTMARE.
2. Automated reply sends the official entry page.
3. Form collects first/last name, email, mobile, ZIP, age confirmation and acceptance of the versioned Official Rules.
4. Sweepstake entry consent is recorded.
5. SMS marketing opt-in and email marketing opt-in remain separate choices.
6. Contact is source-tagged `NOC26-TEXT`.
7. Dedupe enforces **one official entry per person per day across the main sweepstakes**, regardless of channel.
8. Contact enters eligibility QA.

### B. CALL IN
Use scheduled live windows, preferably hosted by comedians.

Flow:
1. Host announces the open call-in window and required material terms.
2. Caller phones 775-542-6642.
3. Operator records entrant data in the same canonical entry workflow.
4. Rules acceptance / required attestation is captured.
5. Source = `NOC26-CALL`.
6. Host does **not** promise that a caller is a winner unless the specific promotion rules explicitly use a lawful instant-win mechanic and that mechanic has been approved.

### C. INSTAGRAM
Handle: **@THEICONICLIVE**

Flow:
1. Only designated giveaway posts qualify.
2. Post instructs audience to follow the page and comment the published keyword.
3. Comment triggers approved public reply + DM.
4. DM sends the official entry page.
5. The comment is a lead/action, **not** the final legal entry record.
6. Entry only completes after the official form and rules acceptance.
7. Source = `NOC26-IG`.
8. Never promise backstage or artist access unless that exact prize is approved.

### D. RADIO / PODCAST
1. Each partner gets a unique source/promo code.
2. Partner receives approved short host-read copy + material terms + official rules URL.
3. Listener uses the official entry form.
4. Partner performance is measured by entries, verified entrants, ticket-face sessions, clickouts and later verified ticket revenue.
5. Dedicated partner winner = separate partner promotion/draw scope.

### E. EVENT / STREET ACTIVATION
1. Each activation receives a unique QR/source code.
2. Fan scans and completes the free entry form.
3. Activation ID/location/operator are logged.
4. If wheel is present, verified entry unlocks one spin.
5. Source = `NOC26-ACT`.

### F. EVENT-DAY SPIN WHEEL
1. Fan must have a verified free activation entry.
2. One spin per eligible entrant under the published rule.
3. Captain verifies live approved inventory before the spin.
4. Wheel result is logged immediately.
5. Inventory is reconciled by two people at open and close.
6. High-risk prizes stay off the wheel unless specifically approved.
7. Source = `NOC26-WHEEL`.

## 5. Canonical data flow

`Channel → Official Entry → Dedupe → Contact Verification → Eligibility → Eligible Pool → Locked Draw → Selected → Winner Verification → Claim → Fulfillment → Proof → Close`

Important distinctions:
- **Selected is not Winner Verified.**
- Ticketmaster clickout is not a ticket purchase.
- Entry consent is not automatically marketing consent.
- Buying a ticket is not an entry requirement and does not increase odds.
- Every winner must be tied back to the exact rules version and source channel.
- Every fulfilled prize needs proof.

## 6. Selection / drawing protocol

1. Freeze entries at the stated close time.
2. Snapshot the eligible pool.
3. Exclude duplicates, ineligible records, unresolved fraud flags and withdrawn entries according to the published rules.
4. Record the eligible-entry count.
5. Select using the approved random-selection method.
6. Store selection proof, timestamp and witnesses.
7. Mark the selected entrant as **Selected**, not yet a winner.
8. Notify privately.
9. Verify age, identity, geography and other prize restrictions.
10. Apply a claim deadline.
11. If ineligible, declined or expired, record the disposition and run the published alternate-winner method.
12. Mark **Winner Verified** only after verification.
13. Fulfill and attach proof.

## 7. Personnel

| Role | Default owner/profile | Core duty |
|---|---|---|
| Giveaway Director | DIESEL | Overall accountability, inventory and approvals |
| Online Giveaway Host #1 | Comedian preferred | 2 live windows/week; call/text/IG energy |
| Online Giveaway Host #2 | Comedian preferred | 1–2 live windows/week; alternate personality |
| Giveaway CRM Operator | GHL/data operator | Intake, dedupe, tags, eligibility, source tracking |
| Giveaway Fulfillment Coordinator | Guest services/ticketing | Notify, verify, claim, fulfill, proof |
| On-Site Activation Captain | Experiential lead | Wheel, QR, inventory and event-day logs |
| Radio/Podcast Liaison | Media partnerships | Partner codes, host copy, air/post proof |
| Rules + Compliance Reviewer | Promotion counsel/compliance | Rules, ARV, filing/security and approval |

Hosts are entertainers, **not** rule-makers. They use approved scripts and cannot improvise prize promises.

## 8. Calendar

| Date | Action | Prize / channel | Owner |
|---|---|---|---|
| Sep 19 | Backend + operating architecture | Internal | Giveaway Director |
| Sep 20 | Rules + ARV review | All | Rules Reviewer |
| Sep 21 | End-to-end intake QA | Text/web | CRM Operator |
| Sep 22 | Teaser / waitlist only — NO chance-based entries | Event awareness | Host #1 |
| Sep 25, 8 PM ET | Comedian teaser live — NO giveaway entries | Event awareness | Host #1 |
| Sep 27 | Earliest official launch if all legal/filing/security/QA gates are green | Ticket pair / text + IG | Host #1 |\n| Sep 28 | Radio/podcast Wave 1 | Ticket pair | Partner Liaison |
| Oct 1 | Merch giveaway | Merch / IG | Host #2 |
| Oct 4, 8 PM ET | Comedian live #2 | Ticket pair | Host #2 |
| Oct 8 | Radio/podcast Wave 2 | Merch / ticket | Partner Liaison |
| Oct 12 | Premium giveaway — only if approved | VIP booth | Director |
| Oct 16, 8 PM ET | Comedian live #3 | Ticket/merch | Host #1 |
| Oct 20 | Tampa activation | QR + wheel | Activation Captain |
| Oct 23 | Premium after-party giveaway — only if approved | After-party | Director |
| Oct 26 | M&G draw/verification — only if approved | Meet & Greet | Fulfillment |
| Oct 27–30 | Daily micro-giveaways | Tickets / merch / F&B | CRM + Hosts |
| Oct 31 | Event-day activation | Wheel | Activation Captain |

## 9. Content cadence

- Giveaway feed/reel: 2–3 per week after launch.
- Stories on giveaway days: 6–10 frames across announce → proof → reminder → CTA → last call.
- Comedian-hosted live: target 2 per week; add a third during final week.
- Radio/podcast partner drops: minimum two concentrated waves; increase in final two weeks.
- Final four days: daily micro-giveaway creative with controlled inventory.

Primary CTA stack:
- **TEXT NIGHTMARE TO 775-542-6642**
- **COMMENT NIGHTMARE → CHECK YOUR DM**
- **SCAN → ENTER FREE → SPIN**
- **NO PURCHASE NECESSARY. OFFICIAL RULES APPLY.**

## 10. HighLevel blueprint

Location: `BzWF8vhGoYIIXou6wgFg`

Pipeline:
`Entry Received → Contact Verified → Eligible Pool → Selected → Contacting → Claim Pending → Winner Verified → Fulfilled → Closed / Expired`

Required objects stored in Supabase `noc_ghl_blueprint`:
- NOC — Giveaway / Sweepstakes Lifecycle
- NOC Giveaway Fields + Tags
- NOC GW01 — Text NIGHTMARE Entry
- NOC GW02 — Instagram Comment → Giveaway Entry
- NOC GW03 — Radio / Podcast Partner Entry
- NOC GW04 — Winner Verification + Fulfillment
- NOC GW05 — Activation / Spin Wheel

**Current provider status:** blocked because the connected HighLevel tool returns HTTP 401 IAM/scope. Do not report these objects as materialized in HighLevel until a provider receipt/test proves it.

## 11. Supabase tables

- `noc_giveaway_programs`
- `noc_giveaway_prizes`
- `noc_giveaway_channels`
- `noc_giveaway_entries`
- `noc_giveaway_draws`
- `noc_giveaway_winners`
- `noc_giveaway_personnel_slots`
- `noc_giveaway_calendar`\n- `noc_giveaway_intake_rate_limits`\n- Edge Function: `noc-giveaway-entry` (public status + hardened server-side entry intake)

All giveaway tables have RLS enabled and direct `anon` / `authenticated` privileges revoked. Public entry writes now run through the deployed `noc-giveaway-entry` Edge Function and service-role-only RPC; the database itself blocks entries until status, dates, channel and rules version are live.

## 12. Public launch checklist

- [ ] Official Rules approved and URL live
- [ ] Exact ARV on every announced prize
- [ ] Florida filing/security determination complete
- [ ] Ticket inventory reserved
- [ ] Merch SKUs allocated
- [ ] Venue F&B redemption approved
- [ ] VIP booth exact inclusions approved
- [ ] Meet & Greet written approval received
- [ ] After-party venue/capacity/21+ terms approved
- [ ] HighLevel connector authorization restored
- [ ] Giveaway workflows materialized in GHL
- [ ] Text NIGHTMARE tested end-to-end
- [ ] IG comment → DM → entry tested end-to-end
- [ ] Partner source code tested
- [ ] QR activation tested
- [ ] Wheel inventory ledger tested
- [ ] Winner selection + verification test completed
- [ ] Mobile + desktop entry-page screenshots reviewed against ICONIC production standard
- [ ] No public campaign launches with any blocking gate red
