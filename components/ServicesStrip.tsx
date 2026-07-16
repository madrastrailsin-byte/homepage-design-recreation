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
    <div className="mt-scroll-services mt-services-flow mt-journey-motif relative isolate z-20 -mt-10 w-full bg-gradient-to-b from-transparent via-[#041D22] to-[#03191D] pt-10 pb-10 md:-mt-14 md:pt-10 md:pb-14">
      <div className="pointer-events-none absolute inset-x-0 -top-16 z-0 h-32 bg-gradient-to-b from-transparent via-[#03191D]/18 to-[#041D22]" />
      <div className="mt-services-scene mt-story-service-panel relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-center">
          <div
            className="mt-premium-glass flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-9 md:gap-y-5 rounded-[22px] px-8 md:px-14 py-5 md:py-6 border border-[#C9A24A]/36 shadow-[0_28px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="flex items-center gap-2.5 group whitespace-nowrap">
                  <Icon size={18} className="text-[#C9A24A] group-hover:text-white transition-colors flex-shrink-0" />
                  <span className="mt-ui text-[11px] font-medium text-[#C9A24A] tracking-[0.18em] group-hover:text-white transition-colors">{service.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#03191D]/28 to-[#03191D]" />
    </div>
  )
}
