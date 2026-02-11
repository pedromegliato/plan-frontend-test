import { Spinner } from '@/components/atoms/Spinner'
import { render, screen } from '@testing-library/react'


describe('Spinner', () => {
  it('should render with default medium size', () => {
    const { container } = render(<Spinner />)

    const spinner = container.querySelector('.w-8.h-8')
    expect(spinner).toBeInTheDocument()
  })

  it('should render with small size', () => {
    const { container } = render(<Spinner size="sm" />)

    const spinner = container.querySelector('.w-4.h-4')
    expect(spinner).toBeInTheDocument()
  })

  it('should render with medium size', () => {
    const { container } = render(<Spinner size="md" />)

    const spinner = container.querySelector('.w-8.h-8')
    expect(spinner).toBeInTheDocument()
  })

  it('should render with large size', () => {
    const { container } = render(<Spinner size="lg" />)

    const spinner = container.querySelector('.w-12.h-12')
    expect(spinner).toBeInTheDocument()
  })

  it('should have status role for accessibility', () => {
    render(<Spinner />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should have aria-label for accessibility', () => {
    const { container } = render(<Spinner />)

    const spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toBeInTheDocument()
  })

  it('should have sr-only text for screen readers', () => {
    render(<Spinner />)

    expect(screen.getByText('Loading...')).toHaveClass('sr-only')
  })

  it('should have spinning animation', () => {
    const { container } = render(<Spinner />)

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should be rounded', () => {
    const { container } = render(<Spinner />)

    const spinner = container.querySelector('.rounded-full')
    expect(spinner).toBeInTheDocument()
  })

  it('should have border styling', () => {
    const { container } = render(<Spinner />)

    const spinner = container.querySelector('.border-4.border-gray-200.border-t-blue-600')
    expect(spinner).toBeInTheDocument()
  })

  it('should be centered', () => {
    const { container } = render(<Spinner />)

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('flex', 'justify-center', 'items-center')
  })
})
