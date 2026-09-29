import { Reveal, RevealItem } from '@/components/motion/reveal'
import Section from '@/components/section'

export default function About() {
  return (
    <Section id="about" title="About Me" eyebrow="01">
      <Reveal className="max-w-3xl space-y-6 text-lead text-muted-foreground" stagger={0.12}>
        <RevealItem as="p">
          I am a Computer Science (Data Science) undergraduate at NMIMS Hyderabad, passionate about building practical,
          real-world software solutions that solve meaningful problems.
        </RevealItem>
        <RevealItem as="p">
          What sets me apart is my experience in designing, developing, and deploying systems used by real users. I have
          successfully deployed a{' '}
          <span className="font-medium text-foreground">Diagnostics Center Management System in Vijayawada</span> and an{' '}
          <span className="font-medium text-foreground">ICA Tracker system</span> used within my college, giving me
          hands-on exposure to real operational environments beyond academic projects.
        </RevealItem>
        <RevealItem as="p">
          My interests span <span className="font-medium text-primary">full-stack development</span>,{' '}
          <span className="font-medium text-primary">data analytics</span>, and{' '}
          <span className="font-medium text-primary">machine learning</span>, and I enjoy working at the intersection of
          technology and impact. I actively participate in hackathons, technical events, and leadership roles,
          constantly striving to improve both my technical and collaborative skills.
        </RevealItem>
        <RevealItem as="p">
          I am currently seeking <span className="font-medium text-accent">internship opportunities</span> where I can
          contribute to real products, learn from industry professionals, and grow as a software engineer and data
          scientist.
        </RevealItem>
      </Reveal>
    </Section>
  )
}
