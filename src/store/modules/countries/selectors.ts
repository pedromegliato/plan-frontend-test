import { RootState } from '@/store'
import { createSelector } from '@reduxjs/toolkit'

const selectCountriesState = (state: RootState) => state.countries

export const selectFilteredItems = createSelector(
  [selectCountriesState],
  (countries) => countries.filteredItems,
)

export const selectPagination = createSelector(
  [selectCountriesState],
  (countries) => countries.pagination,
)

export const selectFilters = createSelector(
  [selectCountriesState],
  (countries) => countries.filters,
)

export const selectAvailableLanguages = createSelector(
  [selectCountriesState],
  (countries) => countries.availableLanguages,
)

export const selectLoading = createSelector(
  [selectCountriesState],
  (countries) => countries.loading,
)

export const selectError = createSelector(
  [selectCountriesState],
  (countries) => countries.error,
)

export const selectPaginatedCountries = createSelector(
  [selectFilteredItems, selectPagination],
  (filteredItems, pagination) => {
    const { currentPage, itemsPerPage } = pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredItems.slice(startIndex, endIndex)
  },
)
