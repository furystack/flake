import { Repository } from '@furystack/repository'
import { Settings } from 'common'
import { authorizedOnly } from './authorizedOnly'

export const setupSettingsDataSet = (repo: Repository) =>
  repo.createDataSet(Settings, 'type', {
    authorizeAdd: authorizedOnly('admin'),
    authorizeUpdate: authorizedOnly('admin'),
    authorizeRemove: async () => {
      return {
        isAllowed: false,
        message: 'Settings cannot be removed',
      }
    },
  })
