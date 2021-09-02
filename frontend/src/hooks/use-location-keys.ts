import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useLocationKeys = () => {
  const location = useLocation()

  const keys = useMemo(
    () =>
      location.pathname
        .split('/')
        .filter((segment) => segment.length)
        .reduce((prev, current) => [...prev, `${prev.length ? prev[prev.length - 1] : ''}/${current}`], [] as string[]),
    [location],
  )
  return keys
}
