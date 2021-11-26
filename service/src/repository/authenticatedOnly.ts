import { Injector } from '@furystack/inject'
import { AuthorizationResult } from '@furystack/repository'

export const authenticatedOnly = async (options: { injector: Injector }): Promise<AuthorizationResult> => {
  const isAllowed = await options.injector.isAuthenticated()
  return isAllowed
    ? { isAllowed }
    : {
        isAllowed,
        message: 'You are not authenticated',
      }
}
