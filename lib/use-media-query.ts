'use client'

import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. Always false during SSR. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/** Pointer-driven effects (tilt, magnetic, cursor): a real mouse and motion allowed. */
export function usePointerEffects(): boolean {
  const fine = useMediaQuery(FINE_POINTER)
  const reduced = useMediaQuery(REDUCED_MOTION)
  return fine && !reduced
}
