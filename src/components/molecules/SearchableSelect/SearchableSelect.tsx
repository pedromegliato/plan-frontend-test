import Select, {
  components,
  StylesConfig,
  DropdownIndicatorProps,
} from 'react-select'

interface SearchableSelectOption {
  value: string
  label: string
}

interface SearchableSelectProps {
  options: SearchableSelectOption[]
  value: string
  onChange: (_value: string) => void
  placeholder?: string
  emptyMessage?: string
  label?: string
}

const DropdownIndicator = (
  props: DropdownIndicatorProps<SearchableSelectOption, false>,
) => {
  const isOpen = props.selectProps.menuIsOpen
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      >
        <path
          d="M11.5166 6.49902C11.2536 6.51186 10.9918 6.42617 10.7871 6.25488L10.7861 6.25586L6.5 2.80176L2.21387 6.25586L2.21387 6.25488C2.00861 6.42696 1.74576 6.51151 1.4834 6.49902C1.21366 6.48614 0.954163 6.37124 0.766602 6.1709C0.576393 5.96783 0.477984 5.69322 0.503906 5.41211L0.503906 5.41113C0.529922 5.13543 0.67274 4.89122 0.884766 4.72558L5.83496 0.733398L5.83594 0.734374C6.00194 0.599873 6.20434 0.52085 6.41406 0.503906C6.68159 0.482442 6.95241 0.561888 7.16504 0.734375L12.1162 4.72461L12.1152 4.72559C12.3275 4.89126 12.4705 5.13578 12.4961 5.41211C12.522 5.69352 12.423 5.96703 12.2334 6.16992C12.0452 6.37119 11.7853 6.48582 11.5166 6.49902Z"
          fill="white"
          stroke="white"
        />
      </svg>
    </components.DropdownIndicator>
  )
}

export const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  emptyMessage = 'Nenhum resultado',
  label,
}: SearchableSelectProps) => {
  const selectedOption = options.find((opt) => opt.value === value) || null

  const handleChange = (option: SearchableSelectOption | null) => {
    onChange(option ? option.value : '')
  }

  const instanceId = label
    ? `select-${label.toLowerCase().replace(/\s+/g, '-')}`
    : 'select'

  const customStyles: StylesConfig<SearchableSelectOption, false> = {
    control: (base) => ({
      ...base,
      width: '100%',
      height: '48px',
      minHeight: '48px',
      borderRadius: '24px',
      border: '2px solid #FFF',
      background: 'transparent',
      color: '#000',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 600,
      boxShadow: 'none',
      cursor: 'pointer',
      paddingLeft: '12px',
      paddingRight: '12px',
      '@media (min-width: 640px)': {
        height: '50px',
        minHeight: '50px',
        borderRadius: '50px',
        border: '3px solid #FFF',
        fontSize: '18px',
      },
      '&:hover': {
        border: '2px solid #FFF',
        '@media (min-width: 640px)': {
          border: '3px solid #FFF',
        },
      },
    }),
    menu: (base) => ({
      ...base,
      width: '100%',
      borderRadius: '20px',
      border: '2px solid #FFF',
      background: '#F58220',
      boxShadow: 'none',
      marginTop: '8px',
      overflow: 'hidden',
      '@media (min-width: 640px)': {
        borderRadius: '25px',
        border: '3px solid #FFF',
      },
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '300px',
      padding: '12px',
      paddingRight: '12px',
      '@media (min-width: 640px)': {
        maxHeight: '369px',
        padding: '16px',
        paddingRight: '16px',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        '@media (min-width: 640px)': {
          width: '11px',
        },
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
        marginTop: '12px',
        marginBottom: '12px',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#FFF',
        borderRadius: '20px',
        minHeight: '50px',
      },
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      color: '#FFF',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 600,
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '10px 12px',
      '@media (min-width: 640px)': {
        fontSize: '18px',
        padding: '12px 16px',
      },
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      },
      '&:active': {
        background: 'rgba(255, 255, 255, 0.2)',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#000',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 600,
      '@media (min-width: 640px)': {
        fontSize: '18px',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#000',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 600,
      '@media (min-width: 640px)': {
        fontSize: '18px',
      },
    }),
    input: (base) => ({
      ...base,
      color: '#000',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 600,
      '@media (min-width: 640px)': {
        fontSize: '18px',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: '8px',
      color: '#FFF',
    }),
    clearIndicator: () => ({
      display: 'none',
    }),
  }

  return (
    <div className="w-full max-w-[420px]">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select
        instanceId={instanceId}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        noOptionsMessage={() => emptyMessage}
        isClearable={false}
        isSearchable
        styles={customStyles}
        components={{ DropdownIndicator }}
        menuPlacement="auto"
      />
    </div>
  )
}
