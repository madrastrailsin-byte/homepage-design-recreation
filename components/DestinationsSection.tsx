'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Iceland',
    label: 'Discover',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=700&fit=crop',
  },
  {
    id: 2,
    name: 'Turkey',
    label: 'Explore',
    image: 'https://images.unsplash.com/photo-1524578271613-1a0ca8cdc779?w=700&h=800&fit=crop',
  },
  {
    id: 3,
    name: 'Japan',
    label: 'Experience',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a2?w=600&h=700&fit=crop',
  },
]

export default function DestinationsSection() {
  return (
    <section className="bg-[#0D1117] py-24 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-24 md:mb-32 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-2">CURATED</div>
            <div className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-8">GLOBALLY.</div>
            <div className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-8">CRAFTED</div>
            <div className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-12">PERSONALLY</div>
            <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 md:mb-10 leading-tight">
              Your Journey,
              <br />
              Our Expertise.
            </h2>
            <p className="text-[#D4AF37]/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-light">
              From the world&apos;s most iconic cities to hidden gems only locals know, we design journeys that are as unique as you are.
            </p>
            <a href="#" className="text-[#D4AF37] font-semibold text-sm hover:text-white transition inline-flex items-center gap-2 group">
              DISCOVER OUR SERVICES 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Staggered Overlapping Cards */}
        <div className="relative h-96 md:h-screen md:min-h-[600px] md:max-h-[800px]">
          {/* Card 1 - Iceland (Top Left, Smaller) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 w-full md:w-2/5 h-64 md:h-96 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#333333]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div />
                <div>
                  <p className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-3">{destinations[0].label}</p>
                  <h3 className="text-4xl font-serif text-white mb-4">{destinations[0].name}</h3>
                  <button className="flex items-center gap-2 text-[#D4AF37] group-hover:text-white transition text-sm font-semibold">
                    <span>Discover</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Turkey (Center, Hero Card - Larger) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-20 md:top-0 left-1/2 md:left-1/3 w-full md:w-3/5 h-80 md:h-full group cursor-pointer z-10"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#333333] hover:shadow-[0_40px_100px_rgba(212,175,55,0.15)] transition-all duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                <div />
                <div>
                  <p className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-3">{destinations[1].label}</p>
                  <h3 className="text-5xl md:text-6xl font-serif text-white mb-6">{destinations[1].name}</h3>
                  <button className="flex items-center gap-2 text-[#D4AF37] group-hover:text-white transition text-sm font-semibold">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Japan (Bottom Right, Smaller) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-0 right-0 w-full md:w-2/5 h-64 md:h-96 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#333333]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${destinations[2].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div />
                <div>
                  <p className="text-[#D4AF37] text-xs font-semibold tracking-widest mb-3">{destinations[2].label}</p>
                  <h3 className="text-4xl font-serif text-white mb-4">{destinations[2].name}</h3>
                  <button className="flex items-center gap-2 text-[#D4AF37] group-hover:text-white transition text-sm font-semibold">
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
