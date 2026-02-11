'use client'

import { Spinner } from '@/components/atoms/Spinner'
import { Pagination } from '@/components/molecules/Pagination'
import { CountriesGrid } from '@/components/organisms/CountriesGrid'
import { FilterBar } from '@/components/organisms/FilterBar'
import { Footer } from '@/components/organisms/Footer'
import { UI_TEXT } from '@/constants/uiText'
import { useCountries } from '@/hooks/useCountries'

export default function Home() {
  const {
    countries,
    filters,
    availableLanguages,
    loading,
    error,
    pagination,
    handleSearchChange,
    handleContinentsChange,
    handleLanguageChange,
    handleClearFilters,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
  } = useCountries()

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500 p-4">
        <div className="text-center bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-md mx-auto">
          <h1 className="text-base sm:text-lg font-semibold text-red-600 mb-1">
            {UI_TEXT.common.error}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500">
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-[35px] max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <FilterBar
              searchTerm={filters.searchTerm}
              selectedContinents={filters.continents}
              selectedLanguage={filters.language}
              availableLanguages={availableLanguages}
              onSearchChange={handleSearchChange}
              onContinentsChange={handleContinentsChange}
              onLanguageChange={handleLanguageChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <CountriesGrid countries={countries} />

                {pagination.totalPages > 1 && (
                  <div className="flex justify-center my-6 sm:my-8 lg:my-[35px]">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                      onNext={handleNextPage}
                      onPrev={handlePrevPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
