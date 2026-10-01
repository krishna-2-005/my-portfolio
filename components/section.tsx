import type { ReactNode } from 'react'
import SectionHeading from '@/components/motion/section-heading'
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
        <SectionHeading id={headingId} title={title} eyebrow={eyebrow} />
        {children}
      </div>
    </section>
  )
}
