import { useCallback, useState } from 'react'
import type { Country } from '../types'
import {
  searchCountriesByName,
  getCountriesByCapital,
  getCountriesByRegion,
  getCountriesByCurrency,
  getCountriesByLanguage,
  getAllCountries,
} from '../api/countries'

interface UseCountriesReturn {
  countries: Country[]
  loading: boolean
  error: string | null
  searchCountries: (query: string, type: 'name' | 'capital' | 'region' | 'currency' | 'language') => Promise<void>
  getAll: () => Promise<void>
  reset: () => void
}

export function useCountries(): UseCountriesReturn {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchCountries = useCallback(async (
    query: string,
    type: 'name' | 'capital' | 'region' | 'currency' | 'language'
  ) => {
    if (!query.trim()) {
      setCountries([])
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      let results: Country[] = []

      switch (type) {
        case 'name':
          results = await searchCountriesByName(query)
          break
        case 'capital':
          results = await getCountriesByCapital(query)
          break
        case 'region':
          results = await getCountriesByRegion(query)
          break
        case 'currency':
          results = await getCountriesByCurrency(query)
          break
        case 'language':
          results = await getCountriesByLanguage(query)
          break
      }

      setCountries(results)
      if (results.length === 0) {
        setError('No countries found')
      }
    } catch {
      setError('Failed to fetch countries')
      setCountries([])
    } finally {
      setLoading(false)
    }
  }, [])

  const getAll = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const results = await getAllCountries()
      setCountries(results)
    } catch {
      setError('Failed to fetch countries')
      setCountries([])
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setCountries([])
    setError(null)
  }, [])

  return { countries, loading, error, searchCountries, getAll, reset }
}
