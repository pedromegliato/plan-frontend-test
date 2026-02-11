import * as hooks from '@/hooks'

describe('Hooks Index', () => {
  it('should export useCountries', () => {
    expect(hooks.useCountries).toBeDefined()
    expect(typeof hooks.useCountries).toBe('function')
  })

  it('should export useDebounce', () => {
    expect(hooks.useDebounce).toBeDefined()
    expect(typeof hooks.useDebounce).toBe('function')
  })

  it('should export useMediaQuery', () => {
    expect(hooks.useMediaQuery).toBeDefined()
    expect(typeof hooks.useMediaQuery).toBe('function')
  })

  it('should have exported hooks', () => {
    expect(Object.keys(hooks).length).toBeGreaterThan(0)
  })
})
