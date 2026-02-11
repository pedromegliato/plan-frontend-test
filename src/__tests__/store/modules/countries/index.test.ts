import { countriesReducer, countriesSaga } from '@/store/modules/countries'

describe('Countries Module Index', () => {
  it('should export countriesReducer', () => {
    expect(countriesReducer).toBeDefined()
    expect(typeof countriesReducer).toBe('function')
  })

  it('should export countriesSaga', () => {
    expect(countriesSaga).toBeDefined()
    expect(typeof countriesSaga).toBe('function')
  })

  it('should use countriesReducer', () => {
    const initialState = countriesReducer(undefined, { type: '@@INIT' })
    expect(initialState).toBeDefined()
    expect(initialState.items).toEqual([])
    expect(initialState.loading).toBe(false)
  })
})
