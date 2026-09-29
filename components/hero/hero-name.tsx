'use client'

import { motion } from 'framer-motion'
import { useIntroDone } from '@/lib/use-intro-done'
import { ease } from '@/lib/motion'

type Line = { text: string; gradient?: boolean }

/**
 * The page's single h1. Screen readers get the plain name; the per-letter spans that
 * rise out of their masks are decorative.
 *
 * Gradient lines colour each letter along the purple→cyan ramp: background-clip:text
 * cannot span children that are transformed independently.
 */
export default function HeroName({ id, lines }: { id: string; lines: Line[] }) {
  const play = useIntroDone()
  let charIndex = 0

  return (
    <h1 id={id} className="text-display font-semibold">
      <span className="sr-only">{lines.map((l) => l.text).join(' ')}</span>
      {lines.map((line) => {
        const letters = line.text.replace(/\s/g, '').length
        let letterInLine = 0
        return (
          <span key={line.text} aria-hidden="true" className="block">
            {line.text.split(' ').map((word, w) => (
              <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0">
                {[...word].map((char, c) => {
                  const i = charIndex++
                  const t = letters > 1 ? letterInLine++ / (letters - 1) : 0
                  return (
                    <motion.span
                      key={c}
                      data-reveal=""
                      className="inline-block will-change-transform"
                      style={
                        line.gradient
                          ? { color: `color-mix(in oklch, var(--primary) ${Math.round((1 - t) * 100)}%, var(--accent))` }
                          : undefined
                      }
                      initial={{ y: '115%', rotate: 8 }}
                      animate={play ? { y: '0%', rotate: 0 } : undefined}
                      transition={{ duration: 0.9, ease: ease.outExpo, delay: 0.1 + i * 0.028 }}
                    >
                      {char}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </span>
        )
      })}
    </h1>
  )
}
