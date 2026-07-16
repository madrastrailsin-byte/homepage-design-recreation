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
    <div className="mt-scene03-copy mt-story-stat-promise relative z-10 flex h-full min-h-[34rem] flex-col justify-center px-6 py-9 sm:px-9 md:px-10 lg:px-12 xl:px-14">
      <p className="mt-eyebrow text-[10px] text-[#C9A24A] sm:text-[11px]">{eyebrow}</p>

      <h2 className="mt-display mt-5 max-w-[31rem] text-[2.3rem] leading-[1.01] text-[#FAFAF9] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.25rem]">
        {headline}
        <br />
        <span className="text-[#C9A24A]">{headlineAccent}</span>
      </h2>

      <div className="mt-5 flex w-full max-w-[21rem] items-center gap-4" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-[#C9A24A]/80 to-[#C9A24A]/14" />
        <div className="h-2.5 w-2.5 rotate-45 border border-[#C9A24A]/80" />
        <div className="h-px flex-1 bg-gradient-to-l from-[#C9A24A]/80 to-[#C9A24A]/14" />
      </div>

      <p className="mt-body-copy mt-5 max-w-[30rem] text-[0.95rem] leading-[1.75] text-[#E8E8E8]/86 md:text-base">
        {body}
      </p>

      <div className="mt-7 sm:mt-8">
        <JourneyPillars words={pillars} />
      </div>

      <a
        href="/our-story"
        className="mt-ui group mt-7 inline-flex items-center gap-3 self-start text-xs tracking-[0.17em] text-[#C9A24A] transition-colors duration-300 hover:text-[#D4B860]"
      >
        <span>{storyLinkLabel}</span>
        <ArrowRight
          size={15}
          className="translate-y-px transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  )
}
