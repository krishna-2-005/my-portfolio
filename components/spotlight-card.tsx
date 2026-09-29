'use client'

import type { HTMLAttributes, PointerEvent } from 'react'
import { cn } from '@/lib/utils'

/** Card whose border and surface light up under the pointer (see .spotlight in globals.css). */
export default function SpotlightCard({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div {...rest} onPointerMove={onMove} className={cn('spotlight', className)}>
      {children}
    </div>
  )
}
