import { useState } from 'react'

import { SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'

import { ContinentCheckbox } from '@/components/molecules/ContinentCheckbox'
import { FilterDrawer } from '@/components/molecules/FilterDrawer'
import { SearchableSelect } from '@/components/molecules/SearchableSelect'
import { SearchBar } from '@/components/molecules/SearchBar'
import { CONTINENT_OPTIONS, UI_TEXT } from '@/constants/uiText'

interface FilterBarProps {
  searchTerm: string
  selectedContinents: string[]
  selectedLanguage: string
  availableLanguages: string[]
  onSearchChange: (_value: string) => void
  onContinentsChange: (_continents: string[]) => void
  onLanguageChange: (_language: string) => void
  onClearFilters: () => void
}

export const FilterBar = ({
  searchTerm,
  selectedContinents,
  selectedLanguage,
  availableLanguages,
  onSearchChange,
  onContinentsChange,
  onLanguageChange,
  onClearFilters,
}: FilterBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm)
  const [tempContinents, setTempContinents] =
    useState<string[]>(selectedContinents)
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage)

  const handleOpenDrawer = () => {
    setTempSearchTerm(searchTerm)
    setTempContinents(selectedContinents)
    setTempLanguage(selectedLanguage)
    setIsDrawerOpen(true)
  }

  const handleApplyFilters = () => {
    onSearchChange(tempSearchTerm)
    onContinentsChange(tempContinents)
    onLanguageChange(tempLanguage)
  }

  const handleContinentToggle = (continent: string) => {
    if (selectedContinents.includes(continent)) {
      onContinentsChange(selectedContinents.filter((c) => c !== continent))
    } else {
      onContinentsChange([...selectedContinents, continent])
    }
  }

  const handleTempContinentToggle = (continent: string) => {
    if (tempContinents.includes(continent)) {
      setTempContinents(tempContinents.filter((c) => c !== continent))
    } else {
      setTempContinents([...tempContinents, continent])
    }
  }

  const languageOptions = [
    { value: '', label: UI_TEXT.filters.selectLanguage },
    ...availableLanguages.map((lang) => ({
      value: lang,
      label: lang,
    })),
  ]

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedContinents.length > 0 ||
    selectedLanguage !== ''
  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    selectedContinents.length +
    (selectedLanguage ? 1 : 0)

  const mobileFilterContent = (
    <>
      <div className="flex flex-col gap-4">
        <SearchBar
          value={tempSearchTerm}
          onChange={setTempSearchTerm}
          placeholder={UI_TEXT.filters.searchPlaceholder}
        />
        <SearchableSelect
          options={languageOptions}
          value={tempLanguage}
          onChange={setTempLanguage}
          placeholder={UI_TEXT.filters.selectLanguage}
          emptyMessage={UI_TEXT.filters.noLanguageFound}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-white font-black italic text-sm font-exo">
          {UI_TEXT.continents.title}:
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3">
          {CONTINENT_OPTIONS.map((continent) => (
            <ContinentCheckbox
              key={continent.value}
              label={continent.label}
              value={continent.value}
              isChecked={tempContinents.includes(continent.value)}
              onToggle={handleTempContinentToggle}
            />
          ))}
        </div>
      </div>
    </>
  )

  const handleClearTempFilters = () => {
    setTempSearchTerm('')
    setTempContinents([])
    setTempLanguage('')
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-10 lg:gap-28">
          <div className="flex-shrink-0">
            <Image
              src="/img/LOGO PLAN.svg"
              alt="Plan International"
              width={140}
              height={60}
              priority
              className="h-10 sm:h-12 w-auto"
            />
          </div>

          <button
            onClick={handleOpenDrawer}
            className="md:hidden cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95
                       bg-white/20 backdrop-blur rounded-2xl border-2 border-white
                       text-white font-black italic
                       py-2.5 px-4 text-sm
                       flex items-center gap-2 relative font-exo"
          >
            <SlidersHorizontal className="w-5 h-5" strokeWidth={2.5} />
            {UI_TEXT.common.filters}
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F58220] text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex flex-1 w-full flex-col gap-4 sm:gap-5">
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <SearchBar
                value={searchTerm}
                onChange={onSearchChange}
                placeholder={UI_TEXT.filters.searchPlaceholder}
              />
              <SearchableSelect
                options={languageOptions}
                value={selectedLanguage}
                onChange={onLanguageChange}
                placeholder={UI_TEXT.filters.selectLanguage}
                emptyMessage={UI_TEXT.filters.noLanguageFound}
              />

              <button
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
                className="cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95
                           disabled:opacity-50 disabled:cursor-not-allowed
                           bg-[#F58220] rounded-[20px] border-none text-white
                           px-4 sm:px-6 py-2 sm:py-3
                           text-xs sm:text-[13px] italic font-black whitespace-nowrap font-exo"
              >
                {UI_TEXT.filters.clearFilters}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5 sm:gap-y-3 md:gap-x-6 md:gap-y-4">
              {CONTINENT_OPTIONS.map((continent) => (
                <ContinentCheckbox
                  key={continent.value}
                  label={continent.label}
                  value={continent.value}
                  isChecked={selectedContinents.includes(continent.value)}
                  onToggle={handleContinentToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onApply={handleApplyFilters}
        onClear={handleClearTempFilters}
        hasActiveFilters={
          tempSearchTerm !== '' ||
          tempContinents.length > 0 ||
          tempLanguage !== ''
        }
      >
        {mobileFilterContent}
      </FilterDrawer>
    </>
  )
}
