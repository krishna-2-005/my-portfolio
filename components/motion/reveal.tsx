'use client'

import { motion } from 'framer-motion'
import type { HTMLAttributes, ReactNode } from 'react'
import { duration, ease } from '@/lib/motion'

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  article: motion.article,
  p: motion.p,
} as const

type Tag = keyof typeof tags

type RevealProps = Omit<HTMLAttributes<HTMLElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> & {
  as?: Tag
  children: ReactNode
  /** Seconds between each child's entrance. */
  stagger?: number
  delay?: number
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.outExpo },
  },
}

/** Staggers its RevealItem children in when scrolled into view (once). */
export function Reveal({ as = 'div', children, stagger = 0.08, delay = 0, ...rest }: RevealProps) {
  const Comp = tags[as] as typeof motion.div
  return (
    <Comp
      {...rest}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({ as = 'div', children, ...rest }: Omit<RevealProps, 'stagger' | 'delay'>) {
  const Comp = tags[as] as typeof motion.div
  return (
    <Comp {...rest} data-reveal="" variants={itemVariants}>
      {children}
    </Comp>
  )
}
