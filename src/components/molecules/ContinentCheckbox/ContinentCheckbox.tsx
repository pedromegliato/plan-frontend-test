import { Check } from 'lucide-react'

interface ContinentCheckboxProps {
  label: string
  value: string
  isChecked: boolean
  onToggle: (_value: string) => void
}

export const ContinentCheckbox = ({
  label,
  value,
  isChecked,
  onToggle,
}: ContinentCheckboxProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(value)}
        className="sr-only"
      />
      <div
        className={`relative flex items-center justify-center transition-all duration-200 w-[25px] h-[25px] rounded-[10px] border-[3px] border-white ${isChecked ? 'bg-orange' : 'bg-transparent'}`}
      >
        <Check
          className={`w-4 h-4 text-white transition-all duration-200 ${
            isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          strokeWidth={3}
        />
      </div>
      <span className="transition-colors italic text-black text-[15px] font-bold leading-normal">
        {label}
      </span>
    </label>
  )
}
