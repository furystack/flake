import { Injector } from '@furystack/inject'
import { AuthorizationResult } from '@furystack/repository'
import { Role } from 'common'

export const authorizedOnly =
  (...roles: Role[]) =>
  async (options: { injector: Injector }): Promise<AuthorizationResult> => {
    const isAllowed = await options.injector.isAuthorized(...roles)
    return isAllowed
      ? { isAllowed }
      : {
          isAllowed,
          message: 'You are not authorized',
        }
  }
