import React from 'react'

import { ContinentIcon } from '@/components/atoms/ContinentIcon'
import { render, screen } from '@testing-library/react'

describe('ContinentIcon', () => {
  it('should render icon for northern america subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Americas" subregion="Northern America" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for central america subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Americas" subregion="Central America" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for caribbean subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Americas" subregion="Caribbean" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for south america subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Americas" subregion="South America" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for polynesia subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Oceania" subregion="Polynesia" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for melanesia subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Oceania" subregion="Melanesia" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for micronesia subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Oceania" subregion="Micronesia" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for australia subregion', () => {
    const { container } = render(
      <ContinentIcon
        continent="Oceania"
        subregion="Australia and New Zealand"
      />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for africa subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Africa" subregion="Eastern Africa" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for asia subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Asia" subregion="Eastern Asia" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for europe subregion', () => {
    const { container } = render(
      <ContinentIcon continent="Europe" subregion="Western Europe" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should fall back to continent when subregion does not match', () => {
    const { container } = render(
      <ContinentIcon continent="Africa" subregion="Unknown Region" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render ? icon for unknown continent', () => {
    render(<ContinentIcon continent="Unknown Continent" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('should apply className to wrapper div', () => {
    const { container } = render(
      <ContinentIcon continent="Africa" className="test-class" />,
    )
    expect(container.querySelector('.test-class')).toBeInTheDocument()
  })

  it('should handle continent with spaces', () => {
    const { container } = render(<ContinentIcon continent="North America" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render icon for americas', () => {
    const { container } = render(<ContinentIcon continent="Americas" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render africa icon', () => {
    const { container } = render(<ContinentIcon continent="Africa" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render asia icon', () => {
    const { container } = render(<ContinentIcon continent="Asia" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render europe icon', () => {
    const { container } = render(<ContinentIcon continent="Europe" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render oceania icon', () => {
    const { container } = render(<ContinentIcon continent="Oceania" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render central america icon', () => {
    const { container } = render(
      <ContinentIcon continent="Central America" />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should render south america icon', () => {
    const { container } = render(<ContinentIcon continent="South America" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('?')).not.toBeInTheDocument()
  })

  it('should handle empty continent string', () => {
    render(<ContinentIcon continent="" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('should apply className to fallback svg', () => {
    const { container } = render(
      <ContinentIcon continent="Unknown" className="fallback-class" />,
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('fallback-class')
  })
})
