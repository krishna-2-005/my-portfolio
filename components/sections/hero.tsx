import Image from 'next/image'
import ExternalLink from '@/components/external-link'
import SocialIcons from '@/components/social-icons'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="pb-10 pt-8 md:pb-14 md:pt-14"
    >
      <div className="container-page grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div>
          {/* Mobile: a small portrait beside the status line instead of the large frame (only one is ever displayed). */}
          <div className="mb-5 flex items-center gap-3">
            <Image
              src={profile.photo}
              alt={profile.fullName}
              width={56}
              height={56}
              priority
              className="size-14 rounded-ui border border-border bg-surface object-cover object-[50%_8%] md:hidden"
            />
            <p className="inline-flex items-center gap-2 text-small text-muted-foreground">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              {profile.status}
            </p>
          </div>

          <h1 id="home-title" className="text-hero">
            {profile.fullName}
          </h1>
          <p className="mt-3 text-title text-foreground">{profile.degree}</p>
          <p className="mt-1 text-body text-muted-foreground">{profile.focus.join(' • ')}</p>
          <p className="mt-4 max-w-[60ch] text-body text-muted-foreground">{profile.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <ExternalLink href={profile.resumeUrl} className="btn btn-secondary">
              Download Resume
            </ExternalLink>
          </div>

          <SocialIcons className="-ml-2.5 mt-4" />
          <p className="mt-2 text-small italic text-subtle-foreground md:hidden">&ldquo;{profile.quote}&rdquo;</p>
        </div>

        <figure className="hidden md:block">
          <div className="relative h-[300px] w-[240px] overflow-hidden rounded-ui border border-border bg-[radial-gradient(80%_60%_at_50%_30%,color-mix(in_srgb,var(--accent)_16%,var(--surface)),var(--surface))]">
            <Image
              src={profile.photo}
              alt={profile.fullName}
              fill
              priority
              sizes="240px"
              className="object-cover object-[50%_12%]"
            />
          </div>
          <figcaption className="mt-3 max-w-[240px] text-center text-small italic text-subtle-foreground">
            &ldquo;{profile.quote}&rdquo;
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
