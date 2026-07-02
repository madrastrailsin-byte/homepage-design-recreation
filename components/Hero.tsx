'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full h-screen pt-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&h=800&fit=crop)',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Label */}
            <div className="text-[#D4AF37] text-sm font-semibold tracking-widest mb-6">BEYOND BOUNDARIES</div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Travel Like
              <br />
              <span className="text-[#D4AF37] italic font-light">A Local</span>
            </h1>

            {/* Description */}
            <p className="text-[#D4AF37]/90 text-lg leading-relaxed mb-8 max-w-xl">
              We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="btn-gold">BEGIN YOUR JOURNEY →</button>
              <button className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center">
                  <Play size={16} className="fill-current" />
                </div>
                <span>WATCH OUR STORY</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-8 bottom-8 text-[#D4AF37] text-xs tracking-widest hidden md:flex flex-col items-center gap-2"
        >
          <span>SCROLL</span>
          <div className="w-px h-6 bg-[#D4AF37]" />
        </motion.div>
      </div>
    </section>
  )
}
