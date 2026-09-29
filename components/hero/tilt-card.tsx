'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { usePointerEffects } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

const spring = { stiffness: 180, damping: 18, mass: 0.6 }

/**
 * 3D tilt that follows the pointer, with a specular glare. Children can use
 * `[transform:translateZ(..)]` to float above the card surface.
 */
export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const enabled = usePointerEffects()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-11, 11]), spring)
  const glareX = useTransform(px, [0, 1], [0, 100])
  const glareY = useTransform(py, [0, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.2), transparent 55%)`
  const glareOpacity = useSpring(0, spring)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
    glareOpacity.set(1)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <div className={cn('[perspective:1000px]', className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        style={enabled ? { rotateX, rotateY } : undefined}
        className="relative rounded-2xl [transform-style:preserve-3d]"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: glare, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
        />
      </motion.div>
    </div>
  )
}
