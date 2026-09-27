import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../config.js'
import { useLocalStorage } from './useLocalStorage.js'

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'

function readSystemTheme() {
  return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light'
}

export function useTheme() {
  const [preference, setPreference] = useLocalStorage(STORAGE_KEYS.theme, null)
  const [systemTheme, setSystemTheme] = useState(readSystemTheme)

  useEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY)
    const handleChange = (event) =>
      setSystemTheme(event.matches ? 'dark' : 'light')

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const theme = preference ?? systemTheme

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setPreference])

  return { theme, toggleTheme }
}
