import { Country } from '@/@types'
import { CountryCard } from '@/components/molecules/CountryCard'
import { UI_TEXT } from '@/constants/uiText'

interface CountriesGridProps {
  countries: Country[]
}

export const CountriesGrid = ({ countries }: CountriesGridProps) => {
  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-white text-lg font-bold">
          {UI_TEXT.countries.notFound}
        </p>
        <p className="text-white/80 text-sm mt-2">
          {UI_TEXT.countries.adjustFilters}
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid w-full
                 grid-cols-1
                 sm:grid-cols-2
                 lg:grid-cols-3
                 xl:grid-cols-4
                 gap-4 sm:gap-5 lg:gap-6
                 justify-items-center"
      role="list"
    >
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </div>
  )
}
