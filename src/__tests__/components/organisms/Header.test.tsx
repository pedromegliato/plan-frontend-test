import React from 'react'

import { Header } from '@/components/organisms/Header'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  it('should render logo image', () => {
    render(<Header />)

    const logo = screen.getByRole('img', { name: /plan international/i })
    expect(logo).toBeInTheDocument()
  })

  it('should render logo with correct src', () => {
    render(<Header />)

    const logo = screen.getByRole('img', { name: /plan international/i })
    expect(logo).toHaveAttribute('src', expect.stringContaining('LOGO'))
  })

  it('should render logo with priority loading', () => {
    render(<Header />)

    const logo = screen.getByRole('img', { name: /plan international/i })
    expect(logo).toHaveAttribute('fetchpriority', 'high')
  })
})
