import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useAuthApiContext } from './use-auth-api'

export const useOauthData = () => {
  const api = useAuthApiContext()
  const fetchOauthData = useCallback(async () => {
    const response = await api({ method: 'GET', action: '/oauth-data' })
    return response.result
  }, [api])
  const query = useQuery('USE_OAUTH_DATA', fetchOauthData, {
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  })
  return query
}
