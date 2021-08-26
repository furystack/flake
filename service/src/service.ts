import { User } from 'common'
import { DefaultSession } from '@furystack/rest-service'
import '@furystack/repository'
import { injector } from './config'
import { attachShutdownHandler } from './shutdown-handler'
import { useAuthApi } from './apis/auth'

injector.useHttpAuthentication({
  enableBasicAuth: false,
  getUserStore: (sm) => sm.getStoreFor<User, 'username'>(User as any, 'username'),
  getSessionStore: (sm) => sm.getStoreFor(DefaultSession, 'sessionId'),
})

useAuthApi(injector)

attachShutdownHandler(injector)
