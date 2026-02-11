import { SearchBar } from '@/components/molecules/SearchBar'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('SearchBar', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render input field', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    expect(input).toBeInTheDocument()
  })

  it('should display current value', () => {
    render(<SearchBar value="Brasil" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    expect(input).toHaveValue('Brasil')
  })

  it('should call onChange when typing', async () => {
    const user = userEvent.setup()
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    await user.type(input, 'A')

    expect(mockOnChange).toHaveBeenCalledWith('A')
  })

  it('should render with default placeholder', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    expect(
      screen.getByPlaceholderText('Informe o país que deseja conhecer...'),
    ).toBeInTheDocument()
  })

  it('should render with custom placeholder', () => {
    render(
      <SearchBar value="" onChange={mockOnChange} placeholder="Digite o país..." />,
    )

    expect(screen.getByPlaceholderText('Digite o país...')).toBeInTheDocument()
  })

  it('should render search icon', () => {
    const { container } = render(<SearchBar value="" onChange={mockOnChange} />)

    const searchIcon = container.querySelector('svg')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should have search icon with pointer-events-none', () => {
    const { container } = render(<SearchBar value="" onChange={mockOnChange} />)

    const searchIcon = container.querySelector('.pointer-events-none')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should allow clearing the input', async () => {
    const user = userEvent.setup()
    render(<SearchBar value="Brasil" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    await user.clear(input)

    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('should have correct max width', () => {
    const { container } = render(<SearchBar value="" onChange={mockOnChange} />)

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('max-w-[420px]')
  })

  it('should have responsive height classes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    expect(input).toHaveClass('h-12', 'sm:h-[50px]')
  })

  it('should have transparent background', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    expect(input).toHaveClass('bg-transparent')
  })

  it('should be accessible', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Search countries')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('aria-label', 'Search countries')
  })
})
