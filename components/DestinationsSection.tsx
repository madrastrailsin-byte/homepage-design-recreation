'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Iceland',
    label: 'Discover',
    image: '/images/iceland-northern-lights.png',
  },
  {
    id: 2,
    name: 'Turkey',
    label: 'Explore',
    image: '/images/turkey-cappadocia-balloons.png',
  },
  {
    id: 3,
    name: 'Japan',
    label: 'Experience',
    image: '/images/japan-neon-city.png',
  },
]

export default function DestinationsSection() {
  return (
    <section className="bg-[#0D1117] pt-0 pb-12 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex gap-6 items-start">
              {/* Vertical EXPLORE label with pill and line */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-[#C9A24A] text-xs font-light tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  EXPLORE
                </div>
                <div className="w-4 h-6 border border-[#C9A24A] rounded-full" />
                <div className="w-px h-16 bg-gradient-to-b from-[#C9A24A] to-transparent" />
              </div>

              {/* Main text content */}
              <div>
                <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-2">CURATED</div>
                <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-8">GLOBALLY.</div>
                <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-8">CRAFTED</div>
                <div className="text-[#C9A24A] text-xs font-light tracking-widest mb-12">PERSONALLY</div>
                <div className="w-px h-24 bg-gradient-to-b from-[#C9A24A] via-[#C9A24A]/50 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h2 className="text-5xl md:text-7xl text-white mb-8 md:mb-10 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Your Journey,
              <br />
              Our Expertise.
            </h2>
            <p className="text-[#C9A24A]/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-light">
              From the world&apos;s most iconic cities to hidden gems only locals know, we design journeys that are as unique as you are.
            </p>
            <a href="#" className="text-[#C9A24A] font-light text-sm hover:text-white transition inline-flex items-center gap-2 group tracking-wide">
              DISCOVER OUR SERVICES 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Staggered Overlapping Cards */}
        <div className="relative h-64 md:h-80 lg:h-96">
          {/* Card 1 - Iceland (Top Left, Smaller) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 w-full md:w-1/3 h-40 md:h-64 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24A]/20 hover:shadow-[0_30px_80px_rgba(201,162,74,0.2)] transition-all duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.65)] via-[rgba(7,27,36,0.2)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div />
                <div>
                  <p className="text-[#C9A24A] text-xs font-light tracking-widest mb-3 uppercase">{destinations[0].label}</p>
                  <h3 className="text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[0].name}</h3>
                  <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide">
                    <span>Discover</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Turkey (Center, Hero Card - Larger) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-8 md:top-0 left-1/4 md:left-1/4 w-2/3 md:w-1/2 h-48 md:h-96 group cursor-pointer z-10"
          >
            {/* Decorative Emblem - Overlapping top edge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="w-12 h-12 rounded-full border-2 border-[#C9A24A]/40 flex items-center justify-center bg-[#0D1117]/80 backdrop-blur-sm">
                <svg className="w-6 h-6 text-[#C9A24A]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 7v10M7 12h10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24A]/30 hover:shadow-[0_50px_120px_rgba(201,162,74,0.25)] transition-all duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.50)] via-[rgba(7,27,36,0.15)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                <div />
                <div>
                  <p className="text-[#C9A24A] text-xs font-light tracking-widest mb-3 uppercase">{destinations[1].label}</p>
                  <h3 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[1].name}</h3>
                  <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Japan (Bottom Right, Smaller) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-0 right-0 w-full md:w-1/3 h-40 md:h-64 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24A]/20 hover:shadow-[0_30px_80px_rgba(201,162,74,0.2)] transition-all duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[2].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.65)] via-[rgba(7,27,36,0.2)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div />
                <div>
                  <p className="text-[#C9A24A] text-xs font-light tracking-widest mb-3 uppercase">{destinations[2].label}</p>
                  <h3 className="text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[2].name}</h3>
                  <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide">
                    <span>Experience</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
