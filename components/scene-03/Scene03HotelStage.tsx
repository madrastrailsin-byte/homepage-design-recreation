'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Scene03Content } from '@/lib/scene03-data'
import Scene03InfoPanel from './Scene03InfoPanel'
import Scene03SupportCards from './Scene03SupportCards'

type Scene03HotelStageProps = {
  content: Pick<Scene03Content, 'hotelImage' | 'hotel' | 'roomOptions' | 'supportCards'>
}

export default function Scene03HotelStage({ content }: Scene03HotelStageProps) {
  const [selectedRoomId, setSelectedRoomId] = useState(content.roomOptions[0]?.id ?? '')

  return (
    <div className="mt-scene03-visual relative h-full min-h-[18rem] overflow-hidden sm:min-h-[22rem] md:min-h-0">
      <div className="mt-scene03-image-shell absolute inset-0 overflow-hidden">
        <Image
          src={content.hotelImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="mt-scene03-hotel-image object-cover"
          style={{ objectPosition: 'center 42%' }}
          priority={false}
        />
        <div className="mt-scene03-image-feather absolute inset-0" aria-hidden="true" />
        <div className="mt-scene03-image-vignette absolute inset-0" aria-hidden="true" />
      </div>

      <div className="mt-scene03-overlay relative z-10 flex h-full flex-col justify-end gap-3 p-4 sm:p-6 md:justify-center md:p-8 lg:p-10">
        <div className="mt-scene03-overlay-grid flex w-full flex-col items-stretch gap-3 sm:items-end md:max-w-none md:flex-row md:items-center md:justify-end md:gap-4 lg:gap-5">
          <Scene03SupportCards cards={content.supportCards} />
          <div className="flex justify-end">
            <Scene03InfoPanel
              hotel={content.hotel}
              roomOptions={content.roomOptions}
              selectedRoomId={selectedRoomId}
              onRoomSelect={setSelectedRoomId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
