import { ChangeEvent } from 'react'

import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (_value: string) => void
  placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Informe o país que deseja conhecer...',
}: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className="relative w-full max-w-[420px]">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search countries"
        className="w-full h-12 sm:h-[50px]
                   px-4 sm:px-5 pr-12
                   rounded-2xl sm:rounded-[25px]
                   border-2 sm:border-[3px] border-white
                   text-black text-base sm:text-lg
                   italic font-semibold
                   outline-none bg-transparent
                   placeholder:text-[#000] placeholder:italic placeholder:font-semibold"
      />
      <Search
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none
                   w-5 h-5 text-white"
        strokeWidth={2}
        fill="none"
      />
    </div>
  )
}
