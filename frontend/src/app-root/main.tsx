import { FC } from 'react'

import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Initializer } from './initializer'

const queryClient = new QueryClient()

export const Main: FC = () => {
  return (
    <IntlProvider locale={'en'} defaultLocale={'en'} messages={{}}>
      <QueryClientProvider client={queryClient}>
        <Initializer />
      </QueryClientProvider>
    </IntlProvider>
  )
}
