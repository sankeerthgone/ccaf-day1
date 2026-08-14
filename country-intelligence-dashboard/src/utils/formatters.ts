export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatDensity(population: number, area: number): string {
  const density = area > 0 ? population / area : 0
  return formatNumber(Math.round(density))
}

export function formatArea(area: number): string {
  return formatNumber(area)
}

export function getCurrencySymbol(currency: string | undefined): string {
  if (!currency) return ''

  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    CNY: '¥',
    RUB: '₽',
    BRL: 'R$',
    MXN: '$',
    AUD: '$',
    CAD: '$',
    CHF: 'CHF',
    SEK: 'kr',
    NZD: '$',
    MYR: 'RM',
    SGD: '$',
    HKD: '$',
    NOK: 'kr',
    KRW: '₩',
    TRY: '₺',
    ZAR: 'R',
    AED: 'د.إ',
    SAR: '﷼',
    QAR: 'QR',
  }

  return symbols[currency] || currency
}

export function formatTimezone(tz: string): string {
  // Convert UTC+05:30 to readable format
  return tz.replace('UTC', '')
}

export function getCountryName(country: any): string {
  return country?.name?.common || country?.name?.official || 'Unknown'
}

export function getBorderCountryNames(borders: string[] | undefined, allCountries: any[]): string[] {
  if (!borders || borders.length === 0) return []

  return borders
    .map(code => {
      const country = allCountries.find(c => c.cca3 === code)
      return getCountryName(country)
    })
    .filter(Boolean)
}

export function parseNativeLanguage(nativeName: any): string {
  if (!nativeName) return ''

  const firstLang = Object.values(nativeName)[0] as any
  return firstLang?.common || firstLang?.official || ''
}

export function calculateGini(gini: Record<string, number> | undefined): number | null {
  if (!gini) return null

  const values = Object.values(gini)
  if (values.length === 0) return null

  // Return the most recent year's value (usually the first/last)
  return values[values.length - 1] ?? values[0] ?? null
}
