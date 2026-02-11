import { act } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { renderHook } from '@testing-library/react'

describe('useMediaQuery', () => {
  let matchMediaMock: jest.Mock

  beforeEach(() => {
    matchMediaMock = jest.fn()
    window.matchMedia = matchMediaMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return false initially when media query does not match', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 640px)'))

    expect(result.current).toBe(false)
  })

  it('should return true when media query matches', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 640px)'))

    expect(result.current).toBe(true)
  })

  it('should call matchMedia with correct query', () => {
    const query = '(min-width: 768px)'
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    renderHook(() => useMediaQuery(query))

    expect(matchMediaMock).toHaveBeenCalledWith(query)
  })

  it('should add event listener on mount', () => {
    const addEventListenerMock = jest.fn()
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: jest.fn(),
    })

    renderHook(() => useMediaQuery('(max-width: 640px)'))

    expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should remove event listener on unmount', () => {
    const removeEventListenerMock = jest.fn()
    const addEventListenerMock = jest.fn()

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    })

    const { unmount } = renderHook(() => useMediaQuery('(max-width: 640px)'))

    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should update matches when media query changes', () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn((_, handler) => {
        changeHandler = handler
      }),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 640px)'))

    expect(result.current).toBe(false)

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(true)
  })

  it('should handle multiple query changes', () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn((_, handler) => {
        changeHandler = handler
      }),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 640px)'))

    expect(result.current).toBe(false)

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(true)

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: false } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(false)
  })

  it('should update when query changes', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    const { rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(max-width: 640px)' } },
    )

    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 640px)')

    rerender({ query: '(min-width: 768px)' })

    expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 768px)')
  })
})
