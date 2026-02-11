import React from 'react'

import { ContinentFilter } from '@/components/molecules/ContinentFilter'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ContinentFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render all continents', () => {
    render(<ContinentFilter selectedContinents={[]} onChange={mockOnChange} />)

    expect(screen.getByText('Continentes')).toBeInTheDocument()
    expect(screen.getByText('África')).toBeInTheDocument()
    expect(screen.getByText('América do Norte')).toBeInTheDocument()
    expect(screen.getByText('América Central')).toBeInTheDocument()
    expect(screen.getByText('América do Sul')).toBeInTheDocument()
    expect(screen.getByText('Ásia')).toBeInTheDocument()
    expect(screen.getByText('Europa')).toBeInTheDocument()
    expect(screen.getByText('Oceania')).toBeInTheDocument()
    expect(screen.getByText('Antártica')).toBeInTheDocument()
  })

  it('should call onChange when continent is selected', async () => {
    const user = userEvent.setup()
    render(<ContinentFilter selectedContinents={[]} onChange={mockOnChange} />)

    const africaCheckbox = screen.getByLabelText('Filtrar por África')
    await user.click(africaCheckbox)

    expect(mockOnChange).toHaveBeenCalledWith(['Africa'])
  })

  it('should call onChange when continent is deselected', async () => {
    const user = userEvent.setup()
    render(
      <ContinentFilter
        selectedContinents={['Africa', 'Europe']}
        onChange={mockOnChange}
      />,
    )

    const africaCheckbox = screen.getByLabelText('Filtrar por África')
    await user.click(africaCheckbox)

    expect(mockOnChange).toHaveBeenCalledWith(['Europe'])
  })

  it('should show selected continents as checked', () => {
    render(
      <ContinentFilter
        selectedContinents={['Asia', 'Europe']}
        onChange={mockOnChange}
      />,
    )

    const asiaCheckbox = screen.getByLabelText('Filtrar por Ásia')
    const europeCheckbox = screen.getByLabelText('Filtrar por Europa')
    const africaCheckbox = screen.getByLabelText('Filtrar por África')

    expect(asiaCheckbox).toBeChecked()
    expect(europeCheckbox).toBeChecked()
    expect(africaCheckbox).not.toBeChecked()
  })

  it('should handle multiple continent selections', async () => {
    const user = userEvent.setup()
    render(
      <ContinentFilter
        selectedContinents={['Africa']}
        onChange={mockOnChange}
      />,
    )

    const europeCheckbox = screen.getByLabelText('Filtrar por Europa')
    await user.click(europeCheckbox)

    expect(mockOnChange).toHaveBeenCalledWith(['Africa', 'Europe'])
  })
})
