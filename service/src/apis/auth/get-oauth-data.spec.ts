import { StoreManager } from '@furystack/core'
import { usingAsync } from '@furystack/utils'
import { GithubSettings, GoogleSettings, Settings } from 'common'
import { RequestError } from 'got'
import { v4 } from 'uuid'
import { TestContext } from '../../services/test-context'

describe('GetOauthDataAction', () => {
  it('Should throw if providers are not set up', async () => {
    expect.assertions(2)
    await usingAsync(TestContext.create(), async (testContext) => {
      try {
        await testContext.callAuthClient({
          method: 'GET',
          action: '/oauth-data',
        })
      } catch (error) {
        if (error instanceof RequestError) {
          expect(error.response?.statusCode).toBe(500)
          expect(error.response?.body).toContain('Failed to retrieve oauth provider data.')
        }
      }
    })
  })

  it('Should return the Google and Github Client IDs', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      const storage = testContext.injector.getInstance(StoreManager).getStoreFor(Settings, 'type')

      const { created } = await storage.add(
        { type: 'GITHUB', value: { clientId: v4(), clientSecret: v4() } },
        { type: 'GOOGLE', value: { clientId: v4() } },
      )

      const githubClientId = (created[0] as GithubSettings).value.clientId
      const googleClientId = (created[1] as GoogleSettings).value.clientId

      const response = await testContext.callAuthClient({
        method: 'GET',
        action: '/oauth-data',
      })
      const result = response.getJson()
      expect(result).toEqual({
        googleClientId,
        githubClientId,
      })
    })
  })
})
