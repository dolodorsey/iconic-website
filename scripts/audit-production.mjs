const BASE = (process.env.AUDIT_BASE_URL || "https://iconic-website-ten.vercel.app").replace(/\/$/, "");
const WAIT_MS = Number(process.env.AUDIT_WAIT_MS || 0);
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 10);
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT_MS || 20000);

if (WAIT_MS > 0) {
  console.log(`Waiting ${WAIT_MS}ms for production alias propagation...`);
  await new Promise((resolve) => setTimeout(resolve, WAIT_MS));
}

const failures = [];
const notes = [];
const fetched = new Map();

function canonicalize(input) {
  const u = new URL(input, BASE);
  if (u.origin !== new URL(BASE).origin) return null;
  u.hash = "";
  return u.toString();
}

async function request(url, options = {}, expected = [200], retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { redirect: "follow", ...options, signal: controller.signal });
      clearTimeout(timer);
      const text = await res.text();
      if (!expected.includes(res.status)) {
        lastError = new Error(`${res.status} ${res.statusText}`);
      } else {
        return { res, text };
      }
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
    }
    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
  }
  throw lastError || new Error("request failed");
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
}

function htmlLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = match[1].replace(/&amp;/g, "&");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    const url = canonicalize(href);
    if (url) links.add(url);
  }
  return links;
}

function checkMetadata(url, html) {
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${url} — missing <title>`);
  if (!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i.test(html) && !/<meta[^>]+content=["'][^"']+["'][^>]+name=["']description["']/i.test(html)) {
    failures.push(`${url} — missing meta description`);
  }
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) break;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

console.log(`Auditing ${BASE}`);

const sitemap = await request(`${BASE}/sitemap.xml`);
const sitemapRoutes = sitemapUrls(sitemap.text).map((url) => {
  const parsed = new URL(url);
  return `${BASE}${parsed.pathname}${parsed.search}`;
});
if (!sitemapRoutes.length) failures.push("sitemap.xml returned no URLs");
console.log(`Sitemap URLs: ${sitemapRoutes.length}`);

const discoveredLinks = new Set();
await mapLimit(sitemapRoutes, CONCURRENCY, async (url) => {
  try {
    const { res, text } = await request(url);
    fetched.set(url, { status: res.status, text });
    const type = res.headers.get("content-type") || "";
    if (type.includes("text/html")) {
      checkMetadata(url, text);
      for (const link of htmlLinks(text)) discoveredLinks.add(link);
    }
  } catch (error) {
    failures.push(`${url} — ${error.message}`);
  }
});

const linkTargets = [...discoveredLinks].filter((url) => !fetched.has(url));
console.log(`Internal CTA/link targets discovered outside sitemap: ${linkTargets.length}`);
await mapLimit(linkTargets, CONCURRENCY, async (url) => {
  try {
    const { res } = await request(url, {}, [200, 301, 302, 307, 308]);
    if (res.status >= 400) failures.push(`${url} — internal link returned ${res.status}`);
  } catch (error) {
    failures.push(`${url} — internal link failed: ${error.message}`);
  }
});

const markers = [
  ["/", "THE FULL ICONIC ECOSYSTEM"],
  ["/events", "CURRENT FLAGSHIPS"],
  ["/experiences", "ICONIC EXPERIENCES"],
  ["/social", "ICONIC SOCIAL"],
  ["/creators", "CREATOR SUBMISSION"],
  ["/music", "MUSIC SUBMISSION"],
  ["/media", "MEDIA + ARCHIVE"],
  ["/partners", "PARTNERSHIP"],
  ["/book", "BOOK ICONIC"],
  ["/contact", "CONTACT ICONIC"],
  ["/tampa-halloween", "TAMPA"],
  ["/summer-walker", "SOUL SYMPHONY"],
  ["/dj-snake-pardon-my-french", "PARDON MY FRENCH"],
  ["/merch", "SHOP THE LINEUP"],
];
for (const [path, marker] of markers) {
  try {
    const { text } = await request(`${BASE}${path}`);
    if (!text.toUpperCase().includes(marker)) failures.push(`${path} — expected marker not found: ${marker}`);
  } catch (error) {
    failures.push(`${path} — marker check failed: ${error.message}`);
  }
}

const accessIntents = ["presale", "vip", "travel", "merch", "partners", "sponsorship", "media"];
for (const intent of accessIntents) {
  try {
    const { text } = await request(`${BASE}/access?intent=${intent}`);
    if (!/<form[\s>]/i.test(text)) failures.push(`/access?intent=${intent} — form not rendered`);
  } catch (error) {
    failures.push(`/access?intent=${intent} — ${error.message}`);
  }
}

for (const path of ["/creators", "/music", "/book", "/contact"]) {
  try {
    const { text } = await request(`${BASE}${path}`);
    if (!/<form[\s>]/i.test(text)) failures.push(`${path} — operational form not rendered`);
  } catch (error) {
    failures.push(`${path} — form check failed: ${error.message}`);
  }
}

try {
  await request(`${BASE}/api/iconic-leads`, { method: "POST", headers: { "content-type": "application/json", origin: BASE }, body: "{}" }, [400]);
  await request(`${BASE}/api/iconic-leads`, { method: "POST", headers: { "content-type": "application/json", origin: "https://example.com" }, body: "{}" }, [403]);
  notes.push("Lead endpoint validation + same-origin guard: PASS");
} catch (error) {
  failures.push(`Lead endpoint guard — ${error.message}`);
}

try {
  await request(`${BASE}/api/event-track`, { method: "POST", headers: { "content-type": "application/json", origin: BASE }, body: "{}" }, [400]);
  await request(`${BASE}/api/event-track`, { method: "POST", headers: { "content-type": "application/json", origin: "https://example.com" }, body: "{}" }, [403]);
  notes.push("Analytics endpoint validation + same-origin guard: PASS");
} catch (error) {
  failures.push(`Analytics endpoint guard — ${error.message}`);
}

try {
  await request(`${BASE}/api/shopify/noc/status`, {}, [200]);
  notes.push("Shopify/NOC status endpoint: PASS");
} catch (error) {
  failures.push(`Shopify/NOC status — ${error.message}`);
}

try {
  const { res } = await request(`${BASE}/api/media/drive/1EYSPTnhLTDDuVjQAK4PjojbHogWrjDcw`, {}, [200]);
  if (!(res.headers.get("content-type") || "").startsWith("image/")) failures.push("Drive media proxy did not return an image content-type");
  else notes.push("Drive media proxy: PASS");
} catch (error) {
  failures.push(`Drive media proxy — ${error.message}`);
}

console.log("\nAUDIT SUMMARY");
console.log(`Sitemap routes checked: ${sitemapRoutes.length}`);
console.log(`Additional internal CTA/link targets checked: ${linkTargets.length}`);
for (const note of notes) console.log(`✓ ${note}`);

if (failures.length) {
  console.error(`\nFAILURES (${failures.length})`);
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log("\n✓ ICONIC production audit passed.");
