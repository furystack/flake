import { JsonResult, RequestAction } from '@furystack/rest-service'
import { UserSettings } from 'common'

export const GetSettings: RequestAction<{
  result: UserSettings
}> = async ({ injector }) => {
  const profileStore = injector.getDataSetFor(UserSettings, 'username')
  const { username } = await injector.getCurrentUser()
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
