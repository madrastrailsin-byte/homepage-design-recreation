'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'

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
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            {/* Vertical EXPLORE Element */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex flex-col items-center gap-3">
                <div className="text-[#C9A24A] text-xs font-light" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.35em' }}>
                  EXPLORE
                </div>
                <div className="w-3 h-5 border border-[#C9A24A] rounded-full" />
                <div className="w-px h-12 bg-gradient-to-b from-[#C9A24A] to-transparent" />
              </div>

              {/* Curated/Crafted Labels */}
              <div className="pt-1">
                <div className="text-[#C9A24A] text-xs font-light" style={{ letterSpacing: '0.35em' }}>CURATED</div>
                <div className="text-[#C9A24A] text-xs font-light mb-4" style={{ letterSpacing: '0.35em' }}>GLOBALLY.</div>
                <div className="text-[#C9A24A] text-xs font-light" style={{ letterSpacing: '0.35em' }}>CRAFTED</div>
                <div className="text-[#C9A24A] text-xs font-light" style={{ letterSpacing: '0.35em' }}>PERSONALLY</div>
              </div>
            </div>

            {/* Main Heading and Description */}
            <div>
              <h2 className="text-5xl md:text-7xl text-white mb-6 md:mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Your Journey,
                <br />
                Our Expertise.
              </h2>
              <p className="text-[#C9A24A]/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-light">
                From the world&apos;s most iconic cities to hidden gems only locals know, we design journeys that are as unique as you are.
              </p>
              <a href="#" className="text-[#C9A24A] font-light text-sm hover:text-white transition inline-flex items-center gap-2 group tracking-wide">
                DISCOVER OUR SERVICES 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex justify-end mb-6 gap-3">
          <button className="w-10 h-10 rounded-full border border-[#C9A24A]/50 flex items-center justify-center hover:border-[#C9A24A] hover:bg-[#C9A24A]/10 transition-all group">
            <ArrowLeft size={18} className="text-[#C9A24A] group-hover:text-white transition" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#C9A24A] flex items-center justify-center hover:bg-[#D4B860] transition-all group">
            <ArrowRight size={18} className="text-[#071B24] group-hover:text-[#071B24] transition" />
          </button>
        </div>

        {/* Card Grid - Clear Separation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Card 1 - Iceland */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg border border-[#C9A24A]/20 hover:shadow-2xl transition-all duration-500" style={{ boxShadow: '0 20px 60px rgba(201, 162, 74, 0.2)' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.7)] via-[rgba(7,27,36,0.2)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-8">
                <p className="text-[#C9A24A] text-xs font-light mb-2 uppercase" style={{ letterSpacing: '0.35em' }}>{destinations[0].label}</p>
                <h3 className="text-4xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[0].name}</h3>
                <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide w-fit">
                  <span>Discover</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Turkey (Center - Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer md:scale-110 md:origin-bottom"
          >
            <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24A]/30 hover:shadow-[0_60px_150px_rgba(201,162,74,0.4)] transition-all duration-500" style={{ boxShadow: '0 30px 90px rgba(201, 162, 74, 0.35)' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.65)] via-[rgba(7,27,36,0.15)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-10">
                <p className="text-[#C9A24A] text-xs font-light mb-2 uppercase" style={{ letterSpacing: '0.35em' }}>{destinations[1].label}</p>
                <h3 className="text-5xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[1].name}</h3>
                <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide w-fit">
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Japan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg border border-[#C9A24A]/20 hover:shadow-2xl transition-all duration-500" style={{ boxShadow: '0 20px 60px rgba(201, 162, 74, 0.2)' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[2].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.7)] via-[rgba(7,27,36,0.2)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-8">
                <p className="text-[#C9A24A] text-xs font-light mb-2 uppercase" style={{ letterSpacing: '0.35em' }}>{destinations[2].label}</p>
                <h3 className="text-4xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[2].name}</h3>
                <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide w-fit">
                  <span>Experience</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
