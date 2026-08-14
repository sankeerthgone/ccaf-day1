import { BarChart3, Users, Maximize2, Globe, Languages, TrendingUp } from 'lucide-react'
import type { Country } from '../types'
import { formatNumber, calculateGini } from '../utils/formatters'

interface StatisticsProps {
  country: Country
}

interface StatCard {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export default function Statistics({ country }: StatisticsProps) {
  const density = country.area > 0 ? Math.round(country.population / country.area) : 0
  const borderCount = country.borders?.length || 0
  const timezoneCount = country.timezones?.length || 0
  const languageCount = country.languages ? Object.keys(country.languages).length : 0
  const gini = calculateGini(country.gini)

  const stats: StatCard[] = [
    {
      label: 'Population Density',
      value: `${formatNumber(density)} /km²`,
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Area',
      value: `${formatNumber(country.area)} km²`,
      icon: <Maximize2 className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Bordering Countries',
      value: borderCount,
      icon: <Globe className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Time Zones',
      value: timezoneCount,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Official Languages',
      value: languageCount,
      icon: <Languages className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
    },
    ...(gini !== null
      ? [
          {
            label: 'Gini Index',
            value: gini.toFixed(1),
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'from-red-500 to-red-600',
          },
        ]
      : []),
  ]

  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        Statistics
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="opacity-90">{stat.icon}</div>
            </div>
            <p className="text-sm font-semibold opacity-90 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {gini === null && (
        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded text-sm text-slate-600 dark:text-slate-400">
          Gini Index data not available for this country
        </div>
      )}
    </section>
  )
}
