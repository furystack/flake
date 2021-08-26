import { StoreManager } from '@furystack/core'
import { Injector } from '@furystack/inject/dist/injector'
import { Settings, SettingsType } from 'common'

declare module '@furystack/inject/dist/injector' {
  // eslint-disable-next-line no-shadow
  export interface Injector {
    getSettings: <T extends SettingsType, TType extends T['type']>(
      type: TType,
    ) => Promise<T & { type: TType } extends infer U ? U : never>
  }
}

Injector.prototype.getSettings = function (type) {
  return this.getInstance(StoreManager).getStoreFor(Settings, 'type').get(type) as any
}
