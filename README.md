# Kuchuru Sai Krishna Reddy — Portfolio

Personal portfolio of **Kuchuru Sai Krishna Reddy**, B.Tech CSE (Data Science) at NMIMS Hyderabad —
full-stack and machine-learning developer with systems running in production.

A compact, information-dense single-page portfolio built with Next.js 16, React 19 and Tailwind CSS v4,
with a real contact form. Designed to be scanned quickly by recruiters and engineers.

---

## Features

- **Hero** — name, degree, focus areas, a one-line positioning statement, *View Projects* /
  *Download Resume*, social links and a portrait (fits in about half the viewport).
- **About** — the four About paragraphs beside a highlights panel and counts computed from the content.
- **Skills** — six labelled groups of chips.
- **Projects** — *Full Stack* and *AI / ML* groups, two-column cards with status, period, a clamped
  description (*Show more*), headline result, tech chips, and *Live Demo* / *GitHub* actions.
- **Experience, Education, Achievements, Leadership** — compact rows sharing one title / meta / action
  component; each keeps its own anchor.
- **Certifications** — a two-column credentials list (provider mark, name, provider · date,
  *View Credential*); certificate images open on demand in a native `<dialog>`.
- **Contact** — validated form (react-hook-form + zod) posting to a Resend route handler with a
  honeypot, per-IP rate limiting and toasts; falls back to the visitor's mail app when email isn't set up.
- **Navigation** — sticky 60px header, secondary sections under *More* on desktop, a full list in the
  mobile menu, active-section highlighting.
- **SEO** — Open Graph / Twitter cards with a generated share image, `sitemap.xml`, `robots.txt`,
  generated favicon and Apple touch icon.

### Design system

All tokens live in [`app/globals.css`](app/globals.css): a 5-step type scale (44/30/18/15/13px,
32/24 on mobile), an 8px spacing rhythm (sections 64px / 44px), one 10px radius, dark neutral surfaces
with three text tiers, and a single accent (`#9184f8`) for links, the primary button, the active nav
item and focus rings. Hover transitions are 180ms; sections fade in once (250ms).

### Accessibility and motion

- `prefers-reduced-motion` disables the reveal and smooth scrolling.
- One `<h1>`, an `<h2>` per section, `<h3>` item titles, landmarks, a skip link, `aria-current` on the
  active nav link, keyboard-operable menus and dialog, visible focus rings, 40px touch targets on phones,
  and text contrast of at least 5.5:1.

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
| `node redesign-audit/inventory.mjs` | Print the full content inventory (used to verify no content is lost) |

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
| [`content/profile.ts`](content/profile.ts) | Name, headline, About paragraphs, links, résumé URL, contact details, navigation |
| [`content/projects.ts`](content/projects.ts) | Projects, their category (`fullstack` / `aiml`), status, links and highlights |
| [`content/experience.ts`](content/experience.ts) | Experience, education, achievements, leadership |
| [`content/skills.ts`](content/skills.ts) | Skill groups |
| [`content/certifications.ts`](content/certifications.ts) | Certifications, credential links, images in `public/certificates/` |

Adding a project: add an entry to `content/projects.ts` with its `category`. The About counts are
computed from these files.

---

## Project structure

```
app/            layout, page, globals.css, /api/contact, OG image, icons, sitemap, robots
components/
  sections/     one component per page section
  projects/     project card + clamped description
  certifications/ credentials list + preview dialog
  item-row.tsx  shared title / meta / action row
  section.tsx   section shell (anchor, <h2>, spacing)
content/        all site content (typed)
lib/            motion tokens, media-query hooks, contact schema, site URL
redesign-audit/ before/after audit, content inventory, link lists, acceptance report
```

---

## Performance

Measured with Lighthouse 12 against a local production build (`pnpm build && pnpm start`):

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile (simulated slow 4G, 4× CPU) | 94–95 | 100 | 96* | 100 |
| Desktop | 100 | 100 | 96* | 100 |

* The only Best Practices failure locally is the Vercel Analytics script returning 404, which only
exists on Vercel. Cumulative Layout Shift is 0. No 3D or animation libraries ship to the browser.

---

## Deployment

Deployed on [Vercel](https://vercel.com): import the GitHub repository, add the environment
variables above, and every push to `main` redeploys. To use a custom domain, add it under
**Project → Settings → Domains** and point your DNS records at Vercel.
