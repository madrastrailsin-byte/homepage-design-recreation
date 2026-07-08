'use client'

import type { Scene03RoomOption } from '@/lib/scene03-data'

type Scene03RoomChipsProps = {
  options: Scene03RoomOption[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function Scene03RoomChips({ options, selectedId, onSelect }: Scene03RoomChipsProps) {
  return (
    <div className="mt-scene03-chips flex flex-wrap gap-2" role="listbox" aria-label="Room options">
      {options.map((option) => {
        const isSelected = option.id === selectedId

        return (
          <button
            key={option.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(option.id)}
            className={`mt-scene03-chip mt-ui rounded-full border px-3 py-1.5 text-[10px] tracking-[0.12em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isSelected
                ? 'border-[#C9A24A]/75 bg-[#C9A24A]/14 text-[#FAFAF9] shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
                : 'border-[#C9A24A]/22 bg-[#020F12]/28 text-[#E8E8E8]/72 hover:border-[#C9A24A]/42 hover:bg-[#020F12]/42 hover:text-[#FAFAF9]'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
