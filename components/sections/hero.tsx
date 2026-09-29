import Image from 'next/image'
import DownloadSwitch from '@/components/download-switch'
import HeroCanvas from '@/components/hero/hero-canvas'
import HeroFade from '@/components/hero/hero-fade'
import HeroName from '@/components/hero/hero-name'
import TiltCard from '@/components/hero/tilt-card'
import Magnetic from '@/components/motion/magnetic'
import SocialIcons from '@/components/social-icons'
import ViewProjectsButton from '@/components/view-projects-button'
import { profile } from '@/content/profile'

function ProfileCard() {
  return (
    <TiltCard className="mx-auto w-full max-w-[22rem]">
      {/* Frosted layer is a sibling, not the 3D parent: backdrop-filter would flatten preserve-3d. */}
      <div className="glass absolute inset-0 rounded-2xl shadow-[0_30px_80px_-20px_color-mix(in_oklch,var(--primary)_45%,transparent)]" />
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/70" />
        <Image
          src={profile.photo}
          alt={profile.fullName}
          fill
          priority
          sizes="(min-width: 768px) 352px, 90vw"
          className="object-contain object-bottom"
        />
      </div>
      <figure className="absolute inset-x-4 bottom-4 rounded-xl border border-border/70 bg-surface-1/90 px-4 py-3 shadow-xl [transform:translateZ(48px)]">
        <blockquote className="text-center text-sm text-muted-foreground">&ldquo;{profile.quote}&rdquo;</blockquote>
      </figure>
      <div className="absolute -right-3 top-6 rounded-full border border-accent/40 bg-surface-1/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-accent shadow-lg [transform:translateZ(70px)]">
        <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-accent align-middle" aria-hidden="true" />
        Open to internships
      </div>
    </TiltCard>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-20 pt-28"
    >
      <HeroCanvas />

      <div className="container-page grid grid-cols-1 items-center gap-14 md:grid-cols-[1.25fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-6">
            <HeroName
              id="home-title"
              lines={[{ text: profile.firstName, gradient: true }, { text: profile.lastName }]}
            />
            <HeroFade delay={0.55}>
              <p className="max-w-xl text-lead font-light text-foreground/85">{profile.headline}</p>
            </HeroFade>
          </div>

          <HeroFade delay={0.7}>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{profile.tagline}</p>
          </HeroFade>

          <HeroFade delay={0.85} className="flex flex-wrap items-center gap-3 pt-2">
            <Magnetic>
              <DownloadSwitch />
            </Magnetic>
            <Magnetic>
              <ViewProjectsButton href="#projects" />
            </Magnetic>
          </HeroFade>

          <HeroFade delay={1}>
            <SocialIcons className="-ml-3" />
          </HeroFade>
        </div>

        <HeroFade delay={0.35} variant="scale">
          <ProfileCard />
        </HeroFade>
      </div>

      <HeroFade delay={1.2} className="absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-border" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_var(--ease-in-out-quart)_infinite] bg-accent" />
          </span>
        </a>
      </HeroFade>
    </section>
  )
}
