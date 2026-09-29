import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ViewProjectsButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

/** Light pill that fills with dark from the left on hover. */
export default function ViewProjectsButton({ children, className, ...props }: ViewProjectsButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        'group relative isolate inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-foreground px-7 font-semibold text-background shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)] transition-colors duration-(--dur-base) ease-out-expo hover:text-foreground active:translate-y-px',
        'before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-full before:bg-surface-2 before:transition-transform before:duration-(--dur-base) before:ease-out-expo hover:before:scale-x-100',
        className,
      )}
    >
      {children ?? 'View Projects'}
    </a>
  )
}
