const SHOP_URL =
  process.env.ICONIC_MERCH_AUDIT_URL ||
  "https://iconic-website-ten.vercel.app/tampa/nightmare-on-channelside/merch/shop";

const expected = {
  "21-savage": [/^21 SAVAGE\b/i],
  "kodak-black": [/^KODAK BLACK\b/i],
  "da-baby": [/^DA ?BABY\b/i],
  "meek-mill": [/^MEEK MILL\b/i],
  "belly-gang-kush": [/^BELLY ?GANG KUSH\b/i, /^BELLYGANG KUSH\b/i],
  tampa: [/^TAMPA\b/i],
  "nightmare-on-channelside": [/^NOC\b/i],
  "all-artists": [/^ALL ARTIST\b/i],
};

const response = await fetch(SHOP_URL, {
  headers: { "user-agent": "ICONIC-merch-taxonomy-audit/1.0" },
  cache: "no-store",
});
if (!response.ok) {
  console.error(`Merch audit failed to load ${SHOP_URL}: ${response.status}`);
  process.exit(2);
}

const html = await response.text();
const productPattern =
  /\\?"shopify_product_id\\?":\\?"([^"\\]+)\\?"[\s\S]{0,260}?\\?"collection_slug\\?":\\?"([^"\\]+)\\?"[\s\S]{0,260}?\\?"title\\?":\\?"([^"\\]+)\\?"/g;

const products = [];
const seen = new Set();
let match;
while ((match = productPattern.exec(html))) {
  const row = { id: match[1], collection: match[2], title: match[3] };
  if (!seen.has(row.id)) {
    seen.add(row.id);
    products.push(row);
  }
}

if (!products.length) {
  console.error("Merch audit found no serialized live products.");
  process.exit(2);
}

const mismatches = products.filter((product) => {
  const patterns = expected[product.collection];
  return patterns && !patterns.some((pattern) => pattern.test(product.title));
});

const counts = products.reduce((acc, product) => {
  acc[product.collection] = (acc[product.collection] || 0) + 1;
  return acc;
}, {});

console.log(JSON.stringify({ shop: SHOP_URL, total: products.length, counts, mismatches }, null, 2));

if (mismatches.length) {
  console.error(
    `Merch taxonomy QA failed: ${mismatches.length} product grouping mismatch(es). Keep collection browsing disabled.`,
  );
  process.exit(1);
}

console.log("Merch taxonomy structural QA passed. Visual subject QA is still required before enabling collections.");
