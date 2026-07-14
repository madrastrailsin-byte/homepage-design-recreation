'use client'

import { MouseEvent, ReactNode, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const isTransitioning = useRef(false)

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    if (isTransitioning.current) return
    isTransitioning.current = true
    onNavigate?.()

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      router.push(href)
      return
    }

    const overlay = document.createElement('div')
    overlay.setAttribute('aria-hidden', 'true')
    overlay.className = 'mt-journey-transition-overlay'
    overlay.innerHTML = `
      <span class="mt-journey-transition-glow"></span>
      <span class="mt-journey-transition-vignette"></span>
    `

    document.body.appendChild(overlay)

    window.requestAnimationFrame(() => {
      overlay.classList.add('is-entering')
    })

    window.setTimeout(() => {
      router.push(href)
    }, 720)

    window.setTimeout(() => {
      overlay.classList.remove('is-entering')
      overlay.classList.add('is-leaving')
    }, 760)

    window.setTimeout(() => {
      overlay.remove()
      isTransitioning.current = false
    }, 1480)
  }

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>

      <style jsx global>{`
        .mt-journey-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          pointer-events: all;
          opacity: 0;
          background:
            radial-gradient(
              ellipse at 50% 52%,
              rgba(38, 25, 13, 0.2),
              rgba(2, 15, 18, 0.76) 58%,
              rgba(1, 8, 10, 0.98) 100%
            ),
            #020f12;
          transition:
            opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
            background 720ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mt-journey-transition-overlay.is-entering {
          opacity: 1;
        }

        .mt-journey-transition-overlay.is-leaving {
          opacity: 0;
          transition:
            opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
            background 720ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mt-journey-transition-glow {
          position: absolute;
          left: 50%;
          top: 52%;
          width: min(72vw, 920px);
          aspect-ratio: 1.8;
          border-radius: 999px;
          opacity: 0;
          background: radial-gradient(
            ellipse,
            rgba(212, 175, 55, 0.22) 0%,
            rgba(201, 162, 74, 0.09) 34%,
            transparent 72%
          );
          filter: blur(28px);
          transform: translate(-50%, -50%) scale(0.72);
          transition:
            opacity 760ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 980ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mt-journey-transition-overlay.is-entering
          .mt-journey-transition-glow {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.08);
        }

        .mt-journey-transition-overlay.is-leaving
          .mt-journey-transition-glow {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.18);
        }

        .mt-journey-transition-vignette {
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(
            circle at center,
            transparent 28%,
            rgba(0, 0, 0, 0.26) 68%,
            rgba(0, 0, 0, 0.72) 100%
          );
          transition: opacity 720ms ease;
        }

        .mt-journey-transition-overlay.is-entering
          .mt-journey-transition-vignette {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .mt-journey-transition-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
