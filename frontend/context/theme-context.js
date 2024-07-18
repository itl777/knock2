import React, { createContext, useContext, useState, useCallback } from 'react'
import { THEMES_DETAILS } from '@/configs/api-path'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
  const [themeDetails, setThemeDetails] = useState(null)

  const getThemeDetails = useCallback(async (branch_themes_id) => {
    try {
      const response = await fetch(`${THEMES_DETAILS}/${branch_themes_id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Fetched data:', data) // 調試信息
      if (data.success && data.theme) {
        setThemeDetails(data.theme)
      } else {
        console.error('Invalid data structure:', data)
        throw new Error('Invalid data structure')
      }
    } catch (error) {
      console.error('Error in getThemeDetails:', error)
      throw error
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ themeDetails, getThemeDetails }}>
      {children}
    </ThemeContext.Provider>
  )
}
