import { RequestError } from '@furystack/rest'
import { JsonResult, RequestAction } from '@furystack/rest-service'
import { Profile } from 'common'

export const GetProfile: RequestAction<{
  result: Profile
  url: { username: string }
}> = async ({ injector, getUrlParams }) => {
  const profileStore = injector.getDataSetFor(Profile, 'id')
  const { username } = getUrlParams()
  const result = await profileStore.find(injector, {
    filter: {
      username: { $eq: username },
    },
    top: 1,
  })
  const profile = result[0]
  if (!profile) {
    throw new RequestError(`The profile for user '${username}' does not exists`, 404)
  }
  return JsonResult(profile)
}