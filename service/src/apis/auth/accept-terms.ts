import { User } from 'common'
import { StoreManager } from '@furystack/core'
import { RequestAction, JsonResult } from '@furystack/rest-service'

export const AcceptTermsAction: RequestAction<{ result: { success: boolean } }> = async ({ injector }) => {
  const user = await injector.getCurrentUser<User>()
  if (!user.roles.includes('terms-accepted')) {
    await injector
      .getInstance(StoreManager)
      .getStoreFor(User, 'username')
      .update(user.username, { roles: [...user.roles, 'terms-accepted'] })
  }
  await injector.logger.withScope('accept-terms').information({
    message: `The User '${user.username}' has been accepted the terms`,
    data: { ...user },
  })
  return JsonResult({ success: true })
}
