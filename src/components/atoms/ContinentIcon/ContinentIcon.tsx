import { ReactNode } from 'react'

import { AfricaIcon } from './AfricaIcon'
import { AsiaIcon } from './AsiaIcon'
import { CentralAmericaIcon } from './CentralAmericaIcon'
import { EuropeIcon } from './EuropeIcon'
import { NorthAmericaIcon } from './NorthAmericaIcon'
import { OceaniaIcon } from './OceaniaIcon'
import { SouthAmericaIcon } from './SouthAmericaIcon'

interface ContinentIconProps {
  continent: string
  subregion?: string
  className?: string
}

const getIconBySubregion = (subregion: string): ReactNode | null => {
  const normalizedSubregion = subregion.toLowerCase()

  if (normalizedSubregion.includes('northern')) {
    return <NorthAmericaIcon />
  }
  if (
    normalizedSubregion.includes('central') ||
    normalizedSubregion.includes('caribbean')
  ) {
    return <CentralAmericaIcon />
  }
  if (normalizedSubregion.includes('south')) {
    return <SouthAmericaIcon />
  }

  if (normalizedSubregion.includes('africa')) {
    return <AfricaIcon />
  }

  if (normalizedSubregion.includes('asia')) {
    return <AsiaIcon />
  }

  if (normalizedSubregion.includes('europe')) {
    return <EuropeIcon />
  }

  if (
    normalizedSubregion.includes('oceania') ||
    normalizedSubregion.includes('polynesia') ||
    normalizedSubregion.includes('melanesia') ||
    normalizedSubregion.includes('micronesia') ||
    normalizedSubregion.includes('australia')
  ) {
    return <OceaniaIcon />
  }

  return null
}

export const ContinentIcon = ({
  continent,
  subregion,
  className = '',
}: ContinentIconProps) => {
  if (subregion) {
    const iconBySubregion = getIconBySubregion(subregion)
    if (iconBySubregion) {
      return <div className={className}>{iconBySubregion}</div>
    }
  }

  const normalizedContinentKey = continent.toLowerCase().replace(/\s+/g, '_')

  const iconMap: Record<string, ReactNode> = {
    africa: <AfricaIcon />,
    north_america: <NorthAmericaIcon />,
    central_america: <CentralAmericaIcon />,
    south_america: <SouthAmericaIcon />,
    americas: <NorthAmericaIcon />,
    asia: <AsiaIcon />,
    europe: <EuropeIcon />,
    oceania: <OceaniaIcon />,
  }

  const icon = iconMap[normalizedContinentKey]

  if (!icon) {
    return (
      <svg width="35" height="35" viewBox="0 0 100 100" className={className}>
        <text
          x="50"
          y="50"
          fontSize="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
        >
          ?
        </text>
      </svg>
    )
  }

  return <div className={className}>{icon}</div>
}
