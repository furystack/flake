import { RequestError } from '@furystack/rest'
import { StoreManager } from '@furystack/core'
import { HttpUserContext, JsonResult, RequestAction } from '@furystack/rest-service'
import { PostRegister, Profile, User } from 'common'

export const RegisterAction: RequestAction<PostRegister> = async ({ injector, getBody, response }) => {
  const logger = injector.logger.withScope('RegisterAction')
  const storeManager = injector.getInstance(StoreManager)
  const { email, password } = await getBody()
  const userStore = storeManager.getStoreFor(User, 'username')
  const existing = await userStore.find({ filter: { username: { $eq: email } } })
  if (existing && existing.length) {
    await logger.information({
      message: 'Tried to register an already existing user',
      data: { email, user: existing[0] },
    })
    throw new RequestError('Failed to register user', 400)
  }
  const userCtx = injector.getInstance(HttpUserContext)
  const { created } = await userStore.add({
    username: email,
    password: userCtx.authentication.hashMethod(password),
    roles: [],
    registrationDate: new Date().toISOString(),
  })
  const newUser = created[0]
  await storeManager.getStoreFor(Profile, 'id').add({
    username: newUser.username,
    displayName: newUser.username,
    description: '',
  })
  await userCtx.cookieLogin(newUser, response)

  const { password: pw, ...user } = newUser

  await logger.information({
    message: `A New user has been registered with the username '${user.username}'`,
    data: { ...user },
  })
  return JsonResult(user, 200)
}
