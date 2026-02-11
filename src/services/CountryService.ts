import { Country } from '@/@types'

import {
  CountryRepository,
  ICountryRepository,
} from './repositories/CountryRepository'
import { CountryTransformer } from './transformers/CountryTransformer'

export class CountryService {
  private repository: ICountryRepository

  constructor(repository?: ICountryRepository) {
    this.repository = repository || new CountryRepository()
  }

  async getAllCountries(): Promise<Country[]> {
    try {
      const apiData = await this.repository.fetchAll()
      return CountryTransformer.toDomainList(apiData)
    } catch (error) {
      throw new Error(
        `Failed to fetch countries: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  async getCountryByCode(code: string): Promise<Country> {
    try {
      const apiData = await this.repository.fetchByCode(code)
      return CountryTransformer.toDomain(apiData)
    } catch (error) {
      throw new Error(
        `Failed to fetch country ${code}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  extractUniqueLanguages(countries: Country[]): string[] {
    const languagesSet = new Set<string>()
    countries.forEach((country) => {
      country.languages.forEach((language) => languagesSet.add(language))
    })
    return Array.from(languagesSet).sort()
  }
}
