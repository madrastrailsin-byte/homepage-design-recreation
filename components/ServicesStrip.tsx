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
    <div className="w-full bg-gradient-to-b from-[#0D1117]/50 to-[#0D1117] py-8 md:py-11 -mt-16 md:-mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-center">
          <div 
            className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 rounded-2xl px-8 md:px-12 py-6 md:py-8 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(11, 42, 53, 0.07)' }}
          >
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="flex flex-col items-center gap-2 text-center group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#C9A24A]/25 flex items-center justify-center group-hover:border-[#C9A24A]/60 group-hover:bg-[#C9A24A]/10 transition-all duration-300">
                    <Icon size={20} className="md:w-6 md:h-6 text-[#C9A24A] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-light text-[#C9A24A] tracking-widest group-hover:text-white transition-colors hidden md:inline">{service.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
