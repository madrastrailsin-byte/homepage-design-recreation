'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Scene03Content } from '@/lib/scene03-data'
import Scene03InfoPanel from './Scene03InfoPanel'
import Scene03SupportCards from './Scene03SupportCards'

type Scene03HotelStageProps = {
  content: Pick<Scene03Content, 'hotels'>
}

export default function Scene03HotelStage({ content }: Scene03HotelStageProps) {
  const reduceMotion = useReducedMotion()
  const [selectedHotelId, setSelectedHotelId] = useState(
    content.hotels[0]?.id ?? ''
  )
  const [direction, setDirection] = useState(1)

  const selectedIndex = useMemo(
    () => content.hotels.findIndex((hotel) => hotel.id === selectedHotelId),
    [content.hotels, selectedHotelId]
  )

  const selectedHotel =
    content.hotels[selectedIndex] ?? content.hotels[0]

  const [selectedRoomId, setSelectedRoomId] = useState(
    selectedHotel?.roomOptions[0]?.id ?? ''
  )

  if (!selectedHotel) return null

  const handleHotelSelect = (id: string) => {
    const nextIndex = content.hotels.findIndex((hotel) => hotel.id === id)
    const nextHotel = content.hotels[nextIndex]

    if (!nextHotel || id === selectedHotelId) return

    setDirection(nextIndex > selectedIndex ? 1 : -1)
    setSelectedHotelId(id)
    setSelectedRoomId(nextHotel.roomOptions[0]?.id ?? '')
  }

  const imageInitial = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 0,
        x: direction * 90,
        scale: 1.12,
        clipPath:
          direction > 0
            ? 'inset(0 0 0 38%)'
            : 'inset(0 38% 0 0)',
      }

  const imageAnimate = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        scale: 1,
        clipPath: 'inset(0 0 0 0)',
      }

  const imageExit = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 0,
        x: direction * -70,
        scale: 1.06,
        clipPath:
          direction > 0
            ? 'inset(0 42% 0 0)'
            : 'inset(0 0 0 42%)',
      }

  return (
    <div className="mt-scene03-visual relative min-h-[28rem] overflow-hidden bg-[#03191D] sm:min-h-[31rem] lg:h-full lg:min-h-[34rem]">
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden rounded-l-[2rem] border-y border-l border-[#C9A24A]/12 bg-[#061820] shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:inset-y-0 lg:w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedHotel.id}
            custom={direction}
            className="absolute inset-0"
            initial={imageInitial}
            animate={imageAnimate}
            exit={imageExit}
            transition={{
              duration: reduceMotion ? 0 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={selectedHotel.image}
              alt={selectedHotel.name}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="mt-scene03-hotel-image object-cover"
              style={{ objectPosition: selectedHotel.imagePosition }}
              priority={false}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <motion.div
            key={`sweep-${selectedHotel.id}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[3] w-[24%] bg-[linear-gradient(90deg,transparent,rgba(255,245,210,0.2),transparent)] mix-blend-screen"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction > 0 ? '-140%' : '520%' }
            }
            animate={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: [0, 0.85, 0], x: direction > 0 ? '520%' : '-140%' }
            }
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(90deg,rgba(3,25,29,0.76)_0%,rgba(3,25,29,0.54)_12%,rgba(3,25,29,0.24)_28%,rgba(3,25,29,0.08)_44%,transparent_62%)]" />
        <div className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(2,15,18,0.02),rgba(2,15,18,0.08)_62%,rgba(2,15,18,0.25))]" />
        <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_76%_48%,rgba(212,175,55,0.11),transparent_38%)]" />
      </div>

      <div className="relative z-10 flex h-full min-h-[28rem] items-center px-4 py-6 sm:min-h-[31rem] sm:px-6 lg:min-h-[34rem] lg:px-7">
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-center lg:gap-5">
          <Scene03SupportCards
            hotels={content.hotels}
            selectedId={selectedHotel.id}
            onSelect={handleHotelSelect}
          />

          <div className="flex justify-end">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedHotel.id}
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 28, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -18, scale: 0.985 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full max-w-[24rem]"
              >
                <Scene03InfoPanel
                  hotel={selectedHotel}
                  selectedRoomId={selectedRoomId}
                  onRoomSelect={setSelectedRoomId}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
