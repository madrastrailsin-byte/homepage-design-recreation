import type { Scene03Hotel } from '@/lib/scene03-data'

type Scene03SupportCardsProps = {
  hotels: Scene03Hotel[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function Scene03SupportCards({ hotels, selectedId, onSelect }: Scene03SupportCardsProps) {
  return (
    <div className="mt-scene03-support flex gap-2 lg:flex-col" aria-label="Hotel selector">
      {hotels.map((hotel) => {
        const isSelected = hotel.id === selectedId

        return (
          <button
            key={hotel.id}
            type="button"
            onClick={() => onSelect(hotel.id)}
            aria-pressed={isSelected}
            className={`mt-scene03-support-card mt-premium-glass rounded-xl border px-3 py-2.5 text-left shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 ${
              isSelected
                ? 'border-[#C9A24A]/42 bg-[#C9A24A]/12'
                : 'border-[#C9A24A]/16 hover:border-[#C9A24A]/28'
            }`}
        >
            <p className="mt-ui text-[9px] tracking-[0.14em] text-[#C9A24A]">{hotel.destinationTitle}</p>
            <p className="mt-body-copy mt-1 text-[10px] leading-snug text-[#E8E8E8]/68">{hotel.name}</p>
          </button>
        )
      })}
    </div>
  )
}
