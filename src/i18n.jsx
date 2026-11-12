import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const LangContext = createContext(null)
const STORAGE_KEY = 'epro-lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && translations[saved]) return saved
  } catch {
    /* localStorage mavjud emas */
  }
  return 'uz'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* e'tiborsiz */
    }
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
