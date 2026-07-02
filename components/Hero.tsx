'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section 
      className="relative w-full h-screen flex items-center overflow-hidden pt-20"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE%20background-HjDvpFuBbOHELP5GGXGROss89tXwtY.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col max-w-2xl"
        >
          {/* Label */}
          <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-4 uppercase">
            Beyond Boundaries
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Travel Like
          </h1>

          {/* Secondary Headline - Italic */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#C9A24A] leading-tight mb-4 md:mb-5" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: 'italic' }}>
            A Local
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center gap-2 mb-4 md:mb-5">
            <div className="w-2 h-2 bg-[#C9A24A] rounded-full" />
            <div className="w-8 h-px bg-[#C9A24A]/50" />
          </div>

          {/* Description */}
          <p className="text-[#D4B860] text-sm md:text-base leading-relaxed mb-6 md:mb-7 max-w-sm font-light">
            We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button className="bg-[#C9A24A] text-[#071B24] px-6 py-3 rounded font-semibold text-xs md:text-sm hover:bg-[#D4B860] transition-all duration-300 shadow-lg hover:shadow-xl">
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
        className="absolute right-8 md:right-12 top-1/2 transform -translate-y-1/2 text-[#C9A24A] text-xs tracking-widest hidden md:flex flex-col items-center gap-3 z-20"
      >
        <div className="w-px h-8 bg-[#C9A24A]" />
        <span className="text-center whitespace-nowrap">SCROLL</span>
        <div className="w-px h-8 bg-[#C9A24A]" />
      </motion.div>
    </section>
  )
}
