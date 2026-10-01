# Redesign audit — Phase 0 (before)

Measured on the production build (`pnpm build && pnpm start`) in headless Chrome at **1440×900** and
**375×812**. Playwright/Puppeteer are not installed and were not added: measurements come from the live
DOM through Chrome's DevTools protocol (`redesign-audit/measure.js`, evaluated in the page).
Screenshots: `redesign-audit/before/`.

## Stack

| Concern | Current |
|---|---|
| Framework | Next.js 16.0.10 (App Router, Turbopack), React 19.2 |
| Styling | Tailwind CSS v4 (`@theme` tokens + `@utility` in `app/globals.css`) |
| Animation | framer-motion 13 (reveals, nav pill, tabs, menu), CSS keyframes (hero, floats), Lenis smooth scroll |
| 3D | three + @react-three/fiber + @react-three/drei (hero sparkle field) |
| Carousel | embla-carousel-react (certifications coverflow) |
| Icons | simple-icons (skill logos), inline SVG elsewhere |
| Forms | react-hook-form + zod, Resend route handler, sonner toasts |
| Fonts | Geist, Geist Mono, Bricolage Grotesque (headings) via `next/font` |
| Deploy | Vercel (Analytics), static page + `/api/contact` |

## Content sources

All content is typed data in `content/` (`profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`,
`skill-icons.ts`, `certifications.ts`), except the four About paragraphs, which are hard-coded in
`components/sections/about.tsx`. Inventory: `inventory-before.md`; links: `links-before.txt`.

## Measurements

### Page

| | 1440×900 | 375×812 |
|---|---|---|
| Page height | **16,230 px** (18.0 viewports) | **19,959 px** (24.6 viewports) |
| Hero height | 900 px (**100%** of viewport) | 1,244 px (**153%**) |
| Horizontal overflow | 0 | 0 |
| `<h1>` / `<h2>` count | 1 / 9 | 1 / 9 |

### Typography (computed)

| Role | 1440 | 375 |
|---|---|---|
| Hero name (h1) | **100px** / 600 | 44.3px / 600 |
| Section heading (h2) | **63px** / 600 | 36px / 600 |
| Card title (h3) | 26px / 600 | 20px / 600 |
| About body | 21.8px / 400, lh 33.9 | 18.1px |
| Hero headline | 21.8px / 300 | — |
| Project description | 16px, lh 26 | — |
| Metadata (dates, periods) | 12px mono | 12px |
| Chips | 12–14px | — |
| Buttons | 16px / 600, 56px tall | — |

**Distinct text sizes in use at 1440px: 18** (100, 64, 63, 48, 38.4, 30, 26, 24, 21.8, 18, 16, 14, 13, 12, 11, 10, 8.6, 8 px).

### Section vertical padding and height (1440×900)

| Section | Height | Padding top / bottom |
|---|---|---|
| home (hero) | 900 | 112 / 80 (`min-h-svh`) |
| about | 1,089 | 128 / 128 |
| skills | 1,331 | 128 / 128 |
| projects | **6,795** | 128 / 128 (sticky deck: one viewport per card) |
| experience / education / achievements / leadership | 570 / 785 / 607 / 1,062 | wrapper 128 / 128 + 96–128 gaps between groups (whole timeline 3,665) |
| certifications | **1,072** | 128 / 128 |
| contact | 928 | 128 / 128 |

375×812: about 1,580 · skills 2,376 · projects 6,411 · experience 1,140 · education 1,064 · certifications **916** (padding 96/96).

Gap between section heading and its content: **64 px** (`mb-16` plus the heading underline).

### Cards

| Card | Padding | Radius | min-height | Shadow/glow | Height |
|---|---|---|---|---|---|
| Skills group | 28 | 26 | — | spotlight glow on hover | 279 |
| Project | 0 (inner 40) | 24 | **480px** | heavy drop shadow + spinning `glow-ring` on featured | 631 |
| Timeline entry | 24 | 26 | — | shine sweep | 207 |
| Certification slide | 0 | 26 | — | coloured shadow on active | 463 |

Border radii in use: **7 different values** (5, 11, 14, 20, 24, 26, 9999 px).

### Motion

Preloader 1.2 s; hero letter-by-letter entrance 0.9–1.1 s + up to 1.2 s delay; framer reveal 0.9 s with
28 px travel; floating badges (6 s loop), spinning text ring (24 s loop), drifting mesh blobs (26–38 s
loop), spinning conic glow ring (5 s loop), animated gradient text, three.js sparkles (continuous),
custom cursor springs, magnetic buttons, 3D tilt, Lenis smooth scroll (1.2 s anchor glides).

### Certifications

Pattern: **Embla coverflow carousel**, 13 slides, each a 463 px card led by a 4:3 certificate image
(**10 `<img>` rendered on the main page**); only one card is fully readable at a time.
Section height **1,072 px** at 1440 and **916 px** at 375.

## Most impactful problems

1. **Oversized type scale** — `app/globals.css:97` `--text-display` up to 6.25rem (100 px hero name);
   `:100` `--text-h2` up to 4rem (63 px section headings); 18 distinct sizes in use.
2. **Excessive section padding** — `app/globals.css:460` `section-y` = `clamp(6rem, …, 8rem)` → 128 px
   top and bottom on every section.
3. **Full-viewport hero** — `components/sections/hero.tsx:16` `min-h-svh … pt-28 pb-20` → 100% of the
   viewport on desktop, 153% on mobile.
4. **Projects sticky deck** — `components/projects/project-deck.tsx:42` `deck:h-svh` gives each card a
   full viewport of scroll (section = 6,795 px, 42% of the page); `:47` `md:min-h-[30rem]`, heavy shadow;
   `:45` spinning `glow-ring`. AI/ML projects hidden behind a tab.
5. **Certifications carousel** — `components/certifications/cert-carousel.tsx:168` slides at 34–78%
   width, `:92`/`:181` 4:3 image or gradient panel per slide, `:28` 3D coverflow; 10 images on the
   page, one readable card at a time.
6. **Heading-to-content gap of 64 px** — `components/motion/section-heading.tsx:20` `mb-12 md:mb-16`
   plus an animated outline/gradient heading (`:27–37`).
7. **Hero decoration** — `components/hero/portrait.tsx:59` glow ring, `:14` spinning text ring,
   `:79/91/101` looping floating badges, glass blur; `components/three/hero-scene.tsx` continuous
   three.js sparkles; `components/motion/background.tsx:5` drifting mesh blobs.
8. **Timeline spacing** — `components/sections/journey.tsx:178` `space-y-24 md:space-y-32` between
   groups, `:133` 24 px-padded rounded cards for one-line entries (leadership = 1,062 px for 6 rows).
9. **Skills cards** — `components/sections/skills.tsx` bento cards with 28 px padding, 26 px radius,
   per-skill bordered tiles with logos: 1,331 px desktop, 2,376 px mobile.
10. **Multi-colour gradients and two accents** — purple + cyan gradient text in headings, hero name,
    stat numbers (`components/sections/about.tsx:53`), OG image and icon.
11. **Long, looping and slow motion** — `components/motion/preloader.tsx:9–10` 1.2 s intro,
    `lib/motion.ts:13` 0.9 s reveals, plus the loops listed above.
12. **Footer as a giant CTA** — `components/footer.tsx:18` email at up to 48 px.

---

# After the redesign (Phase 5)

Same build/measurement method. Screenshots: `redesign-audit/after/`.

| | Before | After | Change |
|---|---|---|---|
| Page height 1440×900 | 16,230 px | **7,218 px** | **−55.5%** |
| Page height 375×812 | 19,959 px | **14,019 px** | −29.8% |
| Hero (share of viewport) 1440 / 375 | 100% / 153% | **51% / 67%** | |
| Hero name (h1) | 100px | **44px** (32px mobile) | |
| Section heading (h2) | 63px | **30px** (24px mobile) | |
| Distinct text sizes | 18 | **5** | |
| Section padding | 128 / 96 px | **64 / 44 px** (short sections 56 / 40) | |
| Heading → content gap | 64 px | **32 px** (24 mobile) | |
| Border radii in use | 7 | **1** (10px) + dot markers | |
| Certifications 1440 / 375 | 1,072 / 916 px | **717 / 1,736 px** | −33% / +90% |
| Certificate images on page | 10 | **0** (in a dialog on demand) | |
| Projects section 1440 | 6,795 px | **2,632 px** | −61% |
| Lighthouse mobile perf / a11y | 79–80 / 100 | **94–95 / 100** | |
| Lighthouse desktop perf / a11y | 95–98 / 100 | **100 / 100** | |
| Runtime dependencies | 18 | **11** (7 runtime + 1 dev removed, 0 added) | |

Per section at 1440 (height, padding): home 462 (56/56) · about 609 (64/64) · skills 505 (64/64) ·
projects 2,632 (64/64) · experience 436 (64/64) · education & achievements side by side 377 (shared
56/56) · leadership 584 (64/64) · certifications 717 (56/56) · contact 636 (56/56).
