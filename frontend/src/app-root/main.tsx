import { FC } from 'react'

import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from 'react-query'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import * as en from '../localization/en.json'
import * as hu from '../localization/hu.json'

import { useLanguage } from '../hooks/use-language'
import { Initializer } from './initializer'
import { theme } from './theme'

const languages = { en, hu } as any

const queryClient = new QueryClient()

export const Main: FC = () => {
  const { currentLanguage } = useLanguage()
  return (
    <IntlProvider locale={currentLanguage} defaultLocale={currentLanguage} messages={languages[currentLanguage]}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Initializer />
        </ThemeProvider>
      </QueryClientProvider>
    </IntlProvider>
  )
}
