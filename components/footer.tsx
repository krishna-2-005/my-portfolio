import SocialIcons from '@/components/social-icons'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © <span className="tabular-nums">2026</span> {profile.fullName}. All rights reserved.
        </p>
        <SocialIcons />
        <a
          href="#home"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-(--dur-fast) hover:border-primary/50 hover:text-foreground"
        >
          Back to top
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V5m-6 6 6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
