import Image from 'next/image'

export default function StatisticsSection() {
  return (
    <section className="mt-scroll-statistics w-full overflow-hidden bg-[#03191D]">
      <Image
        src="/images/homepage/scene-03-madrastrails-difference.png"
        alt="The MadrasTrails Difference"
        width={1717}
        height={916}
        sizes="100vw"
        className="block h-auto w-full object-contain md:object-cover"
        priority={false}
      />
    </section>
  )
}
