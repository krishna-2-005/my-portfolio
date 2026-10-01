import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  title: string
  /** Short sections use the low end of the spacing range. */
  tight?: boolean
  /** Render without padding/container — for sections placed inside a shared grid. */
  bare?: boolean
  className?: string
  /** Optional element on the right of the heading row (e.g. a "view all" link). */
  action?: ReactNode
  children: ReactNode
}

/** A page section: anchor id, `<h2>` that labels it, and the shared vertical rhythm. */
export default function Section({ id, title, tight, bare, className, action, children }: SectionProps) {
  const headingId = `${id}-title`
  const body = (
    <>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 md:mb-8">
        <h2 id={headingId} className="text-heading">
          {title}
        </h2>
        {action}
      </div>
      <div className="reveal">{children}</div>
    </>
  )
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(!bare && (tight ? 'section-y-tight' : 'section-y'), className)}
    >
      {bare ? body : <div className="container-page">{body}</div>}
    </section>
  )
}
