const DISCOVERY_BASE = "https://app.ticketmaster.com/discovery/v2";
const PARTNER_PROD_BASE = "https://app.ticketmaster.com/partners/v1";
const PARTNER_PREPROD_BASE = "https://app.ticketmaster.com/partners-preprod/v1";

const CORE_EVENT_IDS = ["0D006514C6E3B429"] as const;

function configuredEventIds() {
  const ids = (process.env.ICONIC_TICKETMASTER_ALLOWED_EVENT_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return new Set([...CORE_EVENT_IDS, ...ids]);
}

function assertAllowedEvent(eventId: string) {
  if (!configuredEventIds().has(eventId)) {
    throw new TicketmasterBridgeError(403, "Event is not enabled for ICONIC ticketing.");
  }
}

function assertCommerceEnabled() {
  if (process.env.ICONIC_TICKETMASTER_COMMERCE_ENABLED !== "true") {
    throw new TicketmasterBridgeError(503, "ICONIC direct ticket commerce is not enabled.");
  }
}

function parseBody(text: string) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export class TicketmasterBridgeError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "TicketmasterBridgeError";
    this.status = status;
    this.details = details;
  }
}

async function requestTicketmaster(
  url: string,
  apiKey: string,
  init: RequestInit = {},
) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  const body = parseBody(text);

  if (!response.ok) {
    throw new TicketmasterBridgeError(
      response.status,
      `Ticketmaster request failed with ${response.status}.`,
      body,
    );
  }

  return body;
}

export function getTicketmasterBridgeStatus() {
  return {
    discoveryEnabled: Boolean(process.env.TICKETMASTER_DISCOVERY_API_KEY),
    partnerEnabled: Boolean(process.env.TICKETMASTER_PARTNER_API_KEY),
    commerceEnabled:
      Boolean(process.env.TICKETMASTER_PARTNER_API_KEY) &&
      process.env.ICONIC_TICKETMASTER_COMMERCE_ENABLED === "true",
    partnerEnvironment:
      process.env.TICKETMASTER_PARTNER_ENV === "preprod" ? "preprod" : "production",
    enabledEventIds: Array.from(configuredEventIds()),
  } as const;
}

export async function getTicketmasterEvent(eventId: string) {
  assertAllowedEvent(eventId);
  const apiKey = process.env.TICKETMASTER_DISCOVERY_API_KEY;
  if (!apiKey) {
    throw new TicketmasterBridgeError(503, "Ticketmaster Discovery API is not configured.");
  }

  const url = `${DISCOVERY_BASE}/events/${encodeURIComponent(eventId)}.json`;
  return requestTicketmaster(url, apiKey, { method: "GET" });
}

function partnerBase() {
  return process.env.TICKETMASTER_PARTNER_ENV === "preprod"
    ? PARTNER_PREPROD_BASE
    : PARTNER_PROD_BASE;
}

function partnerKey() {
  const apiKey = process.env.TICKETMASTER_PARTNER_API_KEY;
  if (!apiKey) {
    throw new TicketmasterBridgeError(503, "Ticketmaster Partner API is not configured.");
  }
  return apiKey;
}

export async function getTicketmasterAvailability(eventId: string) {
  assertAllowedEvent(eventId);
  const url = `${partnerBase()}/events/${encodeURIComponent(eventId)}/availability?getBasePrice=true`;
  return requestTicketmaster(url, partnerKey(), { method: "GET" });
}

export async function reserveTicketmasterCart(eventId: string, reservePayload: unknown) {
  assertAllowedEvent(eventId);
  assertCommerceEnabled();
  const url = `${partnerBase()}/events/${encodeURIComponent(eventId)}/cart`;
  return requestTicketmaster(url, partnerKey(), {
    method: "POST",
    body: JSON.stringify(reservePayload),
  });
}

export async function addTicketmasterPayment(eventId: string, paymentPayload: unknown) {
  assertAllowedEvent(eventId);
  assertCommerceEnabled();
  const url = `${partnerBase()}/events/${encodeURIComponent(eventId)}/cart/payment`;
  return requestTicketmaster(url, partnerKey(), {
    method: "PUT",
    body: JSON.stringify(paymentPayload),
  });
}

export async function commitTicketmasterCart(eventId: string, commitPayload: unknown) {
  assertAllowedEvent(eventId);
  assertCommerceEnabled();
  const url = `${partnerBase()}/events/${encodeURIComponent(eventId)}/cart`;
  return requestTicketmaster(url, partnerKey(), {
    method: "PUT",
    body: JSON.stringify(commitPayload),
  });
}

export function ticketmasterErrorResponse(error: unknown) {
  if (error instanceof TicketmasterBridgeError) {
    return Response.json(
      { error: error.message, details: error.details ?? null },
      { status: error.status },
    );
  }

  console.error("ICONIC Ticketmaster bridge error", error);
  return Response.json({ error: "Ticketing bridge request failed." }, { status: 500 });
}
