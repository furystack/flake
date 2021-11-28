import { useQuery } from 'react-query'
import { useAuthApiContext } from './use-auth-api'

export const useCurrentUserFetcher = () => {
  const api = useAuthApiContext()
  const currentUser = useQuery('GET_CURRENT_USER', () => api({ method: 'GET', action: '/users/current' }), {
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: 60 * 1000,
  })
  return currentUser
}
