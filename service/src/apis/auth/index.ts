import { Injector } from '@furystack/inject'
import { AuthApi, Profile, User } from 'common'
import {
  Authenticate,
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
import { GetProfile } from './get-profile'
import { GetAvatar } from './get-avatar'
import { GetSettings } from './get-settings'
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
        '/current/user': GetCurrentUser as RequestAction<{ result: User }>,
        '/current/settings': Authenticate()(GetSettings),
        '/current/profile': Authenticate()(GetProfile),
        '/current/loginProviderDetails': Authenticate()(GetLoginProviderDetails),
        '/oauth-data': getOauthData,
        '/profiles': Authenticate()(createGetCollectionEndpoint({ model: Profile, primaryKey: 'id' })),
        '/profiles/:id': Authenticate()(createGetEntityEndpoint({ model: Profile, primaryKey: 'id' })),
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
        '/current/settings': PutSettings,
      },
    },
  })
}
