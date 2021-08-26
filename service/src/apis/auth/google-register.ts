import { RequestError } from '@furystack/rest'
import { GoogleLoginService } from '@furystack/auth-google'
import { StoreManager } from '@furystack/core'
import { HttpUserContext, JsonResult, RequestAction } from '@furystack/rest-service'
import { GoogleAccount, PostGoogleRegister, Profile, User } from 'common'
import { AvatarService } from '../../services/avatar-service'

/**
 * HTTP Request action for Google Logins
 */

export const GoogleRegisterAction: RequestAction<PostGoogleRegister> = async ({ injector, getBody, response }) => {
  const logger = injector.logger.withScope('GoogleRegisterAction')
  const storeManager = injector.getInstance(StoreManager)
  const userContext = injector.getInstance(HttpUserContext)
  const googleAcccounts = storeManager.getStoreFor(GoogleAccount, 'id')
  const users = storeManager.getStoreFor(User, 'username')
  const { token } = await getBody()
  const registrationDate = new Date().toISOString()

  if (!token) {
    throw new RequestError('Token missing', 400)
  }

  const googleUserData = await injector.getInstance(GoogleLoginService).getGoogleUserData(token)

  if (!googleUserData.email_verified) {
    await logger.warning({
      message: `User '${googleUserData.email}' tried to register with a not-verified e-mail. `,
    })
    throw new RequestError('Email address for account not verified', 401)
  }

  const existing = await googleAcccounts.find({ filter: { googleId: { $eq: googleUserData.sub } }, top: 1 })

  if (existing && existing.length) {
    throw new RequestError('Google account already registered.', 401)
  }

  const { created } = await users.add({
    password: '',
    roles: ['terms-accepted'],
    registrationDate,
    username: googleUserData.email,
  })

  const userToAdd = created[0]

  try {
    googleUserData &&
      googleUserData.picture &&
      (await injector.getInstance(AvatarService).saveFromUrl({ user: userToAdd, url: googleUserData.picture }))
  } catch (error) {
    await logger.warning({ message: 'Failed to get Avatar', data: { message: error.message, stack: error.stack } })
  }

  const { password, ...userToAddWithoutPw } = userToAdd

  await googleAcccounts.add({
    googleId: googleUserData.sub,
    googleApiPayload: googleUserData,
    username: googleUserData.email,
    accountLinkDate: registrationDate,
  })

  await storeManager.getStoreFor(Profile, 'id').add({
    username: userToAdd.username,
    displayName: googleUserData.name,
    description: '',
  })

  await logger.information({
    message: `User ${userToAdd.username} has been registered with Google Auth.`,
    data: userToAddWithoutPw,
  })

  const { password: pw, ...user } = (await userContext.cookieLogin(userToAddWithoutPw, response)) as User
  return JsonResult(user)
}
