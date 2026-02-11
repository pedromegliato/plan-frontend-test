export interface CountryName {
  common: string
  official: string
}

export interface CountryTranslation {
  official: string
  common: string
}

export interface CountryCurrency {
  name: string
  symbol: string
}

export interface CountryLanguage {
  [key: string]: string
}

export interface CountryFlags {
  png: string
  svg: string
  alt?: string
}

export interface CountryCoatOfArms {
  png?: string
  svg?: string
}

export interface CountryCapitalInfo {
  latlng?: number[]
}

export interface CountryApiResponse {
  name: CountryName
  translations: {
    por?: CountryTranslation
    [key: string]: CountryTranslation | undefined
  }
  tld?: string[]
  cca2: string
  ccn3?: string
  cca3: string
  cioc?: string
  independent?: boolean
  status: string
  unMember: boolean
  currencies?: {
    [key: string]: CountryCurrency
  }
  idd?: {
    root?: string
    suffixes?: string[]
  }
  capital?: string[]
  altSpellings?: string[]
  region: string
  subregion?: string
  languages?: CountryLanguage
  latlng?: number[]
  landlocked: boolean
  borders?: string[]
  area: number
  demonyms?: {
    [key: string]: {
      f: string
      m: string
    }
  }
  flag: string
  maps?: {
    googleMaps?: string
    openStreetMaps?: string
  }
  population: number
  gini?: {
    [key: string]: number
  }
  fifa?: string
  car?: {
    signs?: string[]
    side: string
  }
  timezones?: string[]
  continents?: string[]
  flags: CountryFlags
  coatOfArms?: CountryCoatOfArms
  startOfWeek?: string
  capitalInfo?: CountryCapitalInfo
  postalCode?: {
    format: string
    regex: string
  }
}

export interface Country {
  code: string
  name: string
  officialName: string
  nativeName: string
  continent: string
  region: string
  subregion: string
  capital: string
  population: number
  area: number
  languages: string[]
  currencies: Array<{
    code: string
    name: string
    symbol: string
  }>
  flag: string
  flagAlt: string
  borders: string[]
  timezones: string[]
  landlocked: boolean
  independent: boolean
}

export interface CountriesFilters {
  searchTerm: string
  continents: string[]
  language: string
}

export interface CountriesState {
  items: Country[]
  filteredItems: Country[]
  filters: CountriesFilters
  availableLanguages: string[]
  loading: boolean
  error: string | null
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
  }
}
