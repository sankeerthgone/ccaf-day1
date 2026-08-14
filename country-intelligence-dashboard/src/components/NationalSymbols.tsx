import { Shield, Phone, Globe } from 'lucide-react'
import type { Country } from '../types'

interface NationalSymbolsProps {
  country: Country
}

export default function NationalSymbols({ country }: NationalSymbolsProps) {
  const callingCode = country.idd?.root || 'N/A'
  const domain = country.tld?.[0] || 'N/A'
  const drivingSide = country.car?.side || country.drivingSide || 'N/A'

  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6" />
        National Symbols & Info
      </h2>

      <div className="space-y-6">
        {/* Flag */}
        {country.flags?.svg && (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">
              Flag
            </h3>
            <div className="bg-slate-100 dark:bg-slate-800 rounded p-4 flex justify-center">
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                className="max-w-xs h-32 object-contain"
              />
            </div>
          </div>
        )}

        {/* Coat of Arms */}
        {country.coatOfArms?.svg ? (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">
              Coat of Arms
            </h3>
            <div className="bg-slate-100 dark:bg-slate-800 rounded p-4 flex justify-center">
              <img
                src={country.coatOfArms.svg}
                alt={`Coat of arms of ${country.name.common}`}
                className="max-w-xs h-32 object-contain"
              />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">
              Coat of Arms
            </h3>
            <p className="text-slate-500 dark:text-slate-400">Not available</p>
          </div>
        )}

        {/* International Calling Code */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
              International Calling Code
            </h3>
            <p className="text-lg font-semibold">{callingCode}</p>
          </div>
        </div>

        {/* Internet Domain */}
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1" />
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
              Internet Domain
            </h3>
            <p className="text-lg font-semibold">{domain}</p>
          </div>
        </div>

        {/* Driving Side */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Driving Side
          </h3>
          <p className="text-lg font-semibold capitalize">{drivingSide}</p>
        </div>

        {/* Start of Week */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Week Starts
          </h3>
          <p className="text-lg font-semibold capitalize">{country.startOfWeek}</p>
        </div>
      </div>
    </section>
  )
}
