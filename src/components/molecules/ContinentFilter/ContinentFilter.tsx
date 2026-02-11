import { Checkbox } from '@/components/atoms/Checkbox'

interface ContinentFilterProps {
  selectedContinents: string[]
  onChange: (_continents: string[]) => void
}

const CONTINENTS = [
  { value: 'Africa', label: 'África' },
  { value: 'North America', label: 'América do Norte' },
  { value: 'Central America', label: 'América Central' },
  { value: 'South America', label: 'América do Sul' },
  { value: 'Asia', label: 'Ásia' },
  { value: 'Europe', label: 'Europa' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Antarctic', label: 'Antártica' },
]

export const ContinentFilter = ({
  selectedContinents,
  onChange,
}: ContinentFilterProps) => {
  const handleContinentToggle = (continent: string) => {
    const isSelected = selectedContinents.includes(continent)
    const newSelection = isSelected
      ? selectedContinents.filter((c) => c !== continent)
      : [...selectedContinents, continent]
    onChange(newSelection)
  }

  return (
    <div className="min-w-0">
      <h3 className="text-xs font-medium text-gray-700 mb-3">Continentes</h3>
      <div className="space-y-0.5 min-w-0">
        {CONTINENTS.map((continent) => (
          <Checkbox
            key={continent.value}
            label={continent.label}
            checked={selectedContinents.includes(continent.value)}
            onChange={() => handleContinentToggle(continent.value)}
            aria-label={`Filtrar por ${continent.label}`}
          />
        ))}
      </div>
    </div>
  )
}
