import ExternalLink from '@/components/external-link'
import ItemRow from '@/components/item-row'
import Section from '@/components/section'
import { achievements, education, experience, leadership } from '@/content/experience'

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-6 border-l border-border">
        {experience.map((x) => (
          <li key={`${x.company}-${x.period}`} className="relative pl-5">
            <span className="absolute -left-[4.5px] top-[9px] size-2 rounded-full bg-accent" aria-hidden="true" />
            <ItemRow title={x.role} meta={`${x.company} · ${x.mode}`} aside={x.period}>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-subtle-foreground">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {x.links && (
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small">
                  {x.links.map((l) => (
                    <ExternalLink key={l.href} href={l.href} className="link tap inline-flex gap-1">
                      {l.label}
                    </ExternalLink>
                  ))}
                </p>
              )}
            </ItemRow>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" title="Education" bare>
      <ol className="divide-y divide-border">
        {education.map((e) => (
          <li key={e.title} className="py-3 first:pt-0 last:pb-0">
            <ItemRow title={e.title} meta={e.institution} aside={e.period}>
              <p className="text-small">{e.details.join(' · ')}</p>
            </ItemRow>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Awards" bare>
      <ol className="divide-y divide-border">
        {achievements.map((a) => (
          <li key={a.title} className="py-3 first:pt-0 last:pb-0">
            <ItemRow
              title={a.title}
              aside={a.date}
              lead={
                <span className="grid size-8 place-items-center rounded-ui border border-border bg-surface" aria-hidden="true">
                  {a.icon}
                </span>
              }
            >
              <p>{a.description}</p>
            </ItemRow>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Leadership() {
  return (
    <Section id="leadership" title="Leadership & Community">
      <ul className="grid gap-x-10 md:grid-cols-2">
        {leadership.map((l) => (
          <li key={l.role} className="border-t border-border py-4">
            <ItemRow title={l.role} aside={l.period}>
              <p>{l.description}</p>
            </ItemRow>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** Experience, then Education and Achievements side by side (both short), then Leadership. */
export default function Journey() {
  return (
    <>
      <Experience />
      <div className="section-y-tight">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Education />
          <Achievements />
        </div>
      </div>
      <Leadership />
    </>
  )
}
