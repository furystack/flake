import { useQuery } from 'react-query'
import { useApiContext } from './use-api'

export const useCurrentUser = () => {
  const api = useApiContext()
  const currentUser = useQuery('GET_CURRENT_USER', () => api({ method: 'GET', action: '/currentUser' }), {
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: 10 * 1000,
  })
  return currentUser
}
