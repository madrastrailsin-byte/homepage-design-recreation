'use client'

import Image from 'next/image'
import ServicesField from './ServicesField'
import { travelServices } from '@/lib/services-data'

export default function ServicesCabin() {
  return (
    <section
      aria-label="MadrasTrails services cabin"
      className="relative h-[100svh] w-full overflow-hidden bg-[#160d08]"
    >
      <Image
        src="/images/services/cabin/cabin-final-clean-v2.png"
        alt="A heritage cabin with a wooden services board, fireplace, hanging lantern and rainy window."
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ filter: 'brightness(0.84) contrast(1.15) saturate(0.76) sepia(0.13)' }}
        priority
      />
      <ServicesField services={travelServices} cabinMode />
    </section>
  )
}
