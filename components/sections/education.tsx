export default function Education() {
  const educationData = [
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
      details: ['Percentage: 99%'],
    },
    {
      title: 'Class X (Telangana State Board)',
      institution: 'Panchavati Vidyalaya, Mahabubnagar',
      period: '2021',
      details: ['GPA: 10/10'],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0"
            >
              <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background" />

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{edu.title}</h3>
                <p className="text-lg text-primary font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.period}</p>
              </div>

              <ul className="mt-4 space-y-2">
                {edu.details.map((detail, idx) => (
                  <li key={idx} className="text-muted-foreground flex items-start gap-3">
                    <span className="text-accent mt-1.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
