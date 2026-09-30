import type { Achievement, EducationItem, ExperienceItem, LeadershipRole } from './types'

export const experience: ExperienceItem[] = [
  {
    role: 'AI & Data Science Intern',
    company: 'XYlofy AI',
    mode: 'Remote',
    period: 'Jun 15 – Jul 15, 2026',
    points: [
      'Built and evaluated regression models for house-price prediction with full EDA, categorical encoding, and feature-importance analysis to surface the key price drivers; delivered charts and a summary report.',
      'Modeled employee-attrition risk on the IBM HR Analytics dataset (1,470 employee records), identifying top churn drivers such as overtime, tenure, and compensation through classification and visual analytics.',
      'Developed an interactive Streamlit sales-forecasting dashboard over 9,800 retail orders ($2.26M sales, 2015–2018); benchmarked SARIMA, Prophet, and XGBoost (best MAPE 14.81%), and added Isolation Forest anomaly detection plus K-Means/PCA product clustering with an executive insights summary.',
    ],
    links: [
      { label: 'House Price Prediction', href: 'https://github.com/krishna-2-005/HousePricePrediction_Kuchurusaikrishnareddy' },
      { label: 'Employee Attrition', href: 'https://github.com/krishna-2-005/EmployeeAttrition_KuchuruSaiKrishnaReddy' },
      { label: 'Sales Forecasting', href: 'https://github.com/krishna-2-005/SalesForecasting_KuchuruSaiKrishnaReddy' },
    ],
  },
]

export const education: EducationItem[] = [
  {
    title: 'B.Tech – Computer Science Engineering (Data Science)',
    institution: "STME, SVKM's NMIMS University, Hyderabad",
    period: '2023 – 2027',
    details: [
      'CGPA: 3.74 / 4.0',
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
    title: '1st Place – NMIMS Hackathon',
    date: 'Feb 2025',
    description: 'Architected a scalable Digital Growth Platform for small and medium businesses; ranked 1st among 20+ teams.',
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
    description:
      'Awarded Best UI at NMIMS STME Hyderabad for designing a clean, intuitive, and user-centric event management platform.',
  },
]

export const leadership: LeadershipRole[] = [
  {
    role: 'Student Mentor – SDC ELGE, NMIMS Hyderabad',
    period: '2026 – Present',
    description: 'Guiding the 2026–27 core team and sub-branch ambassadors across 5 schools.',
  },
  {
    role: 'Head – SDC, STME ELGE Club',
    period: 'Mar 2025 – 2026',
    description:
      'Led a 53-member team to deliver 13 events in AY 2025–26 (learnathons, workshops, career talks) and ran 13 industry skill partnerships (AWS, Google Cloud, MongoDB, Salesforce, IBM).',
  },
  {
    role: 'Senior Member – Placement Committee (Placecom), STME NMIMS Hyderabad',
    period: '2025 – Present',
    description: 'Student–recruiter coordination for campus placements.',
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
