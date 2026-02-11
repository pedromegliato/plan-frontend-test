import { ContinentCheckbox } from '@/components/molecules/ContinentCheckbox'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('ContinentCheckbox', () => {
  const mockOnToggle = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render label text', () => {
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    expect(screen.getByText('África')).toBeInTheDocument()
  })

  it('should render checkbox input', () => {
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('should be checked when isChecked is true', () => {
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={true}
        onToggle={mockOnToggle}
      />,
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should be unchecked when isChecked is false', () => {
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should call onToggle with value when clicked', async () => {
    const user = userEvent.setup()
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    await user.click(screen.getByRole('checkbox'))

    expect(mockOnToggle).toHaveBeenCalledWith('Africa')
  })

  it('should call onToggle when label is clicked', async () => {
    const user = userEvent.setup()
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    await user.click(screen.getByText('África'))

    expect(mockOnToggle).toHaveBeenCalledWith('Africa')
  })

  it('should show check icon when checked', () => {
    const { container } = render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={true}
        onToggle={mockOnToggle}
      />,
    )

    const checkIcon = container.querySelector('.opacity-100.scale-100')
    expect(checkIcon).toBeInTheDocument()
  })

  it('should hide check icon when unchecked', () => {
    const { container } = render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    const checkIcon = container.querySelector('.opacity-0.scale-75')
    expect(checkIcon).toBeInTheDocument()
  })

  it('should have orange background when checked', () => {
    const { container } = render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={true}
        onToggle={mockOnToggle}
      />,
    )

    const customCheckbox = container.querySelector('.bg-orange')
    expect(customCheckbox).toBeInTheDocument()
  })

  it('should have transparent background when unchecked', () => {
    const { container } = render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    const customCheckbox = container.querySelector('.bg-transparent')
    expect(customCheckbox).toBeInTheDocument()
  })

  it('should have cursor pointer', () => {
    const { container } = render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    const label = container.querySelector('label')
    expect(label).toHaveClass('cursor-pointer')
  })

  it('should prevent text selection', () => {
    const { container } = render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    const label = container.querySelector('label')
    expect(label).toHaveClass('select-none')
  })

  it('should hide actual checkbox visually', () => {
    render(
      <ContinentCheckbox
        label="África"
        value="Africa"
        isChecked={false}
        onToggle={mockOnToggle}
      />,
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('sr-only')
  })
})
