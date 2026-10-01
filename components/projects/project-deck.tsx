'use client'

import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, type KeyboardEvent } from 'react'
import { useScrollToSection } from '@/components/providers/smooth-scroll'
import type { Project, ProjectCategory, ProjectStatus } from '@/content/types'
import { ease } from '@/lib/motion'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  Deployed: 'border-success/40 bg-success/10 text-success',
  'Live Demo': 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  Awarded: 'border-warning/40 bg-warning/10 text-warning',
  'In Development': 'border-accent/40 bg-accent/10 text-accent',
  Prototype: 'border-primary/40 bg-primary/10 text-primary',
}

/** Keep in sync with the `deck` custom variant in globals.css. */
const DECK_QUERY = '(min-width: 768px) and (min-height: 760px)'

const GITHUB_PATH =
  'M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0Z'

type CardProps = {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  animate: boolean
}

function DeckCard({ project, index, total, progress, animate }: CardProps) {
  const featured = project.status === 'Deployed'
  // Every card shrinks and dims a little more for each card that lands on top of it.
  const depth = total - 1 - index
  const scale = useTransform(progress, [index / total, 1], [1, 1 - depth * 0.035])
  const dim = useTransform(progress, [index / total, 1], [0, depth * 0.07])

  return (
    <div className="pb-5 deck:sticky deck:top-0 deck:flex deck:h-svh deck:items-center deck:pb-0 deck:pt-16">
      <motion.div
        style={animate ? { scale, top: index * 18 } : undefined}
        className={cn('relative w-full origin-top rounded-3xl', featured && 'glow-ring')}
      >
        <article className="group relative grid overflow-hidden rounded-3xl border border-border bg-surface-1 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] md:min-h-[30rem] md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col p-6 sm:p-8 md:p-10">
            <div className="flex items-center justify-between gap-3 font-mono text-xs tabular-nums text-muted-foreground">
              <span>
                {String(index + 1).padStart(2, '0')} <span className="text-border">/</span>{' '}
                {String(total).padStart(2, '0')}
              </span>
              {featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                  <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden="true">
                    <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" />
                  </svg>
                  Featured
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className={cn('rounded-full border px-2.5 py-0.5 font-medium', statusStyles[project.status])}>
                {project.location ? `${project.status} – ${project.location}` : project.status}
              </span>
              <span className="tabular-nums text-muted-foreground">{project.period}</span>
              {project.team && <span className="text-muted-foreground">· {project.team}</span>}
            </div>

            <h3 className="mt-4 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-semibold leading-[1.1] tracking-tight">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

            {project.highlight && (
              <p className="mt-5 flex gap-3 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-foreground/90">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />
                </svg>
                {project.highlight}
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-foreground/80"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {(project.github || project.live) && (
              <div className="mt-8 flex flex-wrap gap-3 md:mt-auto md:pt-8">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-[filter] duration-(--dur-fast) hover:brightness-110"
                  >
                    <span className="relative flex size-2" aria-hidden="true">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-foreground/60" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent-foreground" />
                    </span>
                    Live demo
                    <span className="sr-only"> – {project.title} (opens in a new tab)</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-5 py-2.5 text-sm font-semibold transition-colors duration-(--dur-fast) hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                      <path d={GITHUB_PATH} />
                    </svg>
                    View on GitHub
                    <span className="sr-only"> – {project.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="relative order-first aspect-[3/2] overflow-hidden border-b border-border md:order-last md:aspect-auto md:border-b-0 md:border-l">
            <Image
              src={`/projects/${project.slug}.svg`}
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
            />
          </div>

          {animate && (
            <motion.div
              aria-hidden="true"
              style={{ opacity: dim }}
              className="pointer-events-none absolute inset-0 bg-background"
            />
          )}
        </article>
      </motion.div>
    </div>
  )
}

/** Sticky stacked deck on md+: each card pins, and those beneath scale back as the next lands. */
function Deck({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  // Pinned stacking needs room: a card taller than the viewport would be cut off.
  const roomy = useMediaQuery(DECK_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION)

  return (
    <div ref={container} className="relative">
      {projects.map((project, i) => (
        <DeckCard
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
          animate={roomy && !reduced}
        />
      ))}
    </div>
  )
}

type Category = { id: ProjectCategory; label: string }

export default function ProjectShowcase({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const [active, setActive] = useState<ProjectCategory>(categories[0].id)
  const scrollToSection = useScrollToSection()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const visible = projects.filter((p) => p.category === active)

  const select = (id: ProjectCategory) => {
    if (id === active) return
    setActive(id)
    // Decks differ in length — start the new one from its first card.
    scrollToSection('projects')
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const i = categories.findIndex((c) => c.id === active)
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length
    select(categories[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <div>
      <div className="relative z-20 mb-8 flex justify-center deck:sticky deck:top-20 deck:mb-0">
        <div
          role="tablist"
          aria-label="Project categories"
          onKeyDown={onKey}
          className="inline-flex gap-1 rounded-full border border-border bg-surface-1/90 p-1.5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md"
        >
          {categories.map((c, i) => {
            const selected = c.id === active
            const count = projects.filter((p) => p.category === c.id).length
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls="project-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(c.id)}
                className={cn(
                  'relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-(--dur-base)',
                  selected ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {c.label}
                  <span className={cn('ml-2 font-mono text-xs tabular-nums', selected ? 'opacity-70' : 'opacity-60')}>
                    {count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div id="project-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: ease.outExpo }}
          >
            <Deck projects={visible} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
