import { Pagination } from '@/components/molecules/Pagination'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


jest.mock('@/hooks', () => ({
  useMediaQuery: jest.fn(() => false),
}))

const mockProps = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: jest.fn(),
  onNext: jest.fn(),
  onPrev: jest.fn(),
}

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render when totalPages is 1 or less', () => {
    const { container } = render(<Pagination {...mockProps} totalPages={1} />)

    expect(container.firstChild).toBeNull()
  })

  it('should render previous button', () => {
    render(<Pagination {...mockProps} />)

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
  })

  it('should render next button', () => {
    render(<Pagination {...mockProps} />)

    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
  })

  it('should disable previous button on first page', () => {
    render(<Pagination {...mockProps} currentPage={1} />)

    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('should disable next button on last page', () => {
    render(<Pagination {...mockProps} currentPage={10} totalPages={10} />)

    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('should enable previous button when not on first page', () => {
    render(<Pagination {...mockProps} currentPage={5} />)

    expect(screen.getByLabelText('Previous page')).not.toBeDisabled()
  })

  it('should enable next button when not on last page', () => {
    render(<Pagination {...mockProps} currentPage={5} totalPages={10} />)

    expect(screen.getByLabelText('Next page')).not.toBeDisabled()
  })

  it('should call onPrev when previous button is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination {...mockProps} currentPage={5} />)

    await user.click(screen.getByLabelText('Previous page'))

    expect(mockProps.onPrev).toHaveBeenCalled()
  })

  it('should call onNext when next button is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination {...mockProps} currentPage={5} />)

    await user.click(screen.getByLabelText('Next page'))

    expect(mockProps.onNext).toHaveBeenCalled()
  })

  it('should render 7 page dots on desktop', () => {
    render(<Pagination {...mockProps} totalPages={10} />)

    const pageDots = screen.getAllByRole('button').filter((btn) =>
      btn.getAttribute('aria-label')?.startsWith('Page'),
    )

    expect(pageDots).toHaveLength(7)
  })

  it('should render 5 page dots on mobile', () => {
    const hooks = jest.requireMock('@/hooks')
    hooks.useMediaQuery.mockReturnValue(true)

    render(<Pagination {...mockProps} totalPages={10} />)

    const pageDots = screen.getAllByRole('button').filter((btn) =>
      btn.getAttribute('aria-label')?.startsWith('Page'),
    )

    expect(pageDots).toHaveLength(5)
  })

  it('should call onPageChange when clicking on a page dot', async () => {
    const user = userEvent.setup()
    render(<Pagination {...mockProps} />)

    await user.click(screen.getByLabelText('Page 3'))

    expect(mockProps.onPageChange).toHaveBeenCalledWith(3)
  })

  it('should highlight active page', () => {
    render(<Pagination {...mockProps} currentPage={3} />)

    const activePage = screen.getByLabelText('Page 3')
    expect(activePage).toHaveAttribute('aria-current', 'page')
  })

  it('should not highlight inactive pages', () => {
    render(<Pagination {...mockProps} currentPage={3} />)

    const inactivePage = screen.getByLabelText('Page 1')
    expect(inactivePage).not.toHaveAttribute('aria-current')
  })

  it('should render fewer dots when totalPages is less than maxDots', () => {
    render(<Pagination {...mockProps} totalPages={4} />)

    const pageDots = screen.getAllByRole('button').filter((btn) =>
      btn.getAttribute('aria-label')?.startsWith('Page'),
    )

    expect(pageDots).toHaveLength(4)
  })

  it('should have correct opacity for active dot', () => {
    const { container } = render(<Pagination {...mockProps} currentPage={1} />)

    const activeDot = container.querySelector('.opacity-100')
    expect(activeDot).toBeInTheDocument()
  })

  it('should have correct opacity for inactive dots', () => {
    const { container } = render(<Pagination {...mockProps} currentPage={1} />)

    const inactiveDots = container.querySelectorAll('.opacity-50')
    expect(inactiveDots.length).toBeGreaterThan(0)
  })
})
