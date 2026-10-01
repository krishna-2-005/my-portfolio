import ExternalLink from '@/components/external-link'
import Section from '@/components/section'
import ContactForm from '@/components/sections/contact-form'
import { contactCopy, contactInfo, socials } from '@/content/profile'

const links = [
  ...contactInfo.map((c) => ({ label: c.label, value: c.value, href: c.href })),
  ...socials
    .filter((s) => s.href.startsWith('http'))
    .map((s) => ({ label: s.label, value: s.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), href: s.href })),
]

export default function Contact() {
  return (
    <Section id="contact" title="Get In Touch" tight>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 text-small text-muted-foreground">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {contactCopy.badge}
          </p>
          <p className="mt-3 max-w-[60ch] text-muted-foreground">{contactCopy.pitch}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="What I offer">
            {contactCopy.tags.map((t) => (
              <li key={t} className="chip text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>

          <dl className="mt-6 divide-y divide-border border-y border-border">
            {links.map((l) => {
              const external = l.href.startsWith('http')
              return (
                <div key={l.label} className="grid grid-cols-[88px_1fr] items-center gap-3 py-2.5">
                  <dt className="label-caps">{l.label}</dt>
                  <dd className="min-w-0 break-all">
                    {external ? (
                      <ExternalLink href={l.href} className="link tap inline-flex gap-1">
                        {l.value}
                      </ExternalLink>
                    ) : (
                      <a href={l.href} className="link tap tabular-nums">
                        {l.value}
                      </a>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
