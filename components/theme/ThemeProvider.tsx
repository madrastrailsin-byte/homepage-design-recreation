'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type ThemeMode = 'signature' | 'classic'

const THEME_STORAGE_KEY = 'madrastrails-theme'
const THEME_COOKIE_KEY = 'madrastrails-theme'

type ThemeContextType = {
  theme: ThemeMode
  isThemeReady: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function persistTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Local persistence may be unavailable.
  }

  document.cookie =
    `${THEME_COOKIE_KEY}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme: ThemeMode
}) {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Cookie remains the authoritative server-readable preference.
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return

      const nextTheme: ThemeMode =
        event.newValue === 'classic' ? 'classic' : 'signature'

      document.cookie =
        `${THEME_COOKIE_KEY}=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`

      document.documentElement.dataset.theme = nextTheme
      setTheme(nextTheme)
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme: ThemeMode =
        current === 'signature' ? 'classic' : 'signature'

      persistTheme(nextTheme)

      return nextTheme
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isThemeReady: true,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}
