import { CountryDetailInfo } from '@/components/organisms/CountryDetailInfo'
import { render, screen } from '@testing-library/react'


const mockCountry = {
  code: 'BR',
  name: 'Brasil',
  officialName: 'República Federativa do Brasil',
  capital: 'Brasília',
  population: 212559417,
  flag: 'https://flagcdn.com/br.svg',
  flagAlt: 'Bandeira do Brasil',
  continent: 'Americas',
  subregion: 'South America',
  currencies: [{ code: 'BRL', name: 'Real brasileiro', symbol: 'R$' }],
  languages: ['Português'],
}

describe('CountryDetailInfo', () => {
  it('should render country name as heading', () => {
    render(<CountryDetailInfo country={mockCountry} continentDisplayName="América do Sul" />)

    expect(screen.getByRole('heading', { name: 'Brasil' })).toBeInTheDocument()
  })

  it('should render all detail labels', () => {
    render(<CountryDetailInfo country={mockCountry} continentDisplayName="América do Sul" />)

    const labelsContainer = screen.getByLabelText('Labels')

    expect(labelsContainer).toHaveTextContent('Nome oficial:')
    expect(labelsContainer).toHaveTextContent('Capital:')
    expect(labelsContainer).toHaveTextContent('População:')
    expect(labelsContainer).toHaveTextContent('Moeda:')
    expect(labelsContainer).toHaveTextContent('Idiomas:')
    expect(labelsContainer).toHaveTextContent('Região:')
    expect(labelsContainer).toHaveTextContent('Sub-Região:')
  })

  it('should render all detail values', () => {
    render(<CountryDetailInfo country={mockCountry} continentDisplayName="América do Sul" />)

    expect(screen.getByText('República Federativa do Brasil')).toBeInTheDocument()
    expect(screen.getByText('Brasília')).toBeInTheDocument()
    expect(screen.getByText('212.559.417')).toBeInTheDocument()
    expect(screen.getByText('Real brasileiro')).toBeInTheDocument()
    expect(screen.getByText('Português')).toBeInTheDocument()
    expect(screen.getByText('América do Sul')).toBeInTheDocument()
  })

  it('should render "-" when currency is not available', () => {
    const countryWithoutCurrency = { ...mockCountry, currencies: [] }
    render(<CountryDetailInfo country={countryWithoutCurrency} continentDisplayName="América do Sul" />)

    const values = screen.getAllByText('-')
    expect(values.length).toBeGreaterThan(0)
  })

  it('should render "-" when subregion is not available', () => {
    const countryWithoutSubregion = { ...mockCountry, subregion: undefined }
    render(<CountryDetailInfo country={countryWithoutSubregion} continentDisplayName="América do Sul" />)

    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('should render multiple languages joined by comma', () => {
    const countryWithMultipleLanguages = {
      ...mockCountry,
      languages: ['Português', 'Inglês', 'Espanhol'],
    }
    render(<CountryDetailInfo country={countryWithMultipleLanguages} continentDisplayName="América do Sul" />)

    expect(screen.getByText('Português, Inglês, Espanhol')).toBeInTheDocument()
  })

  it('should have correct aria-labels for accessibility', () => {
    render(<CountryDetailInfo country={mockCountry} continentDisplayName="América do Sul" />)

    expect(screen.getByLabelText('Informações do país')).toBeInTheDocument()
    expect(screen.getByLabelText('Labels')).toBeInTheDocument()
    expect(screen.getByLabelText('Valores')).toBeInTheDocument()
  })

  it('should format population with pt-BR locale', () => {
    render(<CountryDetailInfo country={mockCountry} continentDisplayName="América do Sul" />)

    expect(screen.getByText('212.559.417')).toBeInTheDocument()
  })
})
