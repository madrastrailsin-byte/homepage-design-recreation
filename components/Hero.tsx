'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section 
      className="relative w-full flex items-center overflow-hidden pt-24 md:pt-28"
      style={{
        height: 'calc(100vh + 60px)',
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE%20background-HjDvpFuBbOHELP5GGXGROss89tXwtY.png)',
        backgroundSize: '89.5%',
        backgroundPosition: 'calc(50% + 3%) center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        filter: 'saturate(1.15) brightness(1.08)',
      }}
    >
      {/* Dark gradient overlay for text readability - only on left third */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/55 via-[#0a1628]/20 via-30% to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col max-w-2xl"
        >
          {/* Label */}
          <div className="text-[#C9A24A] text-xs font-light mb-1.5 uppercase" style={{ letterSpacing: '0.35em' }}>
            Beyond Boundaries
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-5xl lg:text-6xl text-white leading-tight mb-0" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Travel Like
          </h1>

          {/* Secondary Headline - Italic */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#C9A24A] leading-tight mb-5 md:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 250, fontStyle: 'italic' }}>
            A Local
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center gap-0 mb-5 md:mb-6" style={{ width: '260px' }}>
            <div className="flex-1 h-px bg-[#C9A24A]/60" />
            <div className="w-2 h-2 bg-[#C9A24A] rotate-45 mx-3" />
            <div className="flex-1 h-px bg-[#C9A24A]/60" />
          </div>

          {/* Description */}
          <p className="text-[#E8E8E8] text-sm md:text-base leading-relaxed mb-7 md:mb-8 max-w-sm font-light">
            We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <button className="bg-[#C9A24A] text-[#071B24] px-6 py-2 rounded font-semibold text-xs md:text-sm hover:bg-[#D4B860] transition-all duration-300 shadow-lg hover:shadow-xl">
              BEGIN YOUR JOURNEY →
            </button>
            <button className="flex items-center gap-3 text-[#C9A24A] hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full border border-[#C9A24A] flex items-center justify-center hover:border-white transition-colors">
                <Play size={14} className="fill-current ml-0.5" />
              </div>
              <span className="text-xs font-light tracking-wider">WATCH OUR STORY</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute right-5 md:right-6 top-1/2 transform translate-y-12 text-[#C9A24A] text-xs tracking-widest hidden md:flex flex-col items-center gap-2 z-20"
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 border border-[#C9A24A] rounded-full" />
          <div className="w-1.5 h-1.5 border border-[#C9A24A] rounded-full" />
          <div className="w-1.5 h-1.5 border border-[#C9A24A] rounded-full" />
          <div className="w-1.5 h-1.5 border border-[#C9A24A] rounded-full" />
        </div>
        <div className="h-8 w-px bg-[#C9A24A]" />
        <span className="text-center whitespace-nowrap">SCROLL</span>
      </motion.div>
    </section>
  )
}
