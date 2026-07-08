import type { Scene03SupportCard } from '@/lib/scene03-data'

type Scene03SupportCardsProps = {
  cards: Scene03SupportCard[]
}

export default function Scene03SupportCards({ cards }: Scene03SupportCardsProps) {
  return (
    <div className="mt-scene03-support flex gap-2 lg:flex-col">
      {cards.map((card) => (
        <article
          key={card.id}
          className="mt-scene03-support-card mt-premium-glass rounded-xl border border-[#C9A24A]/16 px-3 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#C9A24A]/28"
        >
          <p className="mt-ui text-[9px] tracking-[0.14em] text-[#C9A24A]">{card.title}</p>
          <p className="mt-body-copy mt-1 text-[10px] leading-snug text-[#E8E8E8]/68">{card.subtitle}</p>
        </article>
      ))}
    </div>
  )
}
