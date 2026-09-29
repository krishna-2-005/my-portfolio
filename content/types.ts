export type SocialLink = {
  label: 'GitHub' | 'LinkedIn' | 'Email'
  href: string
}

export type ContactItem = {
  label: string
  value: string
  href: string
}

export type EducationItem = {
  title: string
  institution: string
  period: string
  details: string[]
}

export type SkillCategory = {
  title: string
  skills: string[]
}

export type ProjectStatus = 'Deployed' | 'Awarded' | 'In Development' | 'Prototype'

export type Project = {
  slug: string
  title: string
  status: ProjectStatus
  /** Shown after the status, e.g. "Vijayawada" in "Deployed – Vijayawada". */
  location?: string
  period: string
  tech: string[]
  description: string
  /** Omitted when there is no public repository. */
  github?: string
}

export type Achievement = {
  icon: string
  title: string
  date: string
  description: string
}

export type LeadershipRole = {
  role: string
  period: string
  description: string
}

export type Certification = {
  title: string
  issuer: string
  issued?: string
  hours?: string
  badge?: string
  image?: string
  pdf?: string
}
