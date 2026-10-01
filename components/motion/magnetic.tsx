'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { usePointerEffects } from '@/lib/use-media-query'

const spring = { stiffness: 220, damping: 16, mass: 0.4 }

/** Pulls its child toward the pointer while hovered, then springs back. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const enabled = usePointerEffects()
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-block">
      {children}
    </motion.div>
  )
}
