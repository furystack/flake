import { useEffect, useState } from 'react'

const localStorageKey = 'FLAKE_LANGUAGE'

export type SupportedLanguages = 'en' | 'hu'

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>(
    (localStorage.getItem(localStorageKey) as SupportedLanguages) || 'en',
  )

  useEffect(() => {
    localStorage.setItem(localStorageKey, currentLanguage)
  }, [currentLanguage])

  return { currentLanguage, setCurrentLanguage }
}
