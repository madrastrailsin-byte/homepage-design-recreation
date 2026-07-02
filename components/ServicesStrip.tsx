'use client'

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
  return (
    <section className="glass-overlay border-y border-[#C9A24A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-14 md:py-18">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div key={idx} className="flex flex-col items-center gap-4 text-center group">
                <div className="w-16 h-16 rounded-full border border-[#C9A24A]/20 flex items-center justify-center group-hover:border-[#C9A24A]/50 group-hover:bg-[#C9A24A]/5 transition-all duration-300">
                  <Icon size={28} className="text-[#C9A24A] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-light text-[#C9A24A] tracking-widest group-hover:text-white transition-colors">{service.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
