import type { Achievement, EducationItem, LeadershipRole } from './types'

export const education: EducationItem[] = [
  {
    title: 'B.Tech – Computer Science Engineering (Data Science)',
    institution: 'Narsee Monjee Institute of Management Studies (NMIMS), Hyderabad',
    period: '2023 – Present',
    details: [
      'CGPA: 3.73 / 4.0 (up to Semester 5)',
      'Relevant Coursework: Data Structures & Algorithms, Machine Learning, Database Management Systems, Statistics for Data Science',
    ],
  },
  {
    title: 'Class XII – MPC (Telangana State Board)',
    institution: 'Vignan Junior College, Hyderabad',
    period: '2021 – 2023',
    details: ['Percentage: 99%', 'State Third Rank, Telangana – 2023'],
  },
  {
    title: 'Class X (Telangana State Board)',
    institution: 'Panchavati Vidyalaya, Mahabubnagar',
    period: '2021',
    details: ['GPA: 10/10'],
  },
]

export const achievements: Achievement[] = [
  {
    icon: '🥇',
    title: 'Winner – Hackathon Challenge',
    date: 'Feb 2025',
    description:
      'Secured 1st place by developing an innovative software solution, demonstrating problem-solving and teamwork skills.',
  },
  {
    icon: '🥈',
    title: 'Runner-Up – Robo Rumble',
    date: 'Feb 2025',
    description: 'Competed against multiple teams and showcased robotics and technical problem-solving skills.',
  },
  {
    icon: '🎨',
    title: 'Best UI/UX – Webathon 2.0',
    date: 'Mar 2025',
    description: 'Awarded for designing a clean, intuitive, and user-centric event management platform.',
  },
]

export const leadership: LeadershipRole[] = [
  {
    role: 'Head – SKILL ELGE (SDC)',
    period: 'Mar 2025 – Present',
    description: 'Enabled students to access internship opportunities and certifications for skill enhancement.',
  },
  {
    role: 'Content Team Member – STME Research Club',
    period: 'Feb 2024 – Present',
    description: 'Contributed to research discussions and collaborative academic content creation.',
  },
  {
    role: 'Community Service – Sannidhi Orphan Home',
    period: 'Apr 2024 – Jul 2024',
    description: 'Guided children, organized fundraising activities, and taught basic computing skills.',
  },
  {
    role: 'Social Media Manager – Impulse Sports Club',
    period: 'Sep 2023 – Sep 2024',
    description: 'Managed digital presence and promoted events to encourage student engagement.',
  },
]
