import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildShopifyCheckoutUrl, getMerchCatalog } from "../../../../tampa/nightmare-on-channelside/merch/catalog";

const CART_COOKIE = "iconic_noc_shopify_cart";
const MAX_LINES = 30;
const MAX_QUANTITY = 10;

type StoredLine = { variantId: string; quantity: number };

type CartBody = {
  variantId?: string;
  quantity?: number;
};

function readCart(): StoredLine[] {
  const raw = cookies().get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as StoredLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((line) => /^\d+$/.test(String(line.variantId)) && Number.isInteger(line.quantity) && line.quantity > 0)
      .slice(0, MAX_LINES)
      .map((line) => ({ variantId: String(line.variantId), quantity: Math.min(line.quantity, MAX_QUANTITY) }));
  } catch {
    return [];
  }
}

function writeCart(lines: StoredLine[]) {
  cookies().set(CART_COOKIE, encodeURIComponent(JSON.stringify(lines.slice(0, MAX_LINES))), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

async function getVariantIndex() {
  const catalog = await getMerchCatalog();
  const index = new Map<string, {
    productTitle: string;
    productHandle: string;
    collectionSlug: string;
    variantTitle: string;
    image: string | null;
    unitPriceCents: number;
    available: boolean;
  }>();

  catalog.products.forEach((product) => {
    product.variants.forEach((variant) => {
      index.set(variant.id, {
        productTitle: product.title,
        productHandle: product.sku,
        collectionSlug: product.collection_slug,
        variantTitle: variant.title,
        image: product.primary_image_url,
        unitPriceCents: variant.price_cents,
        available: variant.available,
      });
    });
  });

  return { catalog, index };
}

async function cartPayload(lines: StoredLine[]) {
  const { catalog, index } = await getVariantIndex();
  const validLines = lines.filter((line) => index.has(line.variantId));
  const items = validLines.map((line) => {
    const variant = index.get(line.variantId)!;
    return {
      variantId: line.variantId,
      quantity: line.quantity,
      ...variant,
      lineTotalCents: variant.unitPriceCents * line.quantity,
    };
  });
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const checkoutUrl = buildShopifyCheckoutUrl(validLines.map((line) => ({ variantId: line.variantId, quantity: line.quantity })));

  return {
    source: catalog.source,
    items,
    totalQuantity,
    subtotalCents,
    checkoutUrl,
  };
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  const lines = readCart();
  const payload = await cartPayload(lines);
  if (payload.items.length !== lines.length) writeCart(payload.items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })));
  return json(payload);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CartBody;
  const variantId = String(body.variantId || "");
  const quantity = Math.max(1, Math.min(Number(body.quantity) || 1, MAX_QUANTITY));
  const { index } = await getVariantIndex();
  const variant = index.get(variantId);
  if (!variant || !variant.available) return json({ error: "This NOC variant is not available." }, 400);

  const lines = readCart();
  const existing = lines.find((line) => line.variantId === variantId);
  if (existing) existing.quantity = Math.min(existing.quantity + quantity, MAX_QUANTITY);
  else if (lines.length < MAX_LINES) lines.push({ variantId, quantity });
  writeCart(lines);
  return json(await cartPayload(lines));
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CartBody;
  const variantId = String(body.variantId || "");
  const quantity = Math.max(0, Math.min(Number(body.quantity) || 0, MAX_QUANTITY));
  const { index } = await getVariantIndex();
  if (!index.has(variantId)) return json({ error: "This variant is outside the NOC catalog." }, 400);

  let lines = readCart();
  if (quantity === 0) lines = lines.filter((line) => line.variantId !== variantId);
  else lines = lines.map((line) => line.variantId === variantId ? { ...line, quantity } : line);
  writeCart(lines);
  return json(await cartPayload(lines));
}

export async function DELETE(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CartBody;
  const variantId = String(body.variantId || "");
  const lines = readCart().filter((line) => line.variantId !== variantId);
  writeCart(lines);
  return json(await cartPayload(lines));
}
