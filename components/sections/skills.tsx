import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'
import { skillCategories } from '@/content/skills'

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills" eyebrow="03">
      <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <RevealItem
            key={category.title}
            className="shine-on-hover rounded-xl border border-border bg-surface-1 p-6 transition-colors duration-(--dur-base) hover:border-primary/50"
          >
            <h3 className="mb-4 text-lg font-semibold">{category.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  )
}
