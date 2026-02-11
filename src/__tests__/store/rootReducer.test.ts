import { rootReducer } from '@/store/rootReducer'

describe('Root Reducer', () => {
  it('should have countries reducer', () => {
    expect(rootReducer).toBeDefined()
    expect(rootReducer.countries).toBeDefined()
  })

  it('should be an object with countries property', () => {
    expect(typeof rootReducer).toBe('object')
    expect(typeof rootReducer.countries).toBe('function')
  })

  it('should call countries reducer', () => {
    const state = rootReducer.countries(undefined, { type: '@@INIT' })

    expect(state).toBeDefined()
    expect(state.items).toEqual([])
    expect(state.filteredItems).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })
})
