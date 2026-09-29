'use client'

import { useEffect, useRef, useState } from 'react'
import { profile } from '@/content/profile'
import { cn } from '@/lib/utils'

const RESET_DELAY_MS = 2600

/**
 * Resume link with a short "loading" flourish. The link opens on the click itself
 * (not after a timer) so popup blockers never swallow it.
 */
export default function DownloadSwitch() {
  const [active, setActive] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const handleClick = () => {
    setActive(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(false), RESET_DELAY_MS)
  }

  return (
    <a
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'group relative inline-flex h-14 items-center gap-3 rounded-full bg-accent p-1.5 pr-6 font-semibold text-accent-foreground shadow-[0_0_0_0_var(--accent)] transition-[background-color,box-shadow] duration-(--dur-base) ease-out-expo hover:shadow-[0_10px_40px_-8px_var(--accent)]',
        active && 'bg-success',
      )}
    >
      <span
        className={cn(
          'relative grid size-11 place-items-center overflow-hidden rounded-full bg-accent-foreground text-accent transition-colors duration-(--dur-base)',
          active && 'text-success',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn(
            'size-6 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-y-0.5',
            active && 'translate-y-8',
          )}
          aria-hidden="true"
        >
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={cn(
            'absolute size-6 -translate-y-8 transition-transform duration-(--dur-base) ease-out-expo',
            active && 'translate-y-0',
          )}
          aria-hidden="true"
        >
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 12 5 5L20 7" />
        </svg>
      </span>
      <span aria-live="polite">{active ? 'Opened' : 'Resume'}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
