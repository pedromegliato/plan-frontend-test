import React from 'react'

import RootLayout, { metadata, viewport } from '@/app/layout'

jest.mock('@/components/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}))

jest.mock('@/components/organisms/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

describe('RootLayout', () => {
  it('should be a valid React component', () => {
    expect(typeof RootLayout).toBe('function')
  })

  it('should render with children prop', () => {
    const props = {
      children: <div>Test Content</div>,
    }

    const result = RootLayout(props)
    expect(result).toBeDefined()
    expect(result.type).toBe('html')
  })

  it('should have correct structure', () => {
    const props = {
      children: <div>Content</div>,
    }

    const result = RootLayout(props)
    expect(result.props.lang).toBe('pt-BR')
  })

  it('should export metadata', () => {
    expect(metadata).toBeDefined()
    expect(metadata.title).toBe('Explorador de Países | Plan International')
    expect(metadata.description).toContain('Explore informações sobre países')
  })

  it('should export viewport', () => {
    expect(viewport).toBeDefined()
    expect(viewport.width).toBe('device-width')
    expect(viewport.initialScale).toBe(1)
    expect(viewport.maximumScale).toBe(5)
  })
})
