import Image from 'next/image'
import Link from 'next/link'

import { Country } from '@/@types'
import { ContinentIcon } from '@/components/atoms/ContinentIcon'
import { CONTINENT_NAMES, UI_TEXT } from '@/constants/uiText'

interface CountryCardProps {
  country: Country
}

const getContinentDisplayName = (
  continent: string,
  subregion?: string,
): string => {
  if (subregion) {
    const normalizedSubregion = subregion.toLowerCase()

    if (normalizedSubregion.includes('northern')) {
      return UI_TEXT.continents.northAmerica
    }
    if (
      normalizedSubregion.includes('central') ||
      normalizedSubregion.includes('caribbean')
    ) {
      return UI_TEXT.continents.centralAmerica
    }
    if (normalizedSubregion.includes('south')) {
      return UI_TEXT.continents.southAmerica
    }
  }

  return CONTINENT_NAMES[continent] || continent
}

export const CountryCard = ({ country }: CountryCardProps) => {
  const continentDisplayName = getContinentDisplayName(
    country.continent,
    country.subregion,
  )

  return (
    <article className="bg-white overflow-hidden transition-all duration-300 flex flex-col w-full max-w-[310px] rounded-[20px] min-h-card hover:scale-105 transition-transform">
      <div className="flex items-center justify-between h-10 px-3 sm:px-4 rounded-t-[20px] bg-dark-gray">
        <span className="text-white italic font-black text-sm sm:text-[15px] font-exo">
          {continentDisplayName}
        </span>
        <ContinentIcon
          continent={country.continent}
          subregion={country.subregion}
          className="opacity-40"
        />
      </div>

      <div className="flex-1 flex flex-col items-center bg-white py-5 px-3">
        <div className="flex flex-col items-center gap-2 sm:gap-[10px]">
          <div className="relative w-7 h-[21px]">
            <Image
              src={country.flag}
              alt={country.flagAlt}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="text-center text-medium-gray font-bold leading-tight text-lg sm:text-[23px] font-exo">
            {country.name}
          </h3>

          {country.capital && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle cx="10" cy="10" r="10" fill="#F58220" />
                <path
                  d="M8.29371 7.32082L9.59243 4.29166C9.75914 3.90278 10.2409 3.90278 10.4076 4.29166L11.7063 7.32082L14.6107 7.80957C14.9834 7.87229 15.1319 8.39964 14.8622 8.70217L12.7609 11.0584L13.2567 14.3871C13.3204 14.8146 12.9307 15.1406 12.5973 14.9387L10 13.3662L7.40271 14.9387C7.06928 15.1406 6.67956 14.8146 6.74328 14.3871L7.23914 11.0584L5.13785 8.70217C4.86813 8.39964 5.01656 7.87229 5.38927 7.80957L8.29371 7.32082Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-medium-gray font-bold text-base sm:text-lg font-exo">
                {country.capital}
              </p>
            </div>
          )}
        </div>

        <Link
          href={`/country/${country.code}`}
          className="cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95 w-full max-w-[270px] h-11 sm:h-[47px] bg-orange rounded-[20px] border-none text-white text-center text-xs sm:text-[13px] italic font-black mt-auto font-exo flex items-center justify-center"
        >
          {UI_TEXT.common.seeMore}
        </Link>
      </div>
    </article>
  )
}
