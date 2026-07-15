import Link from 'next/link'
import type { ReactNode } from 'react'

type JourneyTransitionLinkProps = {
  href?: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
  ariaLabel?: string
}

export default function JourneyTransitionLink({
  href = '/plan',
  className = '',
  children,
  onNavigate,
  ariaLabel,
}: JourneyTransitionLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onNavigate}
      prefetch
    >
      {children}
    </Link>
  )
}
