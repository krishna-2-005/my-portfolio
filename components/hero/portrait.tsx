import Image from 'next/image'
import TiltCard from '@/components/hero/tilt-card'
import { profile } from '@/content/profile'
import { cn } from '@/lib/utils'

const RING_TEXT = 'OPEN TO INTERNSHIPS • FULL-STACK & ML • '
// Circumference of the r=38 text path, so the phrase wraps the ring exactly once.
const RING_LENGTH = 2 * Math.PI * 38

/** Circular text that slowly rotates — a badge stamped onto the portrait. */
function RingBadge({ className }: { className?: string }) {
  return (
    <div className={cn('grid size-28 place-items-center rounded-full bg-background/80 backdrop-blur-md', className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="ring-path" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text className="fill-foreground font-mono text-[8.6px] font-medium tracking-[0.12em]">
          <textPath href="#ring-path" textLength={RING_LENGTH} lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </div>
  )
}

function Chip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'absolute flex items-center gap-2.5 rounded-2xl max-sm:gap-2 max-sm:px-3 max-sm:py-2 border border-border/80 bg-surface-1/85 px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] backdrop-blur-md',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Cut-out portrait standing in a glowing disc: below the disc's centre line the photo is
 * clipped to the circle; above it the head and shoulders rise out of the frame.
 */
export default function Portrait() {
  return (
    <TiltCard glare={false} max={7} className="relative mx-auto w-full max-w-[25rem]">
      <div className="relative aspect-[4/5]">
        {/* Soft bloom behind everything */}
        <div className="absolute inset-x-[-10%] bottom-[-6%] top-[18%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_40%,transparent),color-mix(in_oklch,var(--primary)_12%,transparent)_60%,transparent)]" />

        {/* The disc — a square pinned to the bottom, so its centre sits at 60% of the height */}
        <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full">
          <div className="glow-ring absolute inset-0 rounded-full" />
          <div className="absolute inset-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_28%,color-mix(in_oklch,var(--primary)_75%,white_5%),color-mix(in_oklch,var(--primary)_35%,var(--background))_55%,var(--surface-1)_100%)]">
            <div className="dot-grid absolute inset-0 opacity-70" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/25 to-transparent" />
          </div>
        </div>

        {/* Photo: union of "everything above the disc centre" and "the disc itself" */}
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_closest-side_at_50%_60%,#000_99.4%,transparent_100%),linear-gradient(#000_0_0)] [mask-position:0_0,0_0] [mask-repeat:no-repeat] [mask-size:100%_100%,100%_60%]">
          <Image
            src={profile.photo}
            alt={profile.fullName}
            fill
            priority
            sizes="(min-width: 768px) 400px, 90vw"
            className="object-contain object-bottom drop-shadow-[0_20px_30px_rgb(0_0_0/0.45)]"
          />
        </div>

        {/* Floating facts — pulled from the content */}
        <Chip className="left-[-6%] top-[30%] animate-float max-sm:left-0 max-sm:top-[47%]">
          <span className="grid size-8 place-items-center rounded-full bg-success/15 text-success" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m5 12 5 5L20 7" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tabular-nums">2 systems</span>
            <span className="block text-xs text-muted-foreground">live in production</span>
          </span>
        </Chip>

        <Chip className="right-[-8%] top-[52%] animate-float [animation-delay:-2s] max-sm:right-0 max-sm:top-[66%]">
          <span className="text-2xl leading-none" aria-hidden="true">
            🥇
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold">Hackathon winner</span>
            <span className="block text-xs text-muted-foreground">Feb 2025</span>
          </span>
        </Chip>

        <Chip className="bottom-[6%] left-[-2%] animate-float [animation-delay:-4s] max-sm:left-0">
          <span className="leading-tight">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">CGPA · NMIMS</span>
            <span className="block font-display text-lg font-semibold tabular-nums">
              3.74<span className="text-sm text-muted-foreground"> / 4.0</span>
            </span>
          </span>
        </Chip>

        <RingBadge className="absolute right-[-4%] top-[4%] [transform:translateZ(40px)] max-sm:right-0" />
      </div>

      <p className="mt-6 text-center text-sm italic text-muted-foreground">&ldquo;{profile.quote}&rdquo;</p>
    </TiltCard>
  )
}
