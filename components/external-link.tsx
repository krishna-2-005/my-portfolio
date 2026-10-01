import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
  href: string
  children: ReactNode
  /** Show the ↗ glyph after the label (default true). */
  arrow?: boolean
}

/** Link to another site: new tab, noopener, a ↗ glyph, and a screen-reader hint. */
export default function ExternalLink({ href, children, arrow = true, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      {arrow && <span aria-hidden="true">↗</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
