const experiences = [
  {
    title: "Luxury Ryokan",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tea Ceremony",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cherry Blossoms",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop",
  },
]

export default function ExperiencesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <h2 className="mb-14 text-4xl font-light">
        Signature Experiences
      </h2>

      <div className="grid gap-8 lg:grid-cols-3">
        {experiences.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-[620px] w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 pt-32">
              <h3 className="mb-2 text-2xl font-light text-white">
  {item.title}
</h3>

<p className="text-white/75">
  An unforgettable experience curated by MadrasTrails.
</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}