const VERIFIED_SITE_URL = "https://iconic-website-ten.vercel.app";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return VERIFIED_SITE_URL;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured?.trim()) {
    const normalized = normalizeSiteUrl(configured);
    if (!/^https?:\/\/(?:www\.)?iconic-atl\.com$/i.test(normalized)) return normalized;
  }
  return VERIFIED_SITE_URL;
}

export const SITE_URL = getSiteUrl();
