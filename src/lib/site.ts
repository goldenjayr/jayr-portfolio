/**
 * Public origin, used for canonical URLs, Open Graph and the sitemap.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this once you point a custom domain here.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel, so a fresh deploy is
 *     already correct without any configuration.
 *  3. localhost, for local dev.
 *
 * Server-only: it reads unprefixed env vars, so don't import it into a client
 * component.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (fromVercel ? `https://${fromVercel}` : "http://localhost:3000");
