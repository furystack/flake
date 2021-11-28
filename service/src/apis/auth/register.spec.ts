import { usingAsync } from '@furystack/utils'
import got from 'got'
import { TestContext } from '../../services/test-context'

describe('RegisterAction', () => {
  it('Should register and log in the current user', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      const email = 'test-register-user@gmail.com'
      const password = 'test-password'

      const registerResponse = await testContext.callAuthClient({
        method: 'POST',
        action: '/register',
        body: { email, password },
      })
      const registerResult = registerResponse.getJson()

      expect(registerResult.username).toBe(email)
      expect(registerResult.roles).toEqual([])

      const currentUserResponse = await testContext.callAuthClient({
        method: 'GET',
        action: '/current/user',
      })
      const currentUser = await currentUserResponse.getJson()

      expect(currentUser.username).toBe(email)
    })
  })

  it('Should throw if the user is already registered', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      const email = 'test-register-user@gmail.com'
      const password = 'test-password'

      await testContext.seedTestUser({
        username: email,
        roles: [],
        registrationDate: new Date().toISOString(),
        password,
      })

      try {
        await testContext.callAuthClient({
          method: 'POST',
          action: '/register',
          body: { email, password },
        })
        expect.assertions(2)
      } catch (error) {
        if (error instanceof got.RequestError) {
          expect(error.response?.statusCode).toBe(400)
          expect(error.response?.body).toContain('Failed to register user')
        }
      }
    })
  })
})
