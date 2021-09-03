import { Injector } from '@furystack/inject'
import { Authorize } from '@furystack/rest-service'
import { SettingsApi } from 'common'
import { GetSystemSetting } from './get-system-setting'
import { GetSystemSettings } from './get-system-settings'
import { PutSystemSetting } from './put-system-setting'

export const useSettingsApi = (injector: Injector) => {
  injector.useRestService<SettingsApi>({
    root: '/api/settings',
    port: parseInt(process.env.APP_SERVICE_PORT as string, 10) || 9090,
    cors: {
      credentials: true,
      origins: ['http://localhost:8080'],
      headers: ['cache', 'content-type'],
      methods: ['GET', 'PUT'],
    },
    api: {
      GET: {
        '/system': Authorize('admin')(GetSystemSettings),
        '/system/:id': Authorize('admin')(GetSystemSetting),
      },
      PUT: {
        '/system': Authorize('admin')(PutSystemSetting),
      },
    },
  })
}
