import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ViewProjectsButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

/** Glass pill that floods with light from the left on hover; the arrow slides through. */
export default function ViewProjectsButton({ children, className, ...props }: ViewProjectsButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        'glass group relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-7 pr-5 font-semibold text-foreground transition-colors duration-(--dur-base) ease-out-expo hover:text-background',
        'after:absolute after:inset-0 after:-z-10 after:origin-left after:scale-x-0 after:rounded-full after:bg-foreground after:transition-transform after:duration-(--dur-slow) after:ease-out-expo hover:after:scale-x-100',
        className,
      )}
    >
      {children ?? 'View Projects'}
      <span className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-foreground/10 transition-colors duration-(--dur-base) group-hover:bg-background/10">
        <svg
          viewBox="0 0 24 24"
          className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute size-4 -translate-x-6 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </span>
    </a>
  )
}
