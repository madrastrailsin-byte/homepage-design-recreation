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
    <section className="bg-[#1a1f26] border-y border-[#333333]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div key={idx} className="flex flex-col items-center gap-3 text-center">
                <Icon size={32} className="text-[#D4AF37]" />
                <span className="text-xs font-semibold text-[#E8E8E8] tracking-widest">{service.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
