import React from 'react'

import { LanguageFilter } from '@/components/molecules/LanguageFilter'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/molecules/SearchableSelect', () => ({
  SearchableSelect: ({
    options,
    value,
    placeholder,
    emptyMessage,
  }: {
    options: { value: string; label: string }[]
    value: string
    placeholder: string
    emptyMessage: string
  }) => (
    <div>
      <input placeholder={placeholder} value={value} readOnly />
      <div data-testid="options">
        {options.map((opt) => (
          <div key={opt.value}>{opt.label}</div>
        ))}
      </div>
      <div>{emptyMessage}</div>
    </div>
  ),
}))

describe('LanguageFilter', () => {
  const mockOnChange = jest.fn()
  const languages = ['English', 'Spanish', 'Portuguese', 'French']

  beforeEach(() => {
    mockOnChange.mockClear()
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

  it('should render SearchableSelect with placeholder', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByPlaceholderText('Todos')).toBeInTheDocument()
  })

  it('should pass language options to SearchableSelect', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('Portuguese')).toBeInTheDocument()
    expect(screen.getByText('French')).toBeInTheDocument()
  })

  it('should show empty message', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByText('Nenhum idioma encontrado')).toBeInTheDocument()
  })

  it('should show selected language', () => {
    render(
      <LanguageFilter
        languages={languages}
        selectedLanguage="Spanish"
        onChange={mockOnChange}
      />,
    )

    const input = screen.getByPlaceholderText('Todos')
    expect(input).toHaveValue('Spanish')
  })

  it('should handle empty languages array', () => {
    render(
      <LanguageFilter
        languages={[]}
        selectedLanguage=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByText('Idioma')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Todos')).toBeInTheDocument()
  })
})
