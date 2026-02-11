import { ReactNode, useEffect, useState } from 'react'

import { X, SlidersHorizontal } from 'lucide-react'

import { UI_TEXT } from '@/constants/uiText'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  onApply: () => void
  onClear: () => void
  hasActiveFilters: boolean
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  children,
  onApply,
  onClear,
  hasActiveFilters,
}: FilterDrawerProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen && !isAnimating) return null

  const handleApply = () => {
    onApply()
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onTransitionEnd={() => {
        if (!isOpen) setIsAnimating(false)
      }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500
                    rounded-b-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col
                    transform transition-transform duration-300 ease-out ${
    isOpen ? 'translate-y-0' : '-translate-y-full'
    }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-white/30">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="w-5 h-5 text-white"
              strokeWidth={2.5}
            />
            <h2 className="text-lg font-black italic text-white font-exo">
              {UI_TEXT.common.filters}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20 active:bg-white/30 transition-all duration-200 cursor-pointer"
            aria-label={UI_TEXT.aria.closeFilters}
          >
            <X className="w-6 h-6 text-white" strokeWidth={2.5} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5">{children}</div>

        <div className="flex gap-3 p-4 border-t-2 border-white/30 bg-black/10">
          <button
            onClick={onClear}
            disabled={!hasActiveFilters}
            className="flex-1 cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed
                       bg-white/20 backdrop-blur rounded-2xl border-2 border-white
                       text-white font-black italic
                       py-3 px-4 text-sm font-exo"
          >
            {UI_TEXT.filters.clearFilters}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95
                       bg-[#F58220] rounded-2xl border-none
                       text-white font-black italic
                       py-3 px-4 text-sm shadow-lg font-exo"
          >
            {UI_TEXT.filters.applyFilters}
          </button>
        </div>
      </div>
    </div>
  )
}
