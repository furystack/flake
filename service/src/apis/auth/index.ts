import { Injector } from '@furystack/inject'
import { AuthApi, Profile, User, UserSettings } from 'common'
import {
  Authenticate,
  Authorize,
  createGetCollectionEndpoint,
  createGetEntityEndpoint,
  GetCurrentUser,
  LoginAction,
  LogoutAction,
  RequestAction,
} from '@furystack/rest-service'
import { AcceptTermsAction } from './accept-terms'
import { getOauthData } from './get-oauth-data'
import { GetLoginProviderDetails } from './get-login-provider-details'
import { GetAvatar } from './get-avatar'
import { AttachGithubAccount } from './attach-github-account'
import { AttachGoogleAccountAction } from './attach-google-account'
import { DetachGithubAccount } from './detach-github-account'
import { GithubLoginAction } from './github-login'
import { GithubRegisterAction } from './github-register'
import { DetachGoogleAccount } from './detach-google-account'
import { GoogleLoginAction } from '@furystack/auth-google'
import { GoogleRegisterAction } from './google-register'
import { RegisterAction } from './register'
import { PutSettings } from './put-settings'
import { PutProfile } from './put-profile'

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
      },
      POST: {
        '/login': LoginAction as any,
        '/logout': LogoutAction,
        '/accept-terms': AcceptTermsAction,
        '/attachGithubAccount': AttachGithubAccount,
        '/detachGithubAccount': DetachGithubAccount,
        '/githubLogin': GithubLoginAction,
        '/githubRegister': GithubRegisterAction,
        '/attachGoogleAccount': AttachGoogleAccountAction,
        '/detachGoogleAccount': DetachGoogleAccount,
        '/googleLogin': GoogleLoginAction as any,
        '/googleRegister': GoogleRegisterAction,
        '/register': RegisterAction,
      },
      PUT: {
        '/settings/current': PutSettings,
        '/profile/current': PutProfile,
      },
    },
  })
}
