import { SettingsApi } from 'common'
import { createClient } from '@furystack/rest-client-fetch'
import { createContext, useContext } from 'react'

const settingsApiContext = createContext(
  createClient<SettingsApi>({
    endpointUrl: `${process.env.SERVICE_URL || ''}/settings`,
    requestInit: { credentials: 'include' },
  }),
)

export const useSettingsApiContext = () => useContext(settingsApiContext)
