/**
 * Public origin, used for canonical URLs, Open Graph and the sitemap.
 * Vercel sets NEXT_PUBLIC_SITE_URL for you if you add it; otherwise change the
 * fallback to your real domain before deploying.
 */
export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://goldenjayr.dev";
