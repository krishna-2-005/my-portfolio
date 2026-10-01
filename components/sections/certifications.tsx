import CertList from '@/components/certifications/cert-list'
import ExternalLink from '@/components/external-link'
import Section from '@/components/section'
import { certifications } from '@/content/certifications'
import { profile } from '@/content/profile'

export default function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications & Badges"
      tight
      action={
        <p className="text-small text-muted-foreground">
          Every badge is verifiable on{' '}
          <ExternalLink href={profile.credly} className="link tap inline-flex gap-1" arrow={false}>
            my Credly profile
          </ExternalLink>
          .
        </p>
      }
    >
      <CertList certifications={certifications} />
    </Section>
  )
}
