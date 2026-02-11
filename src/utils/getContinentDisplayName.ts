import { CONTINENT_NAMES, UI_TEXT } from '@/constants/uiText'

export const getContinentDisplayName = (
  continent: string,
  subregion?: string,
): string => {
  if (subregion) {
    const normalizedSubregion = subregion.toLowerCase()

    if (normalizedSubregion.includes('northern')) {
      return UI_TEXT.continents.northAmerica
    }
    if (
      normalizedSubregion.includes('central') ||
      normalizedSubregion.includes('caribbean')
    ) {
      return UI_TEXT.continents.centralAmerica
    }
    if (normalizedSubregion.includes('south')) {
      return UI_TEXT.continents.southAmerica
    }
  }

  return CONTINENT_NAMES[continent] || continent
}
