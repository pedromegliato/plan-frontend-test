import { Country, CountryApiResponse } from '@/@types'

export class CountryTransformer {
  static toDomain(apiResponse: CountryApiResponse): Country {
    const portugueseName =
      apiResponse.translations?.por?.common || apiResponse.name.common
    const portugueseOfficialName =
      apiResponse.translations?.por?.official || apiResponse.name.official

    const currencies = apiResponse.currencies
      ? Object.entries(apiResponse.currencies).map(([code, currency]) => ({
        code,
        name: currency.name,
        symbol: currency.symbol,
      }))
      : []

    const languages = apiResponse.languages
      ? Object.values(apiResponse.languages)
      : []

    return {
      code: apiResponse.cca2,
      name: portugueseName,
      officialName: portugueseOfficialName,
      nativeName: apiResponse.name.common,
      continent: apiResponse.continents?.[0] || apiResponse.region,
      region: apiResponse.region,
      subregion: apiResponse.subregion || '',
      capital: apiResponse.capital?.[0] || '',
      population: apiResponse.population || 0,
      area: apiResponse.area || 0,
      languages,
      currencies,
      flag: apiResponse.flags?.svg || apiResponse.flags?.png || '',
      flagAlt: apiResponse.flags?.alt || `${portugueseName} flag`,
      borders: apiResponse.borders || [],
      timezones: apiResponse.timezones || [],
      landlocked: apiResponse.landlocked || false,
      independent: apiResponse.independent || false,
    }
  }

  static toDomainList(apiResponses: CountryApiResponse[]): Country[] {
    return apiResponses.map(this.toDomain)
  }
}
