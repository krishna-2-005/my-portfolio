import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /** 'up' for copy, 'scale' for the portrait. */
  variant?: 'up' | 'scale'
}

/** Fades hero content in as the intro curtain lifts (CSS entrance, see globals.css). */
export default function HeroFade({ children, delay = 0, className, variant = 'up' }: Props) {
  return (
    <div
      className={cn(variant === 'scale' ? 'hero-fade-scale' : 'hero-fade', className)}
      style={{ '--d': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
