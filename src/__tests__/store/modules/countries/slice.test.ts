import reducer, {
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
} from '@/store/modules/countries/slice'
import { CountriesState, Country } from '@/@types'

const mockCountries: Country[] = [
  {
    code: 'BR',
    name: 'Brasil',
    officialName: 'República Federativa do Brasil',
    nativeName: 'Brazil',
    continent: 'South America',
    region: 'Americas',
    subregion: 'South America',
    capital: 'Brasília',
    population: 212559409,
    area: 8515767,
    languages: ['Portuguese'],
    currencies: [],
    flag: '',
    flagAlt: '',
    borders: [],
    timezones: [],
    landlocked: false,
    independent: true,
  },
  {
    code: 'US',
    name: 'Estados Unidos',
    officialName: 'United States of America',
    nativeName: 'United States',
    continent: 'North America',
    region: 'Americas',
    subregion: 'North America',
    capital: 'Washington, D.C.',
    population: 331449281,
    area: 9372610,
    languages: ['English'],
    currencies: [],
    flag: '',
    flagAlt: '',
    borders: [],
    timezones: [],
    landlocked: false,
    independent: true,
  },
]

const initialState: CountriesState = {
  items: [],
  filteredItems: [],
  filters: {
    searchTerm: '',
    continents: [],
    language: '',
  },
  availableLanguages: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 0,
  },
}

describe('countries slice', () => {
  it('should handle fetchCountriesRequest', () => {
    const state = reducer(initialState, fetchCountriesRequest())

    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchCountriesSuccess', () => {
    const state = reducer(initialState, fetchCountriesSuccess(mockCountries))

    expect(state.loading).toBe(false)
    expect(state.items).toEqual(mockCountries)
    expect(state.filteredItems).toEqual(mockCountries)
    expect(state.error).toBe(null)
    expect(state.pagination.currentPage).toBe(1)
    expect(state.pagination.totalPages).toBe(1)
  })

  it('should handle fetchCountriesFailure', () => {
    const errorMessage = 'Failed to fetch'
    const state = reducer(initialState, fetchCountriesFailure(errorMessage))

    expect(state.loading).toBe(false)
    expect(state.error).toBe(errorMessage)
  })

  it('should handle setAvailableLanguages', () => {
    const languages = ['English', 'Spanish', 'Portuguese']
    const state = reducer(initialState, setAvailableLanguages(languages))

    expect(state.availableLanguages).toEqual(languages)
  })

  it('should handle setSearchTerm', () => {
    const state = reducer(initialState, setSearchTerm('Brasil'))

    expect(state.filters.searchTerm).toBe('Brasil')
  })

  it('should handle setContinents', () => {
    const continents = ['South America', 'Europe']
    const state = reducer(initialState, setContinents(continents))

    expect(state.filters.continents).toEqual(continents)
  })

  it('should handle setLanguage', () => {
    const state = reducer(initialState, setLanguage('Portuguese'))

    expect(state.filters.language).toBe('Portuguese')
  })

  it('should handle applyFilters with search term', () => {
    let state = reducer(initialState, fetchCountriesSuccess(mockCountries))
    state = reducer(state, setSearchTerm('brasil'))
    state = reducer(state, applyFilters())

    expect(state.filteredItems).toHaveLength(1)
    expect(state.filteredItems[0].code).toBe('BR')
  })

  it('should handle applyFilters with continent filter', () => {
    let state = reducer(initialState, fetchCountriesSuccess(mockCountries))
    state = reducer(state, setContinents(['South America']))
    state = reducer(state, applyFilters())

    expect(state.filteredItems).toHaveLength(1)
    expect(state.filteredItems[0].code).toBe('BR')
  })

  it('should handle applyFilters with language filter', () => {
    let state = reducer(initialState, fetchCountriesSuccess(mockCountries))
    state = reducer(state, setLanguage('English'))
    state = reducer(state, applyFilters())

    expect(state.filteredItems).toHaveLength(1)
    expect(state.filteredItems[0].code).toBe('US')
  })

  it('should handle clearFilters', () => {
    let state = reducer(initialState, fetchCountriesSuccess(mockCountries))
    state = reducer(state, setSearchTerm('test'))
    state = reducer(state, setContinents(['Europe']))
    state = reducer(state, clearFilters())

    expect(state.filters.searchTerm).toBe('')
    expect(state.filters.continents).toEqual([])
    expect(state.filters.language).toBe('')
    expect(state.filteredItems).toEqual(mockCountries)
  })

  it('should handle setPage', () => {
    const manyCountries = Array(20).fill(mockCountries[0])
    let state = reducer(initialState, fetchCountriesSuccess(manyCountries))

    state = reducer(state, setPage(2))
    expect(state.pagination.currentPage).toBe(2)
  })

  it('should not set page beyond total pages', () => {
    const manyCountries = Array(16).fill(mockCountries[0])
    let state = reducer(initialState, fetchCountriesSuccess(manyCountries))

    state = reducer(state, setPage(5))
    expect(state.pagination.currentPage).toBe(1)
  })

  it('should handle nextPage', () => {
    const manyCountries = Array(20).fill(mockCountries[0])
    let state = reducer(initialState, fetchCountriesSuccess(manyCountries))

    state = reducer(state, nextPage())
    expect(state.pagination.currentPage).toBe(2)
  })

  it('should not go beyond last page with nextPage', () => {
    const manyCountries = Array(16).fill(mockCountries[0])
    let state = reducer(initialState, fetchCountriesSuccess(manyCountries))
    state = reducer(state, setPage(2))

    state = reducer(state, nextPage())
    expect(state.pagination.currentPage).toBe(2)
  })

  it('should handle prevPage', () => {
    const manyCountries = Array(20).fill(mockCountries[0])
    let state = reducer(initialState, fetchCountriesSuccess(manyCountries))
    state = reducer(state, setPage(2))

    state = reducer(state, prevPage())
    expect(state.pagination.currentPage).toBe(1)
  })

  it('should not go below first page with prevPage', () => {
    let state = reducer(initialState, fetchCountriesSuccess(mockCountries))

    state = reducer(state, prevPage())
    expect(state.pagination.currentPage).toBe(1)
  })
})
