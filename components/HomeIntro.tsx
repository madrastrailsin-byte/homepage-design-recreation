'use client'

export default function IntroBackground() {
  return (
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/intro-madras-central.webp')",
        animation: 'introJourney 14s ease-in-out infinite alternate',
      }}
    />
  )
}