'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Props = { id: string; title: string; eyebrow?: string }

/**
 * An outlined heading that is wiped in with the brand gradient as it scrolls up the viewport.
 * The filled copy is decorative (aria-hidden); the outlined text is the real heading.
 */
export default function SectionHeading({ id, title, eyebrow }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'start 45%'] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <header ref={ref} className="mb-12 md:mb-16">
      {eyebrow && (
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="tabular-nums">{eyebrow}</span>
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
        </p>
      )}
      <h2 id={id} className="relative w-fit text-h2 font-semibold">
        <span className="text-transparent [-webkit-text-stroke:1px_color-mix(in_oklch,var(--foreground)_22%,transparent)]">
          {title}
        </span>
        <motion.span
          aria-hidden="true"
          style={reduced ? undefined : { clipPath }}
          className="absolute inset-0 bg-[linear-gradient(100deg,var(--foreground)_0%,var(--foreground)_30%,var(--primary)_70%,var(--accent)_100%)] bg-clip-text text-transparent"
        >
          {title}
        </motion.span>
      </h2>
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { scaleX: line }}
        className="mt-6 h-px w-32 origin-left bg-gradient-to-r from-primary to-accent"
      />
    </header>
  )
}
