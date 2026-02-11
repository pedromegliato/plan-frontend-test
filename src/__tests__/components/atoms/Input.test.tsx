import React from 'react'

import { Input } from '@/components/atoms/Input'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  it('should render input without label', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('should render input with label', () => {
    render(<Input label="Username" placeholder="Enter username" />)
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('should render without error', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should render with error message', () => {
    render(<Input placeholder="Enter text" error="This field is required" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveClass('border-red-500')
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
  })

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="Enter text" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should pass props to input element', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')

    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(<Input className="custom-class" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('custom-class')
  })

  it('should have correct border color without error', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('border-gray-300')
  })
})
