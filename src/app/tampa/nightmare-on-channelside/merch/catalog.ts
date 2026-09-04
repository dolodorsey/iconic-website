import { collections as fallbackCollections, getProductSlots } from "./merch-data";

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

export type CatalogProduct = {
  sku: string;
  collection_slug: string;
  title: string;
  product_type: string;
  design_number: number;
  price_cents: number;
  status: string;
  description: string;
  primary_image_url: string | null;
  secondary_image_url: string | null;
  featured: boolean;
  is_active: boolean;
  sizes: string[];
};

const SUPABASE_URL = "https://wfkohcwxxsrhcxhepfql.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zKej0f4ql6VSR9rtHXaU0w_0yhVNAGL";

const fallbackProducts: CatalogProduct[] = fallbackCollections.flatMap((collection) =>
  getProductSlots(collection).map((product, index) => ({
    sku: product.id,
    collection_slug: collection.slug,
    title: product.title,
    product_type: product.type,
    design_number: index + 1,
    price_cents: 4500,
    status: product.status,
    description: `${collection.name} collectible tee from the ICONIC Nightmare on Channelside Halloween 2027 capsule.`,
    primary_image_url: null,
    secondary_image_url: null,
    featured: index === 0 && ["nightmare-on-channelside", "21-savage", "halloween-culture", "tampa"].includes(collection.slug),
    is_active: true,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  }))
);

const fallbackCatalogCollections: CatalogCollection[] = fallbackCollections.map((collection, index) => ({
  ...collection,
  sort_order: index + 1,
  is_active: true,
}));

async function readTable<T>(path: string): Promise<T[]> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
  return response.json() as Promise<T[]>;
}

export async function getMerchCatalog() {
  try {
    const [collections, products] = await Promise.all([
      readTable<CatalogCollection>("iconic_noc_collections?select=slug,name,code,subtitle,mood,accent,secondary,sort_order,is_active&is_active=eq.true&order=sort_order.asc"),
      readTable<CatalogProduct>("iconic_noc_products?select=sku,collection_slug,title,product_type,design_number,price_cents,status,description,primary_image_url,secondary_image_url,featured,is_active,sizes&is_active=eq.true&order=design_number.asc"),
    ]);

    if (collections.length === 14 && products.length >= 140) return { collections, products, source: "supabase" as const };
  } catch {
    // The storefront keeps a complete local catalog fallback so a catalog API interruption never blanks the store.
  }

  return { collections: fallbackCatalogCollections, products: fallbackProducts, source: "fallback" as const };
}

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}
