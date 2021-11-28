import {
  DeleteEndpoint,
  GetCollectionEndpoint,
  GetEntityEndpoint,
  PatchEndpoint,
  PostEndpoint,
  RestApi,
} from '@furystack/rest'
import { User, GoogleAccount, GithubAccount, Profile, UserSettings } from '../models'

export type PutSettings = { body: Omit<UserSettings, 'username'>; result: UserSettings }
export type PutProfile = { body: Omit<Profile, 'username'>; result: Profile }
export type PostGithubRegister = { body: { code: string; clientId: string }; result: Omit<User, 'password'> }
export type PostGithubLogin = { body: { code: string; clientId: string }; result: Omit<User, 'password'> }
export type PostGoogleLogin = {
  body: { token: string }
  result: Omit<User, 'password'>
}
export type PostGoogleRegister = { body: { token: string }; result: Omit<User, 'password'> }
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
    '/githubAccounts': GetCollectionEndpoint<GithubAccount>
    '/githubAccounts/:id': GetEntityEndpoint<GithubAccount, 'username'>
    '/googleAccounts': GetCollectionEndpoint<GoogleAccount>
    '/googleAccuonts/:id': GetEntityEndpoint<GoogleAccount, 'username'>
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
    '/githubLogin': PostGithubLogin
    '/githubRegister': PostGithubRegister
    '/logout': { result: unknown }
    '/accept-terms': { result: { success: boolean } }
    '/githubAccount': PostEndpoint<GithubAccount, 'username'>
    '/googleAccount': PostEndpoint<GoogleAccount, 'username'>
    '/profile': PostEndpoint<Profile, 'username'>
    '/settings': PostEndpoint<UserSettings, 'username'>
  }
  PATCH: {
    '/profile/:id': PatchEndpoint<Profile, 'username'>
    '/settings/:id': PatchEndpoint<Profile, 'username'>
  }
  DELETE: {
    '/githubAccount/:id': DeleteEndpoint<GithubAccount, 'username'>
    '/googleAccount/:id': DeleteEndpoint<GoogleAccount, 'username'>
  }
}
