'use client'

import type { MouseEvent, ReactNode } from 'react'

type JourneyGlassPanelProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
}

export default function JourneyGlassPanel({
  children,
  className = '',
  contentClassName = '',
}: JourneyGlassPanelProps) {
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = event.currentTarget
    const rect = panel.getBoundingClientRect()

    panel.style.setProperty('--glass-x', `${event.clientX - rect.left}px`)
    panel.style.setProperty('--glass-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden border border-white/[0.11] bg-[#061f24]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-[2px] hover:border-[#D4AF37]/28 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_55px_rgba(0,0,0,0.2)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--glass-x, 50%) var(--glass-y, 50%), rgba(255,255,255,0.10), transparent 42%), radial-gradient(240px circle at var(--glass-x, 50%) var(--glass-y, 50%), rgba(212,175,55,0.08), transparent 58%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
