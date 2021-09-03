import { RequestError } from '@furystack/rest'
import { StoreManager } from '@furystack/core'
import { HttpUserContext, JsonResult, RequestAction, Validate } from '@furystack/rest-service'
import { AuthApiSchemas, GithubAccount, PostGithubRegister, Profile, User } from 'common'
import { GithubAuthService } from '../../services/github-login-service'
import { AvatarService } from '../../services/avatar-service'

export const GithubRegisterAction: RequestAction<PostGithubRegister> = Validate({
  schema: AuthApiSchemas,
  schemaName: 'PostGithubRegister',
})(async ({ injector, getBody, response }) => {
  const { code, clientId } = await getBody()

  const logger = injector.logger.withScope('GithubRegisterAction')

  const storeManager = injector.getInstance(StoreManager)

  const registrationDate = new Date().toISOString()
  const githubApiPayload = await injector.getInstance(GithubAuthService).getGithubUserData({ code, clientId })

  const existingGhUsers = await storeManager
    .getStoreFor(GithubAccount, 'id')
    .find({ filter: { githubId: { $eq: githubApiPayload.id } }, top: 2 })
  if (existingGhUsers.length !== 0) {
    throw new RequestError(`Github user already registered`, 401)
  }

  const { created } = await storeManager.getStoreFor(User, 'username').add({
    password: '',
    roles: ['terms-accepted'],
    username: githubApiPayload.email || `${githubApiPayload.login}@github.com`,
    registrationDate,
  })

  const newUser = created[0]

  await storeManager.getStoreFor(GithubAccount, 'id').add({
    accountLinkDate: registrationDate,
    username: newUser.username,
    githubId: githubApiPayload.id,
    githubApiPayload,
  })

  await storeManager.getStoreFor(Profile, 'id').add({
    username: newUser.username,
    displayName: newUser.username,
    description: '',
  })

  await injector.getInstance(HttpUserContext).cookieLogin(newUser, response)
  const { password, ...user } = newUser
  await logger.information({
    message: `User ${newUser.username} has been registered with Github Auth.`,
    data: newUser,
  })

  try {
    githubApiPayload &&
      githubApiPayload.avatar_url &&
      (await injector.getInstance(AvatarService).saveFromUrl({ url: githubApiPayload.avatar_url, user: newUser }))
  } catch (error) {
    await logger.warning({ message: 'Failed to get Avatar', data: { error } })
  }

  return JsonResult({ ...user })
})
