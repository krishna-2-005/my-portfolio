'use client'

import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import SectionHeading from '@/components/motion/section-heading'
import { Reveal, RevealItem } from '@/components/motion/reveal'
import { achievements, education, experience, leadership } from '@/content/experience'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'

type Entry = { key: string; date: string; title: string; subtitle?: string; icon?: string; body: ReactNode }
type Group = { id: string; title: string; eyebrow: string; entries: Entry[] }

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((d) => (
        <li key={d} className="flex gap-3">
          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  )
}

const groups: Group[] = [
  {
    id: 'experience',
    title: 'Experience',
    eyebrow: '04',
    entries: experience.map((x) => ({
      key: x.company,
      date: x.period,
      title: x.role,
      subtitle: `${x.company} · ${x.mode}`,
      body: (
        <>
          <Bullets items={x.points} />
          {x.links && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${x.company} project repositories`}>
              {x.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-primary/60 hover:text-foreground"
                  >
                    {l.label}
                    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                    <span className="sr-only"> on GitHub (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    })),
  },
  {
    id: 'education',
    title: 'Education',
    eyebrow: '05',
    entries: education.map((e) => ({
      key: e.title,
      date: e.period,
      title: e.title,
      subtitle: e.institution,
      body: <Bullets items={e.details} />,
    })),
  },
  {
    id: 'achievements',
    title: 'Achievements & Awards',
    eyebrow: '06',
    entries: achievements.map((a) => ({ key: a.title, date: a.date, title: a.title, icon: a.icon, body: a.description })),
  },
  {
    id: 'leadership',
    title: 'Leadership & Community',
    eyebrow: '07',
    entries: leadership.map((l) => ({ key: l.role, date: l.period, title: l.role, body: l.description })),
  },
]

// Rail geometry: a 1.5rem gutter on phones; date | rail | card columns from md up.
const row = 'grid grid-cols-[1.5rem_1fr] gap-x-5 md:grid-cols-[9rem_2.5rem_1fr] md:gap-x-0'

function Node() {
  const ref = useRef<HTMLSpanElement>(null)
  const lit = useInView(ref, { once: true, margin: '0px 0px -35% 0px' })
  return (
    <span
      ref={ref}
      data-lit={lit}
      aria-hidden="true"
      className="relative z-10 mt-1.5 block size-3.5 rounded-full border-2 border-border bg-background transition-[transform,background-color,border-color,box-shadow] duration-(--dur-slow) ease-out-expo data-[lit=true]:scale-125 data-[lit=true]:border-accent data-[lit=true]:bg-accent data-[lit=true]:shadow-[0_0_0_5px_color-mix(in_oklch,var(--accent)_18%,transparent),0_0_22px_var(--accent)]"
    />
  )
}

function TimelineGroup({ group }: { group: Group }) {
  const headingId = `${group.id}-title`
  return (
    <section id={group.id} aria-labelledby={headingId} className="pt-4">
      <div className={row}>
        <div className="flex justify-center md:col-start-2">
          <span
            aria-hidden="true"
            className="relative z-10 mt-[3.25rem] grid size-6 place-items-center rounded-full border border-primary/60 bg-background"
          >
            <span className="size-2 rounded-full bg-primary" />
          </span>
        </div>
        <div className="md:col-start-3 md:pl-6">
          <SectionHeading id={headingId} title={group.title} eyebrow={group.eyebrow} />
        </div>
      </div>

      <Reveal as="ol" className="space-y-6" stagger={0.1}>
        {group.entries.map((entry) => (
          <RevealItem as="li" key={entry.key} className={row}>
            <p className="hidden text-balance pr-6 pt-1 text-right font-mono text-sm tabular-nums text-muted-foreground md:block">
              {entry.date}
            </p>
            <div className="flex justify-center">
              <Node />
            </div>
            <div className="md:pl-6">
              <div className="shine-on-hover rounded-2xl border border-border bg-surface-1/90 p-6 transition-colors duration-(--dur-base) hover:border-primary/50">
                <p className="mb-2 font-mono text-xs tabular-nums text-accent md:hidden">{entry.date}</p>
                <div className="flex items-start gap-4">
                  {entry.icon && (
                    <span className="text-3xl leading-none" aria-hidden="true">
                      {entry.icon}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-h3 font-semibold">{entry.title}</h3>
                    {entry.subtitle && <p className="mt-1 text-primary">{entry.subtitle}</p>}
                    <div className="mt-3 leading-relaxed text-muted-foreground">{entry.body}</div>
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}

/** Education, Achievements and Leadership on one rail that draws itself as you scroll. */
export default function Journey() {
  const rail = useRef<HTMLDivElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: rail, offset: ['start 65%', 'end 65%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const headY = useTransform(draw, (v) => v * height)
  const pathLength = reduced ? 1 : draw

  return (
    <div className="section-y">
      <div className="container-page">
        <div ref={rail} className="relative space-y-24 md:space-y-32">
          {height > 0 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-[calc(0.75rem-1px)] w-0.5 md:left-[calc(10.25rem-1px)]"
            >
              <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 2 ${height}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rail" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--primary)" />
                    <stop offset="0.5" stopColor="var(--accent)" />
                    <stop offset="1" stopColor="var(--primary)" />
                  </linearGradient>
                </defs>
                <path d={`M1 0V${height}`} stroke="var(--border)" strokeWidth="2" fill="none" />
                <motion.path
                  d={`M1 0V${height}`}
                  stroke="url(#rail)"
                  strokeWidth="2"
                  fill="none"
                  style={{ pathLength }}
                />
              </svg>
              {!reduced && (
                <motion.span
                  style={{ y: headY }}
                  className="absolute -left-[5px] -top-[6px] size-3 rounded-full bg-accent shadow-[0_0_18px_4px_var(--accent)]"
                />
              )}
            </div>
          )}
          {groups.map((group) => (
            <TimelineGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}
