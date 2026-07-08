import Image from 'next/image'

type BrandLogoProps = {
  priority?: boolean
  imageClassName?: string
}

export default function BrandLogo({ priority = false, imageClassName = 'h-11 w-auto object-contain' }: BrandLogoProps) {
  return (
    <span className="inline-flex items-start">
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
        className="pointer-events-none ml-0.5 -translate-y-[3px] text-[8px] font-semibold leading-none text-[#D4AF37] md:text-[9px]"
      >
        ™
      </span>
    </span>
  )
}
