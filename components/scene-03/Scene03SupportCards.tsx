import type { Scene03Hotel } from '@/lib/scene03-data'

type Scene03SupportCardsProps = {
  hotels: Scene03Hotel[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function Scene03SupportCards({ hotels, selectedId, onSelect }: Scene03SupportCardsProps) {
  return (
    <div
      className="mt-scene03-support grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3"
      aria-label="Hotel selector"
    >
      {hotels.map((hotel) => {
        const isSelected = hotel.id === selectedId

        return (
          <button
            key={hotel.id}
            type="button"
            onClick={() => onSelect(hotel.id)}
            aria-pressed={isSelected}
            className={`mt-scene03-support-card relative min-h-[4.4rem] w-full overflow-hidden rounded-[1.5rem] border px-4 py-3 text-left backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 ${
              isSelected
                ? 'border-[#C9A24A]/58 bg-[linear-gradient(135deg,rgba(201,162,74,0.22),rgba(8,30,36,0.62))] shadow-[0_18px_46px_rgba(0,0,0,0.3),0_0_24px_rgba(201,162,74,0.08)]'
                : 'border-white/10 bg-[linear-gradient(135deg,rgba(3,25,29,0.78),rgba(3,25,29,0.46))] shadow-[0_14px_34px_rgba(0,0,0,0.22)] hover:border-[#C9A24A]/32'
            }`}
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(212,175,55,0.08),transparent_34%)]" />
            <span className="relative block">
              <span className="mt-ui block text-[9px] tracking-[0.16em] text-[#C9A24A]">
                {hotel.destinationTitle}
              </span>
              <span className="mt-body-copy mt-1.5 block text-[11px] leading-snug text-[#F2E7CC]/72">
                {hotel.name}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
