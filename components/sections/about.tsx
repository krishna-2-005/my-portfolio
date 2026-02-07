export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am a Computer Science (Data Science) undergraduate at NMIMS Hyderabad, passionate about building practical, real-world software solutions that solve meaningful problems.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            What sets me apart is my experience in designing, developing, and deploying systems used by real users. I have successfully deployed a{' '}
            <span className="text-primary font-medium">Diagnostics Center Management System in Vijayawada</span> and an{' '}
            <span className="text-primary font-medium">ICA Tracker system</span> used within my college, giving me hands-on exposure to real operational environments beyond academic projects.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            My interests span <span className="text-accent font-medium">full-stack development</span>, <span className="text-accent font-medium">data analytics</span>, and{' '}
            <span className="text-accent font-medium">machine learning</span>, and I enjoy working at the intersection of technology and impact. I actively participate in hackathons, technical events, and leadership roles, constantly striving to improve both my technical and collaborative skills.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            I am currently seeking <span className="text-primary font-medium">internship opportunities</span> where I can contribute to real products, learn from industry professionals, and grow as a software engineer and data scientist.
          </p>
        </div>
      </div>
    </div>
  )
}
