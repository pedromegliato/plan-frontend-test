jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  },
}))

import { countriesApi } from '@/services/http/countriesApi'

describe('CountriesApi', () => {
  it('should export countriesApi instance', () => {
    expect(countriesApi).toBeDefined()
    expect(typeof countriesApi.get).toBe('function')
  })

  it('should have get method', () => {
    expect(countriesApi.get).toBeDefined()
    expect(typeof countriesApi.get).toBe('function')
  })
})
