'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section 
      className="relative w-full h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE-LpekGTjrwwWPiAS3llYb8Xvz2lWZRw.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Gradient overlay for text readability - only one */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] from-0% via-[#0a1628]/70 via-40% to-transparent to-100%" />

      {/* Content wrapper - single layer only */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8">
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

            {/* Heading - "Travel Like A Local" */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Travel Like<br />A Local
            </h1>

            {/* Description */}
            <p className="text-[#D4B860] text-base md:text-lg leading-relaxed mb-8 max-w-lg font-light">
              We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <button className="bg-[#C9A24A] text-[#071B24] px-7 py-3 rounded font-semibold text-sm hover:bg-[#D4B860] transition-all duration-300 shadow-lg hover:shadow-xl">
                BEGIN YOUR JOURNEY →
              </button>
              <button className="flex items-center gap-3 text-[#C9A24A] hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-[#C9A24A] flex items-center justify-center group-hover:bg-[#C9A24A]/10 transition-all">
                  <Play size={16} className="fill-current ml-0.5" />
                </div>
                <span className="text-sm font-light tracking-wide">WATCH OUR STORY</span>
              </button>
            </div>
          </motion.div>
        </div>
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
