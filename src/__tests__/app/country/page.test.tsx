import { useParams, useRouter } from 'next/navigation'

import CountryPage from '@/app/country/[code]/page'
import { useCountryDetail } from '@/hooks/useCountryDetail'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation')
jest.mock('@/hooks/useCountryDetail')

process.env.NEXT_PUBLIC_COUNTRIES_API_URL = 'https://api.test.com'

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

describe('CountryPage', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useParams as jest.Mock).mockReturnValue({ code: 'BR' })
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it('should render loading state', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: null,
      loading: true,
      error: null,
    })

    render(<CountryPage />)

    expect(screen.getByLabelText('Carregando informações do país')).toBeInTheDocument()
  })

  it('should render error state', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: null,
      loading: false,
      error: 'Erro ao carregar país',
    })

    render(<CountryPage />)

    expect(screen.getByText('Erro')).toBeInTheDocument()
    expect(screen.getByText('Erro ao carregar país')).toBeInTheDocument()
  })

  it('should render error state when country is null', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: null,
      loading: false,
      error: null,
    })

    render(<CountryPage />)

    expect(screen.getByText('País não encontrado')).toBeInTheDocument()
  })

  it('should render country details successfully', async () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: mockCountry,
      loading: false,
      error: null,
    })

    render(<CountryPage />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Brasil' })).toBeInTheDocument()
    })

    expect(screen.getByText('República Federativa do Brasil')).toBeInTheDocument()
    expect(screen.getByText('Brasília')).toBeInTheDocument()
    expect(screen.getByText('Real brasileiro')).toBeInTheDocument()
  })

  it('should navigate back when back button is clicked', async () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: mockCountry,
      loading: false,
      error: null,
    })

    const user = userEvent.setup()
    render(<CountryPage />)

    const backButton = screen.getByRole('button', { name: /voltar/i })
    await user.click(backButton)

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should navigate back from error state', async () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: null,
      loading: false,
      error: 'Erro',
    })

    const user = userEvent.setup()
    render(<CountryPage />)

    const backButton = screen.getByRole('button', { name: /voltar/i })
    await user.click(backButton)

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should render logo image', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: mockCountry,
      loading: false,
      error: null,
    })

    render(<CountryPage />)

    expect(screen.getByAltText('Plan International')).toBeInTheDocument()
  })

  it('should render continent display name correctly', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: mockCountry,
      loading: false,
      error: null,
    })

    render(<CountryPage />)

    const continentElements = screen.getAllByText('América do Sul')
    expect(continentElements.length).toBeGreaterThan(0)
  })

  it('should have proper accessibility attributes on loading state', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: null,
      loading: true,
      error: null,
    })

    render(<CountryPage />)

    const loadingContainers = screen.getAllByRole('status')
    expect(loadingContainers[0]).toHaveAttribute('aria-live', 'polite')
    expect(loadingContainers[0]).toHaveAttribute('aria-label', 'Carregando informações do país')
  })

  it('should have proper accessibility on back button', () => {
    ;(useCountryDetail as jest.Mock).mockReturnValue({
      country: mockCountry,
      loading: false,
      error: null,
    })

    render(<CountryPage />)

    const backButton = screen.getByLabelText('Voltar para a página inicial')
    expect(backButton).toBeInTheDocument()
  })
})
