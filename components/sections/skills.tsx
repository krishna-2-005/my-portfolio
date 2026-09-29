import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'
import SpotlightCard from '@/components/spotlight-card'
import { skillIcons, type SkillIcon } from '@/content/skill-icons'
import { skillCategories } from '@/content/skills'
import { cn } from '@/lib/utils'

/** Bento placement per category, in content order: a zig-zag of narrow/wide rows. */
const layout = [
  { span: 'lg:col-span-2', cols: 'grid-cols-1' },
  { span: 'lg:col-span-4', cols: 'grid-cols-2 sm:grid-cols-3' },
  { span: 'lg:col-span-4', cols: 'grid-cols-2 sm:grid-cols-3' },
  { span: 'lg:col-span-2', cols: 'grid-cols-2' },
  { span: 'lg:col-span-3', cols: 'grid-cols-2' },
  { span: 'lg:col-span-3', cols: 'grid-cols-2' },
]

function Glyph({ icon }: { icon?: SkillIcon }) {
  if (!icon || 'monogram' in icon) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-[5px] border border-current font-mono text-[8px] font-bold leading-none">
        {icon && 'monogram' in icon ? icon.monogram : '•'}
      </span>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills" eyebrow="02">
      <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6" stagger={0.09}>
        {skillCategories.map((category, i) => {
          const { span, cols } = layout[i] ?? layout[0]
          return (
            <RevealItem key={category.title} className={cn('h-full', span)}>
              <SpotlightCard className="h-full rounded-2xl border border-border bg-surface-1/80 p-6 backdrop-blur-sm md:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-h3 font-semibold">{category.title}</h3>
                  </div>
                  <p className="shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] tabular-nums text-muted-foreground">
                    {category.skills.length} skills
                  </p>
                </div>
                <ul className={cn('grid gap-2', cols)}>
                  {category.skills.map((skill) => {
                    const icon = skillIcons[skill]
                    return (
                      <li
                        key={skill}
                        style={{ '--brand': icon && 'color' in icon ? icon.color : 'var(--accent)' } as React.CSSProperties}
                        className="group/skill flex items-center gap-3 rounded-xl border border-border/60 bg-surface-2/70 px-3 py-2.5 text-muted-foreground transition-[transform,border-color,background-color,color] duration-(--dur-base) ease-out-expo hover:-translate-y-0.5 hover:border-border hover:bg-surface-3 hover:text-(--brand)"
                      >
                        <Glyph icon={icon} />
                        <span className="text-sm font-medium text-foreground/90">{skill}</span>
                      </li>
                    )
                  })}
                </ul>
              </SpotlightCard>
            </RevealItem>
          )
        })}
      </Reveal>
    </Section>
  )
}
