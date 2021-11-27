import { usingAsync } from '@furystack/utils'
import { RequestError } from 'got/dist/source'
import { TestContext } from '../../services/test-context'

describe('GetOauthDataAction', () => {
  it('Should throw if providers are not set up', async () => {
    await usingAsync(TestContext.create(), async (testContext) => {
      expect.assertions(1)
      try {
        await testContext.callAuthClient({
          method: 'GET',
          action: '/oauth-data',
        })
      } catch (error) {
        if (error instanceof RequestError) {
          expect(error.response?.statusCode).toBe(500)
        }
      }
    })
  })
})
