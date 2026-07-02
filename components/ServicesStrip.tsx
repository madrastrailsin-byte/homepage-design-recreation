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
    <div className="w-full bg-gradient-to-b from-[#0D1117]/80 to-[#0D1117] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-center">
          <div className="border border-[#C9A24A]/20 rounded-2xl backdrop-blur-md px-6 md:px-10 py-6 md:py-8" style={{
            background: 'rgba(11, 42, 53, 0.7)',
          }}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 text-center group">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#C9A24A]/30 flex items-center justify-center group-hover:border-[#C9A24A]/60 group-hover:bg-[#C9A24A]/10 transition-all duration-300">
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
    </div>
  )
}
