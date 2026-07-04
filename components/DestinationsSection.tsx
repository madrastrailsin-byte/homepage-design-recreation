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

const outlineArrowButtonBase =
  `${arrowButtonBase} border border-[#C9A24A]/55 bg-[#061f28]/34 text-[#C9A24A] shadow-[0_10px_24px_rgba(0,0,0,0.24)] hover:border-[#C9A24A]/85 hover:bg-[#C9A24A]/12`

const filledArrowButtonBase =
  `${arrowButtonBase} border border-[#C9A24A]/70 bg-[#C9A24A] text-[#071B24] shadow-[0_12px_28px_rgba(0,0,0,0.28)] hover:bg-[#D4B860]`

export default function DestinationsSection() {
  const prefersReducedMotion = useReducedMotion()
  const imageHoverClass = prefersReducedMotion ? '' : 'group-hover:scale-105'
  const arrowHoverClass = prefersReducedMotion ? '' : 'group-hover:translate-x-1'
  const iconHoverClass = prefersReducedMotion ? '' : 'group-hover/btn:translate-x-0.5'
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const textRevealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }
  const textRevealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
  const outlineArrowButton = `${outlineArrowButtonBase} ${arrowHoverClass}`
  const filledArrowButton = `${filledArrowButtonBase} ${arrowHoverClass}`

  return (
    <section className="mt-destinations-bg relative overflow-hidden pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,74,0.08),transparent_28%)] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Two-Column Layout: Text Left, Cards Right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 mb-8 md:mb-12">
          {/* LEFT COLUMN: Text Block with Vertical Rail */}
          <motion.div
            initial={textRevealInitial}
            whileInView={textRevealInView}
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
                <ArrowRight size={14} className={prefersReducedMotion ? '' : 'group-hover:translate-x-1 transition-transform'} />
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

            {/* Card Grid */}
            <div className="relative">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 - Iceland */}
                <motion.div
                  initial={revealInitial}
                  whileInView={revealInView}
                  whileHover={prefersReducedMotion ? undefined : { y: -7, rotateZ: -0.7 }}
                  transition={{ duration: 0.8, delay: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-[#C9A24A]/24 shadow-[0_26px_70px_rgba(0,0,0,0.46),0_0_0_1px_rgba(201,162,74,0.08)] transition-all duration-500 hover:border-[#C9A24A]/45 hover:shadow-[0_34px_88px_rgba(0,0,0,0.54),0_0_0_1px_rgba(201,162,74,0.13)]">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${imageHoverClass}`}
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
                          <ArrowRight size={15} className={`transition-transform ${iconHoverClass}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Turkey (Center - Featured) */}
                <div className="md:-translate-y-6">
                  <motion.div
                    initial={revealInitial}
                    whileInView={revealInView}
                    whileHover={prefersReducedMotion ? undefined : { y: -8, rotateZ: 0.45 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-[#C9A24A]/34 shadow-[0_34px_96px_rgba(0,0,0,0.56),0_0_0_1px_rgba(201,162,74,0.12)] transition-all duration-500 hover:border-[#C9A24A]/55 hover:shadow-[0_42px_110px_rgba(0,0,0,0.62),0_0_0_1px_rgba(201,162,74,0.18)]">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${imageHoverClass}`}
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
                            <ArrowRight size={15} className={`transition-transform ${iconHoverClass}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Card 3 - Japan */}
                <motion.div
                  initial={revealInitial}
                  whileInView={revealInView}
                  whileHover={prefersReducedMotion ? undefined : { y: -7, rotateZ: 0.7 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-[#C9A24A]/24 shadow-[0_26px_70px_rgba(0,0,0,0.46),0_0_0_1px_rgba(201,162,74,0.08)] transition-all duration-500 hover:border-[#C9A24A]/45 hover:shadow-[0_34px_88px_rgba(0,0,0,0.54),0_0_0_1px_rgba(201,162,74,0.13)]">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${imageHoverClass}`}
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
                          <ArrowRight size={15} className={`transition-transform ${iconHoverClass}`} />
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
