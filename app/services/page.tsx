import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesField from '@/components/services/ServicesField'
import { travelServices } from '@/lib/services-data'

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020F12] text-[#FAFAF9]">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .mt-services-hero-video {
            animation: mt-services-hero-drift 34s ease-in-out infinite alternate;
          }
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

      <section className="relative flex min-h-[88svh] items-center overflow-hidden px-6 pb-12 pt-28 md:min-h-[86svh] md:px-8 md:pb-14 lg:px-10">
        <video
          className="mt-services-hero-video absolute inset-0 h-full w-full object-cover opacity-[0.4] saturate-[0.78]"
          style={{ objectPosition: 'center center' }}
          src="/videos/our-story-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_72%,rgba(13,76,92,0.34),transparent_38%),radial-gradient(ellipse_at_76%_22%,rgba(212,175,55,0.1),transparent_30%),radial-gradient(ellipse_at_center,transparent_34%,rgba(2,15,18,0.58)_100%),linear-gradient(180deg,rgba(2,15,18,0.56),rgba(2,15,18,0.96))]" />

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

      <section className="relative flex min-h-[76svh] items-center overflow-hidden px-6 pb-24 pt-20 md:px-8 md:pb-28 lg:px-10">
        <Image
          src="/images/services/accommodation/luxury-hotel-arrival.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.28] saturate-[0.82]"
          style={{ objectPosition: 'center 48%' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(212,175,55,0.13),transparent_32%),radial-gradient(ellipse_at_22%_68%,rgba(13,76,92,0.36),transparent_36%),linear-gradient(180deg,rgba(2,15,18,0.9),rgba(3,25,29,0.96))]" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
          <p className="mt-eyebrow mb-7 text-xs text-[#D4AF37]/86">BEGIN</p>
          <h2 className="mt-display max-w-5xl text-[clamp(3.4rem,11vw,10rem)] leading-[0.82] tracking-[-0.052em] text-[#FAFAF9]">
            One conversation. Every detail considered.
          </h2>
          <p className="mt-body-copy mt-8 max-w-xl text-base leading-relaxed text-[#FAFAF9]/64 md:text-lg">
            Tell us what you have in mind, and we&rsquo;ll shape the right way forward.
          </p>
          <Link href="/plan" className="btn-gold mt-gold-sheen mt-ui mt-10 inline-flex items-center gap-2 text-xs">
            Start the Conversation
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
