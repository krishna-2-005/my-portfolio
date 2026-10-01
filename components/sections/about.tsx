import CountUp from '@/components/motion/count-up'
import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'
import SpotlightCard from '@/components/spotlight-card'
import { certifications } from '@/content/certifications'
import { achievements } from '@/content/experience'
import { projects } from '@/content/projects'

// Derived from the content files, so they stay true as projects and certificates are added.
const stats = [
  { value: projects.filter((p) => p.status === 'Deployed').length, label: 'Systems live in production' },
  { value: projects.length, label: 'Projects built' },
  { value: certifications.length, label: 'Certifications' },
  { value: achievements.length, label: 'Awards & wins' },
]

export default function About() {
  return (
    <Section id="about" title="About Me" eyebrow="01">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-6 text-lead text-muted-foreground" stagger={0.12}>
          <RevealItem as="p">
            I am a Computer Science (Data Science) undergraduate at NMIMS Hyderabad, passionate about building
            practical, real-world software solutions that solve meaningful problems.
          </RevealItem>
          <RevealItem as="p">
            What sets me apart is my experience in designing, developing, and deploying systems used by real users. I
            have successfully deployed a{' '}
            <span className="font-medium text-foreground">Diagnostics Center Management System in Vijayawada</span> and
            an <span className="font-medium text-foreground">ICA Tracker system</span> used within my college, giving me
            hands-on exposure to real operational environments beyond academic projects.
          </RevealItem>
          <RevealItem as="p">
            My interests span <span className="font-medium text-primary">full-stack development</span>,{' '}
            <span className="font-medium text-primary">data analytics</span>, and{' '}
            <span className="font-medium text-primary">machine learning</span>, and I enjoy working at the intersection
            of technology and impact. I actively participate in hackathons, technical events, and leadership roles,
            constantly striving to improve both my technical and collaborative skills.
          </RevealItem>
          <RevealItem as="p">
            I am currently seeking <span className="font-medium text-accent">internship opportunities</span> where I can
            contribute to real products, learn from industry professionals, and grow as a software engineer and data
            scientist.
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="grid h-fit grid-cols-2 gap-4 lg:sticky lg:top-28" stagger={0.1} aria-label="At a glance">
          {stats.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <SpotlightCard className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-surface-1/90 p-6">
                <CountUp
                  value={stat.value}
                  className="text-gradient font-display text-[clamp(2.75rem,2rem+2.5vw,4rem)] font-semibold leading-none tracking-tight tabular-nums"
                />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </SpotlightCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
