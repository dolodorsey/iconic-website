const CANONICAL_SITE_URL = "https://iconic-website-ten.vercel.app";
const RETIRED_SITE_URLS = new Set([
  "https://iconic-atl.com",
  "https://www.iconic-atl.com",
]);

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return CANONICAL_SITE_URL;
  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  if (RETIRED_SITE_URLS.has(normalized.toLowerCase())) return CANONICAL_SITE_URL;
  return normalized;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured?.trim()) return normalizeSiteUrl(configured);
  return CANONICAL_SITE_URL;
}

export const SITE_URL = getSiteUrl();
