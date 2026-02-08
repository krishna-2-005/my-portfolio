export default function Projects() {
  const projects = [
    {
      title: 'Diagnostics Center Management System',
      status: 'Deployed – Vijayawada',
      period: 'July 2025 – Present',
      tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL'],
      description:
        'Designed and developed a full-stack management system deployed at a diagnostics center in Vijayawada, currently in active use. Handles patient registration, diagnostic test records, billing, and report generation. Centralized database improved operational efficiency, reduced manual paperwork, and ensured accurate data handling.',
      github: 'https://github.com/krishna-2-005/DiagnosticsCenter-Management.git',
    },
    {
      title: 'ICA Tracker System',
      status: 'Deployed – NMIMS Hyderabad',
      period: 'March 2025 – December 2025',
      tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'XAMPP'],
      description:
        'Designed, developed, and deployed an Internal Continuous Assessment (ICA) Tracker used within NMIMS Hyderabad. Enables students and faculty to monitor academic performance and assessment records. Improved transparency and reduced manual effort in academic data management.',
      github: 'https://github.com/krishna-2-005/ica_tracker.git',
    },
    {
      title: 'Certificate App',
      status: 'Prototype',
      period: 'Feb 2026 – Present',
      tech: ['Java', 'Android', 'Firebase'],
      description:
        'Mobile app for creating and managing digital certificates with cloud-backed storage and simple verification workflows.',
      github: 'https://github.com/krishna-2-005/certificate_app.git',
    },
    {
      title: 'Emergency SOS App',
      status: 'Prototype',
      period: 'Feb 2026 – Present',
      tech: ['Kotlin', 'Android', 'Firebase'],
      description:
        'Android SOS utility that triggers emergency alerts, shares live location, and stores trusted contacts to streamline rapid assistance.',
      github: 'https://github.com/krishna-2-005/Emergency_SOS_App.git',
    },
    {
      title: 'DigiElev8 – Small Business Digital Growth Platform',
      status: 'In Development',
      period: 'Jan 2025 – Present',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      description:
        'Built a platform helping small businesses track inventory, analyze sales, and generate automated reports. Focused on real-time data analytics to support informed decision-making.',
      github: '#',
    },
    {
      title: 'Customer Churn Prediction System',
      status: 'In Development',
      period: 'Mar 2025 – Present',
      tech: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'Seaborn'],
      description:
        'Developed a machine learning model to predict customer churn in the telecom domain. Built an interactive dashboard for visual analysis and proactive retention strategies.',
      github: '#',
    },
    {
      title: 'NMIMS Event Management System',
      status: 'Awarded',
      period: 'Mar 2025 – Present',
      tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'XAMPP'],
      description:
        'Designed a user-friendly event management platform for organizing, scheduling, and coordinating institutional events. Recognized for intuitive UI/UX design at Webathon 2.0.',
      github: '#',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-sm text-primary font-medium">{project.status}</span>
                      <span className="text-sm text-muted-foreground">{project.period}</span>
                    </div>
                  </div>
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                    >
                      View on GitHub
                    </a>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
