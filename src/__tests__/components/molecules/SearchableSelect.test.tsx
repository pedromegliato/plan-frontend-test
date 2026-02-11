import { SearchableSelect } from '@/components/molecules/SearchableSelect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


const mockOptions = [
  { value: '', label: 'Selecione um idioma' },
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
]

describe('SearchableSelect', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default empty value showing first option label', () => {
    render(
      <SearchableSelect
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        placeholder="Selecione..."
      />,
    )

    expect(screen.getByText('Selecione um idioma')).toBeInTheDocument()
  })

  it('should render with label when provided', () => {
    render(
      <SearchableSelect
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        label="Idioma"
      />,
    )

    expect(screen.getByText('Idioma')).toBeInTheDocument()
  })

  it('should display selected value', () => {
    render(
      <SearchableSelect
        options={mockOptions}
        value="pt"
        onChange={mockOnChange}
        placeholder="Selecione..."
      />,
    )

    expect(screen.getByText('Português')).toBeInTheDocument()
  })

  it('should call onChange when option is selected', async () => {
    const user = userEvent.setup()
    render(
      <SearchableSelect
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        placeholder="Selecione..."
      />,
    )

    const selectContainer = screen.getByText('Selecione um idioma')
    await user.click(selectContainer)

    const portuguesOption = await screen.findByText('Português')
    await user.click(portuguesOption)

    expect(mockOnChange).toHaveBeenCalledWith('pt')
  })

  it('should open menu when clicked', async () => {
    const user = userEvent.setup()
    render(
      <SearchableSelect
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        placeholder="Selecione..."
      />,
    )

    const selectContainer = screen.getByText('Selecione um idioma')
    await user.click(selectContainer)

    expect(await screen.findByText('Inglês')).toBeInTheDocument()
    expect(await screen.findByText('Espanhol')).toBeInTheDocument()
    expect(await screen.findByText('Francês')).toBeInTheDocument()
  })

  it('should have max width of 420px', () => {
    const { container } = render(
      <SearchableSelect
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />,
    )

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('max-w-[420px]')
  })
})
