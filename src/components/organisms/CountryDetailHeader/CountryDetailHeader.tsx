import { ContinentIcon } from '@/components/atoms/ContinentIcon'

interface CountryDetailHeaderProps {
  continentDisplayName: string
  continent: string
  subregion?: string
}

export const CountryDetailHeader = ({
  continentDisplayName,
  continent,
  subregion,
}: CountryDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 bg-dark-gray h-[47px] rounded-t-[20px]">
      <span className="text-white font-black italic text-sm sm:text-[15px] font-exo">
        {continentDisplayName}
      </span>
      <ContinentIcon
        continent={continent}
        subregion={subregion}
        className="opacity-40"
      />
    </div>
  )
}
