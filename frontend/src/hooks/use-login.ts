import { useMutation, useQueryClient } from 'react-query'
import { useAuthApiContext } from './use-auth-api'

export const useLogin = () => {
  const callApi = useAuthApiContext()
  const queryClient = useQueryClient()

  return useMutation(
    ({ username, password }: { username: string; password: string }) =>
      callApi({
        method: 'POST',
        action: '/login',
        body: {
          username,
          password,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('GET_CURRENT_USER')
      },
    },
  )
}
