import { store, useAppDispatch, useAppSelector } from '@/store'

describe('Store Index', () => {
  it('should export store', () => {
    expect(store).toBeDefined()
    expect(typeof store.dispatch).toBe('function')
    expect(typeof store.getState).toBe('function')
  })

  it('should export useAppDispatch', () => {
    expect(useAppDispatch).toBeDefined()
  })

  it('should export useAppSelector', () => {
    expect(useAppSelector).toBeDefined()
  })
})
