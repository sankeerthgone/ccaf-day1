import { useState } from 'react'
import { ArrowLeftRight, X } from 'lucide-react'
import Search from './Search'
import type { Country } from '../types'
import { formatNumber, getCountryName } from '../utils/formatters'

interface CompareViewProps {
  onCountriesSelect: (country: Country) => void
}

export default function CompareView({ onCountriesSelect }: CompareViewProps) {
  const [country1, setCountry1] = useState<Country | null>(null)
  const [country2, setCountry2] = useState<Country | null>(null)

  const handleCountrySelect = (country: Country) => {
    if (!country1) {
      setCountry1(country)
    } else if (!country2 && country.cca3 !== country1.cca3) {
      setCountry2(country)
    }
  }

  const swap = () => {
    const temp = country1
    setCountry1(country2)
    setCountry2(temp)
  }

  const clear = () => {
    setCountry1(null)
    setCountry2(null)
  }

  return (
    <div className="space-y-8">
      <Search onCountrySelect={handleCountrySelect} />

      {(country1 || country2) && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={swap}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <ArrowLeftRight className="w-5 h-5" />
              Swap
            </button>
            <button
              onClick={clear}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <X className="w-5 h-5" />
              Clear
            </button>
          </div>

          {country1 && country2 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Country 1 */}
              <ComparisonCard
                country={country1}
                onRemove={() => setCountry1(null)}
                onClick={() => onCountriesSelect(country1)}
              />

              {/* Country 2 */}
              <ComparisonCard
                country={country2}
                onRemove={() => setCountry2(null)}
                onClick={() => onCountriesSelect(country2)}
              />
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 text-center text-slate-500 dark:text-slate-400">
              {country1 ? 'Select a second country to compare' : 'Select a country to compare'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface ComparisonCardProps {
  country: Country
  onRemove: () => void
  onClick: () => void
}

function ComparisonCard({ country, onRemove, onClick }: ComparisonCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div onClick={onClick}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-5xl">{country.flag}</span>
            <button
              onClick={e => {
                e.stopPropagation()
                onRemove()
              }}
              className="p-2 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h3 className="text-2xl font-bold">{getCountryName(country)}</h3>
        </div>

        <div className="p-6 space-y-4">
          <ComparisonItem label="Capital" value={country.capital?.[0] || 'N/A'} />
          <ComparisonItem label="Region" value={country.region} />
          <ComparisonItem label="Subregion" value={country.subregion || 'N/A'} />
          <ComparisonItem label="Area" value={`${formatNumber(country.area)} km²`} />
          <ComparisonItem
            label="Population"
            value={formatNumber(country.population)}
          />
          <ComparisonItem
            label="Density"
            value={`${formatNumber(Math.round(country.population / country.area))} /km²`}
          />
          <ComparisonItem
            label="Time Zones"
            value={country.timezones.length.toString()}
          />
          <ComparisonItem
            label="Languages"
            value={(country.languages ? Object.keys(country.languages).length : 0).toString()}
          />
          <ComparisonItem
            label="Borders"
            value={(country.borders?.length || 0).toString()}
          />
          <ComparisonItem
            label="Landlocked"
            value={country.landlocked ? 'Yes' : 'No'}
          />
        </div>
      </div>
    </div>
  )
}

interface ComparisonItemProps {
  label: string
  value: string
}

function ComparisonItem({ label, value }: ComparisonItemProps) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0">
      <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
