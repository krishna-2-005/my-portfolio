import DownloadSwitch from '@/components/download-switch'
import ViewProjectsButton from '@/components/view-projects-button'
import Image from 'next/image'

function ProfileCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-background to-primary/10 shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-primary/30 blur-3xl animate-profile-float" />
        <div className="absolute -right-10 bottom-10 h-16 w-16 rounded-full bg-accent/40 blur-2xl animate-profile-float [animation-delay:200ms]" />
        <div className="absolute left-8 bottom-6 h-28 w-28 rounded-full bg-primary/25 blur-3xl animate-profile-float [animation-delay:400ms]" />

        <Image
          src="/profile_photo.png"
          alt="Kuchuru Sai Krishna Reddy"
          fill
          priority
          quality={100}
          sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 100vw"
          className="object-contain"
        />

        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm px-4 py-3 shadow-lg">
          <p className="text-center text-sm text-muted-foreground">"Sometimes You Win, Sometimes You Learn"</p>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Kuchuru Sai
              </span>
              <br />
              <span className="text-foreground">Krishna Reddy</span>
            </h1>
            <p className="text-2xl text-muted-foreground font-light">
              B.Tech CSE (Data Science) | Full-Stack & Machine Learning Developer
            </p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Building real-world, data-driven and full-stack systems deployed in production environments.
          </p>

          <div className="flex gap-3 pt-4 items-center">
            <div className="-translate-x-1">
              <DownloadSwitch />
            </div>
            <ViewProjectsButton href="#projects" />
          </div>

          <div className="flex gap-6 pt-8">
            <a
              href="https://github.com/krishna-2-005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kuchuru-sai-krishna-reddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.667-2.236-1.19 0-1.674.792-1.95 1.56-.1.245-.125.587-.125.932v5.313h-3.557v-9.52h3.414v1.291h.046c.478-.704 1.333-1.87 3.275-1.87 2.368 0 4.144 1.543 4.144 4.852v5.247zM5.337 8.855c-1.144 0-2.088-.847-2.088-1.894s.944-1.894 2.088-1.894c1.142 0 2.088.846 2.088 1.894s-.946 1.894-2.088 1.894zm1.752 11.597H3.585V9.017h3.504v11.435zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:kuchurusaikrishnareddy@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        <ProfileCard />
      </div>
    </div>
  )
}
