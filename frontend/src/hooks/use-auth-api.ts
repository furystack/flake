import { AuthApi } from 'common'
import { createClient } from '@furystack/rest-client-fetch'
import { createContext, useContext } from 'react'
import { environmentOptions } from '../environment-options'

const authApiContext = createContext(
  createClient<AuthApi>({
    endpointUrl: `${environmentOptions.serviceUrl}/auth`,
    requestInit: { credentials: 'include' },
  }),
)

export const useAuthApiContext = () => useContext(authApiContext)
