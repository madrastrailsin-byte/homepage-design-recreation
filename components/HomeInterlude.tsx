import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/** Quiet, editorial pause between the homepage hero/services and the Forex board. */
export default function HomeInterlude() {
  return (
    <section
      aria-labelledby="home-interlude-heading"
      className="relative isolate min-h-[430px] overflow-hidden bg-[#e6c49e] text-[#142a2b] md:h-[355px] md:min-h-0"
    >
      {/* The approved golden-hour mountain scene, prepared as a text-free asset. */}
      <Image
        src="/images/homepage/home-interlude-sunset.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[62%_73%] saturate-[0.85] brightness-[0.96] md:object-[center_70%]"
      />

      {/* A restrained dusk treatment: clear sunset sky, shadowed mountain foreground. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,32,33,0.15)_0%,rgba(242,206,157,0.03)_38%,rgba(7,26,29,0.27)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f1dcc2]/65 via-[#f3d8b8]/30 to-transparent md:from-[#f1dcc2]/35 md:via-[#f3d8b8]/10" />

      <div className="relative z-10 mx-auto grid min-h-[430px] w-full max-w-[1540px] grid-cols-1 content-center gap-8 px-7 py-11 sm:px-10 md:h-full md:min-h-0 md:grid-cols-[1.08fr_1fr] md:items-center md:gap-14 md:px-14 md:py-0 lg:px-16">
        <div className="min-w-0 md:-translate-y-4 md:translate-x-8 lg:-translate-y-5 lg:translate-x-16 xl:translate-x-24">
          <div className="mb-4 flex items-center gap-4">
            <p className="mt-ui whitespace-nowrap text-[10px] font-semibold tracking-[0.23em] text-[#996016] sm:text-[11px]">
              MORE THAN A TRIP
            </p>
            <span aria-hidden="true" className="h-px w-14 bg-[#ad7b37]/65" />
          </div>
          <h2
            id="home-interlude-heading"
            className="mt-display text-[clamp(45px,4.15vw,78px)] leading-[0.98] tracking-[-0.027em] text-[#122b2b]"
          >
            Journeys with
            <span className="block whitespace-normal text-[#a16618]">a Deeper Meaning.</span>
          </h2>
        </div>

        <div className="min-w-0 border-l border-[#a16e2e]/75 pl-6 md:py-1 md:pl-11">
          <p className="mt-body-copy max-w-[460px] text-[15px] leading-[1.7] text-[#19302f] md:text-[16px]">
            We design travel experiences that bring you closer to people,
            places and cultures — with the ease, comfort and care you expect.
          </p>

          <Link
            href="/our-story"
            className="mt-ui group mt-5 inline-flex min-h-11 items-center gap-5 rounded-full border border-[#a66b19] bg-[#ffe5b7]/75 py-1.5 pl-6 pr-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#172a29] shadow-[0_3px_0_rgba(106,62,13,0.16),0_8px_18px_rgba(71,44,18,0.12)] backdrop-blur-[3px] transition-[background,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#ffedca] hover:shadow-[0_5px_0_rgba(106,62,13,0.16),0_12px_22px_rgba(71,44,18,0.17)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8d5713]"
          >
            OUR STORY
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a36a18] text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={18} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
