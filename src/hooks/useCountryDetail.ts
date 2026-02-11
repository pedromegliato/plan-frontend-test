import { useEffect, useState } from 'react'

import { Country } from '@/@types'
import { CountryService } from '@/services'

const countryService = new CountryService()

export const useCountryDetail = (code: string) => {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true)
        const data = await countryService.getCountryByCode(code)
        setCountry(data)
      } catch {
        setError('Não foi possível carregar as informações do país')
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      fetchCountry()
    }
  }, [code])

  return { country, loading, error }
}
