import { CountryApiResponse } from '@/@types'
import { CountryTransformer } from '@/services/transformers/CountryTransformer'

describe('CountryTransformer', () => {
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
    borders: ['ARG', 'BOL', 'COL'],
    timezones: ['UTC-05:00', 'UTC-04:00'],
    landlocked: false,
    independent: true,
  }

  describe('toDomain', () => {
    it('should transform API response to domain model', () => {
      const result = CountryTransformer.toDomain(mockApiResponse)

      expect(result).toEqual({
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
        currencies: [
          {
            code: 'BRL',
            name: 'Brazilian real',
            symbol: 'R$',
          },
        ],
        flag: 'https://flags.svg',
        flagAlt: 'Brazil flag',
        borders: ['ARG', 'BOL', 'COL'],
        timezones: ['UTC-05:00', 'UTC-04:00'],
        landlocked: false,
        independent: true,
      })
    })

    it('should use common name when Portuguese translation is not available', () => {
      const apiResponse = {
        ...mockApiResponse,
        translations: undefined,
      }

      const result = CountryTransformer.toDomain(apiResponse)

      expect(result.name).toBe('Brazil')
      expect(result.officialName).toBe('Federative Republic of Brazil')
    })

    it('should handle missing optional fields', () => {
      const minimalResponse: CountryApiResponse = {
        cca2: 'XX',
        name: {
          common: 'Test Country',
          official: 'Official Test Country',
        },
        region: 'Test Region',
      } as CountryApiResponse

      const result = CountryTransformer.toDomain(minimalResponse)

      expect(result).toEqual({
        code: 'XX',
        name: 'Test Country',
        officialName: 'Official Test Country',
        nativeName: 'Test Country',
        continent: 'Test Region',
        region: 'Test Region',
        subregion: '',
        capital: '',
        population: 0,
        area: 0,
        languages: [],
        currencies: [],
        flag: '',
        flagAlt: 'Test Country flag',
        borders: [],
        timezones: [],
        landlocked: false,
        independent: false,
      })
    })

    it('should use PNG flag when SVG is not available', () => {
      const apiResponse = {
        ...mockApiResponse,
        flags: {
          png: 'https://flags.png',
          alt: 'Flag alt text',
        },
      }

      const result = CountryTransformer.toDomain(apiResponse)

      expect(result.flag).toBe('https://flags.png')
    })

    it('should handle empty currencies', () => {
      const apiResponse = {
        ...mockApiResponse,
        currencies: undefined,
      }

      const result = CountryTransformer.toDomain(apiResponse)

      expect(result.currencies).toEqual([])
    })

    it('should handle empty languages', () => {
      const apiResponse = {
        ...mockApiResponse,
        languages: undefined,
      }

      const result = CountryTransformer.toDomain(apiResponse)

      expect(result.languages).toEqual([])
    })

    it('should use region as continent when continents array is empty', () => {
      const apiResponse = {
        ...mockApiResponse,
        continents: [],
      }

      const result = CountryTransformer.toDomain(apiResponse)

      expect(result.continent).toBe('Americas')
    })
  })

  describe('toDomainList', () => {
    it('should transform array of API responses to domain models', () => {
      const apiResponses = [mockApiResponse, { ...mockApiResponse, cca2: 'AR' }]

      const result = CountryTransformer.toDomainList(apiResponses)

      expect(result).toHaveLength(2)
      expect(result[0].code).toBe('BR')
      expect(result[1].code).toBe('AR')
    })

    it('should handle empty array', () => {
      const result = CountryTransformer.toDomainList([])

      expect(result).toEqual([])
    })
  })
})
