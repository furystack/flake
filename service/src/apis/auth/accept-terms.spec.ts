import { usingAsync } from '@furystack/utils'
import { TestContext } from '../../services/test-context'

describe('AcceptTermsAction', () => {
  it('Should add Accept Terms role to the current user', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      const username = 'test-accept-terms-user'
      const password = 'test-password'
      await testContext.seedTestUser({
        username,
        roles: [],
        registrationDate: new Date().toISOString(),
        password,
      })

      const loginResponse = await testContext.callAuthClient({
        method: 'POST',
        action: '/login',
        body: { username, password },
      })
      const loginResult = loginResponse.getJson()

      expect(loginResult.username).toBe(username)
      expect(loginResult.roles).toEqual([])

      await testContext.callAuthClient({
        method: 'POST',
        action: '/accept-terms',
      })

      const currentUserResponse = await testContext.callAuthClient({
        method: 'GET',
        action: '/current/user',
      })
      const currentUser = await currentUserResponse.getJson()

      expect(currentUser.username).toBe(username)
      expect(currentUser.roles.includes('terms-accepted')).toBeTruthy()
    })
  })
})
