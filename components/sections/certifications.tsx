import CertCarousel from '@/components/certifications/cert-carousel'
import Section from '@/components/section'
import { certifications } from '@/content/certifications'
import { profile } from '@/content/profile'

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Badges" eyebrow="08">
      <CertCarousel certifications={certifications} />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Every badge is verifiable on{' '}
        <a
          href={profile.credly}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:text-accent hover:underline"
        >
          my Credly profile<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </Section>
  )
}
