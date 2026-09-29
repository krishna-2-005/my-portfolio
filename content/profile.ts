import type { ContactItem, SocialLink } from './types'

export const profile = {
  firstName: 'Kuchuru Sai',
  lastName: 'Krishna Reddy',
  fullName: 'Kuchuru Sai Krishna Reddy',
  initials: 'KSK',
  headline: 'B.Tech CSE (Data Science) | Full-Stack & Machine Learning Developer',
  tagline: 'Building real-world, data-driven and full-stack systems deployed in production environments.',
  quote: 'Sometimes You Win, Sometimes You Learn',
  photo: '/profile-photo.webp',
  resumeUrl: 'https://drive.google.com/file/d/1_LvmLBLdMovB4ftwMyY59UbUDEbSv1sg/view?usp=sharing',
  email: 'kuchurusaikrishnareddy@gmail.com',
} as const

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/krishna-2-005' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kuchuru-sai-krishna-reddy/' },
  { label: 'Email', href: 'mailto:kuchurusaikrishnareddy@gmail.com' },
]

export const contactInfo: ContactItem[] = [
  {
    label: 'Email',
    value: 'kuchurusaikrishnareddy@gmail.com',
    href: 'mailto:kuchurusaikrishnareddy@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91-9392123577',
    href: 'tel:+919392123577',
  },
]

export const contactCopy = {
  badge: 'Available for collaborations & roles',
  pitch:
    "Let's build something bold. Whether it's a data-driven product, a full-stack launch, or a quick brainstorm, I reply fast and ship faster.",
  tags: ['Product-ready builds', 'ML + full-stack', 'Quick turnarounds'],
  presetMessages: [
    'I would like to collaborate on a project.',
    'I have a freelance opportunity for you.',
    'I just wanted to say hello!',
  ],
  successMessage: "Thank you! I'll get back to you soon.",
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']
