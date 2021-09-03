import { User } from 'common'
import { DefaultSession } from '@furystack/rest-service'
import '@furystack/repository'
import { injector } from './config'
import { attachShutdownHandler } from './shutdown-handler'
import { useAuthApi } from './apis/auth'
import { useSettingsApi } from './apis/settings'

injector.useHttpAuthentication({
  enableBasicAuth: false,
  getUserStore: (sm) => sm.getStoreFor<User, 'username'>(User as any, 'username'),
  getSessionStore: (sm) => sm.getStoreFor(DefaultSession, 'sessionId'),
})

useAuthApi(injector)
useSettingsApi(injector)

attachShutdownHandler(injector)
