'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePointerEffects } from '@/lib/use-media-query'

const TARGETS = 'a, button, [role="button"], label, summary, [data-cursor]'

/** Dot + trailing ring. Only mounts its listeners on a fine pointer with motion allowed. */
export default function Cursor() {
  const enabled = usePointerEffects()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 })

  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      setHovering(e.target instanceof Element && e.target.closest(TARGETS) !== null)
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -left-5 -top-5 size-10"
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="size-full rounded-full border border-foreground/40"
          animate={{
            scale: pressed ? 0.8 : hovering ? 1.7 : 1,
            backgroundColor: hovering ? 'color-mix(in oklch, var(--accent) 14%, transparent)' : 'rgba(0,0,0,0)',
            borderColor: hovering ? 'var(--accent)' : 'color-mix(in oklch, var(--foreground) 40%, transparent)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute -left-[3px] -top-[3px] size-1.5 rounded-full bg-accent"
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}
