import { Repository } from '@furystack/repository'
import { Role, User } from 'common'
import { authenticatedOnly } from './authenticatedOnly'

export const setupUsersDataSet = (repo: Repository) =>
  repo.createDataSet(User, 'username', {
    authorizeAdd: authenticatedOnly,
    authorizeUpdate: authenticatedOnly,
    authorizeRemove: async ({ injector }) => {
      const isAllowed = await injector.isAuthorized('admin')
      return isAllowed
        ? {
            isAllowed,
          }
        : {
            isAllowed,
            message: 'Only Admins can remove users',
          }
    },
    authorizeGetEntity: async ({ injector, entity }) => {
      const { username, roles } = await injector.getCurrentUser<User>()
      const isAllowed = username === entity.username || roles.includes('admin')
      return isAllowed
        ? {
            isAllowed,
          }
        : {
            isAllowed,
            message: 'Only the current user can be loaded or you have to need an Admin role',
          }
    },
    authorizeUpdateEntity: async ({ injector, entity }) => {
      const { username, roles } = await injector.getCurrentUser<User>()
      const isAllowed = username === entity.username || (roles as Role[]).includes('admin')
      return isAllowed
        ? {
            isAllowed,
          }
        : {
            isAllowed,
            message: 'Only the current user can be updated or you have to need an Admin role',
          }
    },
  })
