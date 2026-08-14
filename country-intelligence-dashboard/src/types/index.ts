export interface CountryName {
  common: string
  official: string
  nativeName?: Record<string, { official: string; common: string }>
}

export interface CountryCurrency {
  name: string
  symbol: string
}

export interface CountryLanguage {
  [key: string]: string
}

export interface CountryTranslation {
  official: string
  common: string
}

export interface CountryFlags {
  svg: string
  png?: string
  alt?: string
}

export interface CountryCoatOfArms {
  svg?: string
  png?: string
}

export interface CountryIdd {
  root?: string
  suffixes?: string[]
}

export interface CountryCapitalInfo {
  latlng?: number[]
}

export interface CountryDemonym {
  eng?: {
    f?: string
    m?: string
  }
  [key: string]: any
}

export interface Country {
  name: CountryName
  altSpellings: string[]
  area: number
  borders?: string[]
  capital?: string[]
  capitalInfo?: CountryCapitalInfo
  cca2: string
  ccn3?: string
  cca3: string
  cioc?: string
  coatOfArms: CountryCoatOfArms
  continents: string[]
  currencies?: Record<string, CountryCurrency>
  customary?: Record<string, CountryCurrency>
  demonyms?: CountryDemonym
  fifa?: string
  flag: string
  flags: CountryFlags
  gini?: Record<string, number>
  idd: CountryIdd
  independent?: boolean
  landlocked: boolean
  languages?: CountryLanguage
  latlng: number[]
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
  population: number
  postalCode?: { format: string; regex?: string }
  region: string
  startOfWeek: string
  status: string
  subregion?: string
  timezones: string[]
  tld?: string[]
  translations: Record<string, CountryTranslation>
  unMember: boolean
  drivingSide?: string
  car?: {
    signs?: string[]
    side?: string
  }
}

export interface CountryStats {
  name: string
  density: number
  area: number
  borderCount: number
  timezoneCount: number
  languageCount: number
  gini?: number
}

export interface ComparisonData {
  country1: Country | null
  country2: Country | null
}
