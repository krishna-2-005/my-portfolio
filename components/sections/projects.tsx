import ProjectShowcase from '@/components/projects/project-deck'
import Section from '@/components/section'
import { projectCategories, projects } from '@/content/projects'

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects" eyebrow="03">
      <ProjectShowcase projects={projects} categories={projectCategories} />
    </Section>
  )
}
