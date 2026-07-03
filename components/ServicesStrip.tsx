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
    <div className="w-full bg-gradient-to-b from-[#0D1117]/50 to-[#0D1117] py-4 md:py-5 -mt-16 md:-mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-center">
          <div 
            className="flex flex-wrap justify-center gap-4 md:gap-6 rounded-2xl px-8 md:px-12 py-3 md:py-4 backdrop-blur-sm border border-[#C9A24A]/30"
            style={{ backgroundColor: 'rgba(11, 42, 53, 0.07)' }}
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
        </div>
      </div>
    </div>
  )
}
