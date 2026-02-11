import { getContinentDisplayName } from '@/utils/getContinentDisplayName'

describe('getContinentDisplayName', () => {
  it('should return North America for northern subregion', () => {
    expect(getContinentDisplayName('Americas', 'Northern America')).toBe('América do Norte')
  })

  it('should return Central America for central subregion', () => {
    expect(getContinentDisplayName('Americas', 'Central America')).toBe('América Central')
  })

  it('should return Central America for caribbean subregion', () => {
    expect(getContinentDisplayName('Americas', 'Caribbean')).toBe('América Central')
  })

  it('should return South America for south subregion', () => {
    expect(getContinentDisplayName('Americas', 'South America')).toBe('América do Sul')
  })

  it('should return continent name from CONTINENT_NAMES when no subregion match', () => {
    expect(getContinentDisplayName('Europe')).toBe('Europa')
  })

  it('should return continent as fallback when not in CONTINENT_NAMES', () => {
    expect(getContinentDisplayName('Unknown')).toBe('Unknown')
  })
})
