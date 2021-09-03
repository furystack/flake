import { GetEntityEndpoint } from '@furystack/rest'
import { createGetEntityEndpoint, RequestAction, Validate } from '@furystack/rest-service'
import { Settings, SettingsApiSchemas } from 'common'

export const GetSystemSetting: RequestAction<GetEntityEndpoint<Settings, 'type'>> = Validate({
  schema: SettingsApiSchemas,
  schemaName: 'GetEntityEndpoint<Settings,"type">',
})(createGetEntityEndpoint({ model: Settings, primaryKey: 'type' }))
