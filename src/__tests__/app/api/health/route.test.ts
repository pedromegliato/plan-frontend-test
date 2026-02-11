import { NextResponse } from 'next/server'

import { GET } from '@/app/api/health/route'

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      status: 200,
      json: async () => data,
    })),
  },
}))

describe('Health API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return status ok', async () => {
    await GET()

    expect(NextResponse.json).toHaveBeenCalled()
    const callArgs = (NextResponse.json as jest.Mock).mock.calls[0][0]

    expect(callArgs.status).toBe('ok')
    expect(callArgs.timestamp).toBeDefined()
  })

  it('should return ISO timestamp', async () => {
    await GET()

    const callArgs = (NextResponse.json as jest.Mock).mock.calls[0][0]
    const timestamp = callArgs.timestamp

    // Verify it's a valid ISO string
    expect(typeof timestamp).toBe('string')
    expect(() => new Date(timestamp)).not.toThrow()
    expect(new Date(timestamp).toISOString()).toBe(timestamp)
  })

  it('should call NextResponse.json', async () => {
    await GET()

    expect(NextResponse.json).toHaveBeenCalledTimes(1)
    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ok',
        timestamp: expect.any(String),
      })
    )
  })
})
