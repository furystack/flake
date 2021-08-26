import { Injector } from '@furystack/inject'
import { VerboseConsoleLogger } from '@furystack/logging'
import { DataSetSettings, AuthorizationResult } from '@furystack/repository'
import '@furystack/repository/dist/injector-extension'
import { User } from 'common'
import { setupStores } from './stores'

export const authorizedOnly = async (options: { injector: Injector }): Promise<AuthorizationResult> => {
  const isAllowed = await options.injector.isAuthenticated()
  return isAllowed
    ? { isAllowed }
    : {
        isAllowed,
        message: 'You are not authorized :(',
      }
}

export const authorizedDataSet: Partial<DataSetSettings<any, any>> = {
  authorizeAdd: authorizedOnly,
  authorizeGet: authorizedOnly,
  authorizeRemove: authorizedOnly,
  authorizeUpdate: authorizedOnly,
  authroizeRemoveEntity: authorizedOnly,
}

export const injector = new Injector()
injector.useLogging(VerboseConsoleLogger).setupRepository((repo) =>
  repo.createDataSet(User, 'username', {
    ...authorizedDataSet,
  }),
)

setupStores(injector)
