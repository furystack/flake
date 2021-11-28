import { StoreManager } from '@furystack/core'
import { usingAsync } from '@furystack/utils'
import { User, UserSettings } from 'common'
import { v4 } from 'uuid'
import { TestContext } from '../../services/test-context'

describe('PutSettingsAction', () => {
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
  it('Should create a new setting if it does not exists', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      const settingsStore = testContext.injector.getInstance(StoreManager).getStoreFor(UserSettings, 'username')
      const initialCount = await settingsStore.count()
      expect(initialCount).toBe(0)

      await testContext.seedTestUser(testUser)
      await testContext.loginWithUser(testUser)
      await testContext.callAuthClient({
        method: 'PUT',
        action: '/settings/current',
        body: {
          theme: testSettings.theme,
        },
      })

      const insertedCount = await settingsStore.count()
      expect(insertedCount).toBe(1)
      const s = await settingsStore.get(testUser.username)
      expect(s).toEqual(testSettings)
    })
  })
  it('Should update the described setting if exists', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      const settingsStore = testContext.injector.getInstance(StoreManager).getStoreFor(UserSettings, 'username')
      await settingsStore.add(testSettings)
      const initialCount = await settingsStore.count()
      expect(initialCount).toBe(1)
      const updatedSetting: UserSettings = { ...testSettings, theme: 'light' }

      await testContext.seedTestUser(testUser)
      await testContext.loginWithUser(testUser)
      await testContext.callAuthClient({
        method: 'PUT',
        action: '/settings/current',
        body: { theme: updatedSetting.theme },
      })

      const insertedCount = await settingsStore.count()
      expect(insertedCount).toBe(1)
      const s = await settingsStore.get(testSettings.username)
      expect(s).toEqual(updatedSetting)
    })
  })
})
