import { CountryApiResponse } from '@/@types'

import { countriesApi } from '../http/countriesApi'

export interface ICountryRepository {
  fetchAll(): Promise<CountryApiResponse[]>
  fetchByCode(_code: string): Promise<CountryApiResponse>
}

export class CountryRepository implements ICountryRepository {
  async fetchAll(): Promise<CountryApiResponse[]> {
    return countriesApi.get<CountryApiResponse[]>(
      '/all?fields=name,capital,region,subregion,population,flags,cca2,languages,currencies,continents',
    )
  }

  async fetchByCode(code: string): Promise<CountryApiResponse> {
    const response = await countriesApi.get<
      CountryApiResponse | CountryApiResponse[]
    >(
      `/alpha/${code}?fields=name,capital,region,subregion,population,flags,cca2,cca3,languages,currencies,continents,translations,area,borders,timezones,landlocked,independent`,
    )

    const country = Array.isArray(response) ? response[0] : response

    if (!country) {
      throw new Error(`Country with code ${code} not found`)
    }

    return country
  }
}
