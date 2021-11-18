import { RequestError } from '@furystack/rest'
import { IncomingForm, Fields, Files } from 'formidable'
import { RequestAction, JsonResult } from '@furystack/rest-service'
import { User } from 'common'
import { AvatarService } from '../../services/avatar-service'

export const UploadAvatar: RequestAction<{ result: { success: boolean } }> = async ({ injector, request }) => {
  const user = await injector.getCurrentUser<User>()
  const settings = await injector.getSettings('SYSTEM')
  const form = new IncomingForm({
    uploadDir: settings.value.avatarsPath,
  })

  const parseResult = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) =>
    form.parse(request, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      resolve({ fields, files })
    }),
  )

  const file = parseResult.files.avatar

  if (file instanceof Array) {
    throw new RequestError('Multiple files are not supported', 400)
  }

  if (!file) {
    throw new RequestError('No avatar file', 400)
  }

  await injector.getInstance(AvatarService).saveFromTempFile({ user, tempFilePath: file.filepath })

  return JsonResult({ success: true })
}
