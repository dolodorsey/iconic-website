# ICONIC Ticketmaster Commerce Bridge

## Goal
Keep the fan inside an ICONIC-designed ticket journey while Ticketmaster remains the inventory, reservation, order, fee/tax, and ticket-claim system of record.

The current public Ticketmaster URL remains the fallback until Ticketmaster Partner / Distributed Commerce credentials are approved and direct commerce is explicitly enabled.

## Nightmare on Channelside
- ICONIC event key: `nightmare_on_channelside_2026`
- Ticketmaster event ID: `0D006514C6E3B429`
- Date: October 31, 2026
- Venue: Benchmark International Arena, Tampa

## Architecture
1. ICONIC event page requests event metadata from `/api/ticketmaster/events/:eventId`.
2. Partner-enabled inventory is requested server-side from `/availability`.
3. Fan selects an offer/quantity in the ICONIC UI.
4. ICONIC sends the complete Ticketmaster reserve payload to `/cart`.
5. Ticketmaster returns the held cart, exact fees/taxes, expiration, and order details.
6. The fan reviews the all-in price before payment.
7. Payment is tokenized according to the Ticketmaster partner configuration and submitted to `/cart/payment`.
8. Commit is a separate user-confirmed request to `/cart`.
9. ICONIC displays the Ticketmaster redemption/claim flow and records non-sensitive conversion metadata.

Do not chain billing and commit into one automatic backend action. Do not persist raw card numbers, CVV, payment tokens, redemption URLs, or other bearer-like ticket credentials in analytics, GHL, logs, or the client bundle.

## Environment variables
Server-only variables:

```text
TICKETMASTER_DISCOVERY_API_KEY=
TICKETMASTER_PARTNER_API_KEY=
TICKETMASTER_PARTNER_ENV=preprod
ICONIC_TICKETMASTER_COMMERCE_ENABLED=false
ICONIC_TICKETMASTER_ALLOWED_EVENT_IDS=0D006514C6E3B429
```

`ICONIC_TICKETMASTER_COMMERCE_ENABLED` must stay `false` until Partner API access, payment configuration, abuse protection, and pre-production purchase testing are complete.

## API routes scaffolded
- `GET /api/ticketmaster/status`
- `GET /api/ticketmaster/events/:eventId`
- `GET /api/ticketmaster/events/:eventId/availability`
- `POST /api/ticketmaster/events/:eventId/cart` — reserve
- `PUT /api/ticketmaster/events/:eventId/cart/payment` — billing/payment
- `PUT /api/ticketmaster/events/:eventId/cart` — commit

All Ticketmaster API keys stay server-side. The event allowlist prevents the bridge from becoming a generic Ticketmaster proxy.

## Required before direct checkout goes live
- Ticketmaster Distributed Commerce / Partner API relationship and production credentials.
- Ticketmaster pre-production access and a confirmed payment configuration (for example Braintree if enabled for the partner account).
- Bot/CAPTCHA and rate-limit protection on reserve/payment/commit routes.
- A signed server-created checkout session so anonymous clients cannot freely call commerce endpoints.
- ICONIC inventory UI that favors offer/section/row/quantity instead of attempting a fragile Ticketmaster-style exact-seat clone.
- All-in price review using Ticketmaster-returned fees/taxes before payment.
- Separate user action between billing and final commit.
- Purchase, claim, cancellation/error, maintenance-window, and polling-state testing.
- Privacy/terms/customer-support copy approved for the ticket funnel.

## Funnel events
Track only non-sensitive commerce metadata:
- `ticket_viewed`
- `inventory_loaded`
- `offer_selected`
- `cart_reserved`
- `checkout_started`
- `payment_submitted`
- `order_committed`
- `claim_opened`

Recommended GHL stages for ICONIC only:
`Ticket Interest -> Cart Reserved -> Purchased -> Claimed -> Pre-Show -> Attended/Post-Show`

Never send raw payment information or Ticketmaster claim bearer URLs into GHL.
