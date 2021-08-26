import { StoreManager } from '@furystack/core'
import { RequestAction, JsonResult } from '@furystack/rest-service'
import { GoogleAccount, User } from 'common'

export const DetachGoogleAccount: RequestAction<{ result: Omit<User, 'password'> }> = async ({ injector }) => {
  const logger = injector.logger.withScope('DetachGithubAccountAction')

  const { password, ...currentUser } = (await injector.getCurrentUser()) as User
  const googleAccountStore = injector.getInstance(StoreManager).getStoreFor(GoogleAccount, 'id')
  const [googleAccount] = await googleAccountStore.find({ top: 1, filter: { username: { $eq: currentUser.username } } })

  await googleAccountStore.remove(googleAccount.id)
  await logger.information({ message: `User '${currentUser.username}' has detached a google account` })

  return JsonResult(currentUser)
}
