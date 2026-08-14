import { Globe, Waves } from 'lucide-react'
import type { Country } from '../types'

interface CountryGeographyProps {
  country: Country
}

export default function CountryGeography({ country }: CountryGeographyProps) {
  const borders = country.borders?.join(', ') || 'None'

  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Globe className="w-6 h-6" />
        Geography
      </h2>

      <div className="space-y-6">
        {/* Continent */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Continent
          </h3>
          <p className="text-lg font-semibold">{country.continents.join(', ')}</p>
        </div>

        {/* Landlocked Status */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Water Access
          </h3>
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            <p className="text-lg font-semibold">
              {country.landlocked ? 'Landlocked' : 'Coastline'}
            </p>
          </div>
        </div>

        {/* Borders */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Bordering Countries
          </h3>
          <p className="text-lg font-semibold">{borders}</p>
          {country.borders && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {country.borders.length} border{country.borders.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Coordinates */}
        {country.latlng && (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              Coordinates
            </h3>
            <div className="bg-slate-100 dark:bg-slate-800 rounded p-3 space-y-2">
              <p className="text-sm">
                Latitude: <span className="font-semibold">{country.latlng[0].toFixed(4)}°</span>
              </p>
              <p className="text-sm">
                Longitude: <span className="font-semibold">{country.latlng[1].toFixed(4)}°</span>
              </p>
            </div>
          </div>
        )}

        {/* Maps Link */}
        {country.maps && (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              Map
            </h3>
            <a
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-semibold"
            >
              Open in OpenStreetMap
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
