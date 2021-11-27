import { JsonResult, RequestAction } from '@furystack/rest-service'

export const getOauthData: RequestAction<{
  result: {
    googleClientId: string
    githubClientId: string
  }
}> = async ({ injector }) => {
  try {
    const googleSettings = await injector.getSettings('GOOGLE')
    const githubSettings = await injector.getSettings('GITHUB')

    return JsonResult({
      githubClientId: githubSettings.value.clientId,
      googleClientId: googleSettings.value.clientId,
    })
  } catch (error) {
    const message = 'Failed to retrieve oauth provider data.'
    await injector.logger.withScope('getOauthData').error({
      message,
      data: {
        error,
      },
    })
    throw new Error(message)
  }
}
