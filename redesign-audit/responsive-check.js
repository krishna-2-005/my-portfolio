// Evaluated in the page by the audit script. Read-only responsive / accessibility checks.
;(() => {
  const W = innerWidth
  const vis = (el) => {
    const r = el.getBoundingClientRect()
    const s = getComputedStyle(el)
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'
  }
  // Elements whose box extends past the viewport (ignoring the sr-only/off-screen honeypot).
  const overflowing = [...document.querySelectorAll('body *')]
    .filter((el) => vis(el) && !el.closest('.sr-only,[aria-hidden="true"].absolute'))
    .filter((el) => {
      const r = el.getBoundingClientRect()
      return r.right > W + 1 || r.left < -1
    })
    .filter((el) => !el.closest('[class*="-left-[9999px]"]'))
    .slice(0, 5)
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`)

  // Interactive elements under 40px tall/wide (touch targets) — only meaningful on phones.
  const small = [...document.querySelectorAll('a[href], button, input, textarea, select')]
    .filter((el) => vis(el) && !el.closest('.sr-only') && !el.closest('[class*="-left-[9999px]"]'))
    .filter((el) => {
      const r = el.getBoundingClientRect()
      return r.height < 39.5
    })
    .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 28)}" ${Math.round(el.getBoundingClientRect().height)}px`)

  const navDesktop = document.querySelector('nav[aria-label="Primary"] .lg\\:flex')
  const menuBtn = document.querySelector('button[aria-controls="mobile-menu"]')
  const buttons = [...document.querySelectorAll('.btn')].filter(vis).map((b) => Math.round(b.getBoundingClientRect().height))
  return {
    width: W,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    overflowingElements: overflowing,
    desktopNavVisible: navDesktop ? vis(navDesktop) : null,
    mobileMenuButtonVisible: menuBtn ? vis(menuBtn) : null,
    buttonHeights: [...new Set(buttons)],
    smallTouchTargets: W < 640 ? small : `(n/a at ${W}px)`,
    h2Size: getComputedStyle(document.querySelector('main h2')).fontSize,
    h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
  }
})()
