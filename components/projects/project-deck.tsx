'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import type { Project, ProjectStatus } from '@/content/types'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  Deployed: 'border-success/40 bg-success/10 text-success',
  Awarded: 'border-warning/40 bg-warning/10 text-warning',
  'In Development': 'border-accent/40 bg-accent/10 text-accent',
  Prototype: 'border-primary/40 bg-primary/10 text-primary',
}

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
    <div className="pb-5 md:sticky md:top-0 md:flex md:h-svh md:items-center md:pb-0">
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

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className={cn('rounded-full border px-2.5 py-0.5 font-medium', statusStyles[project.status])}>
                {project.location ? `${project.status} – ${project.location}` : project.status}
              </span>
              <span className="tabular-nums text-muted-foreground">{project.period}</span>
            </div>

            <h3 className="mt-4 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-semibold leading-[1.1] tracking-tight">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

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

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-2 px-5 py-2.5 text-sm font-semibold transition-colors duration-(--dur-fast) hover:border-foreground hover:bg-foreground hover:text-background md:mt-auto"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0Z" />
                </svg>
                View on GitHub
                <span className="sr-only"> – {project.title} (opens in a new tab)</span>
              </a>
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
export default function ProjectDeck({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const desktop = useMediaQuery('(min-width: 768px)')
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
          animate={desktop && !reduced}
        />
      ))}
    </div>
  )
}
