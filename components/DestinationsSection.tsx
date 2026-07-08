'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Iceland',
    label: 'Discover',
    image: '/images/real-photos/library/hidden-destination.jpg',
    objectPosition: 'center 35%',
  },
  {
    id: 2,
    name: 'Turkey',
    label: 'Explore',
    image: '/images/real-photos/library/temple-ceremony.jpg',
    objectPosition: 'center 45%',
  },
  {
    id: 3,
    name: 'Japan',
    label: 'Experience',
    image: '/images/real-photos/library/street-photography.webp',
    objectPosition: 'center 55%',
  },
]

const arrowButtonBase =
  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] group/btn'

const outlineArrowButtonBase =
  `${arrowButtonBase} border border-[#C9A24A]/55 bg-[#061f28]/34 text-[#C9A24A] shadow-[0_10px_24px_rgba(0,0,0,0.24)] hover:border-[#C9A24A]/85 hover:bg-[#C9A24A]/12`

const filledArrowButtonBase =
  `${arrowButtonBase} border border-[#C9A24A]/70 bg-[#C9A24A] text-[#071B24] shadow-[0_12px_28px_rgba(0,0,0,0.28)] hover:bg-[#D4B860]`

export default function DestinationsSection() {
  const prefersReducedMotion = useReducedMotion()
  const motionEase = [0.22, 1, 0.36, 1] as const
  const imageHoverClass = prefersReducedMotion ? '' : 'group-hover:scale-[1.05]'
  const iconHoverClass = prefersReducedMotion ? '' : 'group-hover/btn:translate-x-1'
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const imageRevealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, clipPath: 'inset(0% 0% 6% 0%)' }
  const imageRevealInView = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
  const textRevealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }
  const textRevealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const outlineArrowButton = `${outlineArrowButtonBase} mt-gold-sheen`
  const filledArrowButton = `${filledArrowButtonBase} mt-gold-sheen`
  const editorialTransition = (delay = 0) => ({ duration: 0.82, delay, ease: motionEase })

  return (
    <section className="mt-scroll-destinations mt-destinations-bg mt-destinations-contour mt-journey-motif relative overflow-hidden pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#03191D] via-[#03191D]/46 to-transparent" />
      <div className="mt-destinations-texture-reveal mt-story-destination-bg absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Two-Column Layout: Text Left, Cards Right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 mb-8 md:mb-12">
          {/* LEFT COLUMN: Text Block with Vertical Rail */}
          <div className="mt-story-destination-copy md:col-span-2 flex gap-4">
            {/* Vertical Decorative Rail */}
            <motion.div
              initial={textRevealInitial}
              whileInView={textRevealInView}
              transition={editorialTransition(0)}
              viewport={{ once: true, amount: 0.24 }}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div className="mt-eyebrow text-[#C9A24A] text-[10px]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                EXPLORE
              </div>
              <div className="w-2.5 h-4 border border-[#C9A24A] rounded-full" />
              <div className="w-px h-24 bg-gradient-to-b from-[#C9A24A] to-transparent" />
            </motion.div>

            {/* Main Text Block */}
            <div className="flex-1">
              {/* Curated/Crafted Label - Two Lines, Tight */}
              <motion.div
                initial={textRevealInitial}
                whileInView={textRevealInView}
                transition={editorialTransition(0.06)}
                viewport={{ once: true, amount: 0.24 }}
                className="mb-1.5"
              >
                <div className="mt-eyebrow text-[#C9A24A] text-xs leading-tight">CURATED GLOBALLY.</div>
                <div className="mt-eyebrow text-[#C9A24A] text-xs leading-tight">CRAFTED PERSONALLY</div>
              </motion.div>

              {/* Small Gap */}
              <div className="h-4" />

              {/* Heading - Two Lines */}
              <motion.h2
                initial={textRevealInitial}
                whileInView={textRevealInView}
                transition={editorialTransition(0.14)}
                viewport={{ once: true, amount: 0.24 }}
                className="mt-display text-4xl md:text-5xl text-white mb-[18px] leading-tight"
              >
                Your Journey,
                <br />
                Our Expertise.
              </motion.h2>

              {/* Divider with Diamond Accent */}
              <motion.div
                initial={textRevealInitial}
                whileInView={textRevealInView}
                transition={editorialTransition(0.2)}
                viewport={{ once: true, amount: 0.24 }}
                className="flex items-center gap-2 my-[22px]"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A24A] to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-[#C9A24A]" />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={textRevealInitial}
                whileInView={textRevealInView}
                transition={editorialTransition(0.26)}
                viewport={{ once: true, amount: 0.24 }}
                className="mt-body-copy text-[#E8E8E8]/78 text-sm leading-relaxed mb-6"
              >
                From the world&apos;s most iconic cities to hidden gems only locals know, we design journeys that are as unique as you are.
              </motion.p>

              {/* CTA Link */}
              <motion.div
                initial={textRevealInitial}
                whileInView={textRevealInView}
                transition={editorialTransition(0.34)}
                viewport={{ once: true, amount: 0.24 }}
              >
                <a href="#" className="mt-gold-sheen mt-ui text-[#C9A24A] text-xs hover:text-white inline-flex items-center gap-2 group tracking-widest">
                  DISCOVER OUR SERVICES 
                  <ArrowRight size={14} className={prefersReducedMotion ? '' : 'group-hover:translate-x-1 transition-transform'} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: Cards Container */}
          <div className="mt-story-destination-stage md:col-span-3 flex flex-col">
            {/* Navigation Buttons - Top Right */}
            <div className="flex justify-end mb-7 gap-3">
              <button className="mt-gold-sheen group/btn w-9 h-9 rounded-full border border-[#C9A24A]/40 bg-[#061f28]/24 flex items-center justify-center hover:border-[#C9A24A]/70 hover:bg-[#C9A24A]/10">
                <ArrowLeft size={16} className={`text-[#C9A24A]/60 group-hover/btn:text-[#C9A24A] transition ${prefersReducedMotion ? '' : 'group-hover/btn:-translate-x-0.5'}`} />
              </button>
              <button className="mt-gold-sheen group/btn w-9 h-9 rounded-full bg-[#C9A24A] border border-[#C9A24A]/70 flex items-center justify-center hover:bg-[#D4B860] shadow-[0_10px_24px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.3)]">
                <ArrowRight size={16} className={`text-[#071B24] group-hover/btn:text-[#071B24] transition ${prefersReducedMotion ? '' : 'group-hover/btn:translate-x-0.5'}`} />
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
                  whileHover={prefersReducedMotion ? undefined : { y: -5, rotateZ: -0.12, rotateX: 0.12, transformPerspective: 900 }}
                transition={{ duration: 0.86, delay: 0.14, ease: motionEase }}
                  viewport={{ once: true, amount: 0.24 }}
                  className="mt-story-destination-card group cursor-pointer"
                >
                    <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-[#C9A24A]/24 shadow-[0_26px_70px_rgba(0,0,0,0.46),0_0_0_1px_rgba(201,162,74,0.08)] transition-[border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C9A24A]/48 hover:shadow-[0_38px_92px_rgba(0,0,0,0.58),0_0_38px_rgba(201,162,74,0.105),inset_0_1px_0_rgba(255,249,228,0.08)]">
                    <motion.div
                      initial={imageRevealInitial}
                      whileInView={imageRevealInView}
                      transition={{ duration: 0.9, delay: 0.14, ease: motionEase }}
                      viewport={{ once: true, amount: 0.24 }}
                      className={`mt-story-image absolute inset-0 bg-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${imageHoverClass}`}
                      style={{ backgroundImage: `url(${destinations[0].image})`, backgroundPosition: destinations[0].objectPosition }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,21,27,0.82)] via-[rgba(7,38,48,0.28)] to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
                    </motion.div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="mt-display text-3xl text-white mb-1">{destinations[0].name}</h3>
                          <p className="mt-body-copy text-[#C9A24A] text-xs mb-0">{destinations[0].label}</p>
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
                  whileHover={prefersReducedMotion ? undefined : { y: -5, rotateZ: 0.1, rotateX: 0.12, transformPerspective: 900 }}
                    transition={{ duration: 0.86, delay: 0, ease: motionEase }}
                    viewport={{ once: true, amount: 0.24 }}
                    className="mt-story-destination-card group cursor-pointer"
                  >
                    <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-[#C9A24A]/34 shadow-[0_34px_96px_rgba(0,0,0,0.56),0_0_0_1px_rgba(201,162,74,0.12)] transition-[border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C9A24A]/54 hover:shadow-[0_46px_116px_rgba(0,0,0,0.66),0_0_42px_rgba(201,162,74,0.105),inset_0_1px_0_rgba(255,249,228,0.08)]">
                      <motion.div
                        initial={imageRevealInitial}
                        whileInView={imageRevealInView}
                        transition={{ duration: 0.85, delay: 0.08, ease: motionEase }}
                        viewport={{ once: true, amount: 0.24 }}
                        className={`mt-story-image absolute inset-0 bg-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${imageHoverClass}`}
                        style={{ backgroundImage: `url(${destinations[1].image})`, backgroundPosition: destinations[1].objectPosition }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,21,27,0.76)] via-[rgba(7,38,48,0.2)] to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-transparent" />
                      </motion.div>
                      <div className="relative h-full flex flex-col justify-between p-6">
                        <div />
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <h3 className="mt-display text-4xl text-white mb-1">{destinations[1].name}</h3>
                            <p className="mt-body-copy text-[#C9A24A] text-xs">{destinations[1].label}</p>
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
                  whileHover={prefersReducedMotion ? undefined : { y: -5, rotateZ: 0.12, rotateX: 0.12, transformPerspective: 900 }}
                  transition={{ duration: 0.86, delay: 0.28, ease: motionEase }}
                  viewport={{ once: true, amount: 0.24 }}
                  className="mt-story-destination-card group cursor-pointer"
                >
                    <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-[#C9A24A]/24 shadow-[0_26px_70px_rgba(0,0,0,0.46),0_0_0_1px_rgba(201,162,74,0.08)] transition-[border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C9A24A]/48 hover:shadow-[0_38px_92px_rgba(0,0,0,0.58),0_0_38px_rgba(201,162,74,0.105),inset_0_1px_0_rgba(255,249,228,0.08)]">
                    <motion.div
                      initial={imageRevealInitial}
                      whileInView={imageRevealInView}
                      transition={{ duration: 0.9, delay: 0.28, ease: motionEase }}
                      viewport={{ once: true, amount: 0.24 }}
                      className={`mt-story-image absolute inset-0 bg-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${imageHoverClass}`}
                      style={{ backgroundImage: `url(${destinations[2].image})`, backgroundPosition: destinations[2].objectPosition }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,21,27,0.82)] via-[rgba(7,38,48,0.28)] to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
                    </motion.div>
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div />
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="mt-display text-3xl text-white mb-1">{destinations[2].name}</h3>
                          <p className="mt-body-copy text-[#C9A24A] text-xs">{destinations[2].label}</p>
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[rgba(8,45,52,0.12)] to-[rgba(242,231,204,0.1)]" />
    </section>
  )
}
