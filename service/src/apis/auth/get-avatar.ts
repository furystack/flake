import { createReadStream } from 'fs'
import { RequestError } from '@furystack/rest'
import { StoreManager } from '@furystack/core'
import { BypassResult, RequestAction } from '@furystack/rest-service'
import { User } from 'common'
import { AvatarService } from '../../services/avatar-service'

export const GetAvatar: RequestAction<{
  result: unknown
  url: { username: string }
}> = async ({ injector, getUrlParams, response }) => {
  const userStore = injector.getInstance(StoreManager).getStoreFor(User, 'username')
  const avatarService = injector.getInstance(AvatarService)
  const { username } = getUrlParams()

  const user = await userStore.get(username)
  if (user) {
    const hasProfileImage = await avatarService.hasAvatar(user)
    if (hasProfileImage) {
      const fullPath = await avatarService.getFullAvatarPath(user)
      fullPath && createReadStream(fullPath).pipe(response)
      return BypassResult()
    }
  }

  throw new RequestError(`The avatar for user '${username}' does not exists`, 404)
}
