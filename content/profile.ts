import type { ContactItem, SocialLink } from './types'

export const profile = {
  firstName: 'Kuchuru Sai',
  lastName: 'Krishna Reddy',
  fullName: 'Kuchuru Sai Krishna Reddy',
  initials: 'KSK',
  headline: 'B.Tech CSE (Data Science) | Full-Stack & Machine Learning Developer',
  /** Hero degree line and specialisations — split from the headline and the About copy. */
  degree: 'B.Tech CSE (Data Science) · NMIMS Hyderabad',
  focus: ['Full-Stack Development', 'Machine Learning', 'Data Analytics'],
  status: 'Seeking internship opportunities',
  tagline: 'Building real-world, data-driven and full-stack systems deployed in production environments.',
  quote: 'Sometimes You Win, Sometimes You Learn',
  photo: '/profile-cutout.webp',
  resumeUrl: 'https://drive.google.com/file/d/1_LvmLBLdMovB4ftwMyY59UbUDEbSv1sg/view?usp=sharing',
  email: 'kuchurusaikrishnareddy@gmail.com',
  credly: 'https://www.credly.com/users/sai-krishna-reddy-kuchuru',
} as const

/** About paragraphs, verbatim. `**…**` marks an emphasised phrase. */
export const about: string[] = [
  'I am a Computer Science (Data Science) undergraduate at NMIMS Hyderabad, passionate about building practical, real-world software solutions that solve meaningful problems.',
  'What sets me apart is my experience in designing, developing, and deploying systems used by real users. I have successfully deployed a **Diagnostics Center Management System in Vijayawada** and an **ICA Tracker system** used within my college, giving me hands-on exposure to real operational environments beyond academic projects.',
  'My interests span **full-stack development**, **data analytics**, and **machine learning**, and I enjoy working at the intersection of technology and impact. I actively participate in hackathons, technical events, and leadership roles, constantly striving to improve both my technical and collaborative skills.',
  'I am currently seeking **internship opportunities** where I can contribute to real products, learn from industry professionals, and grow as a software engineer and data scientist.',
]

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
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']
