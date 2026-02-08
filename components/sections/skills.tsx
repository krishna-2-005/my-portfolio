export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Python', 'C++', 'JavaScript'],
    },
    {
      title: 'Web & Full-Stack',
      skills: ['HTML', 'CSS', 'React', 'AngularJS', 'Node.js', 'PHP'],
    },
    {
      title: 'Data Science & Analytics',
      skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'Matplotlib', 'Seaborn'],
    },
    {
      title: 'Databases & Backend',
      skills: ['SQL', 'Firebase', 'Supabase', 'XAMPP'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git & GitHub', 'VS Code', 'Google Cloud Platform', 'Google Colab'],
    },
    {
      title: 'Hardware & Smart Systems',
      skills: ['Arduino', 'AutoCAD', 'TinkerCAD'],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
