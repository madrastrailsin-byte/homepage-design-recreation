'use client'

export default function IntroBackground() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/intro-madras-central.webp')",
          animation: 'introJourney 8s ease-in-out forwards',
        }}
      />

      <style jsx global>{`
        @keyframes introJourney {
          0% {
            transform: scale(1.015);
            filter: saturate(0.9) brightness(0.92);
          }

          50% {
            transform: scale(1.045) translate3d(-0.7%, -0.25%, 0);
            filter: saturate(0.96) brightness(0.98);
          }

          100% {
            transform: scale(1.065) translate3d(-1.2%, -0.45%, 0);
            filter: saturate(1) brightness(1);
          }
        }
      `}</style>
    </>
  )
}