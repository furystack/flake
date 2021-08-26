import { RequestAction, JsonResult, Validate } from '@furystack/rest-service'
import { AuthApiSchemas, UserSettings } from 'common'

export const PutSettings: RequestAction<{
  body: UserSettings
  result: UserSettings
}> = Validate({
  schema: AuthApiSchemas,
  schemaName: 'PutSettings',
})(async ({ injector, getBody }) => {
  const user = await injector.getCurrentUser()
  const userSettings = injector.getDataSetFor(UserSettings, 'username')
  const postedSettings = await getBody()
  await userSettings.update(injector, user.username, postedSettings)
  return JsonResult(postedSettings)
})
