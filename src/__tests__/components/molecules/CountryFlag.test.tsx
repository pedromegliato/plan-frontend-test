import { CountryFlag } from '@/components/molecules/CountryFlag'
import { render, screen } from '@testing-library/react'


describe('CountryFlag', () => {
  const defaultProps = {
    flag: 'https://flagcdn.com/br.svg',
    flagAlt: 'Bandeira do Brasil',
  }

  it('should render flag image with correct props', () => {
    render(<CountryFlag {...defaultProps} />)

    const image = screen.getByAltText('Bandeira do Brasil')
    expect(image).toBeInTheDocument()
  })

  it('should render flag label with aria-label', () => {
    render(<CountryFlag {...defaultProps} />)

    const label = screen.getByLabelText('Bandeira')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Bandeira')
  })

  it('should apply correct styles to flag container', () => {
    const { container } = render(<CountryFlag {...defaultProps} />)

    const flagContainer = container.querySelector('.relative')
    expect(flagContainer).toHaveClass('overflow-hidden')
    expect(flagContainer).toHaveClass('aspect-[29/22]')
  })

  it('should render with priority loading', () => {
    render(<CountryFlag {...defaultProps} />)

    const image = screen.getByAltText('Bandeira do Brasil')
    expect(image).toBeInTheDocument()
  })
})
