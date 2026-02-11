import { CountryApiResponse } from '@/@types'
import { countriesApi } from '@/services/http/countriesApi'
import { CountryRepository } from '@/services/repositories/CountryRepository'

jest.mock('@/services/http/countriesApi')

const mockCountryResponse: CountryApiResponse = {
  cca2: 'BR',
  name: {
    common: 'Brazil',
    official: 'Federative Republic of Brazil',
  },
  region: 'Americas',
  subregion: 'South America',
  continents: ['South America'],
  capital: ['Brasília'],
  population: 212559409,
  flags: {
    svg: 'flag.svg',
    png: 'flag.png',
  },
} as CountryApiResponse

describe('CountryRepository', () => {
  let repository: CountryRepository

  beforeEach(() => {
    repository = new CountryRepository()
    jest.clearAllMocks()
  })

  describe('fetchAll', () => {
    it('should fetch all countries', async () => {
      const mockCountries = [mockCountryResponse]
      ;(countriesApi.get as jest.Mock).mockResolvedValue(mockCountries)

      const result = await repository.fetchAll()

      expect(countriesApi.get).toHaveBeenCalledWith(
        '/all?fields=name,capital,region,subregion,population,flags,cca2,languages,currencies,continents',
      )
      expect(result).toEqual(mockCountries)
    })

    it('should throw error when fetch fails', async () => {
      ;(countriesApi.get as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      )

      await expect(repository.fetchAll()).rejects.toThrow('Network error')
    })
  })

  describe('fetchByCode', () => {
    it('should fetch country by code when response is single object', async () => {
      ;(countriesApi.get as jest.Mock).mockResolvedValue(mockCountryResponse)

      const result = await repository.fetchByCode('BR')

      expect(countriesApi.get).toHaveBeenCalledWith(
        '/alpha/BR?fields=name,capital,region,subregion,population,flags,cca2,cca3,languages,currencies,continents,translations,area,borders,timezones,landlocked,independent',
      )
      expect(result).toEqual(mockCountryResponse)
    })

    it('should fetch country by code when response is array', async () => {
      ;(countriesApi.get as jest.Mock).mockResolvedValue([mockCountryResponse])

      const result = await repository.fetchByCode('BR')

      expect(result).toEqual(mockCountryResponse)
    })

    it('should throw error when country not found in array', async () => {
      ;(countriesApi.get as jest.Mock).mockResolvedValue([])

      await expect(repository.fetchByCode('XX')).rejects.toThrow(
        'Country with code XX not found',
      )
    })

    it('should throw error when fetch fails', async () => {
      ;(countriesApi.get as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      )

      await expect(repository.fetchByCode('BR')).rejects.toThrow(
        'Network error',
      )
    })
  })
})
