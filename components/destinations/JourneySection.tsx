export default function JourneySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/50">
            Your Journey
          </p>

          <h2 className="mb-10 text-4xl font-light">
            Every unforgettable trip begins with a conversation.
          </h2>

          <div className="space-y-5 text-white/70">
            <p>✈️ Arrival</p>
            <p>🏯 Discover</p>
            <p>🍣 Experience</p>
            <p>🌸 Relax</p>
            <p>❤️ Return with memories</p>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <h3 className="mb-5 text-4xl font-light leading-tight">
            Ready to explore?
          </h3>

          <p className="mb-8 text-white/70">
            We'll craft a journey designed entirely around you.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <button className="rounded-full bg-white px-8 py-4 text-black transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Plan My Journey
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 transition-all duration-300 hover:border-white/50 hover:bg-white/10">
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
        </section>
  )
}