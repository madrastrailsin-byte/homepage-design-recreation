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
    className="absolute inset-0 h-full w-full scale-100 object-cover animate-[introZoom_5s_ease-out_forwards]"
  />
</picture>

      <style jsx global>{`
        @keyframes introZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.035);
          }
        }
      `}</style>
    </>
  )
}