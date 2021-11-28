import { Injector } from '@furystack/inject'
import { AuthApi, GithubAccount, GoogleAccount, Profile, User, UserSettings } from 'common'
import {
  Authenticate,
  Authorize,
  createDeleteEndpoint,
  createGetCollectionEndpoint,
  createGetEntityEndpoint,
  createPatchEndpoint,
  createPostEndpoint,
  GetCurrentUser,
  LoginAction,
  LogoutAction,
  RequestAction,
} from '@furystack/rest-service'
import { AcceptTermsAction } from './accept-terms'
import { getOauthData } from './get-oauth-data'
import { GetLoginProviderDetails } from './get-login-provider-details'
import { GetAvatar } from './get-avatar'
import { GithubLoginAction } from './github-login'
import { GithubRegisterAction } from './github-register'
import { GoogleLoginAction } from '@furystack/auth-google'
import { GoogleRegisterAction } from './google-register'
import { RegisterAction } from './register'
import { AttachGoogleAccountAction } from './attach-google-account'
import { AttachGithubAccount } from './attach-github-account'

export const useAuthApi = (injector: Injector, port: number) => {
  injector.useRestService<AuthApi>({
    root: '/api/auth',
    port,
    cors: {
      credentials: true,
      origins: ['http://localhost:8080'],
      headers: ['cache', 'content-type'],
      methods: ['GET', 'POST', 'PUT'],
    },
    api: {
      GET: {
        '/users': Authorize('admin')(createGetCollectionEndpoint({ model: User, primaryKey: 'username' })),
        '/users/current': GetCurrentUser as RequestAction<{ result: User }>,
        '/users/:id': Authorize('admin')(createGetEntityEndpoint({ model: User, primaryKey: 'username' })),
        '/settings': Authorize('admin')(createGetCollectionEndpoint({ model: UserSettings, primaryKey: 'username' })),
        '/settings/:id': Authorize('admin')(createGetEntityEndpoint({ model: UserSettings, primaryKey: 'username' })),
        '/profiles': Authenticate()(createGetCollectionEndpoint({ model: Profile, primaryKey: 'username' })),
        '/profiles/:id': Authenticate()(createGetEntityEndpoint({ model: Profile, primaryKey: 'username' })),
        '/loginProviderDetails': Authenticate()(GetLoginProviderDetails),
        '/oauth-data': getOauthData,
        '/avatars/:username': Authenticate()(GetAvatar),
        '/githubAccounts': Authorize('admin')(
          createGetCollectionEndpoint({ model: GithubAccount, primaryKey: 'username' }),
        ),
        '/githubAccounts/:id': Authorize('admin')(
          createGetEntityEndpoint({ model: GithubAccount, primaryKey: 'username' }),
        ),
        '/googleAccounts': Authorize('admin')(
          createGetCollectionEndpoint({ model: GoogleAccount, primaryKey: 'username' }),
        ),
        '/googleAccuonts/:id': Authorize('admin')(
          createGetEntityEndpoint({ model: GoogleAccount, primaryKey: 'username' }),
        ),
      },
      POST: {
        '/login': LoginAction as any,
        '/logout': LogoutAction,
        '/accept-terms': AcceptTermsAction,
        '/githubLogin': GithubLoginAction,
        '/githubRegister': GithubRegisterAction,
        '/googleLogin': GoogleLoginAction as any,
        '/googleRegister': GoogleRegisterAction,
        '/register': RegisterAction,
        '/profile': createPostEndpoint({ model: Profile, primaryKey: 'username' }),
        '/settings': createPostEndpoint({ model: UserSettings, primaryKey: 'username' }),
        '/attachGoogleAccount': AttachGoogleAccountAction,
        '/attachGithubAccount': AttachGithubAccount,
      },
      PATCH: {
        '/profile/:id': createPatchEndpoint({ model: Profile, primaryKey: 'username' }),
        '/settings/:id': createPatchEndpoint({ model: UserSettings, primaryKey: 'username' }),
      },
      DELETE: {
        '/githubAccount/:id': createDeleteEndpoint({ model: GithubAccount, primaryKey: 'username' }),
        '/googleAccount/:id': createDeleteEndpoint({ model: GoogleAccount, primaryKey: 'username' }),
      },
    },
  })
}
