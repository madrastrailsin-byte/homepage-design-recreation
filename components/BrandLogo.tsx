import Image from 'next/image'

type BrandLogoProps = {
  priority?: boolean
  imageClassName?: string
  theme?: 'signature' | 'classic'
}

export default function BrandLogo({
  priority = false,
  theme = 'classic',
}: BrandLogoProps) {
  return (
    <span className="relative inline-flex h-9 w-[168px] shrink-0 items-center overflow-hidden sm:h-10 sm:w-[188px] md:h-11 md:w-[210px]">
      {theme === 'signature' ? (
        <Image
          src="/images/brand/madrastrails-signature-logo.png"
          alt="MadrasTrails"
          width={1536}
          height={1024}
          priority={priority}
          className="absolute left-1/2 top-[calc(50%+2px)] h-[112px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[126px] md:h-[140px]"
        />
      ) : (
        <Image
          src="/images/madras-trails-logo-small.webp"
          alt="MadrasTrails"
          width={188}
          height={37}
          priority={priority}
          className="absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      )}
    </span>
  )
}
