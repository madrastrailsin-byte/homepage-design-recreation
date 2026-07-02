'use client'

import { motion } from 'framer-motion'

const stats = [
  { number: '10+', label: 'YEARS OF EXPERTISE' },
  { number: '50+', label: 'DESTINATIONS WORLDWIDE' },
  { number: '1000+', label: 'CURATED JOURNEYS' },
  { number: '99%', label: 'HAPPY TRAVELLERS' },
]

export default function StatisticsSection() {
  return (
    <section className="bg-[#F2E7CC] py-28 md:py-40 relative overflow-hidden" style={{
      backgroundImage: 'url("data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22paper%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22 result=%22noise%22/><feDisplacementMap in=%22SourceGraphic%22 in2=%22noise%22 scale=%2220%22/></filter><rect width=%22100%22 height=%22100%22 fill=%22%23F2E7CC%22 filter=%22url(%23paper)%22/></svg>")',
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 xl:gap-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4 py-4"
            >
              {idx < stats.length - 1 && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-[#C9A24A]/20 hidden md:block" />}
              <div className="text-[#C9A24A] text-6xl md:text-7xl leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{stat.number}</div>
              <div className="text-[#123B47] text-xs font-light tracking-widest leading-relaxed uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
