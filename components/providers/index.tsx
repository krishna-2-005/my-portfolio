'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import SmoothScroll from '@/components/providers/smooth-scroll'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  )
}
