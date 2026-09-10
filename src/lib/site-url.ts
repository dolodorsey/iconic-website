const VERIFIED_SITE_URL = "https://iconic-atl.com";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return VERIFIED_SITE_URL;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured?.trim()) return normalizeSiteUrl(configured);
  return VERIFIED_SITE_URL;
}

export const SITE_URL = getSiteUrl();
