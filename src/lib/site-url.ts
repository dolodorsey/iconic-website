const VERIFIED_VERCEL_FALLBACK = "https://iconic-website-ten.vercel.app";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return VERIFIED_VERCEL_FALLBACK;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured?.trim()) return normalizeSiteUrl(configured);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost?.trim()) return normalizeSiteUrl(productionHost);

  return VERIFIED_VERCEL_FALLBACK;
}

export const SITE_URL = getSiteUrl();
