'use client'

import { useEffect, useRef, useState } from 'react'
import ExternalLink from '@/components/external-link'
import { navItems, profile, type SectionId } from '@/content/profile'
import { cn } from '@/lib/utils'

/** Sections tucked under "More" on desktop (all of them stay in the mobile menu). */
const MORE: SectionId[] = ['achievements', 'leadership', 'certifications']
const primary = navItems.filter((i) => i.id !== 'home' && !MORE.includes(i.id))
const more = navItems.filter((i) => MORE.includes(i.id))
// Contact goes last, after the "More" menu.
const beforeMore = primary.filter((i) => i.id !== 'contact')
const contact = primary.find((i) => i.id === 'contact')

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home')
  useEffect(() => {
    const els = navItems.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null)
    // Whichever section crosses a thin band below the header is "current".
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId)
      },
      { rootMargin: '-25% 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

const linkClass = (isActive: boolean) =>
  cn(
    'inline-flex h-9 items-center rounded-ui px-2.5 text-small font-medium transition-colors duration-(--dur)',
    isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
  )

function MoreMenu({ active }: { active: SectionId }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const containsActive = MORE.includes(active)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-more"
        onClick={() => setOpen((v) => !v)}
        className={cn(linkClass(containsActive), 'gap-1')}
      >
        More
        <svg viewBox="0 0 12 12" className={cn('size-3 transition-transform duration-(--dur)', open && 'rotate-180')} aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul id="nav-more" className="absolute right-0 top-full mt-2 w-48 rounded-ui border border-border bg-surface p-1">
          {more.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'location' : undefined}
                className={cn(
                  'flex h-9 items-center rounded-ui px-3 text-small font-medium transition-colors duration-(--dur) hover:bg-surface-hover',
                  active === item.id ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Navigation() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu first (which releases the scroll lock), then jump to the section.
  const goFromMenu = (id: SectionId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }, 0)
  }

  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      toggle?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 h-(--header-h) border-b border-border bg-background/85 backdrop-blur-md">
      <nav aria-label="Primary" className="container-page flex h-full items-center justify-between gap-4">
        <a href="#home" className="inline-flex h-10 items-center text-body font-semibold tracking-tight text-foreground">
          {profile.fullName}
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          <ul className="flex items-center gap-0.5">
            {beforeMore.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} className={linkClass(active === item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <MoreMenu active={active} />
          {contact && (
            <a href="#contact" aria-current={active === 'contact' ? 'location' : undefined} className={linkClass(active === 'contact')}>
              {contact.label}
            </a>
          )}
          <ExternalLink href={profile.resumeUrl} className="btn btn-secondary ml-2">
            Resume
          </ExternalLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="btn btn-secondary px-3 lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-(--header-h) overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <ul className="container-page py-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={goFromMenu(item.id)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'flex h-11 items-center border-b border-border text-body font-medium',
                    active === item.id ? 'text-accent' : 'text-foreground',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <ExternalLink href={profile.resumeUrl} className="btn btn-secondary">
                Download Resume
              </ExternalLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
