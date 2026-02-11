import { SearchableSelect } from '@/components/molecules/SearchableSelect'

interface LanguageFilterProps {
  languages: string[]
  selectedLanguage: string
  onChange: (_language: string) => void
}

export const LanguageFilter = ({
  languages,
  selectedLanguage,
  onChange,
}: LanguageFilterProps) => {
  const options = languages.map((language) => ({
    value: language,
    label: language,
  }))

  return (
    <div className="min-w-0">
      <h3 className="text-xs font-medium text-gray-700 mb-3">Idioma</h3>
      <SearchableSelect
        options={options}
        value={selectedLanguage}
        onChange={onChange}
        placeholder="Todos"
        emptyMessage="Nenhum idioma encontrado"
      />
    </div>
  )
}
