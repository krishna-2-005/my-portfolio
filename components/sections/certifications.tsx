import CertCarousel from '@/components/certifications/cert-carousel'
import Section from '@/components/section'
import { certifications } from '@/content/certifications'

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Badges" eyebrow="07">
      <CertCarousel certifications={certifications} />
    </Section>
  )
}
