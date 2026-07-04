'use client'

import { motion, useReducedMotion } from 'framer-motion'
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

const arrowButtonBase =
  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group/btn'

const outlineArrowButton =
  `${arrowButtonBase} border border-[#C9A24A]/55 bg-[#061f28]/34 text-[#C9A24A] shadow-[0_10px_24px_rgba(0,0,0,0.24)] hover:border-[#C9A24A]/85 hover:bg-[#C9A24A]/12 group-hover:translate-x-1`

const filledArrowButton =
  `${arrowButtonBase} border border-[#C9A24A]/70 bg-[#C9A24A] text-[#071B24] shadow-[0_12px_28px_rgba(0,0,0,0.28)] hover:bg-[#D4B860] group-hover:translate-x-1`

export default function DestinationsSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="mt-destinations-bg relative overflow-hidden pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,74,0.08),transparent_28%)] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Two-Column Layout: Text Left, Cards Right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 mb-8 md:mb-12">
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
              <div className="mb-1.5">
                <div className="text-[#C9A24A] text-xs font-light leading-tight" style={{ letterSpacing: '0.35em' }}>CURATED GLOBALLY.</div>
                <div className="text-[#C9A24A] text-xs font-light leading-tight" style={{ letterSpacing: '0.35em' }}>CRAFTED PERSONALLY</div>
              </div>

              {/* Small Gap */}
              <div className="h-4" />

              {/* Heading - Two Lines */}
              <h2 className="text-4xl md:text-5xl text-white mb-3.5 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Your Journey,
                <br />
                Our Expertise.
              </h2>

              {/* Divider with Diamond Accent */}
              <div className="flex items-center gap-2 my-3.5">
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A24A] to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-[#C9A24A]" />
              </div>

              {/* Description */}
              <p className="text-[#E8E8E8]/78 text-sm leading-relaxed mb-5 font-light">
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
            <div className="flex justify-end mb-7 gap-3">
              <button className="w-9 h-9 rounded-full border border-[#C9A24A]/40 bg-[#061f28]/24 flex items-center justify-center hover:border-[#C9A24A]/70 hover:bg-[#C9A24A]/10 transition-all group">
                <ArrowLeft size={16} className="text-[#C9A24A]/60 group-hover:text-[#C9A24A] transition" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#C9A24A] border border-[#C9A24A]/70 flex items-center justify-center hover:bg-[#D4B860] transition-all group shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
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
                  whileHover={prefersReducedMotion ? undefined : { y: -7, rotateZ: -0.7 }}
                  transition={{ duration: 0.8, delay: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-[#C9A24A]/24 shadow-[0_26px_70px_rgba(0,0,0,0.46),0_0_0_1px_rgba(201,162,74,0.08)] transition-all duration-500 hover:border-[#C9A24A]/45 hover:shadow-[0_34px_88px_rgba(0,0,0,0.54),0_0_0_1px_rgba(201,162,74,0.13)]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${destinations[0].image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,21,27,0.82)] via-[rgba(7,38,48,0.28)] to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-3xl text-white mb-1 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{destinations[0].name}</h3>
                          <p className="text-[#C9A24A] text-xs font-light mb-0">{destinations[0].label}</p>
                        </div>
                        <button className={outlineArrowButton}>
                          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Turkey (Center - Featured) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, rotateZ: 0.45 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer md:-translate-y-6"
                >
                  <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-[#C9A24A]/34 shadow-[0_34px_96px_rgba(0,0,0,0.56),0_0_0_1px_rgba(201,162,74,0.12)] transition-all duration-500 hover:border-[#C9A24A]/55 hover:shadow-[0_42px_110px_rgba(0,0,0,0.62),0_0_0_1px_rgba(201,162,74,0.18)]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${destinations[1].image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,21,27,0.76)] via-[rgba(7,38,48,0.2)] to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-4xl text-white mb-1 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{destinations[1].name}</h3>
                          <p className="text-[#C9A24A] text-xs font-light">{destinations[1].label}</p>
                        </div>
                        <button className={filledArrowButton}>
                          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 - Japan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -7, rotateZ: 0.7 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-[#C9A24A]/24 shadow-[0_26px_70px_rgba(0,0,0,0.46),0_0_0_1px_rgba(201,162,74,0.08)] transition-all duration-500 hover:border-[#C9A24A]/45 hover:shadow-[0_34px_88px_rgba(0,0,0,0.54),0_0_0_1px_rgba(201,162,74,0.13)]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${destinations[2].image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,21,27,0.82)] via-[rgba(7,38,48,0.28)] to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-3xl text-white mb-1 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{destinations[2].name}</h3>
                          <p className="text-[#C9A24A] text-xs font-light">{destinations[2].label}</p>
                        </div>
                        <button className={outlineArrowButton}>
                          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
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
