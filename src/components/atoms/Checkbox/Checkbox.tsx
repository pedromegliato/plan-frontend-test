import { InputHTMLAttributes, forwardRef } from 'react'

import { Check } from 'lucide-react'

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', checked, ...props }, ref) => {
    return (
      <label className="flex items-center cursor-pointer group select-none py-1.5">
        <div className="relative flex items-center justify-center flex-shrink-0">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-all duration-200 ${
              checked
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white border-gray-300 group-hover:border-gray-400'
            } ${className}`}
          >
            <Check
              className={`w-3.5 h-3.5 text-white transition-all duration-200 ${
                checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              strokeWidth={3}
            />
          </div>
        </div>
        <span className="ml-2.5 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150 select-none">
          {label}
        </span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
