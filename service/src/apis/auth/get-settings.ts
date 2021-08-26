import { JsonResult, RequestAction } from '@furystack/rest-service'
import { UserSettings } from 'common'

export const GetSettings: RequestAction<{
  result: UserSettings
  url: { username: string }
}> = async ({ injector, getUrlParams }) => {
  const profileStore = injector.getDataSetFor(UserSettings, 'username')
  const { username } = getUrlParams()
  const result = await profileStore.find(injector, {
    filter: {
      username: { $eq: username },
    },
    top: 1,
  })
  const profile = result[0]
  if (!profile) {
    return JsonResult({ username, theme: 'dark' })
  }
  return JsonResult(profile)
}
