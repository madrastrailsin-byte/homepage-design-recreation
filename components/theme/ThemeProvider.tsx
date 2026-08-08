'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type ThemeMode = 'signature' | 'classic'

type ThemeContextType = {
  theme: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] = useState<ThemeMode>('signature')

  useEffect(() => {
    const savedTheme = localStorage.getItem('mt-theme') as ThemeMode | null

    if (savedTheme === 'classic' || savedTheme === 'signature') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('mt-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) =>
      current === 'signature' ? 'classic' : 'signature'
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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