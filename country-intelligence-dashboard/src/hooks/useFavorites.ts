import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'country-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      return new Set(stored ? JSON.parse(stored) : [])
    } catch {
      return new Set()
    }
  })

  const isFavorite = (cca3: string): boolean => favorites.has(cca3)

  const toggleFavorite = (cca3: string): void => {
    setFavorites(prev => {
      const updated = new Set(prev)
      if (updated.has(cca3)) {
        updated.delete(cca3)
      } else {
        updated.add(cca3)
      }
      return updated
    })
  }

  const addFavorite = (cca3: string): void => {
    setFavorites(prev => {
      if (prev.has(cca3)) return prev
      const updated = new Set(prev)
      updated.add(cca3)
      return updated
    })
  }

  const removeFavorite = (cca3: string): void => {
    setFavorites(prev => {
      if (!prev.has(cca3)) return prev
      const updated = new Set(prev)
      updated.delete(cca3)
      return updated
    })
  }

  const getFavoritesList = (): string[] => Array.from(favorites)

  const clearFavorites = (): void => {
    setFavorites(new Set())
  }

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)))
  }, [favorites])

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    getFavoritesList,
    clearFavorites,
  }
}
