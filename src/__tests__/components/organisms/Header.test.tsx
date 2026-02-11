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

  it('should render logo with correct dimensions', () => {
    render(<Header />)

    const logo = screen.getByRole('img', { name: /plan international/i })
    expect(logo).toHaveAttribute('width', '150')
    expect(logo).toHaveAttribute('height', '60')
  })

  it('should render logo wrapped in link to home', () => {
    render(<Header />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })
})
