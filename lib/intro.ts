export const INTRO_KEY = 'ksk-intro'
export const INTRO_EVENT = 'ksk:intro-done'

/**
 * Inline script run before first paint: skips the intro on repeat visits in this
 * session and for reduced motion, so the overlay never flashes.
 */
export const introScript = `try{if(sessionStorage.getItem('${INTRO_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='done'}catch(e){document.documentElement.dataset.intro='done'}`

export function markIntroDone() {
  document.documentElement.dataset.intro = 'done'
  try {
    sessionStorage.setItem(INTRO_KEY, '1')
  } catch {
    /* storage blocked — intro simply plays again next time */
  }
  window.dispatchEvent(new Event(INTRO_EVENT))
}
