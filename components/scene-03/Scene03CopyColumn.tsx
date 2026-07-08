import { ArrowRight } from 'lucide-react'

type Scene03CopyColumnProps = {
  eyebrow: string
  headline: string
  headlineAccent: string
  body: string
  pillars: string[]
  storyLinkLabel: string
}

export default function Scene03CopyColumn({
  eyebrow,
  headline,
  headlineAccent,
  body,
  pillars,
  storyLinkLabel,
}: Scene03CopyColumnProps) {
  return (
    <div className="mt-scene03-copy mt-story-stat-promise relative z-10 flex h-full flex-col justify-center px-6 py-12 sm:px-10 md:px-12 lg:px-14 xl:px-16">
      <p className="mt-eyebrow text-[10px] text-[#C9A24A] sm:text-[11px]">{eyebrow}</p>

      <h2 className="mt-display mt-8 max-w-[18rem] text-[2rem] leading-[1.08] text-[#FAFAF9] sm:max-w-[22rem] sm:text-[2.35rem] md:max-w-[26rem] md:text-[2.65rem] lg:text-[2.85rem]">
        {headline}
        <br />
        {headlineAccent}
      </h2>

      <p className="mt-body-copy mt-6 max-w-[20rem] text-sm leading-relaxed text-[#E8E8E8]/88 sm:max-w-[22rem] md:max-w-[24rem] md:text-[0.95rem]">
        {body}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-9">
        {pillars.map((pillar, index) => (
          <div key={pillar} className="flex items-center gap-3">
            <span className="mt-display-soft text-base text-[#FAFAF9] md:text-lg">{pillar}</span>
            {index < pillars.length - 1 ? (
              <span className="h-px w-6 bg-[#C9A24A]/55 sm:w-8" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>

      <a
        href="/our-story"
        className="mt-ui group mt-10 inline-flex items-center gap-2 text-xs tracking-[0.16em] text-[#C9A24A] transition-colors duration-300 hover:text-[#D4B860]"
      >
        <span>{storyLinkLabel}</span>
        <ArrowRight
          size={14}
          className="translate-y-px transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  )
}
