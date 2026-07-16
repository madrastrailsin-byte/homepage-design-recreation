'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Scene03Content } from '@/lib/scene03-data'
import Scene03InfoPanel from './Scene03InfoPanel'
import Scene03SupportCards from './Scene03SupportCards'

type Scene03HotelStageProps = {
  content: Pick<Scene03Content, 'hotels'>
}

export default function Scene03HotelStage({ content }: Scene03HotelStageProps) {
  const reduceMotion = useReducedMotion()
  const [selectedHotelId, setSelectedHotelId] = useState(content.hotels[0]?.id ?? '')
  const selectedHotel = content.hotels.find((hotel) => hotel.id === selectedHotelId) ?? content.hotels[0]
  const [selectedRoomId, setSelectedRoomId] = useState(selectedHotel?.roomOptions[0]?.id ?? '')

  if (!selectedHotel) return null

  const handleHotelSelect = (id: string) => {
    const nextHotel = content.hotels.find((hotel) => hotel.id === id)
    if (!nextHotel) return

    setSelectedHotelId(id)
    setSelectedRoomId(nextHotel.roomOptions[0]?.id ?? '')
  }

  return (
    <div className="mt-scene03-visual relative min-h-[28rem] overflow-hidden bg-[#03191D] sm:min-h-[31rem] lg:h-full lg:min-h-[34rem]">
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden rounded-l-[2rem] border-y border-l border-[#C9A24A]/12 bg-[#061820] shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:inset-y-0 lg:w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedHotel.image}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={selectedHotel.image}
              alt={selectedHotel.name}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: selectedHotel.imagePosition }}
              priority={false}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,25,29,0.72)_0%,rgba(3,25,29,0.5)_12%,rgba(3,25,29,0.22)_28%,rgba(3,25,29,0.06)_44%,transparent_60%)]" />

<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.02),rgba(2,15,18,0.08)_62%,rgba(2,15,18,0.22))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_48%,rgba(212,175,55,0.08),transparent_36%)]" />
      </div>

      <div className="relative z-10 flex h-full min-h-[28rem] items-center px-4 py-6 sm:min-h-[31rem] sm:px-6 lg:min-h-[34rem] lg:px-7">
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-center lg:gap-5">
          <Scene03SupportCards
            hotels={content.hotels}
            selectedId={selectedHotel.id}
            onSelect={handleHotelSelect}
          />

          <div className="flex justify-end">
            <Scene03InfoPanel
              hotel={selectedHotel}
              selectedRoomId={selectedRoomId}
              onRoomSelect={setSelectedRoomId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
