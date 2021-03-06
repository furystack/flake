import { StoreManager } from '@furystack/core'
import { RequestAction, JsonResult } from '@furystack/rest-service'
import { GithubAccount, User } from 'common'
import { GithubAuthService } from '../../services/github-login-service'

export const AttachGithubAccount: RequestAction<{
  body: { code: string; clientId: string }
  result: { success: true }
}> = async ({ injector, getBody }) => {
  const logger = injector.logger.withScope('AttachGithubAccountAction')

  const { password, ...currentUser } = (await injector.getCurrentUser()) as User
  const { code, clientId } = await getBody()
  const githubApiPayload = await injector.getInstance(GithubAuthService).getGithubUserData({ code, clientId })
  const ghAccountStore = injector.getInstance(StoreManager).getStoreFor(GithubAccount, 'username')
  const registrationDate = new Date().toISOString()

  const { created } = await ghAccountStore.add({
    accountLinkDate: registrationDate,
    username: currentUser.username,
    githubId: githubApiPayload.id,
    githubApiPayload,
  })

  await logger.information({
    message: `Github account '${githubApiPayload.name}' has been attached to user '${currentUser.username}' `,
    data: { user: currentUser, githubAccount: created[0] },
  })

  return JsonResult({ success: true })
}
