import { StoreManager } from '@furystack/core'
import { usingAsync } from '@furystack/utils'
import { User, UserSettings } from 'common'
import { v4 } from 'uuid'
import { TestContext } from '../../services/test-context'

describe('GetSettingsAction', () => {
  const testUser: User = {
    username: 'testUserForUserSettings',
    password: v4(),
    registrationDate: new Date().toISOString(),
    roles: ['terms-accepted'],
  }

  const testSettings: UserSettings = {
    username: testUser.username,
    theme: 'dark',
  }
  it('Should return a default settings if it does not exists', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      await testContext.seedTestUser(testUser)
      await testContext.loginWithUser(testUser)
      const settingsResult = await testContext.callAuthClient({
        method: 'GET',
        action: '/settings/current',
      })
      expect(settingsResult.getJson()).toStrictEqual({ username: testUser.username, theme: 'dark' })
    })
  })
  it('Should get the setting if exists', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      await testContext.seedTestUser(testUser)

      const settingsStore = testContext.injector.getInstance(StoreManager).getStoreFor(UserSettings, 'username')
      const userSettings: UserSettings = { ...testSettings, theme: 'light' }
      await settingsStore.add(userSettings)

      await testContext.loginWithUser(testUser)
      const settingsResult = await testContext.callAuthClient({
        method: 'GET',
        action: '/settings/current',
      })

      expect(settingsResult.getJson()).toStrictEqual(userSettings)
    })
  })
})
