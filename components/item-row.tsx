import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ItemRowProps = {
  title: ReactNode
  /** Secondary line under the title — organisation, provider, institution. */
  meta?: ReactNode
  /** Right-aligned on desktop (dates or an action); wraps below the title on narrow screens. */
  aside?: ReactNode
  /** Small leading mark: icon, emoji or monogram. */
  lead?: ReactNode
  children?: ReactNode
  className?: string
}

/** The repeated title / meta / action pattern used by Experience, Education, Achievements, Leadership and Certifications. */
export default function ItemRow({ title, meta, aside, lead, children, className }: ItemRowProps) {
  return (
    <div className={cn('flex gap-3', className)}>
      {lead && <div className="shrink-0">{lead}</div>}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-title">{title}</h3>
          {aside && <div className="shrink-0 text-small tabular-nums text-subtle-foreground">{aside}</div>}
        </div>
        {meta && <p className="mt-0.5 text-small text-muted-foreground">{meta}</p>}
        {children && <div className="mt-2 text-muted-foreground">{children}</div>}
      </div>
    </div>
  )
}
