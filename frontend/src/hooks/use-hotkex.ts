import { useEffect, useCallback } from 'react'

export interface UseHotkeySettings {
  key: string
  onTriggered: () => void
  stopPropagation?: boolean
  preventDefault?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
}

export const useHotkey = (settings: UseHotkeySettings) => {
  const listener = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === settings.key) {
        if (
          !!ev.ctrlKey === !!settings.ctrlKey &&
          !!ev.altKey === !!settings.altKey &&
          !!ev.shiftKey === !!settings.shiftKey
        ) {
          if (settings.stopPropagation) {
            ev.stopPropagation()
          }
          if (settings.preventDefault) {
            ev.preventDefault()
          }
          settings.onTriggered()
        }
      }
    },
    [settings],
  )
  useEffect(() => {
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [listener])
}
