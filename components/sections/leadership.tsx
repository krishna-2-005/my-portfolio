import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'
import { leadership } from '@/content/experience'

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership & Community" eyebrow="06">
      <Reveal as="ul" className="grid grid-cols-1 gap-4 md:grid-cols-2" stagger={0.1}>
        {leadership.map((item) => (
          <RevealItem
            as="li"
            key={item.role}
            className="shine-on-hover rounded-xl border border-border bg-surface-1 p-6 transition-colors duration-(--dur-base) hover:border-primary/50"
          >
            <h3 className="text-lg font-semibold">{item.role}</h3>
            <p className="mt-1 font-mono text-sm tabular-nums text-primary">{item.period}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  )
}
