import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'diagnostics-center',
    title: 'Diagnostics Center Management System',
    status: 'Deployed',
    location: 'Vijayawada',
    period: 'July 2025 – Present',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    description:
      'Designed and developed a full-stack management system deployed at a diagnostics center in Vijayawada, currently in active use. Handles patient registration, diagnostic test records, billing, and report generation. Centralized database improved operational efficiency, reduced manual paperwork, and ensured accurate data handling.',
    github: 'https://github.com/krishna-2-005/DiagnosticsCenter-Management.git',
  },
  {
    slug: 'ica-tracker',
    title: 'ICA Tracker System',
    status: 'Deployed',
    location: 'NMIMS Hyderabad',
    period: 'March 2025 – December 2025',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'XAMPP'],
    description:
      'Designed, developed, and deployed an Internal Continuous Assessment (ICA) Tracker used within NMIMS Hyderabad. Enables students and faculty to monitor academic performance and assessment records. Improved transparency and reduced manual effort in academic data management.',
    github: 'https://github.com/krishna-2-005/ica_tracker.git',
  },
  {
    slug: 'certificate-app',
    title: 'Certificate App',
    status: 'Prototype',
    period: 'Feb 2026 – Present',
    tech: ['Java', 'Android', 'Firebase'],
    description:
      'Mobile app for creating and managing digital certificates with cloud-backed storage and simple verification workflows.',
    github: 'https://github.com/krishna-2-005/certificate_app.git',
  },
  {
    slug: 'emergency-sos',
    title: 'Emergency SOS App',
    status: 'Prototype',
    period: 'Feb 2026 – Present',
    tech: ['Kotlin', 'Android', 'Firebase'],
    description:
      'Android SOS utility that triggers emergency alerts, shares live location, and stores trusted contacts to streamline rapid assistance.',
    github: 'https://github.com/krishna-2-005/Emergency_SOS_App.git',
  },
  {
    slug: 'digielev8',
    title: 'DigiElev8 – Small Business Digital Growth Platform',
    status: 'In Development',
    period: 'Jan 2025 – Present',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    description:
      'Built a platform helping small businesses track inventory, analyze sales, and generate automated reports. Focused on real-time data analytics to support informed decision-making.',
  },
  {
    slug: 'churn-prediction',
    title: 'Customer Churn Prediction System',
    status: 'In Development',
    period: 'Mar 2025 – Present',
    tech: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'Seaborn'],
    description:
      'Developed a machine learning model to predict customer churn in the telecom domain. Built an interactive dashboard for visual analysis and proactive retention strategies.',
  },
  {
    slug: 'nmims-events',
    title: 'NMIMS Event Management System',
    status: 'Awarded',
    period: 'Mar 2025 – Present',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'XAMPP'],
    description:
      'Designed a user-friendly event management platform for organizing, scheduling, and coordinating institutional events. Recognized for intuitive UI/UX design at Webathon 2.0.',
  },
]
