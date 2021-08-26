import { AuthApi, User } from 'common'
import { DefaultSession, GetCurrentUser, LoginAction, LogoutAction, RequestAction } from '@furystack/rest-service'
import '@furystack/repository'
import { injector } from './config'
import { attachShutdownHandler } from './shutdown-handler'

injector
  .useHttpAuthentication({
    enableBasicAuth: false,
    getUserStore: (sm) => sm.getStoreFor<User, 'username'>(User as any, 'username'),
    getSessionStore: (sm) => sm.getStoreFor(DefaultSession, 'sessionId'),
  })
  .useRestService<AuthApi>({
    root: 'api',
    port: parseInt(process.env.APP_SERVICE_PORT as string, 10) || 9090,
    cors: {
      credentials: true,
      origins: ['http://localhost:8080'],
      headers: ['cache', 'content-type'],
    },
    api: {
      GET: {
        '/currentUser': GetCurrentUser as RequestAction<{ result: User }>,
      },
      POST: {
        '/login': LoginAction as any,
        '/logout': LogoutAction,
      },
    },
  })

attachShutdownHandler(injector)
