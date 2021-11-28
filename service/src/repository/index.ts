import { Injector } from '@furystack/inject'
import '@furystack/repository/dist/injector-extension'
import { setupGithubAccountsDataSet } from './githubAccount'
import { setupGoogleAccountsDataSet } from './googleAccount'
import { setupSettingsDataSet } from './settings'
import { setupUserSettingsDataSet } from './user-settings'
import { setupUsersDataSet } from './users'

export const setupRepository = (i: Injector) => {
  i.setupRepository(setupUsersDataSet)
    .setupRepository(setupSettingsDataSet)
    .setupRepository(setupUserSettingsDataSet)
    .setupRepository(setupGoogleAccountsDataSet)
    .setupRepository(setupGoogleAccountsDataSet)
    .setupRepository(setupGithubAccountsDataSet)
}
