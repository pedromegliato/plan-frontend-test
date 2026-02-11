import { useMemo } from 'react'

import { Country } from '@/@types'
import { UI_TEXT } from '@/constants/uiText'
import { cn } from '@/lib/cn'

interface CountryDetailInfoProps {
  country: Country
  continentDisplayName: string
}

const textBaseClass = 'font-exo text-medium-gray text-base sm:text-lg lg:text-[23px] leading-[23px]'

export const CountryDetailInfo = ({
  country,
  continentDisplayName,
}: CountryDetailInfoProps) => {
  const details = useMemo(
    () => [
      { label: UI_TEXT.details.officialName, value: country.officialName },
      { label: UI_TEXT.details.capital, value: country.capital },
      { label: UI_TEXT.details.population, value: country.population.toLocaleString('pt-BR') },
      { label: UI_TEXT.details.currency, value: country.currencies[0]?.name || '-' },
      { label: UI_TEXT.details.languages, value: country.languages.join(', ') },
      { label: UI_TEXT.details.region, value: continentDisplayName },
      { label: UI_TEXT.details.subregion, value: country.subregion || '-' },
    ],
    [country, continentDisplayName],
  )

  return (
    <div className="flex-1 flex flex-col" role="region" aria-label="Informações do país">
      <h1 className="text-center font-exo font-bold mb-6 sm:mb-8 text-medium-gray text-3xl sm:text-4xl lg:text-[50px]">
        {country.name}
      </h1>

      <div className="flex gap-2 sm:gap-4 flex-1 justify-center">
        <div className="flex flex-col gap-3 sm:gap-4 text-right flex-1 max-w-fit" aria-label="Labels">
          {details.map(({ label }) => (
            <span key={label} className={cn(textBaseClass, 'font-normal')}>
              {label}:
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 text-left flex-1 max-w-fit" aria-label="Valores">
          {details.map(({ label, value }) => (
            <span key={label} className={cn(textBaseClass, 'font-bold')}>
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
