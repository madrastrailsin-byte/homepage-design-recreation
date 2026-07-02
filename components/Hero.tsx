'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-24 overflow-hidden bg-[#0D1117]">
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
              <div className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-8 md:mb-12">BEYOND BOUNDARIES</div>

              {/* Main Headline - Oversized */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 md:mb-8 leading-none">
                Travel
                <br />
                Like
              </h1>
              
              {/* Secondary Headline - Large and Expressive */}
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#D4AF37] mb-12 md:mb-16 leading-none font-light">
                A Local
              </h2>

              {/* Description */}
              <p className="text-[#D4AF37]/70 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-sm font-light">
                We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button className="bg-[#D4AF37] text-[#0D1117] px-8 py-4 rounded-lg font-semibold text-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
                  BEGIN YOUR JOURNEY →
                </button>
                <button className="flex items-center gap-3 text-[#D4AF37] hover:text-white transition-colors">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center">
                    <Play size={18} className="fill-current ml-0.5" />
                  </div>
                  <span className="text-sm font-semibold">WATCH OUR STORY</span>
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
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0D1117] rounded-2xl md:rounded-none" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute left-6 md:left-8 bottom-8 text-[#D4AF37] text-xs tracking-widest hidden md:flex flex-col items-center gap-2 rotate-90 md:rotate-0"
        >
          <span>SCROLL</span>
          <div className="w-px h-6 bg-[#D4AF37]" />
        </motion.div>
      </div>
    </section>
  )
}
