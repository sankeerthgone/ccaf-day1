import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useCountries } from '../hooks/useCountries'
import type { Country } from '../types'
import { getCountryName } from '../utils/formatters'

interface SearchProps {
  onCountrySelect: (country: Country) => void
}

type SearchType = 'name' | 'capital' | 'region' | 'currency' | 'language'

export default function Search({ onCountrySelect }: SearchProps) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('name')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { countries, loading, error, searchCountries, reset } = useCountries()

  useEffect(() => {
    if (query.trim()) {
      searchCountries(query, searchType)
      setShowSuggestions(true)
    } else {
      reset()
      setShowSuggestions(false)
    }
  }, [query, searchType, reset, searchCountries])

  const handleClear = () => {
    setQuery('')
    reset()
    setShowSuggestions(false)
  }

  const handleSelect = (country: Country) => {
    onCountrySelect(country)
    setQuery('')
    reset()
    setShowSuggestions(false)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Search Countries</h2>

        {/* Search Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['name', 'capital', 'region', 'currency', 'language'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setSearchType(type)
                setQuery('')
              }}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                searchType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-3">
            <SearchIcon className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg"
            />
            {query && (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {loading && (
                <div className="p-4 text-center text-slate-500">Loading...</div>
              )}

              {error && (
                <div className="p-4 text-center text-red-500">{error}</div>
              )}

              {!loading && !error && countries.length === 0 && (
                <div className="p-4 text-center text-slate-500">No countries found</div>
              )}

              {!loading &&
                countries.length > 0 &&
                countries.slice(0, 10).map(country => (
                  <button
                    key={country.cca3}
                    onClick={() => handleSelect(country)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-200 dark:border-slate-700 last:border-0 transition-colors flex items-center gap-3"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-semibold">{getCountryName(country)}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {country.capital?.[0] && `Capital: ${country.capital[0]}`}
                        {country.region && ` • ${country.region}`}
                      </div>
                    </div>
                  </button>
                ))}

              {countries.length > 10 && (
                <div className="p-3 text-center text-sm text-slate-500">
                  Showing 10 of {countries.length} results
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
