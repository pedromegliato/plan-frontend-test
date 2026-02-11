import { act } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { renderHook, waitFor } from '@testing-library/react'

jest.useFakeTimers()

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))

    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 500 })

    expect(result.current).toBe('initial')

    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })

  it('should reset timer when value changes before delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    )

    rerender({ value: 'first', delay: 500 })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('initial')

    rerender({ value: 'second', delay: 500 })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('initial')

    act(() => {
      jest.advanceTimersByTime(200)
    })

    await waitFor(() => {
      expect(result.current).toBe('second')
    })
  })

  it('should work with different delay values', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 },
      },
    )

    rerender({ value: 'updated', delay: 300 })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })

  it('should work with numbers', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 500 },
      },
    )

    expect(result.current).toBe(0)

    rerender({ value: 42, delay: 500 })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(result.current).toBe(42)
    })
  })

  it('should work with objects', async () => {
    const initialObject = { name: 'John' }
    const updatedObject = { name: 'Jane' }

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: initialObject, delay: 500 },
      },
    )

    expect(result.current).toBe(initialObject)

    rerender({ value: updatedObject, delay: 500 })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(result.current).toBe(updatedObject)
    })
  })

  it('should cleanup timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500))

    unmount()

    expect(jest.getTimerCount()).toBe(0)
  })

  it('should update immediately when delay is 0', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      },
    )

    rerender({ value: 'updated', delay: 0 })

    act(() => {
      jest.advanceTimersByTime(0)
    })

    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })
})
