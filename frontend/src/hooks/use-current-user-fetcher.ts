import { useQuery } from 'react-query'
import { useApiContext } from './use-api'

export const useCurrentUserFetcher = () => {
  const api = useApiContext()
  const currentUser = useQuery('GET_CURRENT_USER', () => api({ method: 'GET', action: '/currentUser' }), {
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: 60 * 1000,
  })
  return currentUser
}
