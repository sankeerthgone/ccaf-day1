import { useState } from 'react'
import { Globe, Heart, Moon, Sun } from 'lucide-react'
import Search from './components/Search'
import CountryOverview from './components/CountryOverview'
import CountryGeography from './components/CountryGeography'
import LanguagesCurrency from './components/LanguagesCurrency'
import NationalSymbols from './components/NationalSymbols'
import Statistics from './components/Statistics'
import CompareView from './components/CompareView'
import FavoritesView from './components/FavoritesView'
import { useFavorites } from './hooks/useFavorites'
import type { Country } from './types'

type ViewType = 'search' | 'favorites' | 'compare'

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [view, setView] = useState<ViewType>('search')
  const [darkMode, setDarkMode] = useState(false)
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setView('search')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold">Country Dashboard</h1>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => setView('search')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'search'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Search
              </button>

              <button
                onClick={() => setView('compare')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'compare'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Compare
              </button>

              <button
                onClick={() => setView('favorites')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'favorites'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>{favorites.size}</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {view === 'search' && (
            <div className="space-y-8">
              <Search onCountrySelect={handleCountrySelect} />

              {selectedCountry && (
                <div className="space-y-8">
                  {/* Favorite Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleFavorite(selectedCountry.cca3)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        isFavorite(selectedCountry.cca3)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite(selectedCountry.cca3) ? 'fill-current' : ''
                        }`}
                      />
                      {isFavorite(selectedCountry.cca3) ? 'Saved' : 'Save Country'}
                    </button>
                  </div>

                  {/* Overview */}
                  <CountryOverview country={selectedCountry} />

                  {/* Geography & Statistics Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <CountryGeography country={selectedCountry} />
                    <Statistics country={selectedCountry} />
                  </div>

                  {/* Languages & Currency */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <LanguagesCurrency country={selectedCountry} />
                    <NationalSymbols country={selectedCountry} />
                  </div>
                </div>
              )}
            </div>
          )}

          {view === 'compare' && <CompareView onCountriesSelect={setSelectedCountry} />}

          {view === 'favorites' && (
            <FavoritesView
              favoritesCodes={Array.from(favorites)}
              onCountrySelect={handleCountrySelect}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>
              Data from{' '}
              <a
                href="https://restcountries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-900 dark:hover:text-slate-200"
              >
                REST Countries API
              </a>
            </p>
            <p className="mt-2">© 2024 Country Intelligence Dashboard</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
