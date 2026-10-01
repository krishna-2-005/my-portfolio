import { socials } from '@/content/profile'
import type { SocialLink } from '@/content/types'
import { cn } from '@/lib/utils'

const paths: Record<SocialLink['label'], React.ReactNode> = {
  GitHub: (
    <path
      fill="currentColor"
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
  ),
  LinkedIn: (
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.667-2.236-1.19 0-1.674.792-1.95 1.56-.1.245-.125.587-.125.932v5.313h-3.557v-9.52h3.414v1.291h.046c.478-.704 1.333-1.87 3.275-1.87 2.368 0 4.144 1.543 4.144 4.852v5.247zM5.337 8.855c-1.144 0-2.088-.847-2.088-1.894s.944-1.894 2.088-1.894c1.142 0 2.088.846 2.088 1.894s-.946 1.894-2.088 1.894zm1.752 11.597H3.585V9.017h3.504v11.435zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  ),
  Email: (
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
}

export default function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={cn('flex gap-2', className)}>
      {socials.map((social) => {
        const external = social.href.startsWith('http')
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors duration-(--dur-fast) hover:bg-surface-3 hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                {paths[social.label]}
              </svg>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
