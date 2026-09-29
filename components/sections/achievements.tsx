import Section from '@/components/section'
import { achievements } from '@/content/experience'

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Awards" eyebrow="05">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {achievements.map((achievement) => (
          <li
            key={achievement.title}
            className="shine-on-hover rounded-xl border border-border bg-surface-1 p-6 transition-colors duration-(--dur-base) hover:border-primary/50"
          >
            <div className="mb-4 text-4xl" aria-hidden="true">
              {achievement.icon}
            </div>
            <h3 className="text-lg font-semibold">{achievement.title}</h3>
            <p className="mt-1 font-mono text-sm tabular-nums text-primary">{achievement.date}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{achievement.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
