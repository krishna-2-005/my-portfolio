# Acceptance criteria — redesign

Measured on the production build in headless Chrome (same method as Phase 0, `measure.js` /
`responsive-check.js`). Lighthouse 12, local production build.

## Typography & hierarchy

| Criterion | Result | Evidence |
|---|---|---|
| Exactly one `<h1>`; section headings are `<h2>`, ≤32px desktop, ≤26px mobile | **PASS** | 1 `<h1>`; 9 `<h2>` at **30px** (1440) / **24.2px** (375) |
| Only the 5 defined text sizes are used site-wide | **PASS** | Sizes rendered at 1440: 44 / 30 / 18 / 15 / 13 px; at 375: 32 / 24.2 / 18 / 15 / 13 px |
| Hero ≤70% of viewport at 1440×900 and ≤85% at 375×812 | **PASS** | **51%** (462px) and **67%** (542px) |

## Density & spacing

| Criterion | Result | Evidence |
|---|---|---|
| Desktop page height reduced ≥35% | **PASS** | 16,230 → **7,218px (−55.5%)**. Mobile: 19,959 → 14,019px (−29.8%) |
| Certifications section height reduced ≥50% | **FAIL** | 1440: 1,072 → **717px (−33%)**. 375: 916 → 1,736px (**+90%**). See note 1 |
| No section padding over 72px desktop / 48px mobile | **PASS** | Max 64px desktop, 44px mobile |
| No card uses min-height; no card >~30% empty | **PASS** | `min-height: 0` everywhere; project cards size to content (12–17% = padding and gaps only) |
| Skills section fits one 1440×900 viewport | **PASS** | 505px |
| Heading → content gap ≤32px | **PASS** | 32px desktop, 24px mobile |

## Content integrity

| Criterion | Result | Evidence |
|---|---|---|
| inventory-after matches inventory-before (identical counts) | **PASS** | 12 projects · 1 experience · 3 education · 3 achievements · 6 leadership · 13 certifications · 6 skill groups / 40 skills · 4 About paragraphs (text identical). Only difference: three profile fields added for the hero (`degree`, `focus`, `status`), each composed from existing text — see note 2 |
| links-after contains every URL from links-before | **PASS** | 35 → 34; the one removed entry is `mailto:${profile.email}`, a template string used only by the old oversized footer email CTA. The same mailto link remains in the contact list, hero icons and footer |
| Resume, GitHub, live demo and credential URLs open correctly | **PASS** | 28/29 external URLs return HTTP 200; LinkedIn returns 999 (its standard response to non-browser requests — opens normally in a browser). No URL was changed |
| No text added that asserts a new fact | **PASS** | New copy is UI labels only ("Show more", "Preview", "View Credential", "Download Resume", "Degree / Institution / Focus / Status", group counts). Footer now says "Built with Next.js" (three.js was removed, so "+ Three.js" would no longer be true) |

## Certifications

| Criterion | Result | Evidence |
|---|---|---|
| Compact list with name, provider, date and "View Credential" per entry | **PASS** | 13 rows: monogram · name · provider · date · View Credential ↗ (+ Preview where an image exists) |
| No certificate image visible on the main page without interaction | **PASS** | 0 `<img>` in the section; the image mounts only inside the `<dialog>` while open (verified: 0 → 1 → 0) |
| Every certificate present, credential URL unchanged | **PASS** | 13/13, URLs identical (links diff) |

## Design system

| Criterion | Result | Evidence |
|---|---|---|
| One accent, one border radius, two button styles | **PASS** | Accent `#9184f8`; radius 10px on every card/button/chip/input (the only other value is `9999px` on three 8px status dots); `btn-primary` / `btn-secondary`, both 40px |
| No glow, heavy shadow, looping or floating animation | **PASS** | 0 box-shadows, 0 infinite animations; three.js, preloader, cursor, floating badges, spinning rings and mesh background removed |
| All transitions ≤300ms; reduced motion respected | **PASS** | Hover 180ms, reveal 250ms (+≤250ms stagger cap); none >300ms found. Reduced motion disables reveal and smooth scrolling |

## Responsive

| Criterion | Result | Evidence |
|---|---|---|
| No horizontal scroll at 1440, 1280, 1024, 768, 375 | **PASS** | `scrollWidth − clientWidth = 0` and no element past the viewport edge at all five widths |
| Mobile nav lists every section; anchors scroll correctly | **PASS** | Menu lists all 10 sections; every desktop anchor lands at 68px (header + 8px); mobile menu jump lands at 68px |
| No overlapping or clipped elements | **PASS** | Visual check of screenshots at 1440, 1024, 768, 375 |
| Touch targets ≥40px on mobile | **PASS** | 0 interactive elements under 40px at 375 |

## Engineering

| Criterion | Result | Evidence |
|---|---|---|
| Lint and production build pass, no new warnings | **PASS** | `pnpm lint` clean, `pnpm build` clean (type-checked) |
| No new dependencies | **PASS** | 0 added; 8 removed (three, @react-three/fiber, @react-three/drei, @types/three, framer-motion, lenis, embla-carousel-react, simple-icons) |
| Landmarks; external links `noopener noreferrer`; contrast ≥4.5:1 | **PASS** | header/nav/main/footer; 37/37 external links; lowest text contrast 5.5:1; Lighthouse accessibility 100 |
| Final summary with before/after measurements and content diff | **PASS** | `audit.md` (after section) and the session summary |

## Notes

1. **Certifications −50%.** The old section was a carousel showing one readable card at a time, so its
   height did not grow with the number of certificates. All 13 are now listed with full names at the
   18px item-title size. The spec's own layout (2 columns, 56–72px rows) is ≈7 rows × 64px + heading
   and section padding ≈ 630px — already above the 536px target — and long names such as "Scaler –
   Python Course for Beginners (Certificate of Excellence)" need two lines. On phones, 13 rows with
   40px tap targets are inevitably taller than one swipeable card. Reaching −50% would require
   truncating names or hiding entries, which the content rules forbid.
2. **Profile fields added for the hero**: `degree` = "B.Tech CSE (Data Science) · NMIMS Hyderabad"
   (headline + About ¶1), `focus` = Full-Stack Development · Machine Learning · Data Analytics (About
   ¶3), `status` = "Seeking internship opportunities" (About ¶4).
