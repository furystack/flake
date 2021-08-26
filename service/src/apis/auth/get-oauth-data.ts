import { JsonResult, RequestAction } from '@furystack/rest-service'

export const getOauthData: RequestAction<{
  result: {
    googleClientId: string
    githubClientId: string
  }
}> = async ({ injector }) => {
  const googleSettings = await injector.getSettings('GOOGLE')
  const githubSettings = await injector.getSettings('GITHUB')

  return JsonResult({
    githubClientId: githubSettings.value.clientId,
    googleClientId: googleSettings.value.clientId,
  })
}
