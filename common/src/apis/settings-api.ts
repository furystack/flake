import { GetCollectionEndpoint, GetEntityEndpoint, PostEndpoint, RestApi } from '@furystack/rest'
import { Settings } from '..'

export interface SettingsApi extends RestApi {
  GET: {
    '/system': GetCollectionEndpoint<Settings>
    '/system/:id': GetEntityEndpoint<Settings, 'type'>
  }
  PUT: {
    '/system': PostEndpoint<Settings, 'type'>
  }
}
