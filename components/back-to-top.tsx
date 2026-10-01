'use client'

import { useScrollToSection } from '@/components/providers/smooth-scroll'

export default function BackToTop() {
  const scrollTo = useScrollToSection()
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault()
        scrollTo('home')
        document.getElementById('main')?.focus({ preventScroll: true })
      }}
      className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface-1 py-2 pl-5 pr-2 text-sm font-medium transition-colors duration-(--dur-fast) hover:border-primary/60"
    >
      Back to top
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-surface-3">
        <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:-translate-y-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
        <svg viewBox="0 0 24 24" className="absolute size-4 translate-y-6 text-accent transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-y-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </span>
    </a>
  )
}
