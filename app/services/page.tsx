import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesField from '@/components/services/ServicesField'
import LazyCtaVideo from '@/components/services/LazyCtaVideo'
import ServicesHeroVideo from '@/components/services/ServicesHeroVideo'
import { travelServices } from '@/lib/services-data'

export const metadata: Metadata = {
  title: 'Luxury Travel Planning Services | MadrasTrails',
  description:
    'Experience personalised travel planning, concierge services and seamless luxury journeys with MadrasTrails. Every detail is crafted around your preferences.',
}
export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
        }

        @keyframes mt-services-hero-drift {
          from {
            transform: scale(1.04) translate3d(-0.8%, -0.6%, 0);
          }

          to {
            transform: scale(1.1) translate3d(1%, 0.8%, 0);
          }
        }
      `}</style>
      <Navigation />

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-12 pt-28 md:px-8 md:pb-14 lg:px-10">
        <ServicesHeroVideo />
        <div className="mt-classic-media-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_22%_72%,rgba(13,76,92,0.34),transparent_38%),radial-gradient(ellipse_at_76%_22%,rgba(212,175,55,0.1),transparent_30%),radial-gradient(ellipse_at_center,transparent_34%,rgba(2,15,18,0.58)_100%),linear-gradient(180deg,rgba(2,15,18,0.22),rgba(2,15,18,0.58))]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mt-eyebrow mb-6 text-xs text-[#D4AF37]/90">MADRASTRAILS / SERVICES</p>
          <h1 className="mt-display max-w-5xl text-[clamp(4.2rem,12vw,10.5rem)] leading-[0.82] tracking-[-0.052em] text-[#FAFAF9]">
            Travel, handled.
          </h1>
          <p className="mt-display-soft mt-4 max-w-3xl text-[clamp(1.7rem,4vw,4.2rem)] leading-[0.98] text-[#D4AF37]">
            From first booking to final detail.
          </p>
          <p className="mt-body-copy mt-7 max-w-sm text-base leading-relaxed text-[#FAFAF9]/66 md:text-lg">
            From essential bookings to complete journeys, everything is handled with care.
          </p>
        </div>

        <div className="absolute bottom-7 right-6 z-10 flex items-center gap-3 text-[#D4AF37]/72 md:right-8 lg:right-10">
          <span className="mt-ui text-[0.62rem] tracking-[0.32em]">SCROLL</span>
          <span className="h-px w-12 bg-[#D4AF37]/42" />
        </div>
      </section>

      <ServicesField services={travelServices} />

      <section className="relative flex min-h-[88svh] items-start overflow-hidden px-6 pt-20 pb-20 md:px-8 lg:px-10">
        <LazyCtaVideo />
        <div className="mt-classic-media-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.12),rgba(2,15,18,0.32))]" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
          <p className="mt-eyebrow mb-7 text-xs text-[#D4AF37]/86">BEGIN</p>
          <h2 className="mt-display max-w-5xl text-[clamp(4.6rem,10vw,7.7rem)] leading-[0.82] tracking-[-0.052em] text-[#FAFAF9]">
            One conversation. Every detail considered.
          </h2>
          <p className="mt-body-copy mt-8 max-w-xl text-base leading-relaxed text-[#FAFAF9]/64 md:text-lg">
            Tell us what you have in mind, and we&rsquo;ll shape the right way forward.
          </p>
          <Link
  href="https://wa.me/917891876918?text=Hi%20MadrasTrails%2C%20I%27d%20like%20to%20start%20a%20conversation%20about%20planning%20a%20journey."
  target="_blank"
  rel="noopener noreferrer"
  className="mt-gold-sheen mt-ui group mt-10 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/70 bg-[#D4AF37] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#03191D] shadow-[0_8px_28px_rgba(212,175,55,0.2)] transition-[background-color,border-color,box-shadow,transform] duration-[400ms] hover:-translate-y-0.5 hover:bg-[#e2c45c] hover:shadow-[0_10px_34px_rgba(212,175,55,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#03191D] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1"
>
  Start the Conversation
  <ArrowRight aria-hidden="true" />
</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
