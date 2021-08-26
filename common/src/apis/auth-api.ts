import { RestApi } from '@furystack/rest'
import { User, GoogleAccount, GithubAccount, Profile, UserSettings } from '../models'

export type PutSettings = { body: UserSettings; result: UserSettings }

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
    '/currentUser': { result: User }
    '/loginProviderDetails': {
      result: { google?: GoogleAccount; github?: GithubAccount; hasPassword: boolean }
    }
    '/oauth-data': {
      result: {
        googleClientId: string
        githubClientId: string
      }
    }
    '/profiles/:username': { result: Omit<Profile, 'userSettings'>; url: { username: string } }
    '/profiles/:username/avatar': { result: any; url: { username: string } }
    '/settings': { result: UserSettings }
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
    '/settings': PutSettings
  }
}
