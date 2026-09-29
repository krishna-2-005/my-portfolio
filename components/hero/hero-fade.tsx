'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useIntroDone } from '@/lib/use-intro-done'
import { ease } from '@/lib/motion'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /** 'up' for copy, 'scale' for the profile card. */
  variant?: 'up' | 'scale'
}

const from = {
  up: { opacity: 0, y: 24, filter: 'blur(6px)' },
  scale: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
}

/** Fades hero content in once the intro overlay has lifted. */
export default function HeroFade({ children, delay = 0, className, variant = 'up' }: Props) {
  const play = useIntroDone()
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={from[variant]}
      animate={play ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 1, ease: ease.outExpo, delay }}
    >
      {children}
    </motion.div>
  )
}
