import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'
import ContactForm from '@/components/sections/contact-form'
import { contactCopy, contactInfo } from '@/content/profile'

export default function Contact() {
  return (
    <Section id="contact" title="Get In Touch" eyebrow="08">
      <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-2" stagger={0.15}>
        <RevealItem className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {contactCopy.badge}
          </p>

          <p className="text-lead text-foreground">{contactCopy.pitch}</p>

          <ul className="flex flex-wrap gap-2">
            {contactCopy.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>

          <ul className="space-y-3">
            {contactInfo.map((info) => (
              <li key={info.label}>
                <a
                  href={info.href}
                  className="shine-on-hover flex flex-col gap-1 rounded-xl border border-border bg-surface-1 p-4 transition-colors duration-(--dur-base) hover:border-primary/50"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{info.label}</span>
                  <span className="break-words font-semibold tabular-nums">{info.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem>
          <ContactForm />
        </RevealItem>
      </Reveal>
    </Section>
  )
}
