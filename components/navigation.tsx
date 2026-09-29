'use client'

import { useEffect, useState } from 'react'
import { navItems, profile, type SectionId } from '@/content/profile'
import { cn } from '@/lib/utils'

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    // A thin band across the middle of the viewport: whichever section crosses it is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

export default function Navigation() {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-(--dur-base)',
        scrolled || open
          ? 'border-b border-border bg-background/80 backdrop-blur-lg'
          : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-tight"
          aria-label={`${profile.fullName} – home`}
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                className={cn(
                  'relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-(--dur-fast)',
                  active === item.id ? 'bg-surface-3 text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative grid size-11 place-items-center rounded-full lg:hidden"
        >
          <span
            className={cn(
              'absolute h-0.5 w-5 rounded bg-foreground transition-transform duration-(--dur-base) ease-out-expo',
              open ? 'rotate-45' : '-translate-y-1.5',
            )}
          />
          <span
            className={cn(
              'absolute h-0.5 w-5 rounded bg-foreground transition-opacity duration-(--dur-fast)',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'absolute h-0.5 w-5 rounded bg-foreground transition-transform duration-(--dur-base) ease-out-expo',
              open ? '-rotate-45' : 'translate-y-1.5',
            )}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-background lg:hidden"
      >
        <ul className="container-page flex flex-col py-6">
          {navItems.map((item, i) => (
            <li key={item.id} className="border-b border-border/60">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'location' : undefined}
                className={cn(
                  'flex items-baseline gap-4 py-4 font-display text-3xl font-semibold tracking-tight',
                  active === item.id ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                <span className="font-mono text-xs tabular-nums text-accent">{String(i).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
