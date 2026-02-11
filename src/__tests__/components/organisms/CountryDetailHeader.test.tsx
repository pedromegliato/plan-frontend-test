import { CountryDetailHeader } from '@/components/organisms/CountryDetailHeader'
import { render, screen } from '@testing-library/react'


describe('CountryDetailHeader', () => {
  it('should render continent display name', () => {
    render(
      <CountryDetailHeader
        continentDisplayName="América do Sul"
        continent="Americas"
        subregion="South America"
      />,
    )

    expect(screen.getByText('América do Sul')).toBeInTheDocument()
  })

  it('should render ContinentIcon with correct props', () => {
    const { container } = render(
      <CountryDetailHeader
        continentDisplayName="Europa"
        continent="Europe"
      />,
    )

    const iconContainer = container.querySelector('.opacity-40')
    expect(iconContainer).toBeInTheDocument()
  })

  it('should render with correct styles', () => {
    const { container } = render(
      <CountryDetailHeader
        continentDisplayName="Ásia"
        continent="Asia"
      />,
    )

    const header = container.firstChild
    expect(header).toHaveClass('bg-dark-gray')
    expect(header).toHaveClass('h-[47px]')
    expect(header).toHaveClass('rounded-t-[20px]')
  })

  it('should render without subregion', () => {
    render(
      <CountryDetailHeader
        continentDisplayName="África"
        continent="Africa"
      />,
    )

    expect(screen.getByText('África')).toBeInTheDocument()
  })
})
