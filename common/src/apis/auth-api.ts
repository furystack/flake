import { GetCollectionEndpoint, GetEntityEndpoint, RestApi } from '@furystack/rest'
import { User, GoogleAccount, GithubAccount, Profile, UserSettings } from '../models'

export type PutSettings = { body: Omit<UserSettings, 'username'>; result: UserSettings }
export type PutProfile = { body: Omit<Profile, 'username'>; result: Profile }
export type PostAttachGithubAccount = { body: { code: string; clientId: string }; result: Omit<User, 'password'> }
export type PostGithubRegister = { body: { code: string; clientId: string }; result: Omit<User, 'password'> }
export type PostGithubLogin = { body: { code: string; clientId: string }; result: Omit<User, 'password'> }
export type PostGoogleLogin = {
  body: { token: string }
  result: Omit<User, 'password'>
}
export type PostAttachGoogleAccount = { body: { token: string }; result: Omit<User, 'password'> }
export type PostGoogleRegister = { body: { token: string }; result: Omit<User, 'password'> }
export type PostAttachGoogleLogin = { body: { token: string }; result: Omit<User, 'password'> }
export type PostLogin = { result: User; body: { username: string; password: string } }
export type PostRegister = { body: { email: string; password: string }; result: Omit<User, 'password'> }

export interface AuthApi extends RestApi {
  GET: {
    '/users': GetCollectionEndpoint<User>
    '/users/:id': GetEntityEndpoint<User, 'username'>
    '/users/current': { result: User }
    '/settings': GetCollectionEndpoint<UserSettings>
    '/settings/:id': GetEntityEndpoint<UserSettings, 'username'>
    '/profiles': GetCollectionEndpoint<Profile>
    '/profiles/:id': GetEntityEndpoint<Profile, 'username'>
    '/loginProviderDetails': {
      result: { google?: GoogleAccount; github?: GithubAccount; hasPassword: boolean }
    }
    '/oauth-data': {
      result: {
        googleClientId: string
        githubClientId: string
      }
    }
    '/avatars/:username': { result: any; url: { username: string } }
  }
  POST: {
    '/login': PostLogin
    '/register': PostRegister
    '/googleLogin': PostGoogleLogin
    '/googleRegister': PostGoogleRegister
    '/attachGoogleAccount': PostAttachGoogleAccount
    '/detachGoogleAccount': { result: Omit<User, 'password'> }
    '/githubLogin': PostGithubLogin
    '/githubRegister': PostGithubRegister
    '/attachGithubAccount': PostAttachGithubAccount
    '/detachGithubAccount': { result: Omit<User, 'password'> }
    '/logout': { result: unknown }
    '/accept-terms': { result: { success: boolean } }
  }
  PUT: {
    '/settings/current': PutSettings
    '/profile/current': PutProfile
  }
}
