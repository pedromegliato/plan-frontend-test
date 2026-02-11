import { Country } from '@/@types'
import { useCountryDetail } from '@/hooks/useCountryDetail'
import { renderHook, waitFor } from '@testing-library/react'

const mockCountry: Country = {
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
  flag: 'flag.svg',
  flagAlt: 'Brazil flag',
  borders: [],
  timezones: [],
  landlocked: false,
  independent: true,
}

const mockGetCountryByCode = jest.fn()

jest.mock('@/services', () => ({
  CountryService: jest.fn().mockImplementation(() => ({
    getCountryByCode: (...args: [string]) => mockGetCountryByCode(...args),
  })),
}))

describe('useCountryDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetCountryByCode.mockClear()
  })

  it('should fetch country successfully', async () => {
    mockGetCountryByCode.mockResolvedValue(mockCountry)

    const { result } = renderHook(() => useCountryDetail('BR'))

    expect(result.current.loading).toBe(true)
    expect(result.current.country).toBe(null)
    expect(result.current.error).toBe(null)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.country).toEqual(mockCountry)
    expect(result.current.error).toBe(null)
    expect(mockGetCountryByCode).toHaveBeenCalledWith('BR')
  })

  it('should handle fetch error', async () => {
    mockGetCountryByCode.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCountryDetail('XX'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.country).toBe(null)
    expect(result.current.error).toBe(
      'Não foi possível carregar as informações do país',
    )
  })

  it('should not fetch when code is empty', () => {
    const { result } = renderHook(() => useCountryDetail(''))

    expect(result.current.loading).toBe(true)
    expect(mockGetCountryByCode).not.toHaveBeenCalled()
  })

  it('should refetch when code changes', async () => {
    mockGetCountryByCode.mockResolvedValue(mockCountry)

    const { result, rerender } = renderHook(
      ({ code }) => useCountryDetail(code),
      {
        initialProps: { code: 'BR' },
      },
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockGetCountryByCode).toHaveBeenCalledWith('BR')

    rerender({ code: 'US' })

    await waitFor(() => {
      expect(mockGetCountryByCode).toHaveBeenCalledWith('US')
    })

    expect(mockGetCountryByCode).toHaveBeenCalledTimes(2)
  })
})
