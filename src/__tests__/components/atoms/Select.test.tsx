import React from 'react'

import { Select } from '@/components/atoms/Select'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('Select', () => {
  it('should render select without label', () => {
    render(<Select options={mockOptions} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  it('should render select with label', () => {
    render(<Select label="Country" options={mockOptions} />)
    expect(screen.getByText('Country')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should render all options', () => {
    render(<Select options={mockOptions} />)
    mockOptions.forEach((option) => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument()
    })
  })

  it('should render with placeholder', () => {
    render(<Select options={mockOptions} placeholder="Select an option" />)
    expect(screen.getByRole('option', { name: 'Select an option' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Select an option' })).toHaveAttribute('disabled')
  })

  it('should render without error', () => {
    render(<Select options={mockOptions} />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-invalid', 'false')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should render with error message', () => {
    render(<Select options={mockOptions} error="This field is required" />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveClass('border-red-500')
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
  })

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>()
    render(<Select ref={ref} options={mockOptions} />)
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it('should pass props to select element', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<Select options={mockOptions} onChange={handleChange} />)
    const select = screen.getByRole('combobox')

    await user.selectOptions(select, 'option2')
    expect(handleChange).toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(<Select className="custom-class" options={mockOptions} />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('custom-class')
  })

  it('should have correct border color without error', () => {
    render(<Select options={mockOptions} />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('border-gray-300')
  })

  it('should render empty option value for placeholder', () => {
    render(<Select options={mockOptions} placeholder="Select" />)
    const placeholder = screen.getByRole('option', { name: 'Select' })
    expect(placeholder).toHaveAttribute('value', '')
  })
})
