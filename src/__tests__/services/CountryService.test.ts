import { CountryApiResponse, Country } from '@/@types'
import { CountryService } from '@/services/CountryService'
import { ICountryRepository } from '@/services/repositories/CountryRepository'

const mockApiResponse: CountryApiResponse = {
  cca2: 'BR',
  name: {
    common: 'Brazil',
    official: 'Federative Republic of Brazil',
  },
  translations: {
    por: {
      common: 'Brasil',
      official: 'República Federativa do Brasil',
    },
  },
  region: 'Americas',
  subregion: 'South America',
  continents: ['South America'],
  capital: ['Brasília'],
  population: 212559409,
  area: 8515767,
  languages: {
    por: 'Portuguese',
  },
  currencies: {
    BRL: {
      name: 'Brazilian real',
      symbol: 'R$',
    },
  },
  flags: {
    svg: 'https://flags.svg',
    png: 'https://flags.png',
    alt: 'Brazil flag',
  },
  borders: [],
  timezones: [],
  landlocked: false,
  independent: true,
}

describe('CountryService', () => {
  let mockRepository: jest.Mocked<ICountryRepository>
  let service: CountryService

  beforeEach(() => {
    mockRepository = {
      fetchAll: jest.fn(),
      fetchByCode: jest.fn(),
    }
    service = new CountryService(mockRepository)
  })

  describe('getAllCountries', () => {
    it('should return transformed countries', async () => {
      mockRepository.fetchAll.mockResolvedValue([mockApiResponse])

      const result = await service.getAllCountries()

      expect(mockRepository.fetchAll).toHaveBeenCalledTimes(1)
      expect(result).toHaveLength(1)
      expect(result[0].code).toBe('BR')
      expect(result[0].name).toBe('Brasil')
    })

    it('should throw error when fetch fails', async () => {
      const errorMessage = 'Network error'
      mockRepository.fetchAll.mockRejectedValue(new Error(errorMessage))

      await expect(service.getAllCountries()).rejects.toThrow(
        `Failed to fetch countries: ${errorMessage}`,
      )
    })

    it('should handle unknown error', async () => {
      mockRepository.fetchAll.mockRejectedValue('string error')

      await expect(service.getAllCountries()).rejects.toThrow(
        'Failed to fetch countries: Unknown error',
      )
    })
  })

  describe('getCountryByCode', () => {
    it('should return transformed country', async () => {
      mockRepository.fetchByCode.mockResolvedValue(mockApiResponse)

      const result = await service.getCountryByCode('BR')

      expect(mockRepository.fetchByCode).toHaveBeenCalledWith('BR')
      expect(result.code).toBe('BR')
      expect(result.name).toBe('Brasil')
    })

    it('should throw error when fetch fails', async () => {
      const errorMessage = 'Country not found'
      mockRepository.fetchByCode.mockRejectedValue(new Error(errorMessage))

      await expect(service.getCountryByCode('XX')).rejects.toThrow(
        `Failed to fetch country XX: ${errorMessage}`,
      )
    })

    it('should handle unknown error', async () => {
      mockRepository.fetchByCode.mockRejectedValue('string error')

      await expect(service.getCountryByCode('XX')).rejects.toThrow(
        'Failed to fetch country XX: Unknown error',
      )
    })
  })

  describe('extractUniqueLanguages', () => {
    it('should extract and sort unique languages', () => {
      const countries: Country[] = [
        {
          ...({} as Country),
          languages: ['Portuguese', 'English'],
        },
        {
          ...({} as Country),
          languages: ['Spanish', 'English'],
        },
        {
          ...({} as Country),
          languages: ['Portuguese'],
        },
      ]

      const result = service.extractUniqueLanguages(countries)

      expect(result).toEqual(['English', 'Portuguese', 'Spanish'])
    })

    it('should handle empty countries array', () => {
      const result = service.extractUniqueLanguages([])

      expect(result).toEqual([])
    })

    it('should handle countries with no languages', () => {
      const countries: Country[] = [
        {
          ...({} as Country),
          languages: [],
        },
      ]

      const result = service.extractUniqueLanguages(countries)

      expect(result).toEqual([])
    })
  })
})
