import { useEffect, useState } from 'react'
import { Heart, Trash2, LoaderCircle } from 'lucide-react'
import { getCountryByCode } from '../api/countries'
import type { Country } from '../types'
import { useFavorites } from '../hooks/useFavorites'
import { getCountryName, formatNumber } from '../utils/formatters'

interface FavoritesViewProps {
  favoritesCodes: string[]
  onCountrySelect: (country: Country) => void
}

export default function FavoritesView({
  favoritesCodes,
  onCountrySelect,
}: FavoritesViewProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const { removeFavorite } = useFavorites()

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true)
      const loaded: Country[] = []

      for (const code of favoritesCodes) {
        try {
          const country = await getCountryByCode(code)
          if (country) {
            loaded.push(country)
          }
        } catch (error) {
          console.error(`Failed to load country ${code}:`, error)
        }
      }

      setCountries(loaded)
      setLoading(false)
    }

    loadFavorites()
  }, [favoritesCodes])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoaderCircle className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (countries.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-16 text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
        <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Search for countries and click the heart icon to save them
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        Your Favorite Countries ({countries.length})
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map(country => (
          <FavoriteCard
            key={country.cca3}
            country={country}
            onSelect={onCountrySelect}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  )
}

interface FavoriteCardProps {
  country: Country
  onSelect: (country: Country) => void
  onRemove: (code: string) => void
}

function FavoriteCard({ country, onSelect, onRemove }: FavoriteCardProps) {
  return (
    <div
      onClick={() => onSelect(country)}
      className="bg-white dark:bg-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={e => {
              e.stopPropagation()
              onRemove(country.cca3)
            }}
            className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            title="Remove from favorites"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="text-5xl mb-3">{country.flag}</div>
        <h3 className="text-xl font-bold">{getCountryName(country)}</h3>
        {country.capital && (
          <p className="text-sm opacity-90 mt-1">Capital: {country.capital[0]}</p>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600 dark:text-slate-400">Region</span>
          <span className="font-semibold">{country.region}</span>
        </div>

        <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="text-slate-600 dark:text-slate-400">Subregion</span>
          <span className="font-semibold">{country.subregion || 'N/A'}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600 dark:text-slate-400">Population</span>
          <span className="font-semibold">{formatNumber(country.population)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600 dark:text-slate-400">Area</span>
          <span className="font-semibold">{formatNumber(country.area)} km²</span>
        </div>
      </div>
    </div>
  )
}
