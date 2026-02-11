import { CountryService, CountryRepository, CountryTransformer, countriesApi } from '@/services'

describe('Services Index', () => {
  it('should export CountryService', () => {
    expect(CountryService).toBeDefined()
    expect(typeof CountryService).toBe('function')
  })

  it('should export CountryRepository', () => {
    expect(CountryRepository).toBeDefined()
    expect(typeof CountryRepository).toBe('function')
  })

  it('should export CountryTransformer', () => {
    expect(CountryTransformer).toBeDefined()
    expect(typeof CountryTransformer.toDomain).toBe('function')
  })

  it('should export countriesApi', () => {
    expect(countriesApi).toBeDefined()
    expect(typeof countriesApi.get).toBe('function')
  })

  it('should create CountryService instance', () => {
    const service = new CountryService()
    expect(service).toBeDefined()
    expect(typeof service.getAllCountries).toBe('function')
    expect(typeof service.getCountryByCode).toBe('function')
    expect(typeof service.extractUniqueLanguages).toBe('function')
  })
})
