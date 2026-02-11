import React from 'react'

import { FilterBar } from '@/components/organisms/FilterBar'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


jest.mock('@/components/molecules/FilterDrawer', () => ({
  FilterDrawer: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div data-testid="filter-drawer">{children}</div> : null,
}))

const mockProps = {
  searchTerm: '',
  selectedContinents: [],
  selectedLanguage: '',
  availableLanguages: ['Português', 'Inglês', 'Espanhol', 'Francês'],
  onSearchChange: jest.fn(),
  onContinentsChange: jest.fn(),
  onLanguageChange: jest.fn(),
  onClearFilters: jest.fn(),
}

describe('FilterBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render logo', () => {
    render(<FilterBar {...mockProps} />)

    expect(screen.getByAltText('Plan International')).toBeInTheDocument()
  })

  it('should render mobile filter button', () => {
    render(<FilterBar {...mockProps} />)

    const buttons = screen.getAllByRole('button', { name: /filtros/i })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should show active filters count on mobile button', () => {
    render(
      <FilterBar
        {...mockProps}
        searchTerm="Brasil"
        selectedContinents={['Americas', 'Europe']}
        selectedLanguage="Português"
      />,
    )

    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('should open drawer when mobile filter button is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterBar {...mockProps} />)

    const mobileButtons = screen.getAllByRole('button', { name: /filtros/i })
    await user.click(mobileButtons[0])

    expect(screen.getByTestId('filter-drawer')).toBeInTheDocument()
  })

  it('should render desktop SearchBar', () => {
    render(<FilterBar {...mockProps} searchTerm="Brasil" />)

    const searchInputs = screen.getAllByLabelText('Search countries')
    expect(searchInputs.length).toBeGreaterThan(0)
  })

  it('should render all continent checkboxes', () => {
    render(<FilterBar {...mockProps} />)

    expect(screen.getByText('África')).toBeInTheDocument()
    expect(screen.getByText('Ásia')).toBeInTheDocument()
    expect(screen.getByText('Europa')).toBeInTheDocument()
    expect(screen.getByText('Oceania')).toBeInTheDocument()
  })

  it('should call onContinentsChange when continent checkbox is toggled', async () => {
    const user = userEvent.setup()
    render(<FilterBar {...mockProps} />)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    expect(mockProps.onContinentsChange).toHaveBeenCalled()
  })

  it('should disable clear filters button when no active filters', () => {
    render(<FilterBar {...mockProps} />)

    const clearButton = screen.getByRole('button', { name: /limpar filtros/i })
    expect(clearButton).toBeDisabled()
  })

  it('should enable clear filters button when filters are active', () => {
    render(<FilterBar {...mockProps} searchTerm="Brasil" />)

    const clearButton = screen.getByRole('button', { name: /limpar filtros/i })
    expect(clearButton).not.toBeDisabled()
  })

  it('should call onClearFilters when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterBar {...mockProps} searchTerm="Brasil" />)

    const clearButton = screen.getByRole('button', { name: /limpar filtros/i })
    await user.click(clearButton)

    expect(mockProps.onClearFilters).toHaveBeenCalled()
  })

  it('should calculate active filters count correctly', () => {
    render(
      <FilterBar
        {...mockProps}
        searchTerm="Brasil"
        selectedContinents={['Americas']}
        selectedLanguage="Português"
      />,
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
