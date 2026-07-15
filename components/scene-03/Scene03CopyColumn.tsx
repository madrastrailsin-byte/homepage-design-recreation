import { ArrowRight } from 'lucide-react'
import JourneyPillars from './JourneyPillars'

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

      <h2 className="mt-display mt-7 max-w-[20rem] text-[2.15rem] leading-[1.02] text-[#FAFAF9] sm:max-w-[24rem] sm:text-[2.5rem] md:max-w-[28rem] md:text-[2.85rem] lg:text-[3.1rem]">
        {headline}
        <br />
        <span className="text-[#C9A24A]">{headlineAccent}</span>
      </h2>

      <div className="mt-5 flex w-full max-w-[18rem] items-center gap-3" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-[#C9A24A]/80 to-[#C9A24A]/15" />
        <div className="h-2 w-2 rotate-45 border border-[#C9A24A]/80" />
        <div className="h-px flex-1 bg-gradient-to-l from-[#C9A24A]/80 to-[#C9A24A]/15" />
      </div>

      <p className="mt-body-copy mt-5 max-w-[21rem] text-sm leading-relaxed text-[#E8E8E8]/88 sm:max-w-[23rem] md:max-w-[25rem] md:text-[0.95rem]">
        {body}
      </p>

      <div className="mt-8 sm:mt-9">
        <JourneyPillars words={pillars} />
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
