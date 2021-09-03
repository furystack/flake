import { PostEndpoint } from '@furystack/rest'
import { JsonResult, RequestAction, Validate } from '@furystack/rest-service'
import { Settings, SettingsApiSchemas, SettingsTypeName } from 'common'

export const PutSystemSetting: RequestAction<PostEndpoint<Settings, 'type'>> = Validate({
  schema: SettingsApiSchemas,
  schemaName: 'PostEndpoint<Settings,"type">',
})(async ({ injector, getBody }) => {
  const value = (await getBody()) as Settings
  const store = injector.getDataSetFor(Settings, 'type')
  const existing = await store.get(injector, value.type)
  if (existing) {
    await store.update(injector, value.type as SettingsTypeName, value)
  } else {
    await store.add(injector, value)
  }

  return JsonResult(value)
})
