import { Fragment } from 'react'
import Section from '@/components/section'
import { certifications } from '@/content/certifications'
import { achievements, education } from '@/content/experience'
import { about, profile } from '@/content/profile'
import { projects } from '@/content/projects'

/** Renders `**phrase**` markers from the content as emphasised text. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-medium text-foreground">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

// Facts already on the site — the degree entry, the focus areas and the content counts.
const degree = education[0]
const highlights = [
  { label: 'Degree', value: `${degree.title.replace(' – ', ', ')}` },
  { label: 'Institution', value: `${degree.institution} · ${degree.period}` },
  { label: 'Focus', value: profile.focus.join(' · ') },
  { label: 'Status', value: profile.status },
]
const stats = [
  { value: projects.filter((p) => p.status === 'Deployed').length, label: 'Systems in production' },
  { value: projects.length, label: 'Projects' },
  { value: certifications.length, label: 'Certifications' },
  { value: achievements.length, label: 'Awards' },
]

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div className="max-w-[68ch] space-y-4 text-muted-foreground">
          {about.map((p) => (
            <p key={p.slice(0, 24)}>
              <Rich text={p} />
            </p>
          ))}
        </div>

        <div className="space-y-4">
          <dl className="divide-y divide-border rounded-ui border border-border bg-surface">
            {highlights.map((h) => (
              <div key={h.label} className="grid grid-cols-[96px_1fr] gap-3 px-4 py-3">
                <dt className="label-caps">{h.label}</dt>
                <dd className="text-small text-foreground">{h.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="grid grid-cols-2 gap-2" aria-label="At a glance">
            {stats.map((s) => (
              <li key={s.label} className="rounded-ui border border-border bg-surface px-2 py-3 text-center">
                <span className="block text-title tabular-nums text-foreground">{s.value}</span>
                <span className="mt-0.5 block text-small leading-tight text-subtle-foreground">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
