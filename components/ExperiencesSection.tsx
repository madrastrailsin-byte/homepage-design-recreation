'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const experiences = [
  {
    id: 1,
    title: 'Local Flavours',
    description: 'Taste the world like a local',
    image: 'https://images.unsplash.com/photo-1504674900967-96c0fcdc7b48?w=500&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Luxury Escapes',
    description: 'Indulge in unparalleled comfort',
    image: 'https://images.unsplash.com/photo-1542314503-37143078c4f8?w=500&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Cultural Connections',
    description: 'Immerse in traditions that inspire',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Adventure Awaits',
    description: 'For the explorers at heart',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop',
  },
]

export default function ExperiencesSection() {
  return (
    <section className="bg-[#0D1117] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-32 max-w-2xl"
        >
          <h2 className="text-6xl md:text-7xl font-serif text-white mb-4 leading-tight">Handpicked</h2>
          <h3 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">Experiences Just for You</h3>
          <div className="w-px h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mb-8" />
          <p className="text-[#D4AF37]/70 text-base leading-relaxed font-light">
            Unique places. Authentic moments. Unforgettable memories.
          </p>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-96 rounded-2xl overflow-hidden card-luxury cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${exp.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                {/* Top Badge */}
                <div className="flex justify-end">
                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] group-hover:border-white transition-colors" />
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 leading-tight">{exp.title}</h3>
                  <p className="text-[#D4AF37]/80 text-sm md:text-base mb-6 font-light">{exp.description}</p>
                  <button className="flex items-center gap-2 text-[#D4AF37] group-hover:text-white transition text-xs md:text-sm font-semibold">
                    <span>Discover</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hover Button */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center text-black hover:bg-white transition shadow-lg">
                  <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
