import Image from 'next/image'
import DownloadSwitch from '@/components/download-switch'
import SocialIcons from '@/components/social-icons'
import ViewProjectsButton from '@/components/view-projects-button'
import { profile } from '@/content/profile'

function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="glass noise relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl shadow-primary/20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
        <div className="absolute -left-8 top-10 size-28 animate-float rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-10 bottom-10 size-16 animate-float rounded-full bg-accent/30 blur-2xl [animation-delay:200ms]" />

        <Image
          src={profile.photo}
          alt={profile.fullName}
          fill
          priority
          sizes="(min-width: 768px) 384px, 90vw"
          className="object-contain"
        />

        <figure className="absolute inset-x-5 bottom-5 rounded-xl border border-border/60 bg-background/75 px-4 py-3 backdrop-blur-md">
          <blockquote className="text-center text-sm text-muted-foreground">&ldquo;{profile.quote}&rdquo;</blockquote>
        </figure>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_40%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%),radial-gradient(40%_40%_at_15%_80%,color-mix(in_oklch,var(--accent)_10%,transparent),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page grid grid-cols-1 items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 id="home-title" className="text-display font-semibold">
              <span className="text-gradient-animated">{profile.firstName}</span>
              <br />
              <span>{profile.lastName}</span>
            </h1>
            <p className="text-lead font-light text-muted-foreground">{profile.headline}</p>
          </div>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{profile.tagline}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <DownloadSwitch />
            <ViewProjectsButton href="#projects" />
          </div>

          <SocialIcons className="-ml-3 pt-4" />
        </div>

        <ProfileCard />
      </div>
    </section>
  )
}
