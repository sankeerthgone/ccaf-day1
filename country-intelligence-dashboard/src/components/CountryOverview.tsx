import { MapPin, Users, Maximize2, Globe as GlobeIcon } from 'lucide-react'
import type { Country } from '../types'
import { formatNumber } from '../utils/formatters'

interface CountryOverviewProps {
  country: Country
}

export default function CountryOverview({ country }: CountryOverviewProps) {
  const latlng = country.latlng

  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
      <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
        {/* Flag */}
        <div className="flex justify-center">
          <div className="text-9xl leading-none">{country.flag}</div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
              Official Name
            </h2>
            <p className="text-2xl font-bold mt-2">{country.name.official}</p>
          </div>

          {/* Capital */}
          {country.capital && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Capital
              </h3>
              <p className="text-2xl font-bold mt-2">{country.capital[0]}</p>
            </div>
          )}

          {/* Population */}
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-2" />
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Population
              </h3>
              <p className="text-2xl font-bold mt-2">{formatNumber(country.population)}</p>
            </div>
          </div>

          {/* Area */}
          <div className="flex items-start gap-3">
            <Maximize2 className="w-6 h-6 text-green-600 dark:text-green-400 mt-2" />
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Area
              </h3>
              <p className="text-2xl font-bold mt-2">{formatNumber(country.area)} km²</p>
            </div>
          </div>

          {/* Region */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
              Region
            </h3>
            <p className="text-2xl font-bold mt-2">{country.region}</p>
          </div>

          {/* Subregion */}
          {country.subregion && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Subregion
              </h3>
              <p className="text-2xl font-bold mt-2">{country.subregion}</p>
            </div>
          )}

          {/* Continent */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
              Continent
            </h3>
            <p className="text-2xl font-bold mt-2">{country.continents[0]}</p>
          </div>

          {/* Coordinates */}
          {latlng && (
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-red-600 dark:text-red-400 mt-2" />
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Coordinates
                </h3>
                <p className="text-xl font-bold mt-2">
                  {latlng[0].toFixed(2)}°, {latlng[1].toFixed(2)}°
                </p>
              </div>
            </div>
          )}

          {/* Timezone */}
          {country.timezones && (
            <div className="flex items-start gap-3">
              <GlobeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-2" />
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Timezone(s)
                </h3>
                <p className="text-lg font-semibold mt-2">{country.timezones.length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {country.timezones.slice(0, 2).join(', ')}
                  {country.timezones.length > 2 ? '...' : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Google Maps Link */}
      {country.maps && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <a
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <MapPin className="w-5 h-5" />
            View on Google Maps
          </a>
        </div>
      )}
    </section>
  )
}
