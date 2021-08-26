import { FC } from 'react'

import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from 'react-query'

import * as en from '../localization/en.json'
import * as hu from '../localization/hu.json'

import { useLanguage } from '../hooks/use-language'
import { Initializer } from './initializer'

const languages = { en, hu } as any

const queryClient = new QueryClient()

export const Main: FC = () => {
  const { currentLanguage } = useLanguage()
  return (
    <IntlProvider locale={currentLanguage} defaultLocale={currentLanguage} messages={languages[currentLanguage]}>
      <QueryClientProvider client={queryClient}>
        <Initializer />
      </QueryClientProvider>
    </IntlProvider>
  )
}
