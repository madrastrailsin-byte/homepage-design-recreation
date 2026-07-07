'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-24 overflow-hidden">
      {/* Content Grid - Asymmetric Layout */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Left Column - Typography (40%) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="flex flex-col justify-center"
            >
              {/* Label */}
              <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-10 md:mb-14 uppercase">Beyond Boundaries</div>

              {/* Main Headline - Oversized Playfair */}
              <h1 className="text-7xl md:text-8xl lg:text-9xl text-white mb-2 md:mb-4 leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Travel
              </h1>
              <h1 className="text-7xl md:text-8xl lg:text-9xl text-white mb-8 md:mb-12 leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Like
              </h1>
              
              {/* Secondary Headline - Italic Script Style */}
              <h2 className="text-6xl md:text-7xl lg:text-8xl text-[#C9A24A] mb-12 md:mb-16 leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: 'italic' }}>
                A Local
              </h2>

              {/* Description */}
              <p className="text-[#C9A24A]/60 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-sm font-light">
                We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button className="bg-[#C9A24A] text-[#071B24] px-8 py-4 rounded-lg font-semibold text-sm hover:bg-[#D4B860] transition-all duration-300 shadow-lg hover:shadow-xl">
                  BEGIN YOUR JOURNEY →
                </button>
                <button className="flex items-center gap-3 text-[#C9A24A] hover:text-white transition-colors">
                  <div className="w-12 h-12 rounded-full border border-[#C9A24A] flex items-center justify-center hover:border-white transition-colors">
                    <Play size={18} className="fill-current ml-0.5" />
                  </div>
                  <span className="text-sm font-light tracking-wide">WATCH OUR STORY</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column - Hero Image (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative h-96 md:h-full md:min-h-screen md:-mr-8 md:-mt-32 md:-mb-32"
            >
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl md:rounded-none"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&h=1600&fit=crop)',
                  backgroundPosition: 'center 30%',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[rgba(7,27,36,0.3)] to-[rgba(7,27,36,0.8)] rounded-2xl md:rounded-none" />
                {/* Subtle radial lighting */}
                <div className="absolute inset-0 bg-radial-gradient rounded-2xl md:rounded-none" style={{
                  background: 'radial-gradient(ellipse at 60% 40%, rgba(201,162,74,0.05) 0%, transparent 70%)'
                }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute left-6 md:left-8 bottom-8 text-[#C9A24A] text-xs tracking-widest hidden md:flex flex-col items-center gap-2 rotate-90 md:rotate-0"
        >
          <span>SCROLL</span>
          <div className="w-px h-6 bg-[#C9A24A]" />
        </motion.div>
      </div>
    </section>
  )
}
