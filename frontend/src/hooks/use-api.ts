import { AuthApi } from 'common'
import { createClient } from '@furystack/rest-client-fetch'
import { createContext, useContext } from 'react'

const apiContext = createContext(
  createClient<AuthApi>({
    endpointUrl: process.env.SERVICE_URL || '/',
    requestInit: { credentials: 'include' },
  }),
)

export const useApiContext = () => useContext(apiContext)
