'use client'

export default function IntroBackground() {
  return (
    <>
      <picture>
  <source
    media="(min-width: 768px)"
    srcSet="/images/intro-madras-central.webp"
  />
  <img
    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    alt=""
    className="absolute inset-0 h-full w-full object-cover animate-[introJourney_5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
  />
</picture>

      <style jsx global>{`
  @keyframes introJourney {
    0% {
      transform: scale(1.015) translate3d(0, 0, 0);
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