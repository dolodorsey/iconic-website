import { NextResponse } from "next/server";
import { getMerchCatalog } from "../../../../tampa/nightmare-on-channelside/merch/catalog";

export async function GET() {
  const catalog = await getMerchCatalog();
  const validIsolation = catalog.products.every((product) =>
    product.tags.includes("noc-2026") &&
    product.tags.includes("brand:noc") &&
    product.tags.includes("event:noc-2026")
  );
  const availableVariants = catalog.products.reduce(
    (count, product) => count + product.variants.filter((variant) => variant.available).length,
    0
  );

  return NextResponse.json({
    ok: catalog.source === "shopify" && catalog.products.length > 0 && validIsolation,
    source: catalog.source,
    collectionHandle: "nightmare-on-channelside",
    productCount: catalog.products.length,
    collectionCount: catalog.collections.length,
    availableVariants,
    validIsolation,
    checkoutMode: "shopify-cart-permalink",
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
