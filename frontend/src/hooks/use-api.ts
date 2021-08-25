import { FlakeApi } from 'common'
import { createClient } from '@furystack/rest-client-fetch'
import { createContext, useContext } from 'react'

const apiContext = createContext(
  createClient<FlakeApi>({
    endpointUrl: process.env.SERVICE_URL || '/',
    requestInit: { credentials: 'include' },
  }),
)

export const useApiContext = () => useContext(apiContext)
