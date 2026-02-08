export default function Leadership() {
  const leadership = [
    {
      role: 'Head – SKILL ELGE (SDC)',
      period: 'Mar 2025 – Present',
      description:
        'Enabled students to access internship opportunities and certifications for skill enhancement.',
    },
    {
      role: 'Content Team Member – STME Research Club',
      period: 'Feb 2024 – Present',
      description:
        'Contributed to research discussions and collaborative academic content creation.',
    },
    {
      role: 'Community Service – Sannidhi Orphan Home',
      period: 'Apr 2024 – Jul 2024',
      description:
        'Guided children, organized fundraising activities, and taught basic computing skills.',
    },
    {
      role: 'Social Media Manager – Impulse Sports Club',
      period: 'Sep 2023 – Sep 2024',
      description: 'Managed digital presence and promoted events to encourage student engagement.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Leadership & Community
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">{item.role}</h3>
              <p className="text-sm text-primary font-medium mb-3">{item.period}</p>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
