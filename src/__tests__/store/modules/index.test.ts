import { countriesReducer, countriesSaga } from '@/store/modules'

describe('Store Modules Index', () => {
  it('should export countriesReducer', () => {
    expect(countriesReducer).toBeDefined()
    expect(typeof countriesReducer).toBe('function')
  })

  it('should export countriesSaga', () => {
    expect(countriesSaga).toBeDefined()
    expect(typeof countriesSaga).toBe('function')
  })
})
