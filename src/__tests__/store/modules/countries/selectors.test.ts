import { Country } from '@/@types'
import { RootState } from '@/store'
import {
  selectFilteredItems,
  selectPagination,
  selectFilters,
  selectAvailableLanguages,
  selectLoading,
  selectError,
  selectPaginatedCountries,
} from '@/store/modules/countries/selectors'

const mockCountries: Country[] = Array(20).fill(null).map((_, i) => ({
  code: `C${i}`,
  name: `Country ${i}`,
  officialName: `Official Country ${i}`,
  nativeName: `Native ${i}`,
  continent: 'Europe',
  region: 'Europe',
  subregion: 'Western Europe',
  capital: `Capital ${i}`,
  population: 1000000 * i,
  area: 50000 * i,
  languages: ['English'],
  currencies: [],
  flag: `flag${i}.svg`,
  flagAlt: `Flag ${i}`,
  borders: [],
  timezones: [],
  landlocked: false,
  independent: true,
}))

const mockState: RootState = {
  countries: {
    items: mockCountries,
    filteredItems: mockCountries,
    filters: {
      searchTerm: '',
      continents: [],
      language: '',
    },
    availableLanguages: ['English', 'Spanish', 'Portuguese'],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      itemsPerPage: 8,
      totalPages: 3,
    },
  },
}

describe('countries selectors', () => {
  it('should select filtered items', () => {
    const result = selectFilteredItems(mockState)
    expect(result).toEqual(mockCountries)
  })

  it('should select pagination', () => {
    const result = selectPagination(mockState)
    expect(result).toEqual({
      currentPage: 1,
      itemsPerPage: 8,
      totalPages: 3,
    })
  })

  it('should select filters', () => {
    const result = selectFilters(mockState)
    expect(result).toEqual({
      searchTerm: '',
      continents: [],
      language: '',
    })
  })

  it('should select available languages', () => {
    const result = selectAvailableLanguages(mockState)
    expect(result).toEqual(['English', 'Spanish', 'Portuguese'])
  })

  it('should select loading state', () => {
    const result = selectLoading(mockState)
    expect(result).toBe(false)
  })

  it('should select error state', () => {
    const result = selectError(mockState)
    expect(result).toBe(null)
  })

  describe('selectPaginatedCountries', () => {
    it('should return first page of countries', () => {
      const result = selectPaginatedCountries(mockState)
      expect(result).toHaveLength(8)
      expect(result[0].code).toBe('C0')
      expect(result[7].code).toBe('C7')
    })

    it('should return second page of countries', () => {
      const state = {
        ...mockState,
        countries: {
          ...mockState.countries,
          pagination: {
            ...mockState.countries.pagination,
            currentPage: 2,
          },
        },
      }
      const result = selectPaginatedCountries(state)
      expect(result).toHaveLength(8)
      expect(result[0].code).toBe('C8')
      expect(result[7].code).toBe('C15')
    })

    it('should return last page with remaining items', () => {
      const state = {
        ...mockState,
        countries: {
          ...mockState.countries,
          pagination: {
            ...mockState.countries.pagination,
            currentPage: 3,
          },
        },
      }
      const result = selectPaginatedCountries(state)
      expect(result).toHaveLength(4)
      expect(result[0].code).toBe('C16')
      expect(result[3].code).toBe('C19')
    })

    it('should return empty array for page beyond items', () => {
      const state = {
        ...mockState,
        countries: {
          ...mockState.countries,
          pagination: {
            ...mockState.countries.pagination,
            currentPage: 10,
          },
        },
      }
      const result = selectPaginatedCountries(state)
      expect(result).toEqual([])
    })
  })
})
