import React from 'react'

import { Country } from '@/@types'
import Home from '@/app/page'
import { render, screen } from '@testing-library/react'

const mockUseCountries = jest.fn()

jest.mock('@/hooks/useCountries', () => ({
  useCountries: () => mockUseCountries(),
}))

jest.mock('@/components/organisms/FilterBar', () => ({
  FilterBar: () => <div data-testid="filter-bar">FilterBar</div>,
}))

jest.mock('@/components/organisms/CountriesGrid', () => ({
  CountriesGrid: ({ countries }: { countries: Country[] }) => (
    <div data-testid="countries-grid">
      {countries.length} countries
    </div>
  ),
}))

jest.mock('@/components/molecules/Pagination', () => ({
  Pagination: () => <div data-testid="pagination">Pagination</div>,
}))

jest.mock('@/components/organisms/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}))

jest.mock('@/components/atoms/Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}))

describe('Home Page', () => {
  const mockCountries: Country[] = [
    {
      code: 'BR',
      name: 'Brazil',
      flag: 'https://example.com/br.png',
      capital: 'Brasília',
      region: 'Americas',
      subregion: 'South America',
      continents: ['South America'],
      population: 212559417,
      languages: ['Portuguese'],
      area: 8515767,
      borders: ['ARG', 'BOL'],
    },
  ]

  const defaultHookReturn = {
    countries: mockCountries,
    filters: {
      searchTerm: '',
      continents: [],
      language: '',
    },
    availableLanguages: ['English', 'Portuguese'],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 12,
    },
    handleSearchChange: jest.fn(),
    handleContinentsChange: jest.fn(),
    handleLanguageChange: jest.fn(),
    handleClearFilters: jest.fn(),
    handlePageChange: jest.fn(),
    handleNextPage: jest.fn(),
    handlePrevPage: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render home page with countries', () => {
    mockUseCountries.mockReturnValue(defaultHookReturn)
    render(<Home />)

    expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
    expect(screen.getByTestId('countries-grid')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should show loading spinner when loading', () => {
    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      loading: true,
    })

    render(<Home />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.queryByTestId('countries-grid')).not.toBeInTheDocument()
  })

  it('should show error message when error occurs', () => {
    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      error: 'Failed to load countries',
    })

    render(<Home />)

    expect(screen.getByText('Erro')).toBeInTheDocument()
    expect(screen.getByText('Failed to load countries')).toBeInTheDocument()
    expect(screen.queryByTestId('filter-bar')).not.toBeInTheDocument()
    expect(screen.queryByTestId('countries-grid')).not.toBeInTheDocument()
  })

  it('should show pagination when there are multiple pages', () => {
    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      pagination: {
        currentPage: 1,
        totalPages: 3,
        itemsPerPage: 12,
      },
    })

    render(<Home />)

    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('should not show pagination when there is only one page', () => {
    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 12,
      },
    })

    render(<Home />)

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('should render with empty countries array', () => {
    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      countries: [],
    })

    render(<Home />)

    expect(screen.getByTestId('countries-grid')).toHaveTextContent(
      '0 countries',
    )
  })

  it('should render footer in all states', () => {
    mockUseCountries.mockReturnValue(defaultHookReturn)
    const { rerender } = render(<Home />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()

    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      loading: true,
    })
    rerender(<Home />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render filter bar when not in error state', () => {
    mockUseCountries.mockReturnValue(defaultHookReturn)
    render(<Home />)
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
  })

  it('should not render filter bar in error state', () => {
    mockUseCountries.mockReturnValue({
      ...defaultHookReturn,
      error: 'Network error',
    })
    render(<Home />)
    expect(screen.queryByTestId('filter-bar')).not.toBeInTheDocument()
  })
})
