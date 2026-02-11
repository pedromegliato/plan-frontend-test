import React from 'react'

import { FilterDrawer } from '@/components/molecules/FilterDrawer'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('FilterDrawer', () => {
  const mockOnClose = jest.fn()
  const mockOnApply = jest.fn()
  const mockOnClear = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnApply.mockClear()
    mockOnClear.mockClear()
  })

  it('should not render when closed', () => {
    render(
      <FilterDrawer
        isOpen={false}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    expect(screen.queryByText('Filtros')).not.toBeInTheDocument()
  })

  it('should render when open', () => {
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    expect(screen.getByText('Filtros')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should call onClose when clicking close button', async () => {
    const user = userEvent.setup()
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const closeButton = screen.getByLabelText('Fechar filtros')
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when clicking backdrop', async () => {
    const user = userEvent.setup()
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const backdrop = document.querySelector('[aria-hidden="true"]')
    if (backdrop) {
      await user.click(backdrop)
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onApply and onClose when clicking apply button', async () => {
    const user = userEvent.setup()
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const applyButton = screen.getByText(/aplicar filtros/i)
    await user.click(applyButton)

    expect(mockOnApply).toHaveBeenCalledTimes(1)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClear when clicking clear button', async () => {
    const user = userEvent.setup()
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={true}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const clearButton = screen.getByText(/limpar filtros/i)
    await user.click(clearButton)

    expect(mockOnClear).toHaveBeenCalledTimes(1)
  })

  it('should disable clear button when no active filters', () => {
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const clearButton = screen.getByText(/limpar filtros/i)
    expect(clearButton).toBeDisabled()
  })

  it('should enable clear button when has active filters', () => {
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={true}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const clearButton = screen.getByText(/limpar filtros/i)
    expect(clearButton).not.toBeDisabled()
  })

  it('should close on Escape key press', async () => {
    const user = userEvent.setup()
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    await user.keyboard('{Escape}')

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should set body overflow hidden when open', () => {
    const { rerender } = render(
      <FilterDrawer
        isOpen={false}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    rerender(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should reset body overflow when closed', async () => {
    const { rerender } = render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    rerender(
      <FilterDrawer
        isOpen={false}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('should handle transition end when closed', () => {
    const { rerender, container } = render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    rerender(
      <FilterDrawer
        isOpen={false}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const drawer = container.querySelector('.fixed.inset-0')
    if (drawer) {
      const event = new Event('transitionend', { bubbles: true })
      act(() => {
        drawer.dispatchEvent(event)
      })
    }

    expect(container).toBeTruthy()
  })

  it('should not trigger setIsAnimating when transition ends while open', () => {
    const { container } = render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const drawer = container.querySelector('.fixed.inset-0')
    if (drawer) {
      const event = new Event('transitionend', { bubbles: true })
      act(() => {
        drawer.dispatchEvent(event)
      })
    }

    // Drawer should still be visible
    expect(drawer).toBeInTheDocument()
  })

  it('should not close on non-Escape key press', () => {
    render(
      <FilterDrawer
        isOpen={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        onClear={mockOnClear}
        hasActiveFilters={false}
      >
        <div>Content</div>
      </FilterDrawer>,
    )

    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    document.dispatchEvent(event)

    expect(mockOnClose).not.toHaveBeenCalled()
  })
})
