# Nightmare on Channelside — Ticketmaster API Cutover

Effective: 2026-09-19

## What is already live
- Buyer-facing Ticket Face: /tampa/nightmare-on-channelside/tickets
- Owned attribution links: /go/{PROMO_CODE}
- Event ID: 0D006514C6E3B429
- Current checkout destination: official Ticketmaster event URL
- Promo/session/UTM clickout telemetry is captured before the Ticketmaster handoff.

## Monday key install
Set the Ticketmaster consumer key as the server-only environment variable:

- TICKETMASTER_CONSUMER_KEY

Do not expose it in client code, Google Sheets, Supabase public tables, URLs shared with personnel, or the asset folder.

The production route /api/nightmare-ticketmaster-event is already built to:
1. Return 503 with status=awaiting_api_key while the key is absent.
2. Fetch the event from the Ticketmaster Discovery API after the key is installed.
3. Preserve the current partner-facing links; personnel do not need replacement URLs.

## Important API distinction
The Ticketmaster Discovery/consumer key provides event discovery/details. It does not by itself prove buyer orders or provide promoter commission settlement.

Verified sales reconciliation requires one of:
- Ticketmaster Partner API access with order management enabled,
- an authorized organizer/provider sales export/feed,
- or another approved verified-order integration.

If Ticketmaster provides Partner API access, install its key separately as:
- TICKETMASTER_PARTNER_API_KEY

The server helper is already separated so a Discovery key is never treated as an order-management credential.

## Personnel rule
Never pay commission based on:
- clicks,
- Ticket Face sessions,
- Ticketmaster clickouts,
- screenshots of checkout,
- or verbal buyer claims.

Commission is calculated from eligible verified settled sales after the authorized order feed/export is connected.

## Alternate ICONIC-controlled checkout
Venue approval removes the venue-side blocker, but any alternate checkout must still preserve:
- Partner ID + promo code attribution
- unique order ID
- ticket/seat inventory or entitlement
- payment status
- refund/chargeback/cancellation status
- ticket delivery/claim status
- purchaser contact/consent rules
- reconciliation into the master Payments / Promo Codes / Personnel system

The Ticket Face stays the permanent front door. Checkout destination can change behind the attribution layer without changing partner links.
