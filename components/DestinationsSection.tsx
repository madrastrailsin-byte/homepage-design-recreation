'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Iceland',
    label: 'Discover',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Turkey',
    label: 'Explore',
    image: 'https://images.unsplash.com/photo-1524578271613-1a0ca8cdc779?w=500&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Japan',
    label: 'Experience',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a2?w=500&h=600&fit=crop',
  },
]

export default function DestinationsSection() {
  return (
    <section className="bg-[#0D1117] section-spacing">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-[#D4AF37] text-sm font-semibold tracking-widest mb-4">CURATED GLOBALLY.</div>
            <div className="text-[#D4AF37] text-sm font-semibold tracking-widest mb-8">CRAFTED PERSONALLY</div>
            <div className="w-1 h-16 bg-[#D4AF37]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Your Journey,
              <br />
              Our Expertise.
            </h2>
            <p className="text-[#D4AF37]/80 mb-6">
              From the world&apos;s most iconic cities to hidden gems only locals know, we design journeys that are as unique as you are.
            </p>
            <a href="#" className="text-[#D4AF37] font-semibold text-sm hover:text-white transition inline-flex items-center gap-2">
              DISCOVER OUR SERVICES <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-80 rounded-2xl overflow-hidden card-luxury cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8">
                {/* Badge */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-[#D4AF37] text-xs font-semibold mb-2">{dest.label}</p>
                  <h3 className="text-3xl font-serif text-white mb-4">{dest.name}</h3>
                  <button className="flex items-center gap-2 text-[#D4AF37] group-hover:text-white transition text-sm font-semibold">
                    <span>View</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Hover Button */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black hover:bg-white transition">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
