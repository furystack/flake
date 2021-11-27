import { Injector } from '@furystack/inject'
import { DefaultSession } from '@furystack/rest-service'
import { User } from 'common'
import { useAuthApi } from './auth'
import { useSettingsApi } from './settings'

export const useApis = (injector: Injector, port = parseInt(process.env.APP_SERVICE_PORT as string, 10) || 9090) => {
  injector.useHttpAuthentication({
    enableBasicAuth: false,
    getUserStore: (sm) => sm.getStoreFor<User, 'username'>(User as any, 'username'),
    getSessionStore: (sm) => sm.getStoreFor(DefaultSession, 'sessionId'),
  })
  useAuthApi(injector, port)
  useSettingsApi(injector, port)
}
