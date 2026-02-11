import React from 'react'
import { Provider } from 'react-redux'

import { store, useAppDispatch, useAppSelector } from '@/store/store'
import { renderHook } from '@testing-library/react'

describe('Redux Store', () => {
  it('should create store with initial state', () => {
    const state = store.getState()

    expect(state).toBeDefined()
    expect(state.countries).toBeDefined()
  })

  it('should have countries reducer', () => {
    const state = store.getState()

    expect(state.countries.items).toEqual([])
    expect(state.countries.loading).toBe(false)
    expect(state.countries.error).toBe(null)
  })

  it('should be able to dispatch actions', () => {
    expect(() => {
      store.dispatch({ type: 'TEST_ACTION' })
    }).not.toThrow()
  })

  it('should have getState method', () => {
    expect(typeof store.getState).toBe('function')
  })

  it('should have dispatch method', () => {
    expect(typeof store.dispatch).toBe('function')
  })

  it('should have subscribe method', () => {
    expect(typeof store.subscribe).toBe('function')
  })

  it('should export useAppDispatch hook', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(Provider, { store }, children)

    const { result } = renderHook(() => useAppDispatch(), { wrapper })

    expect(result.current).toBeDefined()
    expect(typeof result.current).toBe('function')
  })

  it('should export useAppSelector hook', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(Provider, { store }, children)

    const { result } = renderHook(() => useAppSelector((state) => state.countries), { wrapper })

    expect(result.current).toBeDefined()
    expect(result.current.items).toEqual([])
  })
})
