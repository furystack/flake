import { RequestAction, JsonResult, Validate } from '@furystack/rest-service'
import { AuthApiSchemas, Profile } from 'common'

export const PutProfile: RequestAction<{
  body: Profile
  result: Profile
}> = Validate({
  schema: AuthApiSchemas,
  schemaName: 'PutProfile',
})(async ({ injector, getBody }) => {
  const user = await injector.getCurrentUser()
  const profileDataSet = injector.getDataSetFor(Profile, 'username')
  const postedProfile = await getBody()
  const exists = await profileDataSet.get(injector, user.username, ['username'])
  if (exists) {
    await profileDataSet.update(injector, user.username, postedProfile)
  } else {
    await profileDataSet.add(injector, { ...postedProfile, username: user.username })
  }
  return JsonResult(postedProfile)
})
