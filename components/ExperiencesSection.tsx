'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const experiences = [
  {
    id: 1,
    title: 'Local Flavours',
    subtitle: 'Taste the world like a local',
    image: '/images/experience-local-flavours.png',
  },
  {
    id: 2,
    title: 'Luxury Escapes',
    subtitle: 'Indulge in unparalleled comfort',
    image: '/images/experience-luxury-escapes.png',
  },
  {
    id: 3,
    title: 'Cultural Connections',
    subtitle: 'Immerse in traditions that inspire',
    image: '/images/experience-cultural-connections.png',
  },
  {
    id: 4,
    title: 'Adventure Awaits',
    subtitle: 'For the explorers at heart',
    image: '/images/experience-adventure-awaits.png',
  },
]

export default function ExperiencesSection() {
  const prefersReducedMotion = useReducedMotion()
  const motionEase = [0.22, 1, 0.36, 1] as const
  const headerInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
  const headerInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const cardInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
  const cardInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const imageInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.02, clipPath: 'inset(0% 0% 8% 0%)' }
  const imageInView = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
  const imageHoverClass = prefersReducedMotion ? '' : 'group-hover:scale-[1.018]'
  const arrowHoverClass = prefersReducedMotion ? '' : 'group-hover:translate-x-0.5'

  return (
    <section className="relative overflow-hidden bg-[#0D1117] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[rgba(242,231,204,0.1)] via-[rgba(4,29,34,0.18)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#03191D]/18 to-[#03191D]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={headerInitial}
          whileInView={headerInView}
          transition={{ duration: 0.82, ease: motionEase }}
          viewport={{ once: true, amount: 0.24 }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <h2 className="mt-display text-4xl md:text-5xl text-white mb-2 leading-tight">Handpicked</h2>
          <h3 className="mt-display text-4xl md:text-5xl text-white mb-4 md:mb-6 leading-tight">Experiences Just for You</h3>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A24A] via-[#C9A24A]/50 to-transparent mb-4 md:mb-6" />
          <p className="mt-body-copy text-[#C9A24A]/60 text-sm md:text-base leading-relaxed">
            Unique places. Authentic moments. Unforgettable memories.
          </p>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={cardInitial}
              whileInView={cardInView}
              whileHover={prefersReducedMotion ? undefined : { y: -4, rotateX: 0.5, rotateZ: idx % 2 === 0 ? -0.3 : 0.3, transformPerspective: 900 }}
              transition={{ duration: 0.82, delay: idx * 0.08, ease: motionEase }}
              viewport={{ once: true, amount: 0.24 }}
              className="group relative h-80 md:h-96 rounded-t-3xl overflow-hidden cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.34)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.48)] transition-shadow duration-500"
            >
              {/* Background Image - Full Coverage */}
              <motion.div
                initial={imageInitial}
                whileInView={imageInView}
                transition={{ duration: 0.85, delay: 0.08 + idx * 0.08, ease: motionEase }}
                viewport={{ once: true, amount: 0.24 }}
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${imageHoverClass}`}
                style={{ backgroundImage: `url(${exp.image})` }}
              >
                {/* Dark Gradient Overlay - Bottom Heavy */}
                <div className="mt-experience-depth absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/85" />
              </motion.div>
              <div className="mt-card-reflection absolute inset-0 pointer-events-none" />

              {/* Content - Overlaid on Image */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="mt-display text-xl md:text-2xl text-white mb-2 leading-tight">{exp.title}</h3>
                  <div className="flex items-center gap-2 mb-0">
                    <div className="w-1 h-px bg-[#C9A24A]" />
                    <p className="mt-body-copy text-[#C9A24A] text-xs tracking-wider">{exp.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Circular Arrow Button - Bottom Right */}
              <button className="mt-gold-sheen absolute bottom-6 md:bottom-8 right-6 md:right-8 w-12 h-12 rounded-full bg-[#C9A24A] flex items-center justify-center text-[#071B24] hover:bg-white shadow-lg hover:shadow-xl">
                <ArrowRight size={20} className={`transition-transform duration-300 ${arrowHoverClass}`} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
