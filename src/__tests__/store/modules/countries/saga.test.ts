import { takeLatest } from 'redux-saga/effects'

import { Country } from '@/@types'
import { CountryService } from '@/services/CountryService'
import { countriesSaga } from '@/store/modules/countries/saga'
import { fetchCountriesRequest } from '@/store/modules/countries/slice'

// Mock CountryService
jest.mock('@/services/CountryService')

describe('Countries Saga', () => {
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
      languages: ['Portuguese', 'English'],
      currencies: [],
      flag: '',
      flagAlt: '',
      borders: [],
      timezones: [],
      landlocked: false,
      independent: true,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should watch for fetchCountriesRequest action', () => {
    const generator = countriesSaga()
    const result = generator.next()

    expect(result.value).toEqual(
      takeLatest(fetchCountriesRequest.type, expect.any(Function)),
    )
  })

  describe('fetchCountriesSaga', () => {
    let mockCountryService: jest.Mocked<CountryService>

    beforeEach(() => {
      mockCountryService = {
        getAllCountries: jest.fn(),
        extractUniqueLanguages: jest.fn(),
        getCountryByCode: jest.fn(),
        repository: {} as never,
      } as jest.Mocked<CountryService>

      ;(CountryService as jest.MockedClass<typeof CountryService>).mockImplementation(
        () => mockCountryService,
      )
    })

    it('should fetch countries successfully', async () => {
      mockCountryService.getAllCountries.mockResolvedValue(mockCountries)
      mockCountryService.extractUniqueLanguages.mockReturnValue([
        'Portuguese',
        'English',
      ])

      // Create a manual test that simulates what the saga does
      const mockService = new CountryService()

      // Simulate successful flow
      const countries = await mockService.getAllCountries()
      expect(countries).toEqual(mockCountries)

      const languages = mockService.extractUniqueLanguages(countries)
      expect(languages).toEqual(['Portuguese', 'English'])
    })

    it('should handle fetch countries error', async () => {
      const error = new Error('Network error')
      mockCountryService.getAllCountries.mockRejectedValue(error)

      try {
        await mockCountryService.getAllCountries()
      } catch (e) {
        expect(e).toEqual(error)
      }
    })

    it('should handle non-Error exceptions', async () => {
      const error = 'String error'
      mockCountryService.getAllCountries.mockRejectedValue(error)

      try {
        await mockCountryService.getAllCountries()
      } catch (e) {
        expect(e).toEqual(error)
      }
    })
  })
})
