import ExternalLink from '@/components/external-link'
import ClampText from '@/components/projects/clamp-text'
import type { Project } from '@/content/types'
import { cn } from '@/lib/utils'

/** Status badge: deployed and live work use the accent; everything else stays neutral. */
function StatusBadge({ project }: { project: Project }) {
  const live = project.status === 'Deployed' || project.status === 'Live Demo'
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap rounded-ui border px-2.5 py-1 text-small',
        live ? 'border-accent/40 text-accent' : 'border-border text-muted-foreground',
      )}
    >
      {project.status}
    </span>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const meta = [project.location, project.period, project.team].filter(Boolean).join(' · ')
  return (
    <article className="card flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-title">{project.title}</h3>
        <StatusBadge project={project} />
      </div>
      <p className="mt-1 text-small text-subtle-foreground">{meta}</p>

      <div className="mt-3 text-muted-foreground">
        <ClampText text={project.description} />
      </div>

      {project.highlight && (
        <p className="mt-3 border-l-2 border-accent pl-3 text-small text-foreground">{project.highlight}</p>
      )}

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.tech.map((t) => (
          <li key={t} className="chip text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>

      {(project.live || project.github) && (
        <div className="flex flex-wrap gap-2 pt-5">
          {project.live && (
            <ExternalLink href={project.live} className="btn btn-primary">
              Live Demo
            </ExternalLink>
          )}
          {project.github && (
            <ExternalLink href={project.github} className="btn btn-secondary">
              GitHub
            </ExternalLink>
          )}
        </div>
      )}
    </article>
  )
}
