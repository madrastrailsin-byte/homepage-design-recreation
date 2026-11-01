import Link from 'next/link'

const buttonStyle =
  'mt-ui pointer-events-auto group inline-flex items-center justify-center gap-3 rounded-full border border-white/45 px-5 py-2 text-[11px] font-normal uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10'

export default function ServicesFloatingNav() {
  return (
    <nav
      aria-label="Services navigation"
      className="pointer-events-none absolute inset-x-0 top-0 z-[90] flex items-center justify-between gap-3 px-4 pt-5 sm:px-9 sm:pt-7 lg:px-12"
    >
      <Link href="/" className={`${buttonStyle} bg-black/55 hover:bg-black/65`}>
        <span aria-hidden="true">←</span>
        <span>HOME</span>
      </Link>

      <Link href="/plan" className={`${buttonStyle} bg-black/20 hover:bg-white/10`}>
        <span>PLAN YOUR JOURNEY</span>
        <span aria-hidden="true">→</span>
      </Link>
    </nav>
  )
}
