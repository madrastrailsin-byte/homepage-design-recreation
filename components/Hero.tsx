'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full h-screen pt-20 md:pt-24 pb-0 overflow-hidden">
      {/* Content Grid - Asymmetric Layout */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center h-full">
            {/* Left Column - Typography (40%) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="flex flex-col justify-center"
            >
              {/* Label */}
              <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-4 md:mb-6 uppercase">Beyond Boundaries</div>

              {/* Main Headline - Compact */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-0 md:mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Travel
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Like
              </h1>
              
              {/* Secondary Headline - Italic Script Style */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#C9A24A] mb-6 md:mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: 'italic' }}>
                A Local
              </h2>

              {/* Description */}
              <p className="text-[#C9A24A]/60 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-sm font-light">
                We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button className="bg-[#C9A24A] text-[#071B24] px-6 py-3 rounded-lg font-semibold text-xs md:text-sm hover:bg-[#D4B860] transition-all duration-300 shadow-lg hover:shadow-xl">
                  BEGIN YOUR JOURNEY →
                </button>
                <button className="flex items-center gap-2 text-[#C9A24A] hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full border border-[#C9A24A] flex items-center justify-center hover:border-white transition-colors">
                    <Play size={14} className="fill-current ml-0.5" />
                  </div>
                  <span className="text-xs font-light tracking-wide">WATCH OUR STORY</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column - Hero Image (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative h-full md:-mr-12 md:-mt-24 md:-mb-24"
            >
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl md:rounded-none"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&h=1600&fit=crop)',
                  backgroundPosition: 'center 30%',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[rgba(7,27,36,0.3)] to-[rgba(7,27,36,0.8)] rounded-2xl md:rounded-none" />
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
          className="absolute left-6 md:left-8 bottom-6 text-[#C9A24A] text-xs tracking-widest hidden md:flex flex-col items-center gap-2"
        >
          <span>SCROLL</span>
          <div className="w-px h-4 bg-[#C9A24A]" />
        </motion.div>
      </div>
    </section>
  )
}
