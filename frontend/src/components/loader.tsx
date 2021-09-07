import { Result, Skeleton } from 'antd'
import { FC, useEffect, useState } from 'react'

export interface LoaderProps {
  load: () => Promise<JSX.Element>
  loader?: () => JSX.Element
  errorComponent?: (error: unknown) => JSX.Element
}

export const Loader: FC<LoaderProps> = ({ load, loader, errorComponent }) => {
  const [loadedElement, setLoadedElement] = useState<JSX.Element | null>(null)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const ac = new AbortController()
    load()
      .then((result) => {
        if (!ac.signal.aborted) setLoadedElement(result)
      })
      .catch((e) => {
        if (!ac.signal.aborted) setError(e)
      })

    return () => ac.abort()
  }, [load])

  if (loadedElement) {
    return loadedElement
  }

  if (error) {
    return errorComponent?.(error) || <Result {...(error as any)} />
  }

  return loader?.() || <Skeleton />
}
