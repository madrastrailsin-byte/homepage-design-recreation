'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Destination {
  id: string
  name: string
  label: string
  description: string
  highlights: string[]
  image: string
  color: string
}

interface DestinationPanelProps {
  destination: Destination
}

export default function DestinationPanel({ destination }: DestinationPanelProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        padding: '2rem 1.75rem 1.75rem',
        background:
          'linear-gradient(160deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.008) 100%), rgba(4,16,24,0.38)',
        backdropFilter: 'blur(32px) saturate(150%)',
        WebkitBackdropFilter: 'blur(32px) saturate(150%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,249,228,0.12), inset 0 -1px 0 rgba(201,162,74,0.05), 0 32px 96px rgba(0,0,0,0.48), 0 0 0 0.5px rgba(201,162,74,0.14)',
      }}
      animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Corner accent glow */}
      <div
        className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${destination.color}35 0%, transparent 68%)`,
          opacity: 0.7,
          transform: 'translate(30%, -30%)',
        }}
      />

      {/* ── Header ── */}
      <div className="relative mb-6">
        <p className="mt-eyebrow text-[#D4AF37] text-[10px] tracking-[0.36em] mb-2.5" style={{ opacity: 0.85 }}>
          {destination.label}
        </p>
        <h2
          className="mt-display text-[#F2E7CC] leading-[1.0] tracking-[-0.015em]"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
        >
          {destination.name}
        </h2>
      </div>

      {/* ── Description ── */}
      <p
        className="mt-body-copy text-[#C8D4DC] leading-[1.72] mb-6 relative"
        style={{ fontSize: '14px' }}
      >
        {destination.description}
      </p>

      {/* ── Divider ── */}
      <div
        className="mb-6 h-px"
        style={{
          background: 'linear-gradient(to right, rgba(201,162,74,0.35), rgba(201,162,74,0.10), transparent)',
        }}
      />

      {/* ── Highlights ── */}
      <div className="mb-7">
        <p className="mt-eyebrow text-[#D4AF37] text-[9px] tracking-[0.36em] mb-3.5" style={{ opacity: 0.78 }}>
          Must Experience
        </p>
        <ul className="space-y-2.5">
          {destination.highlights.map((h, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 rounded-full bg-[#C9A24A]"
                style={{ width: 4, height: 4, opacity: 0.70 }}
              />
              <span className="mt-body-copy text-[#EEE8DC] text-[13px]">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTA Button ── */}
      <motion.button
        className="mt-gold-sheen relative w-full rounded-xl text-[#03191D] font-semibold overflow-hidden"
        style={{
          padding: '13px 20px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #C9A24A 100%)',
          fontFamily: 'var(--font-catamaran), system-ui, sans-serif',
          fontSize: '12px',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          boxShadow:
            'inset 0 1px 0 rgba(255,249,228,0.38), 0 14px 32px rgba(212,175,55,0.22), 0 0 0 1px rgba(212,175,55,0.20)',
        }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.015 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        Explore {destination.name}
      </motion.button>

      {/* Border overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: '0.5px solid rgba(201,162,74,0.14)' }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,249,228,0.18), transparent)',
        }}
      />
    </motion.div>
  )
}
