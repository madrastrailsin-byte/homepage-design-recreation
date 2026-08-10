import Image from 'next/image'

type BrandLogoProps = {
  priority?: boolean
  imageClassName?: string
  theme?: 'signature' | 'classic'
}

export default function BrandLogo({
  priority = false,
  imageClassName = 'h-11 w-auto object-contain',
  theme = 'classic',
}: BrandLogoProps) {
  if (theme === 'signature') {
    return (
      <span className="relative inline-flex h-9 w-[168px] shrink-0 items-center overflow-hidden sm:h-10 sm:w-[188px] md:h-11 md:w-[210px]">
        <Image
          src="/images/brand/madrastrails-signature-logo.png"
          alt="MadrasTrails"
          width={1536}
          height={1024}
          priority={priority}
          className="absolute left-1/2 top-[calc(50%+2px)] h-[112px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[126px] md:h-[140px]"
        />
      </span>
    )
  }

  return (
    <span className="inline-flex items-start">
      <Image
        src="/images/madras-trails-logo-small.webp"
        alt="MadrasTrails"
        width={188}
        height={37}
        className={imageClassName}
        priority={priority}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none ml-px -translate-y-[1px] text-[8px] font-semibold leading-none text-[#D4AF37] md:text-[9px]"
      >
        ™
      </span>
    </span>
  )
}
