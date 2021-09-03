import { Result } from 'antd'
import { defineMessage, FormattedMessage } from 'react-intl'

const pageNotFoundMessage = defineMessage({
  id: 'pageNotFound',
  defaultMessage: 'The page you are looking for does not exists',
})
export const NotFoundPage = () => <Result status={404} title={<FormattedMessage {...pageNotFoundMessage} />} />
