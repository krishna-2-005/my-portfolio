// Runs inside the page (evaluated over the Chrome DevTools protocol by the audit script).
// Returns layout and typography measurements as JSON. Read-only: changes nothing.
;(() => {
  const px = (v) => Math.round(parseFloat(v) * 10) / 10
  const cs = (el) => (el ? getComputedStyle(el) : null)
  const font = (el) => (el ? `${px(cs(el).fontSize)}px/${cs(el).fontWeight}` : null)
  const first = (sel) => document.querySelector(sel)
  const vh = innerHeight
  const page = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

  const sections = [...document.querySelectorAll('main section[id], main > section, main > div > div > div > section[id]')]
    .filter((s, i, arr) => arr.indexOf(s) === i)
    .map((s) => {
      const r = s.getBoundingClientRect()
      const st = cs(s)
      return { id: s.id || '(unnamed)', height: Math.round(r.height), padTop: px(st.paddingTop), padBottom: px(st.paddingBottom) }
    })

  const hero = first('#home')
  const h2s = [...document.querySelectorAll('h2')]
  const h2Gap = h2s.slice(0, 3).map((h) => {
    const head = h.closest('header') || h
    const next = head.nextElementSibling
    return next ? Math.round(next.getBoundingClientRect().top - head.getBoundingClientRect().bottom + px(cs(head).marginBottom) * 0) : null
  })

  const sizes = new Map()
  for (const el of document.querySelectorAll('main *, header *, footer *')) {
    if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue
    const st = cs(el)
    if (st.display === 'none' || st.visibility === 'hidden') continue
    const k = `${px(st.fontSize)}px`
    sizes.set(k, (sizes.get(k) || 0) + 1)
  }

  const card = (sel) => {
    const el = first(sel)
    if (!el) return null
    const st = cs(el)
    return {
      padding: `${px(st.paddingTop)} ${px(st.paddingRight)}`,
      radius: px(st.borderTopLeftRadius),
      minHeight: st.minHeight,
      shadow: st.boxShadow !== 'none',
      height: Math.round(el.getBoundingClientRect().height),
    }
  }

  const radii = new Map()
  for (const el of document.querySelectorAll('main *')) {
    const r = px(cs(el).borderTopLeftRadius)
    if (r > 0) radii.set(r, (radii.get(r) || 0) + 1)
  }

  return {
    viewport: `${innerWidth}x${vh}`,
    pageHeight: page,
    pageHeightInViewports: Math.round((page / vh) * 10) / 10,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    hero: hero ? { height: Math.round(hero.getBoundingClientRect().height), pctOfViewport: Math.round((hero.getBoundingClientRect().height / vh) * 100) } : null,
    fonts: {
      h1: font(first('h1')),
      h2: font(first('main h2')),
      h3: font(first('main h3')),
      body: font(first('#about p')),
      meta: font(first('#education li p, #education p.font-mono, #projects .tabular-nums')),
      chip: font(first('#skills li span, #projects ul li')),
    },
    textSizesInUse: Object.fromEntries([...sizes.entries()].sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))),
    headingToContentGap: h2Gap,
    sections,
    cards: {
      skills: card('#skills [class*="rounded-2xl"]'),
      project: card('#projects article'),
      timeline: card('#education [class*="rounded-2xl"]'),
      certification: card('#certifications article'),
    },
    borderRadiiInUse: Object.fromEntries([...radii.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)),
    h1Count: document.querySelectorAll('h1').length,
    h2Count: h2s.length,
    certImagesOnPage: document.querySelectorAll('#certifications img').length,
    externalLinksMissingRel: [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !/noopener/.test(a.rel)).length,
  }
})()
