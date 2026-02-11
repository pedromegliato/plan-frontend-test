import { useCountries } from '@/hooks/useCountries'
import * as storeModule from '@/store'
import * as countriesModule from '@/store/modules/countries'
import { renderHook, act, waitFor } from '@testing-library/react'

jest.mock('@/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}))

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}))

describe('useCountries', () => {
  const mockDispatch = jest.fn()
  const mockUseAppSelector = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(storeModule.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
    ;(storeModule.useAppSelector as jest.Mock).mockImplementation(mockUseAppSelector)

    mockUseAppSelector.mockImplementation((selector) => {
      if (selector === countriesModule.selectFilters) {
        return { searchTerm: '', continents: [], language: '' }
      }
      if (selector === countriesModule.selectAvailableLanguages) {
        return ['English', 'Spanish']
      }
      if (selector === countriesModule.selectLoading) {
        return false
      }
      if (selector === countriesModule.selectError) {
        return null
      }
      if (selector === countriesModule.selectPagination) {
        return { currentPage: 1, pageSize: 20, totalPages: 5 }
      }
      if (selector === countriesModule.selectPaginatedCountries) {
        return []
      }
      if (selector === countriesModule.selectFilteredItems) {
        return []
      }
      return undefined
    })
  })

  it('should initialize and dispatch fetchCountriesRequest', () => {
    renderHook(() => useCountries())

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.fetchCountriesRequest())
  })

  it('should return countries data from selectors', () => {
    const { result } = renderHook(() => useCountries())

    expect(result.current.countries).toEqual([])
    expect(result.current.availableLanguages).toEqual(['English', 'Spanish'])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.pagination).toEqual({ currentPage: 1, pageSize: 20, totalPages: 5 })
  })

  it('should handle search change', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handleSearchChange('Brazil')
    })

    expect(result.current.filters.searchTerm).toBe('Brazil')
  })

  it('should dispatch setSearchTerm when debounced search term changes', async () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handleSearchChange('Brazil')
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(countriesModule.setSearchTerm('Brazil'))
    })
  })

  it('should handle continents change', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handleContinentsChange(['Europe', 'Asia'])
    })

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.setContinents(['Europe', 'Asia']))
  })

  it('should handle language change', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handleLanguageChange('Spanish')
    })

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.setLanguage('Spanish'))
  })

  it('should handle clear filters', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handleSearchChange('Brazil')
    })

    act(() => {
      result.current.handleClearFilters()
    })

    expect(result.current.filters.searchTerm).toBe('')
    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.clearFilters())
  })

  it('should handle page change', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handlePageChange(3)
    })

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.setPage(3))
  })

  it('should handle next page', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handleNextPage()
    })

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.nextPage())
  })

  it('should handle prev page', () => {
    const { result } = renderHook(() => useCountries())

    act(() => {
      result.current.handlePrevPage()
    })

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.prevPage())
  })

  it('should dispatch applyFilters when filters change', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (selector === countriesModule.selectFilters) {
        return { searchTerm: 'test', continents: ['Europe'], language: 'English' }
      }
      return []
    })

    renderHook(() => useCountries())

    expect(mockDispatch).toHaveBeenCalledWith(countriesModule.applyFilters())
  })

  it('should calculate total countries from filtered items', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (selector === countriesModule.selectFilteredItems) {
        return [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
      return selector === countriesModule.selectFilters ? { searchTerm: '', continents: [], language: '' } : []
    })

    const { result } = renderHook(() => useCountries())

    expect(result.current.totalCountries).toBe(3)
  })
})
