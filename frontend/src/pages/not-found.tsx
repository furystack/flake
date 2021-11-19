import { Container } from '@mui/material'
import { defineMessage, FormattedMessage } from 'react-intl'

const pageNotFoundMessage = defineMessage({
  id: 'pageNotFound',
  defaultMessage: 'The page you are looking for does not exists',
})
export const NotFoundPage = () => (
  <Container>
    <FormattedMessage {...pageNotFoundMessage} />
  </Container>
)
