import { LogoutOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { defineMessage, useIntl } from 'react-intl'
import { useQueryClient } from 'react-query'
import { useApiContext } from '../hooks/use-api'

const logout = defineMessage({
  id: 'logout.success',
  defaultMessage: 'You has been logged out',
})

export const LogoutButton = () => {
  const api = useApiContext()
  const queryClient = useQueryClient()
  const intl = useIntl()
  return (
    <Button
      onClick={async () => {
        try {
          await api({ method: 'POST', action: '/logout' })
        } finally {
          queryClient.invalidateQueries('GET_CURRENT_USER')
          notification.success({ message: intl.formatMessage(logout) })
        }
      }}>
      <LogoutOutlined />
    </Button>
  )
}
