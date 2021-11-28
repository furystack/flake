import { Repository } from '@furystack/repository'
import { GoogleAccount } from 'common'

export const setupGoogleAccountsDataSet = (repository: Repository) =>
  repository.createDataSet(GoogleAccount, 'username', {
    authorizeGetEntity: async ({ injector, entity }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = entity.username === username
      return isAllowed
        ? { isAllowed }
        : { isAllowed, message: 'Google account can be only retrieved for the current user' }
    },
    authorizeAdd: async ({ injector, entity }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = entity.username === username
      return isAllowed ? { isAllowed } : { isAllowed, message: 'Google account can only be added for the current user' }
    },
    authorizeUpdateEntity: async ({ injector, entity, change }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = entity.username === username && (!change.username || change.username === username)
      return isAllowed
        ? { isAllowed }
        : {
            isAllowed,
            message: 'Google account can only be updated for the current user and username cannot be changed',
          }
    },
    authroizeRemoveEntity: async ({ injector, entity }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = entity.username === username
      return isAllowed
        ? { isAllowed }
        : {
            isAllowed,
            message: 'Google account can only be removed for the current user',
          }
    },
    addFilter: async ({ filter, injector }) => {
      const { username } = await injector.getCurrentUser()
      return {
        ...(filter as any),
        filter: { username: { $eq: username } },
      }
    },
  })
