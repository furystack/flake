import { AuthApi } from 'common'
import { createClient } from '@furystack/rest-client-fetch'
import { createContext, useContext } from 'react'

const authApiContext = createContext(
  createClient<AuthApi>({
    endpointUrl: `${process.env.SERVICE_URL || ''}/auth`,
    requestInit: { credentials: 'include' },
  }),
)

export const useAuthApiContext = () => useContext(authApiContext)
