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
        {/* Two-Column Layout: Text Left, Cards Right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* LEFT COLUMN: Text Block with Vertical Rail */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex gap-4"
          >
            {/* Vertical Decorative Rail */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="text-[#C9A24A] text-[10px] font-light" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.35em' }}>
                EXPLORE
              </div>
              <div className="w-2.5 h-4 border border-[#C9A24A] rounded-full" />
              <div className="w-px h-24 bg-gradient-to-b from-[#C9A24A] to-transparent" />
            </div>

            {/* Main Text Block */}
            <div className="flex-1">
              {/* Curated/Crafted Label - Two Lines, Tight */}
              <div className="mb-1">
                <div className="text-[#C9A24A] text-xs font-light leading-tight" style={{ letterSpacing: '0.35em' }}>CURATED GLOBALLY.</div>
                <div className="text-[#C9A24A] text-xs font-light leading-tight" style={{ letterSpacing: '0.35em' }}>CRAFTED PERSONALLY</div>
              </div>

              {/* Small Gap */}
              <div className="h-3" />

              {/* Heading - Two Lines */}
              <h2 className="text-4xl md:text-5xl text-white mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Your Journey,
                <br />
                Our Expertise.
              </h2>

              {/* Divider with Diamond Accent */}
              <div className="flex items-center gap-2 my-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A24A] to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-[#C9A24A]" />
              </div>

              {/* Description */}
              <p className="text-[#C9A24A]/75 text-sm leading-relaxed mb-4 font-light">
                From the world&apos;s most iconic cities to hidden gems only locals know, we design journeys that are as unique as you are.
              </p>

              {/* CTA Link */}
              <a href="#" className="text-[#C9A24A] font-light text-xs hover:text-white transition inline-flex items-center gap-2 group tracking-widest">
                DISCOVER OUR SERVICES 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Cards Container */}
          <div className="md:col-span-3 flex flex-col">
            {/* Navigation Buttons - Top Right */}
            <div className="flex justify-end mb-6 gap-2">
              <button className="w-9 h-9 rounded-full border border-[#C9A24A]/40 flex items-center justify-center hover:border-[#C9A24A]/70 transition-all group">
                <ArrowLeft size={16} className="text-[#C9A24A]/60 group-hover:text-[#C9A24A] transition" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#C9A24A] flex items-center justify-center hover:bg-[#D4B860] transition-all group">
                <ArrowRight size={16} className="text-[#071B24] group-hover:text-[#071B24] transition" />
              </button>
            </div>

            {/* Card Grid with Subtle Emblem */}
            <div className="relative">
              {/* Subtle Emblem near Iceland-Turkey join */}
              <div className="absolute left-1/3 top-2 z-10 pointer-events-none">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1A3A45]/30 border border-[#C9A24A]/20 relative">
                  <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
                    <defs>
                      <path id="emblemRing" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" fill="none" />
                    </defs>
                    <text className="fill-[#C9A24A]" opacity="0.5" fontSize="6" fontFamily="serif" letterSpacing="1.5">
                      <textPath href="#emblemRing" startOffset="50%" textAnchor="middle">
                        EXPLORE DISCOVER TRAVEL
                      </textPath>
                    </text>
                  </svg>
                  <svg className="w-6 h-6 text-[#C9A24A] relative z-10 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18M3 12h18" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 - Iceland */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-lg border border-[#C9A24A]/20 hover:shadow-2xl transition-all duration-500" style={{ boxShadow: '0 20px 60px rgba(201, 162, 74, 0.2)' }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${destinations[0].image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.8)] via-[rgba(7,27,36,0.3)] to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="text-3xl text-white mb-1 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{destinations[0].name}</h3>
                      <p className="text-[#C9A24A] text-xs font-light mb-0">{destinations[0].label}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Turkey (Center - Featured) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer md:-translate-y-6"
                >
                  <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24A]/30 hover:shadow-[0_60px_150px_rgba(201,162,74,0.4)] transition-all duration-500" style={{ boxShadow: '0 35px 100px rgba(201, 162, 74, 0.35)' }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${destinations[1].image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.7)] via-[rgba(7,27,36,0.2)] to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-4xl text-white mb-1 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{destinations[1].name}</h3>
                          <p className="text-[#C9A24A] text-xs font-light">{destinations[1].label}</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-[#C9A24A] flex items-center justify-center hover:bg-[#D4B860] transition-all group/btn">
                          <ArrowRight size={16} className="text-[#071B24] group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
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
                  <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-lg border border-[#C9A24A]/20 hover:shadow-2xl transition-all duration-500" style={{ boxShadow: '0 20px 60px rgba(201, 162, 74, 0.2)' }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${destinations[2].image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,27,36,0.8)] via-[rgba(7,27,36,0.3)] to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-3xl text-white mb-1 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{destinations[2].name}</h3>
                          <p className="text-[#C9A24A] text-xs font-light">{destinations[2].label}</p>
                        </div>
                        <button className="w-9 h-9 rounded-full border border-[#C9A24A]/60 flex items-center justify-center hover:border-[#C9A24A] hover:bg-[#C9A24A]/10 transition-all group/btn">
                          <ArrowRight size={14} className="text-[#C9A24A] group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
