import SocialIcons from '@/components/social-icons'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-subtle-foreground">
          © <span className="tabular-nums">{new Date().getFullYear()}</span> {profile.fullName} · Built with Next.js
        </p>
        <div className="flex items-center gap-2">
          <SocialIcons />
          <a href="#home" className="link inline-flex h-10 items-center px-2 text-small font-medium">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
