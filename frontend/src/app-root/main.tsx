import { FC } from 'react'

import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Initializer } from './initializer'

import * as en from '../localization/en.json'
import * as hu from '../localization/hu.json'

import { useLanguage } from '../hooks/use-language'

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
