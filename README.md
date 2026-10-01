# Kuchuru Sai Krishna Reddy — Portfolio

Personal portfolio of **Kuchuru Sai Krishna Reddy**, B.Tech CSE (Data Science) at NMIMS Hyderabad —
full-stack and machine-learning developer with systems running in production.

A single-page site built with Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lenis and
React Three Fiber: a WebGL hero, smooth scrolling, scroll-driven animation, and a real contact form.

---

## Features

- **Hero** — cut-out portrait rising out of a glowing disc, floating fact badges, a rotating text
  ring and a 3D pointer tilt; letter-by-letter name reveal after a short `KSK.` intro; magnetic CTAs;
  a WebGL sparkle field with mouse parallax (desktop only, loaded after the intro).
- **Smooth scroll** (Lenis) with a progress bar, section headings that fill with the brand gradient
  as you scroll, and staggered reveals.
- **Skills** — bento grid with brand logos (simple-icons) and a pointer spotlight.
- **Projects** — *Full Stack* / *AI & ML* tabs over a sticky stacked card deck (cards pin and scale
  back as the next one lands), generated SVG covers, status badges, live-demo and GitHub links.
- **Timeline** — Experience, Education, Achievements and Leadership on one rail that draws itself as
  you scroll; each keeps its own anchor for the navigation.
- **Certifications** — coverflow carousel (Embla) with a full-size viewer dialog.
- **Contact** — validated form (react-hook-form + zod) posting to a Resend route handler with a
  honeypot, per-IP rate limiting and toasts; falls back to the visitor's mail app when email isn't set up.
- **Custom cursor**, animated mobile menu, scroll-spy navigation, footer with back-to-top.
- **SEO** — Open Graph / Twitter cards with a generated share image, `sitemap.xml`, `robots.txt`,
  generated favicon and Apple touch icon.

### Accessibility and motion

- `prefers-reduced-motion` turns off the intro, smooth scroll, cursor, parallax, tilt, magnetic
  buttons and 3D motion; content is shown statically.
- One `<h1>`, every section labelled by its heading, `aria-current` on the active nav link, a skip
  link, keyboard-operable tabs, carousel and dialog, and visible focus rings.
- The custom cursor only exists on devices with a real mouse.

---

## Getting started

Requires Node.js 20+ and pnpm.

```bash
pnpm install
cp .env.example .env.local   # optional — only needed for the contact form to send email
pnpm dev                     # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build (type-checked) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `node scripts/generate-project-covers.mjs` | Regenerate the SVG project covers in `public/projects/` |

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | for email | API key from [resend.com](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | for email | Where contact-form messages are delivered |
| `CONTACT_FROM_EMAIL` | no | Sender on a domain verified in Resend. Without it Resend's test sender is used, which only delivers to your own Resend account email. |
| `NEXT_PUBLIC_SITE_URL` | no | Public URL for SEO links. On Vercel it defaults to the production domain. |

Without `RESEND_API_KEY` the form still works: it opens the visitor's email app with the message filled in.

---

## Editing content

All text lives in typed files under [`content/`](content) — components are presentation only.

| File | Contents |
|---|---|
| [`content/profile.ts`](content/profile.ts) | Name, headline, links, résumé URL, contact details, navigation |
| [`content/projects.ts`](content/projects.ts) | Projects, their category (`fullstack` / `aiml`), status, links and highlights |
| [`content/experience.ts`](content/experience.ts) | Experience, education, achievements, leadership |
| [`content/skills.ts`](content/skills.ts) · [`content/skill-icons.ts`](content/skill-icons.ts) | Skill categories and their logos |
| [`content/certifications.ts`](content/certifications.ts) | Certifications, credential links, images in `public/certificates/` |

Adding a project: add an entry to `content/projects.ts`, add its slug and status to the list at the
bottom of `scripts/generate-project-covers.mjs` (with a motif), and run the script. The About-section
counters are computed from these files.

---

## Project structure

```
app/            layout, page, globals.css, /api/contact, OG image, icons, sitemap, robots
components/
  hero/         portrait, tilt card, name reveal, canvas loader
  three/        React Three Fiber scene
  motion/       preloader, cursor, reveals, section headings, scroll progress, magnetic
  projects/     project tabs + sticky deck
  certifications/ coverflow carousel + viewer
  sections/     one component per page section
  providers/    Lenis smooth scroll + Framer Motion config
content/        all site content (typed)
lib/            motion tokens, media-query hooks, contact schema, site URL
scripts/        project cover generator
```

---

## Performance

Measured with Lighthouse 12 against a local production build (`pnpm build && pnpm start`):

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile (simulated slow 4G, 4× CPU) | 79–80 | 100 | 96* | 100 |
| Desktop | 95–98 | 100 | 96* | 100 |

\* The only Best Practices failure locally is the Vercel Analytics script returning 404, which only
exists on Vercel. Cumulative Layout Shift is 0 on both. On mobile the simulated LCP (~4 s) is the
remaining gap to 85+: in the unthrottled trace the hero paints at about 1.0 s, but Lighthouse's
simulation adds the JavaScript that runs before that first frame.

What keeps it fast: hero content is server-rendered and animated with CSS (it paints on the first
frame); three.js loads only after the intro, when the browser is idle, and never on phones,
data-saver or low-core devices; the 3D canvas pauses off-screen and caps its pixel ratio; images are
served as AVIF/WebP through `next/image`.

---

## Deployment

Deployed on [Vercel](https://vercel.com): import the GitHub repository, add the environment
variables above, and every push to `main` redeploys. To use a custom domain, add it under
**Project → Settings → Domains** and point your DNS records at Vercel.
