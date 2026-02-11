import React from 'react'

import { Country } from '@/@types'
import { CountriesGrid } from '@/components/organisms/CountriesGrid'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/molecules/CountryCard', () => ({
  CountryCard: ({ country }: { country: Country }) => (
    <div data-testid={`country-card-${country.code}`}>{country.name}</div>
  ),
}))

describe('CountriesGrid', () => {
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
    {
      code: 'US',
      name: 'United States',
      flag: 'https://example.com/us.png',
      capital: 'Washington D.C.',
      region: 'Americas',
      subregion: 'North America',
      continents: ['North America'],
      population: 331002651,
      languages: ['English'],
      area: 9833517,
      borders: ['CAN', 'MEX'],
    },
  ]

  it('should render empty state when no countries', () => {
    render(<CountriesGrid countries={[]} />)

    expect(screen.getByText('Nenhum país encontrado')).toBeInTheDocument()
    expect(
      screen.getByText('Ajuste os filtros para ver resultados'),
    ).toBeInTheDocument()
  })

  it('should render grid of countries', () => {
    render(<CountriesGrid countries={mockCountries} />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByTestId('country-card-BR')).toBeInTheDocument()
    expect(screen.getByTestId('country-card-US')).toBeInTheDocument()
  })

  it('should render correct number of countries', () => {
    render(<CountriesGrid countries={mockCountries} />)

    const cards = screen.getAllByText(/Brazil|United States/)
    expect(cards).toHaveLength(2)
  })

  it('should pass country data to CountryCard', () => {
    render(<CountriesGrid countries={mockCountries} />)

    expect(screen.getByText('Brazil')).toBeInTheDocument()
    expect(screen.getByText('United States')).toBeInTheDocument()
  })

  it('should render single country', () => {
    render(<CountriesGrid countries={[mockCountries[0]]} />)

    expect(screen.getByTestId('country-card-BR')).toBeInTheDocument()
    expect(screen.queryByTestId('country-card-US')).not.toBeInTheDocument()
  })
})
