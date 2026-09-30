import type { Project, ProjectCategory } from './types'

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'aiml', label: 'AI / ML' },
]

export const projects: Project[] = [
  // ---------------------------------------------------------------- Full Stack
  {
    slug: 'diagnostics-center',
    title: 'Diagnostics Center Management System',
    category: 'fullstack',
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
    category: 'fullstack',
    status: 'Deployed',
    location: 'NMIMS Hyderabad',
    period: 'March 2025 – December 2025',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'XAMPP'],
    description:
      'Designed, developed, and deployed an Internal Continuous Assessment (ICA) Tracker used within NMIMS Hyderabad. Enables students and faculty to monitor academic performance and assessment records. Improved transparency and reduced manual effort in academic data management.',
    github: 'https://github.com/krishna-2-005/ica_tracker.git',
  },
  {
    slug: 'nmims-events',
    title: 'NMIMS Event Management System',
    category: 'fullstack',
    status: 'Awarded',
    period: 'Mar 2025 – Present',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'XAMPP'],
    description:
      'Designed a user-friendly event management platform for organizing, scheduling, and coordinating institutional events. Recognized for intuitive UI/UX design at Webathon 2.0.',
  },
  {
    slug: 'digielev8',
    title: 'DigiElev8 – Small Business Digital Growth Platform',
    category: 'fullstack',
    status: 'In Development',
    period: 'Jan 2025 – Present',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    description:
      'Built a platform helping small businesses track inventory, analyze sales, and generate automated reports. Focused on real-time data analytics to support informed decision-making.',
  },
  {
    slug: 'certificate-app',
    title: 'Certificate App',
    category: 'fullstack',
    status: 'Prototype',
    period: 'Feb 2026 – Present',
    tech: ['Android Studio', 'Java', 'Android', 'Firebase'],
    description:
      'Mobile app for creating and managing digital certificates with cloud-backed storage and simple verification workflows.',
    github: 'https://github.com/krishna-2-005/certificate_app.git',
  },
  {
    slug: 'emergency-sos',
    title: 'Emergency SOS App',
    category: 'fullstack',
    status: 'Prototype',
    period: 'Feb 2026 – Present',
    tech: ['Android Studio', 'Kotlin', 'Android', 'Firebase'],
    description:
      'Android SOS utility that triggers emergency alerts, shares live location, and stores trusted contacts to streamline rapid assistance.',
    github: 'https://github.com/krishna-2-005/Emergency_SOS_App.git',
  },

  // ---------------------------------------------------------------- AI / ML
  {
    slug: 'logistics-control-tower',
    title: 'Agentic AI Logistics Control Tower',
    category: 'aiml',
    status: 'Live Demo',
    period: 'Aug 2026 – Present',
    tech: ['Python', 'PySpark', 'Spark MLlib', 'Kafka', 'LangGraph', 'MCP', 'Next.js'],
    description:
      'Multi-agent AI control tower over a distributed PySpark delay-prediction pipeline, built on ~145K real Delhivery shipment records. The pipeline localises, corridor by corridor, where a production routing engine is systematically wrong; five LangGraph agents and an orchestrator then read logistics documents, enter orders, watch live shipments, resolve exceptions and validate invoices through an MCP server.',
    highlight: '273 corridors significantly slower and 512 faster than the network, at a 5% false discovery rate',
    team: 'Team of 3 · my role: AI Agents & Automation',
    github: 'https://github.com/krishna-2-005/Agentic-AI-Logistics-Control-Tower',
    live: 'https://control-tower-mu-rouge.vercel.app',
  },
  {
    slug: 'land-lekha',
    title: 'LandLekha – AI Land Record Digitization',
    category: 'aiml',
    status: 'Live Demo',
    period: 'Sep 2026',
    tech: ['Python', 'FastAPI', 'EasyOCR', 'React', 'GraphQL', 'AWS', 'Docker'],
    description:
      'Turns a scanned or photographed Indian land record — printed or handwritten, Hindi or English — into structured, validated data. Every field gets a calibrated confidence score: confident records are accepted automatically, and uncertain fields go to a verifier who checks only what was flagged. Built for Smart India Hackathon 2026 (Problem Statement 26018, Department of Land Resources).',
    highlight: '96.4% of the fields it does not flag are correct, on 40 held-out documents',
    team: 'Team of 6 · Smart India Hackathon 2026',
    github: 'https://github.com/Rayyan-mohammed/Land-Lekha',
    live: 'https://landlekha.in',
  },
  {
    slug: 'deepfake-detection',
    title: 'Code-Mixed Audio Deepfake Detection',
    category: 'aiml',
    status: 'In Development',
    period: 'Jul 2026 – Present',
    tech: ['Python', 'wav2vec2', 'LoRA', 'WebRTC', 'Twilio'],
    description:
      'An audio deepfake detector trained on English is quietly worse at Hinglish. This project measures that gap under a channel-matched telephony protocol, closes most of it with LoRA adaptation, and demonstrates it live — a cloned voice on a phone call triggers a beep in the receiver’s ear, a dashboard alert, and an SMS.',
    highlight: 'Hinglish error rate 44.65% → 1.34% EER (clean audio) after LoRA adaptation of 1.13% of parameters',
    team: 'Team project',
    github: 'https://github.com/Mounika-Reddy-0802/codemix-deepfake-detection',
  },
  {
    slug: 'skin-cancer',
    title: 'Skin Cancer Detection (HAM10000)',
    category: 'aiml',
    status: 'Prototype',
    period: 'Mar 2026 – Apr 2026',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Grad-CAM'],
    description:
      'End-to-end 7-class skin lesion classification on HAM10000 using TensorFlow transfer learning, served through a FastAPI inference endpoint with a React frontend and Grad-CAM visual explanations. Built for education and research — not a medical device.',
    github: 'https://github.com/krishna-2-005/Skin_Cancer_Detection',
  },
  {
    slug: 'churn-prediction',
    title: 'Customer Churn Prediction System',
    category: 'aiml',
    status: 'In Development',
    period: 'Mar 2025 – Present',
    tech: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'Seaborn'],
    description:
      'Developed a machine learning model to predict customer churn in the telecom domain. Built an interactive dashboard for visual analysis and proactive retention strategies.',
  },
]
