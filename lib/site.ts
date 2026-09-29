/** Canonical site URL: explicit env var, else Vercel's production domain, else local dev. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

export const siteTitle = 'Kuchuru Sai Krishna Reddy | Full-Stack & ML Developer'
export const siteDescription =
  'Full-Stack Developer and Machine Learning Enthusiast. Building real-world, data-driven systems deployed in production.'
