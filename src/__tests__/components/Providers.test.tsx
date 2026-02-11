import React from 'react'

import { Providers } from '@/components/Providers'
import { render } from '@testing-library/react'

describe('Providers', () => {
  it('should render children', () => {
    const { container } = render(
      <Providers>
        <div data-testid="test-child">Test Child</div>
      </Providers>,
    )

    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument()
  })

  it('should wrap children with Redux Provider', () => {
    const TestComponent = () => <div>Test</div>

    expect(() => {
      render(
        <Providers>
          <TestComponent />
        </Providers>,
      )
    }).not.toThrow()
  })
})
