import { SettingsApi } from 'common'
import { createClient } from '@furystack/rest-client-fetch'
import { createContext, useContext } from 'react'
import { environmentOptions } from '../environment-options'

const settingsApiContext = createContext(
  createClient<SettingsApi>({
    endpointUrl: `${environmentOptions.serviceUrl}/settings`,
    requestInit: { credentials: 'include' },
  }),
)

export const useSettingsApiContext = () => useContext(settingsApiContext)
