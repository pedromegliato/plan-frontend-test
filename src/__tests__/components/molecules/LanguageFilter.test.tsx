import React from 'react'

import { LanguageFilter } from '@/components/molecules/LanguageFilter'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockUseMediaQuery = jest.fn()

jest.mock('@/hooks', () => ({
  useMediaQuery: () => mockUseMediaQuery(),
}))

describe('LanguageFilter', () => {
  const mockOnChange = jest.fn()
  const languages = ['English', 'Spanish', 'Portuguese', 'French']

  beforeEach(() => {
    mockOnChange.mockClear()
    mockUseMediaQuery.mockReturnValue(true)
  })

  it('should render language filter heading', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByText('Idioma')).toBeInTheDocument()
  })

  it('should render SearchableSelect with correct props', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByPlaceholderText('Todos')).toBeInTheDocument()
  })

  it('should pass language options to SearchableSelect', async () => {
    const user = userEvent.setup()
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    const select = screen.getByRole('combobox')
    await user.click(select)

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('Portuguese')).toBeInTheDocument()
    expect(screen.getByText('French')).toBeInTheDocument()
  })

  it('should show selected language', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage="Spanish"
        onChange={mockOnChange}
      />,
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('Spanish')
  })

  it('should call onChange when language is selected', async () => {
    const user = userEvent.setup()
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    const select = screen.getByRole('combobox')
    await user.click(select)

    const englishOption = screen.getByText('English')
    await user.click(englishOption)

    expect(mockOnChange).toHaveBeenCalledWith('English')
  })
})
