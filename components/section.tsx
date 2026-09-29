import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  title: string
  eyebrow?: string
  className?: string
  children: ReactNode
}

/** Page section with a consistent vertical rhythm and an accessible heading. */
export default function Section({ id, title, eyebrow, className, children }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('section-y', className)}>
      <div className="container-page">
        <header className="mb-12 md:mb-16">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
          )}
          <h2 id={headingId} className="text-h2 font-semibold">
            <span className="text-gradient">{title}</span>
          </h2>
          <div className="mt-5 h-px w-24 bg-gradient-to-r from-primary to-accent" aria-hidden="true" />
        </header>
        {children}
      </div>
    </section>
  )
}
