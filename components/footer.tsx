import BackToTop from '@/components/back-to-top'
import SocialIcons from '@/components/social-icons'
import { navItems, profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(60%_80%_at_50%_120%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%)]"
      />
      <div className="container-page relative py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Currently seeking internships</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block break-all font-display text-[clamp(1.5rem,1rem+2.4vw,3rem)] font-semibold tracking-tight transition-colors duration-(--dur-base) hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
          <BackToTop />
        </div>

        <nav aria-label="Footer" className="mt-14 border-t border-border/70 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {navItems
              .filter((item) => item.id !== 'home')
              .map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            © <span className="tabular-nums">{new Date().getFullYear()}</span> {profile.fullName}
            <span className="mx-2 text-border">·</span>
            Built with Next.js + Three.js
          </p>
          <SocialIcons className="-mr-3" />
        </div>
      </div>
    </footer>
  )
}
