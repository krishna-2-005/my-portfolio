import ProjectDeck from '@/components/projects/project-deck'
import Section from '@/components/section'
import { projects } from '@/content/projects'

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects" eyebrow="03">
      <ProjectDeck projects={projects} />
    </Section>
  )
}
