import Section from '@/components/section'
import { skillCategories } from '@/content/skills'

/** Grouped rows: label above (mobile) or beside (desktop) a chip list. Two groups per row on desktop. */
export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
      <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {skillCategories.map((group) => (
          <div key={group.title} className="grid gap-2 lg:grid-cols-[150px_1fr] lg:gap-4">
            <dt className="label-caps pt-1">{group.title}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5" aria-label={group.title}>
                {group.skills.map((skill) => (
                  <li key={skill} className="chip text-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
