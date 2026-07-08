'use client'

import { Star } from 'lucide-react'
import type { Scene03Hotel, Scene03RoomOption } from '@/lib/scene03-data'
import Scene03RoomChips from './Scene03RoomChips'

type Scene03InfoPanelProps = {
  hotel: Scene03Hotel
  roomOptions: Scene03RoomOption[]
  selectedRoomId: string
  onRoomSelect: (id: string) => void
}

export default function Scene03InfoPanel({
  hotel,
  roomOptions,
  selectedRoomId,
  onRoomSelect,
}: Scene03InfoPanelProps) {
  const activeRoom =
    roomOptions.find((option) => option.id === selectedRoomId)?.label ?? hotel.roomType

  return (
    <div className="mt-scene03-panel mt-premium-glass mt-story-stat-illustration w-full max-w-[19.5rem] rounded-2xl border border-[#C9A24A]/22 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-[box-shadow,border-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C9A24A]/32 hover:opacity-[0.98] hover:shadow-[0_34px_96px_rgba(0,0,0,0.4)] sm:max-w-[21rem] sm:p-5 md:max-w-[22.5rem]">
      <p className="mt-eyebrow text-[9px] text-[#C9A24A] sm:text-[10px]">{hotel.destinationTitle}</p>

      <h3 className="mt-display-soft mt-2 text-xl leading-tight text-[#FAFAF9] sm:text-[1.35rem]">
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

      <div className="mt-4 border-t border-[#C9A24A]/14 pt-4">
        <p className="mt-ui text-[9px] tracking-[0.16em] text-[#C9A24A]/78">ROOM TYPE</p>
        <p className="mt-body-copy mt-1 text-sm text-[#FAFAF9]">{activeRoom}</p>
      </div>

      <div className="mt-4">
        <Scene03RoomChips options={roomOptions} selectedId={selectedRoomId} onSelect={onRoomSelect} />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="mt-ui text-[9px] tracking-[0.16em] text-[#C9A24A]/78">FROM</p>
          <p className="mt-display-soft mt-1 text-2xl leading-none text-[#FAFAF9]">{hotel.price}</p>
          <p className="mt-body-copy mt-1 text-[11px] text-[#E8E8E8]/62">{hotel.priceUnit}</p>
        </div>

        <button
          type="button"
          className="btn-gold mt-gold-sheen mt-ui shrink-0 rounded-lg px-4 py-2.5 text-[10px] tracking-[0.14em] transition-transform duration-300 hover:-translate-y-px"
        >
          {hotel.ctaLabel}
        </button>
      </div>
    </div>
  )
}
