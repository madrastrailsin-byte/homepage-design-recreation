'use client'

export default function IntroBackground() {
  return (
    <>
      <img
        src="/images/intro-madras-central.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover scale-100 animate-[introZoom_5s_ease-out_forwards]"
      />

      <div className="absolute inset-0 bg-black/18" />

      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        }}
      />

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