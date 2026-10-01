'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'

/** Counts from 0 to `value` the first time it scrolls into view. Server HTML carries the final value. */
export default function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = useMediaQuery(REDUCED_MOTION)

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduced) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
