import { StoreManager } from '@furystack/core'
import { RequestAction, JsonResult } from '@furystack/rest-service'
import { GithubAccount, User } from 'common'

export const DetachGithubAccount: RequestAction<{ result: Omit<User, 'password'> }> = async ({ injector }) => {
  const logger = injector.logger.withScope('DetachGithubAccountAction')

  const { password, ...currentUser } = (await injector.getCurrentUser()) as User
  const ghAccountStore = injector.getInstance(StoreManager).getStoreFor(GithubAccount, 'id')
  const [ghAccount] = await ghAccountStore.find({ top: 1, filter: { username: { $eq: currentUser.username } } })

  await ghAccountStore.remove(ghAccount.id)
  await logger.information({ message: `User '${currentUser.username}' has detached a github account` })

  return JsonResult(currentUser)
}
