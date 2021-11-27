import { Repository } from '@furystack/repository'
import { UserSettings } from 'common'

export const setupUserSettingsRepository = (repo: Repository) => {
  repo.createDataSet(UserSettings, 'username', {
    authorizeAdd: async ({ injector, entity }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = username === entity.username
      return isAllowed ? { isAllowed } : { isAllowed, message: 'User settings can be added only for the current user' }
    },
    authorizeUpdateEntity: async ({ injector, entity, change }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = username === entity.username && (!change.username || change.username === username)
      return isAllowed ? { isAllowed } : { isAllowed, message: 'The user should update only her settings' }
    },
    authorizeGetEntity: async ({ injector, entity }) => {
      const { username } = await injector.getCurrentUser()
      const isAllowed = username === entity.username
      return isAllowed
        ? { isAllowed }
        : { isAllowed, message: 'User settings can be retrieved only for the current user' }
    },
    authorizeRemove: async () => ({ isAllowed: false, message: 'User settings cannot be removed' }),
  })
}
