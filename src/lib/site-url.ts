const VERIFIED_VERCEL_SITE_URL = "https://iconic-website-ten.vercel.app";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return VERIFIED_VERCEL_SITE_URL;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured?.trim()) return normalizeSiteUrl(configured);

  // Do not inherit VERCEL_PROJECT_PRODUCTION_URL here. This project currently
  // has a stale custom-domain alias attached in Vercel that is not the user's
  // verified public site. Keep canonicals on the verified Vercel project URL
  // until NEXT_PUBLIC_SITE_URL is explicitly set to the correct owned domain.
  return VERIFIED_VERCEL_SITE_URL;
}

export const SITE_URL = getSiteUrl();
