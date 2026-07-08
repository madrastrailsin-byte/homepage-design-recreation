import Image from 'next/image'

type BrandLogoProps = {
  priority?: boolean
  imageClassName?: string
}

export default function BrandLogo({ priority = false, imageClassName = 'h-11 w-auto object-contain' }: BrandLogoProps) {
  return (
    <span className="relative inline-flex items-start">
      <Image
        src="/images/madras-trails-logo.png"
        alt="MadrasTrails"
        width={188}
        height={37}
        className={imageClassName}
        priority={priority}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[87.6%] top-[19%] z-[2] text-[0.42em] font-semibold leading-none text-[#D4AF37]"
      >
        ™
      </span>
    </span>
  )
}
