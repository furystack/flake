import { GetCollectionEndpoint } from '@furystack/rest'
import { createGetCollectionEndpoint, RequestAction, Validate } from '@furystack/rest-service'
import { Settings, SettingsApiSchemas } from 'common'

export const GetSystemSettings: RequestAction<GetCollectionEndpoint<Settings>> = Validate({
  schema: SettingsApiSchemas,
  schemaName: 'GetCollectionEndpoint<Settings>',
})(createGetCollectionEndpoint({ model: Settings, primaryKey: 'type' }))
