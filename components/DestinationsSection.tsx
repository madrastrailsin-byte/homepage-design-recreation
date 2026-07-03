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
                <div className="text-[#C9A24A] text-xs font-light" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.35em' }}>
                  EXPLORE
                </div>
                <div className="w-4 h-6 border border-[#C9A24A] rounded-full" />
                <div className="w-px h-16 bg-gradient-to-b from-[#C9A24A] to-transparent" />
              </div>

              {/* Main text content */}
              <div>
                <div className="text-[#C9A24A] text-xs font-light mb-2" style={{ letterSpacing: '0.35em' }}>CURATED</div>
                <div className="text-[#C9A24A] text-xs font-light mb-8" style={{ letterSpacing: '0.35em' }}>GLOBALLY.</div>
                <div className="text-[#C9A24A] text-xs font-light mb-8" style={{ letterSpacing: '0.35em' }}>CRAFTED</div>
                <div className="text-[#C9A24A] text-xs font-light mb-12" style={{ letterSpacing: '0.35em' }}>PERSONALLY</div>
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

        {/* Carousel Navigation Buttons */}
        <div className="flex justify-end mb-6 gap-3">
          <button className="w-10 h-10 rounded-full border border-[#C9A24A]/50 flex items-center justify-center hover:border-[#C9A24A] hover:bg-[#C9A24A]/10 transition-all group">
            <ArrowLeft size={18} className="text-[#C9A24A] group-hover:text-white transition" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#C9A24A] flex items-center justify-center hover:bg-[#D4B860] transition-all group">
            <ArrowRight size={18} className="text-[#071B24] group-hover:text-[#071B24] transition" />
          </button>
        </div>

        {/* Staggered Overlapping Cards */}
        <div className="relative h-72 md:h-96 lg:h-[420px] px-4 md:px-0">
          {/* Card 1 - Iceland (Top Left, Smaller - Positioned Lower) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
            className="absolute top-12 md:top-16 left-0 md:left-2 w-full md:w-1/3 h-40 md:h-64 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-[#C9A24A]/20 hover:shadow-[0_40px_100px_rgba(201,162,74,0.35)] transition-all duration-500" style={{ boxShadow: '0 20px 60px rgba(201, 162, 74, 0.2)' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.65)] via-[rgba(7,27,36,0.2)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div />
                <div>
                  <p className="text-[#C9A24A] text-xs font-light mb-3 uppercase" style={{ letterSpacing: '0.35em' }}>{destinations[0].label}</p>
                  <h3 className="text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[0].name}</h3>
                  <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide">
                    <span>Discover</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Turkey (Center, Hero Card - Larger - Elevated & Layered Front) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-0 md:-top-6 left-1/4 md:left-1/3 w-2/3 md:w-1/2 h-48 md:h-96 group cursor-pointer z-20"
          >
            {/* Decorative Emblem - Ornamental Seal Overlapping top edge */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
              <div className="w-20 h-20 rounded-full border-2 border-[#C9A24A]/60 flex items-center justify-center bg-[#0D1117]/90 backdrop-blur-sm relative" style={{ boxShadow: '0 10px 30px rgba(201, 162, 74, 0.15)' }}>
                {/* Outer decorative ring with tracked text */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                  </defs>
                  <text fontSize="7" fill="#C9A24A" fillOpacity="0.6" letterSpacing="3">
                    <textPath href="#circlePath" startOffset="0%" textAnchor="start">
                      EXPLORE • DISCOVER • TRAVEL •
                    </textPath>
                  </text>
                </svg>
                
                {/* Center Icon - Compass/Wave */}
                <svg className="w-8 h-8 text-[#C9A24A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
            </div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24A]/30 hover:shadow-[0_60px_150px_rgba(201,162,74,0.4)] transition-all duration-500" style={{ boxShadow: '0 30px 80px rgba(201, 162, 74, 0.3)' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.50)] via-[rgba(7,27,36,0.15)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                <div />
                <div>
                  <p className="text-[#C9A24A] text-xs font-light mb-3 uppercase" style={{ letterSpacing: '0.35em' }}>{destinations[1].label}</p>
                  <h3 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{destinations[1].name}</h3>
                  <button className="flex items-center gap-2 text-[#C9A24A] group-hover:text-white transition text-sm font-light tracking-wide">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Japan (Bottom Right, Smaller - Positioned Lower) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-12 md:top-16 right-0 md:right-2 w-full md:w-1/3 h-40 md:h-64 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-[#C9A24A]/20 hover:shadow-[0_40px_100px_rgba(201,162,74,0.35)] transition-all duration-500" style={{ boxShadow: '0 20px 60px rgba(201, 162, 74, 0.2)' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[2].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.65)] via-[rgba(7,27,36,0.2)] to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div />
                <div>
                  <p className="text-[#C9A24A] text-xs font-light mb-3 uppercase" style={{ letterSpacing: '0.35em' }}>{destinations[2].label}</p>
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
