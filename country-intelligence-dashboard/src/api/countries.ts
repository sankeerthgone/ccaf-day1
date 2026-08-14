import type { Country } from '../types'

const COUNTRIES_DATA_URL =
  'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'

// Cache to avoid repeated API calls
const cache = new Map<string, Country[]>()

async function fetchFromAPI(): Promise<Country[]> {
  if (cache.has('all')) {
    return cache.get('all')!
  }

  try {
    const response = await fetch(COUNTRIES_DATA_URL)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    const data = await response.json()
    const countries = (Array.isArray(data) ? data : []).map(country => ({
      ...country,
      name: {
        ...country.name,
        nativeName: country.name.nativeName ?? country.name.native ?? {},
      },
      altSpellings: country.altSpellings ?? [],
      area: country.area ?? 0,
      continents: country.continents ?? (country.region ? [country.region] : []),
      flags: country.flags ?? {},
      idd: country.idd ?? {},
      latlng: country.latlng ?? [],
      maps: country.maps ?? { googleMaps: '', openStreetMaps: '' },
      population: country.population ?? 0,
      startOfWeek: country.startOfWeek ?? 'monday',
      timezones: country.timezones ?? [],
      translations: country.translations ?? {},
    })) as Country[]
    cache.set('all', countries)
    return countries
  } catch (error) {
    console.error('Error fetching country data:', error)
    throw error
  }
}

export async function getAllCountries(): Promise<Country[]> {
  return fetchFromAPI()
}

async function filterCountries(predicate: (country: Country) => boolean): Promise<Country[]> {
  try {
    return (await getAllCountries()).filter(predicate)
  } catch {
    return []
  }
}

export async function searchCountriesByName(name: string): Promise<Country[]> {
  if (!name.trim()) return []
  const query = name.trim().toLowerCase()
  return filterCountries(country => {
    const commonName = country.name.common.toLowerCase()
    const officialName = country.name.official.toLowerCase()
    const altSpellings = country.altSpellings.map(spelling => spelling.toLowerCase())

    return commonName.includes(query) || officialName.includes(query) ||
      altSpellings.some(spelling => spelling.includes(query))
  })
}

export async function getCountriesByCapital(capital: string): Promise<Country[]> {
  if (!capital.trim()) return []
  const query = capital.trim().toLowerCase()
  return filterCountries(country => country.capital?.some(value => value.toLowerCase().includes(query)) ?? false)
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  if (!region.trim()) return []
  const query = region.trim().toLowerCase()
  return filterCountries(country => country.region.toLowerCase().includes(query))
}

export async function getCountriesByCurrency(currency: string): Promise<Country[]> {
  if (!currency.trim()) return []
  const query = currency.trim().toLowerCase()
  return filterCountries(country => Object.entries(country.currencies ?? {}).some(([code, currencyData]) =>
    code.toLowerCase().includes(query) || currencyData.name.toLowerCase().includes(query)
  ))
}

export async function getCountriesByLanguage(language: string): Promise<Country[]> {
  if (!language.trim()) return []
  const query = language.trim().toLowerCase()
  return filterCountries(country => Object.entries(country.languages ?? {}).some(([code, languageName]) =>
    code.toLowerCase().includes(query) || languageName.toLowerCase().includes(query)
  ))
}

export async function getCountryByCode(cca3: string): Promise<Country | null> {
  try {
    const countries = await getAllCountries()
    return countries.find(country => country.cca3.toLowerCase() === cca3.toLowerCase()) || null
  } catch {
    return null
  }
}

export function clearCache(): void {
  cache.clear()
}
