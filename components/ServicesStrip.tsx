'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Plane, Hotel, MapPin, Compass, Shield, Clock } from 'lucide-react'

const services = [
  { icon: Plane, label: 'FLIGHTS' },
  { icon: Hotel, label: 'HOTELS' },
  { icon: MapPin, label: 'CUSTOM TOURS' },
  { icon: Compass, label: 'EXPERIENCES' },
  { icon: Shield, label: 'TRAVEL INSURANCE' },
  { icon: Clock, label: '24/7 SUPPORT' },
]

export default function ServicesStrip() {
  const prefersReducedMotion = useReducedMotion()
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const motionEase = [0.22, 1, 0.36, 1] as const

  return (
    <div className="mt-scroll-services mt-services-flow relative isolate z-10 -mt-16 w-full bg-gradient-to-b from-[rgba(3,25,29,0.04)] via-[#041D22] to-[#03191D] pt-4 pb-9 md:-mt-20 md:pt-5 md:pb-12">
      <div className="pointer-events-none absolute inset-x-0 -top-14 z-0 h-28 bg-gradient-to-b from-transparent via-[#03191D]/24 to-[#041D22]/96" />
      <div className="mt-services-scene relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={revealInitial}
          whileInView={revealInView}
          transition={{ duration: 0.82, ease: motionEase }}
          viewport={{ once: true, amount: 0.42 }}
          className="flex justify-center"
        >
          <div
            className="mt-premium-glass flex flex-wrap justify-center gap-4 md:gap-6 rounded-2xl px-8 md:px-12 py-3 md:py-4 border border-[#C9A24A]/30 shadow-[0_22px_70px_rgba(0,0,0,0.22)]"
          >
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="flex items-center gap-2 group whitespace-nowrap">
                  <Icon size={16} className="text-[#C9A24A] group-hover:text-white transition-colors flex-shrink-0" />
                  <span className="text-[11px] font-light text-[#C9A24A] tracking-widest group-hover:text-white transition-colors">{service.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-b from-transparent via-[#03191D]/42 to-[#03191D]" />
    </div>
  )
}
