import { useMutation, useQueryClient } from 'react-query'
import { useAuthApiContext } from './use-auth-api'

export const useSignup = () => {
  const callApi = useAuthApiContext()
  const queryClient = useQueryClient()

  return useMutation(
    ({ email, password }: { email: string; password: string }) =>
      callApi({
        method: 'POST',
        action: '/register',
        body: {
          email,
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
