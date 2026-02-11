import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useMediaQuery } from '@/hooks'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (_page: number) => void
  onNext: () => void
  onPrev: () => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
}: PaginationProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (totalPages <= 1) {
    return null
  }

  const maxDots = isMobile ? Math.min(5, totalPages) : Math.min(7, totalPages)

  return (
    <div className="flex items-center justify-center gap-5">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center justify-center rounded-full border-2 border-white
                   cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed
                   transition-all duration-200 hover:bg-white/10 active:scale-95
                   w-[50px] h-[50px]"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
      </button>

      <div className="flex items-center gap-[10px]">
        {Array.from({ length: maxDots }).map((_, index) => {
          const pageNumber = index + 1
          const isActive = pageNumber === currentPage

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className="transition-all duration-200 cursor-pointer hover:scale-110"
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`bg-white rounded-full transition-opacity duration-200 w-[15px] h-[15px] ${isActive ? 'opacity-100' : 'opacity-50'}`}
              />
            </button>
          )
        })}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center rounded-full border-2 border-white
                   cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed
                   transition-all duration-200 hover:bg-white/10 active:scale-95
                   w-[50px] h-[50px]"
        aria-label="Next page"
      >
        <ChevronRight className="w-6 h-6 text-white" strokeWidth={2.5} />
      </button>
    </div>
  )
}
