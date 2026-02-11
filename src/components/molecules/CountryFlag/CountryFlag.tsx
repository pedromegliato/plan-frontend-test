import Image from 'next/image'

import { SIZES } from '@/constants/sizes'
import { UI_TEXT } from '@/constants/uiText'

interface CountryFlagProps {
  flag: string
  flagAlt: string
}

export const CountryFlag = ({ flag, flagAlt }: CountryFlagProps) => {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-[10px]">
      <div
        className="relative overflow-hidden w-full max-w-[290px] aspect-[29/22]"
        style={{
          width: `${SIZES.FLAG.WIDTH}px`,
          aspectRatio: SIZES.FLAG.ASPECT_RATIO,
        }}
      >
        <Image
          src={flag}
          alt={flagAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
      <p
        className="text-center font-exo font-bold w-full max-w-[290px] text-medium-gray text-lg"
        aria-label={UI_TEXT.details.flag}
      >
        {UI_TEXT.details.flag}
      </p>
    </div>
  )
}
