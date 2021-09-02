import { notification } from 'antd'
import { defineMessage, useIntl } from 'react-intl'
import { useQueryClient } from 'react-query'
import { useAuthApiContext } from './use-auth-api'

const logout = defineMessage({
  id: 'logout.success',
  defaultMessage: 'You has been logged out',
})

export const useLogoutAction = () => {
  const api = useAuthApiContext()
  const queryClient = useQueryClient()
  const intl = useIntl()
  return async () => {
    try {
      await api({ method: 'POST', action: '/logout' })
    } finally {
      queryClient.invalidateQueries('GET_CURRENT_USER')
      notification.success({ message: intl.formatMessage(logout) })
    }
  }
}
