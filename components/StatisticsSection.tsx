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
    <section className="bg-[#F2E7CC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-[#D4AF37] text-4xl md:text-5xl font-bold mb-3">{stat.number}</div>
              <div className="text-[#0D4C5C] text-xs font-semibold tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
