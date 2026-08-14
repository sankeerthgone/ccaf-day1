import { MessageCircle, DollarSign } from 'lucide-react'
import type { Country } from '../types'
import { getCurrencySymbol } from '../utils/formatters'

interface LanguagesCurrencyProps {
  country: Country
}

export default function LanguagesCurrency({ country }: LanguagesCurrencyProps) {
  const languages = country.languages
  const currencies = country.currencies
  const nativeLanguages = country.name.nativeName

  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        Languages & Currency
      </h2>

      <div className="space-y-8">
        {/* Languages */}
        {languages && Object.keys(languages).length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">
              Official Languages
            </h3>
            <div className="space-y-2">
              {Object.entries(languages).map(([code, name]) => {
                const nativeName = nativeLanguages?.[code]?.common || ''
                return (
                  <div
                    key={code}
                    className="bg-slate-100 dark:bg-slate-800 rounded p-3 flex justify-between"
                  >
                    <span className="font-semibold">{name}</span>
                    {nativeName && (
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        ({nativeName})
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-slate-500 dark:text-slate-400">
            No language information available
          </div>
        )}

        {/* Currency */}
        {currencies && Object.keys(currencies).length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5" />
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Currency
              </h3>
            </div>
            <div className="space-y-2">
              {Object.entries(currencies).map(([code, currency]) => (
                <div
                  key={code}
                  className="bg-slate-100 dark:bg-slate-800 rounded p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{currency.name}</span>
                    <span className="text-lg">{getCurrencySymbol(code)}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Code: {code}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-slate-500 dark:text-slate-400">
            No currency information available
          </div>
        )}
      </div>
    </section>
  )
}
