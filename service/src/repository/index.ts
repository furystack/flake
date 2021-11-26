import { Injector } from '@furystack/inject'
import '@furystack/repository/dist/injector-extension'
import { setupSettingsRepository } from './settings'
import { setupUserRepository } from './users'

export const setupRepository = (i: Injector) => {
  i.setupRepository(setupUserRepository)
  i.setupRepository(setupSettingsRepository)
}
