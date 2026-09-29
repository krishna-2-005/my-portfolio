import Section from '@/components/section'
import { education } from '@/content/experience'

export default function Education() {
  return (
    <Section id="education" title="Education" eyebrow="02">
      <ol className="relative space-y-10 border-l border-border pl-8">
        {education.map((edu) => (
          <li key={edu.title} className="relative">
            <span
              className="absolute -left-[2.3rem] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background"
              aria-hidden="true"
            />
            <p className="font-mono text-sm tabular-nums text-muted-foreground">{edu.period}</p>
            <h3 className="mt-1 text-h3 font-semibold">{edu.title}</h3>
            <p className="mt-1 text-primary">{edu.institution}</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {edu.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
