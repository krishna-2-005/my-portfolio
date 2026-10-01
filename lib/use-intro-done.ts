'use client'

import { useSyncExternalStore } from 'react'
import { INTRO_EVENT } from '@/lib/intro'

/** True once the preloader has finished (or was skipped). False during SSR. */
export function useIntroDone(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener(INTRO_EVENT, onChange)
      return () => window.removeEventListener(INTRO_EVENT, onChange)
    },
    () => document.documentElement.dataset.intro === 'done',
    () => false,
  )
}
