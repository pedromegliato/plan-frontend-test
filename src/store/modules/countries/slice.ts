import { Country, CountriesFilters, CountriesState } from '@/@types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const ITEMS_PER_PAGE = 8

const matchesContinentFilter = (
  country: Country,
  selectedContinent: string,
): boolean => {
  if (country.region === 'Americas') {
    const normalizedSubregion = country.subregion?.toLowerCase() || ''

    if (selectedContinent === 'North America') {
      return normalizedSubregion === 'north america'
    }
    if (selectedContinent === 'Central America') {
      return (
        normalizedSubregion.includes('central') ||
        normalizedSubregion.includes('caribbean')
      )
    }
    if (selectedContinent === 'South America') {
      return normalizedSubregion.includes('south')
    }

    return false
  }

  if (
    selectedContinent === 'Africa' ||
    selectedContinent === 'Asia' ||
    selectedContinent === 'Europe' ||
    selectedContinent === 'Oceania' ||
    selectedContinent === 'Antarctic'
  ) {
    return (
      country.continent === selectedContinent ||
      country.region === selectedContinent
    )
  }

  return false
}

const initialFilters: CountriesFilters = {
  searchTerm: '',
  continents: [],
  language: '',
}

const initialState: CountriesState = {
  items: [],
  filteredItems: [],
  filters: initialFilters,
  availableLanguages: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages: 0,
  },
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    fetchCountriesRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchCountriesSuccess(state, action: PayloadAction<Country[]>) {
      state.items = action.payload
      state.filteredItems = action.payload
      state.loading = false
      state.error = null
      state.pagination.totalPages = Math.ceil(
        action.payload.length / state.pagination.itemsPerPage,
      )
      state.pagination.currentPage = 1
    },
    fetchCountriesFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setAvailableLanguages(state, action: PayloadAction<string[]>) {
      state.availableLanguages = action.payload
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.filters.searchTerm = action.payload
    },
    setContinents(state, action: PayloadAction<string[]>) {
      state.filters.continents = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.filters.language = action.payload
    },
    applyFilters(state) {
      const { searchTerm, continents, language } = state.filters

      state.filteredItems = state.items.filter((country) => {
        const matchesSearch = searchTerm
          ? country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.officialName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true

        const matchesContinent =
          continents.length > 0
            ? continents.some((selectedContinent) =>
              matchesContinentFilter(country, selectedContinent),
            )
            : true

        const matchesLanguage = language
          ? country.languages.includes(language)
          : true

        return matchesSearch && matchesContinent && matchesLanguage
      })

      state.pagination.totalPages = Math.ceil(
        state.filteredItems.length / state.pagination.itemsPerPage,
      )
      state.pagination.currentPage = 1
    },
    clearFilters(state) {
      state.filters = initialFilters
      state.filteredItems = state.items
    },
    setPage(state, action: PayloadAction<number>) {
      const page = action.payload
      if (page >= 1 && page <= state.pagination.totalPages) {
        state.pagination.currentPage = page
      }
    },
    nextPage(state) {
      if (state.pagination.currentPage < state.pagination.totalPages) {
        state.pagination.currentPage += 1
      }
    },
    prevPage(state) {
      if (state.pagination.currentPage > 1) {
        state.pagination.currentPage -= 1
      }
    },
  },
})

export const {
  fetchCountriesRequest,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  setAvailableLanguages,
  setSearchTerm,
  setContinents,
  setLanguage,
  applyFilters,
  clearFilters,
  setPage,
  nextPage,
  prevPage,
} = countriesSlice.actions

export default countriesSlice.reducer
