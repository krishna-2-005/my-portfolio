import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'
import { projects } from '@/content/projects'
import type { ProjectStatus } from '@/content/types'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  Deployed: 'border-success/40 bg-success/10 text-success',
  Awarded: 'border-warning/40 bg-warning/10 text-warning',
  'In Development': 'border-accent/40 bg-accent/10 text-accent',
  Prototype: 'border-primary/40 bg-primary/10 text-primary',
}

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects" eyebrow="04">
      <Reveal className="space-y-4" stagger={0.1}>
        {projects.map((project) => (
          <RevealItem
            as="article"
            key={project.slug}
            className="shine-on-hover rounded-xl border border-border bg-surface-1 p-6 transition-colors duration-(--dur-base) hover:border-primary/50 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-h3 font-semibold">{project.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className={cn('rounded-full border px-2.5 py-0.5 font-medium', statusStyles[project.status])}>
                    {project.location ? `${project.status} – ${project.location}` : project.status}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{project.period}</span>
                </div>
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 self-start rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors duration-(--dur-fast) hover:bg-primary hover:text-primary-foreground"
                >
                  View on GitHub
                  <span className="sr-only"> – {project.title} (opens in a new tab)</span>
                </a>
              )}
            </div>

            <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-foreground/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  )
}
