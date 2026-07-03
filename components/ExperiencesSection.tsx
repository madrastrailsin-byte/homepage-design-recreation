'use client'

import { motion } from 'framer-motion'
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
  return (
    <section className="bg-[#0D1117] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Handpicked</h2>
          <h3 className="text-4xl md:text-5xl text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Experiences Just for You</h3>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A24A] via-[#C9A24A]/50 to-transparent mb-4 md:mb-6" />
          <p className="text-[#C9A24A]/60 text-sm md:text-base leading-relaxed font-light">
            Unique places. Authentic moments. Unforgettable memories.
          </p>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group relative h-80 md:h-96 rounded-t-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image - Full Coverage */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${exp.image})` }}
              >
                {/* Dark Gradient Overlay - Bottom Heavy */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/85" />
              </div>

              {/* Content - Overlaid on Image */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl md:text-2xl text-white mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{exp.title}</h3>
                  <div className="flex items-center gap-2 mb-0">
                    <div className="w-1 h-px bg-[#C9A24A]" />
                    <p className="text-[#C9A24A] text-xs font-light tracking-wider">{exp.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Circular Arrow Button - Bottom Right */}
              <button className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-12 h-12 rounded-full bg-[#C9A24A] flex items-center justify-center text-[#071B24] hover:bg-white transition-all shadow-lg hover:shadow-xl">
                <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
