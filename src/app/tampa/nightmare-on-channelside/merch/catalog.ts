import { collections as collectionWorlds } from "./merch-data";

export type CatalogCollection = {
  slug: string;
  name: string;
  code: string;
  subtitle: string;
  mood: string;
  accent: string;
  secondary: string;
  sort_order: number;
  is_active: boolean;
};

export type CatalogOption = {
  name: string;
  values: string[];
};

export type CatalogVariant = {
  id: string;
  title: string;
  price_cents: number;
  available: boolean;
  selected_options: Record<string, string>;
};

export type CatalogProduct = {
  sku: string;
  shopify_product_id: string;
  collection_slug: string;
  title: string;
  product_type: string;
  design_number: number;
  price_cents: number;
  status: string;
  description: string;
  primary_image_url: string | null;
  secondary_image_url: string | null;
  images: string[];
  featured: boolean;
  is_active: boolean;
  sizes: string[];
  tags: string[];
  options: CatalogOption[];
  variants: CatalogVariant[];
};

const SHOPIFY_STORE_DOMAIN = "1tnkwp-vn.myshopify.com";
const SHOPIFY_NOC_COLLECTION = "nightmare-on-channelside";
const SHOPIFY_NOC_TAG = "noc-2026";
const SHOPIFY_BRAND_TAG = "brand:noc";
const SHOPIFY_EVENT_TAG = "event:noc-2026";

export const SHOPIFY_NOC_CART_BASE = `https://${SHOPIFY_STORE_DOMAIN}/cart`;

const subjectToCollection: Record<string, string> = {
  "21-savage": "21-savage",
  "kodak-black": "kodak-black",
  dababy: "da-baby",
  "meek-mill": "meek-mill",
  "bellygang-kush": "belly-gang-kush",
  "yk-niece": "yk-niece",
  "baby-drill": "baby-drill",
  "diamond-the-body": "diamond-the-body",
  "all-artist": "all-artists",
  "cheeksbossman-gemg": "cheeksbossman-gemg",
  tampa: "tampa",
  noc: "nightmare-on-channelside",
  "halloween-culture": "halloween-culture",
  "halloween-2027": "halloween-2027",
};

type ShopifyPublicVariant = {
  id: number | string;
  title: string;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
  price: string;
  available?: boolean;
};

type ShopifyPublicOption = {
  name: string;
  position: number;
  values: string[];
};

type ShopifyPublicImage = {
  src: string;
};

type ShopifyPublicProduct = {
  id: number | string;
  title: string;
  handle: string;
  body_html?: string;
  product_type?: string;
  tags?: string[] | string;
  variants?: ShopifyPublicVariant[];
  options?: ShopifyPublicOption[];
  images?: ShopifyPublicImage[];
};

function normalizeTags(tags: ShopifyPublicProduct["tags"]): string[] {
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  if (typeof tags === "string") return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  return [];
}

function stripHtml(value = "") {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function priceToCents(value: string | number | undefined) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
}

function getSubject(tags: string[]) {
  const tag = tags.find((item) => item.startsWith("subject:"));
  return tag ? tag.slice("subject:".length) : "noc";
}

function getCollectionSlug(tags: string[]) {
  return subjectToCollection[getSubject(tags)] || "nightmare-on-channelside";
}

function selectedOptions(variant: ShopifyPublicVariant, options: ShopifyPublicOption[]) {
  const values = [variant.option1, variant.option2, variant.option3];
  return options.reduce<Record<string, string>>((result, option, index) => {
    const value = values[index];
    if (value) result[option.name] = value;
    return result;
  }, {});
}

async function readShopifyNocProducts(): Promise<ShopifyPublicProduct[]> {
  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/collections/${SHOPIFY_NOC_COLLECTION}/products.json?limit=250`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) throw new Error(`Shopify NOC catalog request failed: ${response.status}`);
  const payload = (await response.json()) as { products?: ShopifyPublicProduct[] };
  return payload.products || [];
}

function normalizeProducts(products: ShopifyPublicProduct[]): CatalogProduct[] {
  const collectionCounts: Record<string, number> = {};
  const normalized: CatalogProduct[] = [];

  products.forEach((product) => {
    const tags = normalizeTags(product.tags);
    if (!tags.includes(SHOPIFY_NOC_TAG) || !tags.includes(SHOPIFY_BRAND_TAG) || !tags.includes(SHOPIFY_EVENT_TAG)) return;

    const options = (product.options || []).map((option) => ({ name: option.name, values: option.values || [] }));
    const rawOptions = product.options || [];
    const variants = (product.variants || []).map<CatalogVariant>((variant) => ({
      id: String(variant.id),
      title: variant.title,
      price_cents: priceToCents(variant.price),
      available: variant.available !== false,
      selected_options: selectedOptions(variant, rawOptions),
    }));
    if (!variants.length) return;

    const collection_slug = getCollectionSlug(tags);
    collectionCounts[collection_slug] = (collectionCounts[collection_slug] || 0) + 1;
    const design_number = collectionCounts[collection_slug];
    const images = (product.images || []).map((image) => image.src).filter(Boolean);
    const price_cents = Math.min.apply(null, variants.map((variant) => variant.price_cents));
    const sizeOption = options.find((option) => /size/i.test(option.name));

    normalized.push({
      sku: product.handle,
      shopify_product_id: String(product.id),
      collection_slug,
      title: product.title,
      product_type: product.product_type || "Merch",
      design_number,
      price_cents,
      status: "LIVE",
      description: stripHtml(product.body_html),
      primary_image_url: images[0] || null,
      secondary_image_url: images[1] || null,
      images,
      featured: false,
      is_active: true,
      sizes: sizeOption ? sizeOption.values : [],
      tags,
      options,
      variants,
    });
  });

  return normalized.map((product, index) => ({ ...product, featured: index < 8 }));
}

export async function getMerchCatalog() {
  try {
    const products = normalizeProducts(await readShopifyNocProducts());
    const activeSlugs = products.reduce<Record<string, true>>((result, product) => {
      result[product.collection_slug] = true;
      return result;
    }, {});
    const collections: CatalogCollection[] = collectionWorlds
      .map((collection, index) => ({ ...collection, sort_order: index + 1, is_active: Boolean(activeSlugs[collection.slug]) }))
      .filter((collection) => collection.is_active);

    return { collections, products, source: "shopify" as const };
  } catch {
    // Never fall back to fabricated prices or products. If Shopify is unavailable,
    // the storefront fails closed rather than selling stale/fake inventory.
    return { collections: [] as CatalogCollection[], products: [] as CatalogProduct[], source: "unavailable" as const };
  }
}

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}

export function buildShopifyCheckoutUrl(lines: Array<{ variantId: string; quantity: number }>) {
  const clean = lines
    .filter((line) => /^\d+$/.test(line.variantId) && Number.isInteger(line.quantity) && line.quantity > 0)
    .map((line) => `${line.variantId}:${line.quantity}`);
  return clean.length ? `${SHOPIFY_NOC_CART_BASE}/${clean.join(",")}` : null;
}
