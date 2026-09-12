const CANONICAL_SITE_URL = "https://iconic-atl.com";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return CANONICAL_SITE_URL;
  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return normalized.replace(/^https:\/\/www\.iconic-atl\.com$/i, CANONICAL_SITE_URL);
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured?.trim()) {
    const normalized = normalizeSiteUrl(configured);
    if (/^https:\/\/(?:www\.)?iconic-atl\.com$/i.test(normalized)) return CANONICAL_SITE_URL;
  }
  return CANONICAL_SITE_URL;
}

export const SITE_URL = getSiteUrl();
