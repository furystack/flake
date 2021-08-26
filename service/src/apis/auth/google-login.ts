import { RequestError } from '@furystack/rest'
import { GoogleLoginService } from '@furystack/auth-google'
import { StoreManager } from '@furystack/core'
import { HttpUserContext, JsonResult, RequestAction, Validate } from '@furystack/rest-service'
import { AuthApiSchemas, GoogleAccount, PostGoogleLogin, User } from 'common'

/**
 * HTTP Request action for Google Logins
 */

export const GoogleLoginAction: RequestAction<PostGoogleLogin> = Validate({
  schema: AuthApiSchemas,
  schemaName: 'PostGoogleLogin',
})(async ({ injector, getBody, response }) => {
  const loginData = await getBody()

  const googleAccountStore = await injector.getInstance(StoreManager).getStoreFor(GoogleAccount, 'id')
  const userStore = await injector.getInstance(StoreManager).getStoreFor(User, 'username')
  const googleUserData = await injector.getInstance(GoogleLoginService).getGoogleUserData(loginData.token)
  if (!googleUserData.email_verified) {
    throw new RequestError('Email address for account not verified', 401)
  }
  const googleAccount = await googleAccountStore.find({ filter: { googleId: { $eq: googleUserData.sub } } })
  if (googleAccount.length === 1) {
    const googleUser = await userStore.find({ top: 2, filter: { username: { $eq: googleAccount[0].username } } })
    if (googleUser.length !== 1) {
      throw new RequestError(`Found ${googleUser.length} user(s) with the username '${googleAccount[0].username}'`, 500)
    }
    await injector.getInstance(HttpUserContext).cookieLogin(googleUser[0], response)
    const { password, ...user } = googleUser[0]

    return JsonResult({ ...user })
  } else {
    throw new RequestError('No user registered with this Google account.', 400)
  }
})
