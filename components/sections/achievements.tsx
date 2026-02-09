export default function Achievements() {
  const achievements = [
    {
      icon: '🥇',
      title: 'Winner – Hackathon Challenge',
      date: 'Feb 2025',
      description: 'Secured 1st place by developing an innovative software solution, demonstrating problem-solving and teamwork skills.',
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

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Achievements & Awards
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{achievement.title}</h3>
              <p className="text-sm text-primary font-medium mb-3">{achievement.date}</p>
              <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
