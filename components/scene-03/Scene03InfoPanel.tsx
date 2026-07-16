'use client'

import { Star } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Scene03Hotel } from '@/lib/scene03-data'
import Scene03RoomChips from './Scene03RoomChips'

type Scene03InfoPanelProps = {
  hotel: Scene03Hotel
  selectedRoomId: string
  onRoomSelect: (id: string) => void
}

export default function Scene03InfoPanel({
  hotel,
  selectedRoomId,
  onRoomSelect,
}: Scene03InfoPanelProps) {
  const reduceMotion = useReducedMotion()
  const activeRoom = hotel.roomOptions.find((option) => option.id === selectedRoomId) ?? hotel.roomOptions[0]

  return (
    <div className="mt-scene03-panel mt-premium-glass mt-story-stat-illustration w-full max-w-[23rem] rounded-[1.5rem] border border-[#C9A24A]/22 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-[box-shadow,border-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C9A24A]/32 hover:opacity-[0.98] hover:shadow-[0_34px_96px_rgba(0,0,0,0.4)] sm:max-w-[23rem] sm:p-5 md:max-w-[24rem]">
      <p className="mt-eyebrow text-[9px] text-[#C9A24A] sm:text-[10px]">{hotel.destinationTitle}</p>

      <h3 className="mt-display-soft mt-2 text-[1.4rem] leading-tight text-[#FAFAF9] sm:text-[1.35rem]">
        {hotel.name}
      </h3>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5" aria-label={`Rating ${hotel.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={11}
              className={
                index < Math.floor(hotel.rating)
                  ? 'fill-[#C9A24A] text-[#C9A24A]'
                  : 'fill-[#C9A24A]/35 text-[#C9A24A]/35'
              }
            />
          ))}
        </div>
        <span className="mt-body-copy text-[11px] text-[#E8E8E8]/72">
          {hotel.rating.toFixed(1)} · {hotel.reviewLabel}
        </span>
      </div>

      <div className="mt-3 border-t border-[#C9A24A]/14 pt-4">
        <p className="mt-ui text-[9px] tracking-[0.16em] text-[#C9A24A]/78">ROOM TYPE</p>
        <motion.p
          key={`${hotel.id}-${activeRoom?.id}-room`}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-body-copy mt-2 text-base text-[#FAFAF9]"
        >
          {activeRoom?.label}
        </motion.p>
      </div>

      <div className="mt-3">
        <Scene03RoomChips options={hotel.roomOptions} selectedId={selectedRoomId} onSelect={onRoomSelect} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="mt-ui text-[9px] tracking-[0.16em] text-[#C9A24A]/78">FROM</p>
          <motion.p
            key={`${hotel.id}-${activeRoom?.id}-price`}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-display-soft mt-1 text-[1.7rem] leading-none text-[#FAFAF9]"
          >
            {activeRoom?.price}
          </motion.p>
          <p className="mt-body-copy mt-1 text-[11px] text-[#E8E8E8]/62">{hotel.priceUnit}</p>
        </div>

        <button
  type="button"
  onClick={() => {
    document
      .getElementById('callback-request')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }}
  className="btn-gold mt-ui shrink-0 rounded-xl px-4 py-2.5 text-[10px] tracking-[0.14em] transition-transform duration-300 hover:-translate-y-px"
>
  {hotel.ctaLabel}
</button>
      </div>
    </div>
  )
}
