import { RequestAction, JsonResult } from '@furystack/rest-service'
import { StoreManager } from '@furystack/core'
import { GithubAccount, GoogleAccount, User } from 'common'

export const GetLoginProviderDetails: RequestAction<{
  result: {
    hasPassword: boolean
    google?: GoogleAccount
    github?: GithubAccount
  }
}> = async ({ injector }) => {
  const currentUser = await injector.getCurrentUser()
  const storeManager = injector.getInstance(StoreManager)

  const [loadedUser] = await storeManager
    .getStoreFor(User, 'username')
    .find({ top: 1, filter: { username: { $eq: currentUser.username } } })
  const hasPassword = loadedUser.password ? true : false

  const google = await storeManager.getStoreFor(GoogleAccount, 'username').get(currentUser.username)

  const github = await storeManager.getStoreFor(GithubAccount, 'username').get(currentUser.username)

  return JsonResult({ hasPassword, google, github })
}
