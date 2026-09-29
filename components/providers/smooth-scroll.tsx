'use client'

import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Lenis drives the real window scroll position, so Framer's useScroll keeps working
 * unchanged — there is no second scroll container to sync.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ autoRaf: true, anchors: true, lerp: 0.11, stopInertiaOnNavigate: true })
    // eslint-disable-next-line react-hooks/set-state-in-effect -- publishing an external instance
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

/** Scroll to a section by id, through Lenis when it is running. */
export function useScrollToSection() {
  const lenis = useLenis()
  return useCallback(
    (id: string) => {
      const target = id === 'home' ? 0 : document.getElementById(id)
      if (target === null) return
      if (lenis) {
        lenis.start()
        lenis.scrollTo(target, { duration: 1.2 })
      } else if (target === 0) {
        window.scrollTo({ top: 0 })
      } else {
        target.scrollIntoView()
      }
      history.replaceState(null, '', `#${id}`)
    },
    [lenis],
  )
}
