'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useLenis, useScrollToSection } from '@/components/providers/smooth-scroll'
import { navItems, profile, type SectionId } from '@/content/profile'
import { duration, ease } from '@/lib/motion'
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
  const lenis = useLenis()
  const scrollToSection = useScrollToSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 400 && y > prev + 2)
    if (y < prev - 2) setHidden(false)
  })

  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    window.addEventListener('keydown', onKey)
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = prevOverflow
      lenis?.start()
      window.removeEventListener('keydown', onKey)
      toggle?.focus({ preventScroll: true })
    }
  }, [open, lenis])

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: duration.base, ease: ease.outExpo }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-(--dur-base)',
          scrolled || open ? 'border-border/70 bg-background/70 backdrop-blur-xl' : 'border-transparent',
        )}
      >
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
          <a
            href="#home"
            onClick={go('home')}
            className="group font-display text-lg font-semibold tracking-tight"
            aria-label={`${profile.fullName} – home`}
          >
            {profile.initials}
            <span className="inline-block text-accent transition-transform duration-(--dur-base) ease-out-expo group-hover:scale-150">
              .
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 rounded-full border border-border/60 bg-surface-1/60 p-1 backdrop-blur-md lg:flex">
            {navItems.filter((item) => item.id !== 'home').map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-4"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-(--dur-fast)',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href="#contact"
            onClick={go('contact')}
            className="hidden h-9 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition-[filter] duration-(--dur-fast) hover:brightness-110 xl:inline-flex"
          >
            Let&apos;s talk
          </a>

          <button
            ref={toggleRef}
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
                open ? 'rotate-45' : '-translate-y-1',
              )}
            />
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded bg-foreground transition-transform duration-(--dur-base) ease-out-expo',
                open ? '-rotate-45' : 'translate-y-1',
              )}
            />
          </button>
        </nav>
      </motion.header>

      {/* Outside the header: its transform + backdrop-filter would trap a fixed child. */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            data-lenis-prevent=""
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: ease.inOutQuart }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_100%_100%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)]" />
            <motion.ul
              className="container-page relative flex flex-col py-6"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.18 } },
              }}
            >
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-border/50">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={active === item.id ? 'location' : undefined}
                    variants={{
                      hidden: { y: '100%', opacity: 0 },
                      show: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: ease.outExpo } },
                    }}
                    className={cn(
                      'flex items-baseline gap-4 py-4 font-display text-4xl font-semibold tracking-tight',
                      active === item.id ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    <span className="font-mono text-xs tabular-nums text-accent">{String(i).padStart(2, '0')}</span>
                    {item.label}
                    {active === item.id && <span className="ml-auto size-2 self-center rounded-full bg-accent" />}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
