import { useQuery } from 'react-query'
import { useApiContext } from './use-api'

export const useCurrentUser = () => {
  const api = useApiContext()
  const currentUser = useQuery('GET_CURRENT_USER', () => api({ method: 'GET', action: '/currentUser' }), {
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 1000,
    retry: false,
  })
  return currentUser
}
