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
    <div className="relative z-10 -mt-16 w-full bg-gradient-to-b from-[rgba(3,21,27,0.18)] via-[#061f28] to-[#072630] pt-4 pb-9 md:-mt-20 md:pt-5 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-center">
          <div 
            className="flex flex-wrap justify-center gap-4 md:gap-6 rounded-2xl px-8 md:px-12 py-3 md:py-4 backdrop-blur-sm border border-[#C9A24A]/30 shadow-[0_22px_70px_rgba(0,0,0,0.22)]"
            style={{ backgroundColor: 'rgba(6, 31, 40, 0.34)' }}
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
