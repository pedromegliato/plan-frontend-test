import { CountryCard } from '@/components/molecules/CountryCard'
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

describe('CountryCard', () => {
  it('should render country name', () => {
    render(<CountryCard country={mockCountry} />)

    expect(screen.getByRole('heading', { name: 'Brasil' })).toBeInTheDocument()
  })

  it('should render country capital', () => {
    render(<CountryCard country={mockCountry} />)

    expect(screen.getByText('Brasília')).toBeInTheDocument()
  })

  it('should render continent display name', () => {
    render(<CountryCard country={mockCountry} />)

    expect(screen.getByText('América do Sul')).toBeInTheDocument()
  })

  it('should render flag image', () => {
    render(<CountryCard country={mockCountry} />)

    const flagImage = screen.getByAltText('Bandeira do Brasil')
    expect(flagImage).toBeInTheDocument()
    expect(flagImage).toHaveAttribute('src', expect.stringContaining('br.svg'))
  })

  it('should render continent icon', () => {
    const { container } = render(<CountryCard country={mockCountry} />)

    const iconContainer = container.querySelector('.opacity-40')
    expect(iconContainer).toBeInTheDocument()
  })

  it('should render "Ver mais" link with correct href', () => {
    render(<CountryCard country={mockCountry} />)

    const link = screen.getByRole('link', { name: /ver mais/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/country/BR')
  })

  it('should render without capital when not provided', () => {
    const countryWithoutCapital = { ...mockCountry, capital: undefined }
    render(<CountryCard country={countryWithoutCapital} />)

    expect(screen.queryByText('Brasília')).not.toBeInTheDocument()
  })

  it('should display North America for northern subregion', () => {
    const northAmericaCountry = {
      ...mockCountry,
      subregion: 'Northern America',
    }
    render(<CountryCard country={northAmericaCountry} />)

    expect(screen.getByText('América do Norte')).toBeInTheDocument()
  })

  it('should display Central America for central/caribbean subregion', () => {
    const centralAmericaCountry = {
      ...mockCountry,
      subregion: 'Central America',
    }
    render(<CountryCard country={centralAmericaCountry} />)

    expect(screen.getByText('América Central')).toBeInTheDocument()
  })

  it('should display Caribbean as Central America', () => {
    const caribbeanCountry = {
      ...mockCountry,
      subregion: 'Caribbean',
    }
    render(<CountryCard country={caribbeanCountry} />)

    expect(screen.getByText('América Central')).toBeInTheDocument()
  })

  it('should have hover effect classes', () => {
    const { container } = render(<CountryCard country={mockCountry} />)

    const article = container.querySelector('article')
    expect(article).toHaveClass('hover:scale-105')
  })

  it('should render as article element', () => {
    const { container } = render(<CountryCard country={mockCountry} />)

    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })
})
