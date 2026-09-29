import Image from 'next/image'
import Section from '@/components/section'
import { certifications } from '@/content/certifications'

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Badges" eyebrow="07">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <li
            key={cert.title}
            className="shine-on-hover flex flex-col gap-4 rounded-xl border border-border bg-surface-1 p-5 transition-colors duration-(--dur-base) hover:border-primary/50"
          >
            {cert.image && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
            )}

            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold leading-tight">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
              {(cert.issued || cert.hours) && (
                <div className="flex flex-wrap gap-2 text-xs tabular-nums text-muted-foreground">
                  {cert.issued && <span className="rounded-full bg-surface-3 px-2 py-1">Issued {cert.issued}</span>}
                  {cert.hours && <span className="rounded-full bg-surface-3 px-2 py-1">{cert.hours}</span>}
                </div>
              )}
            </div>

            {cert.badge && (
              <a
                href={cert.badge}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent"
              >
                View credential
                <span className="sr-only"> for {cert.title} (opens in a new tab)</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
