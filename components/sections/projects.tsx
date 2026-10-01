import ProjectCard from '@/components/projects/project-card'
import Section from '@/components/section'
import { projectCategories, projects } from '@/content/projects'

/** Both categories are shown in full, each as a 2-column grid; deployed work leads its group. */
export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="space-y-10">
        {projectCategories.map((cat) => {
          const items = projects.filter((p) => p.category === cat.id)
          return (
            <div key={cat.id}>
              <p className="label-caps mb-3">
                {cat.label} <span className="tabular-nums">· {items.length}</span>
              </p>
              <ul className="grid items-start gap-4 md:grid-cols-2" aria-label={`${cat.label} projects`}>
                {items.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
