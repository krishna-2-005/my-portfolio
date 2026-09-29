'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { profile } from '@/content/profile'
import { ease } from '@/lib/motion'

export const INTRO_KEY = 'ksk-intro'

/**
 * Inline script run before first paint: skips the intro on repeat visits in this
 * session and for reduced motion, so the overlay never flashes.
 */
export const introScript = `try{if(sessionStorage.getItem('${INTRO_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='done'}catch(e){document.documentElement.dataset.intro='done'}`

const COUNT_S = 0.75
const EXIT_S = 0.45

export default function Preloader() {
  const overlay = useRef<HTMLDivElement>(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const bar = useTransform(count, [0, 100], [0, 1])

  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.intro === 'done' || !overlay.current) return
    const el = overlay.current
    let exit: ReturnType<typeof animate> | undefined

    const finish = () => {
      root.dataset.intro = 'done'
      try {
        sessionStorage.setItem(INTRO_KEY, '1')
      } catch {
        /* storage blocked — intro simply plays again next time */
      }
    }
    const counter = animate(count, 100, {
      duration: COUNT_S,
      ease: ease.inOutQuart,
      onComplete: () => {
        exit = animate(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          { duration: EXIT_S, ease: ease.inOutQuart, onComplete: finish },
        )
      },
    })
    return () => {
      counter.stop()
      exit?.stop()
    }
  }, [count])

  return (
    <div
      ref={overlay}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background [clip-path:inset(0_0_0_0)]"
    >
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: ease.outExpo }}
          className="font-display text-7xl font-semibold tracking-tight md:text-9xl"
        >
          <span className="text-gradient">{profile.initials}</span>
          <span className="text-accent">.</span>
        </motion.p>
      </div>
      <div className="mt-6 flex w-48 items-center gap-3 font-mono text-xs text-muted-foreground">
        <div className="h-px flex-1 overflow-hidden bg-border">
          <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-accent" />
        </div>
        <motion.span className="tabular-nums">{rounded}</motion.span>
      </div>
    </div>
  )
}
