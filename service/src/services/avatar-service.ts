import { StoreManager } from '@furystack/core'
import { Injectable, Injector } from '@furystack/inject'
import { ScopedLogger } from '@furystack/logging'
import { User } from 'common'
import { createWriteStream, promises } from 'fs'
import { get } from 'http'
import { extname, join } from 'path'
import { v4 } from 'uuid'
import { existsAsync } from '../utils/exists-async'

@Injectable({ lifetime: 'transient' })
export class AvatarService {
  private readonly logger: ScopedLogger

  private async getAvatarsPath() {
    const { value: systemSettings } = await this.injector.getSettings('SYSTEM')
    return systemSettings.avatarsPath
  }

  private async downloadAsTempFile(url: string, tempPath: string) {
    const filePath = join(tempPath, v4())
    const file = createWriteStream(filePath)
    return await new Promise<string>((resolve, reject) => {
      get(url, (response) => {
        response.pipe(file)
        response.on('close', () => resolve(filePath))
        response.on('error', (err) => reject(err))
      })
    })
  }

  public async saveFromUrl({ user, url }: { url: string; user: User }) {
    const { value: systemSettings } = await this.injector.getSettings('SYSTEM')
    const tempFilePath = await this.downloadAsTempFile(url, systemSettings.tempPath)
    await this.saveFromTempFile({ user, tempFilePath })
  }

  public async saveFromTempFile({ user, tempFilePath }: { tempFilePath: string; user: User }) {
    const avatarsPath = await this.getAvatarsPath()

    const extension = extname(tempFilePath).toLowerCase()
    const fileName = `${this.getAvatarFileName(user)}${extension}`
    const fullPath = join(avatarsPath, fileName)

    const avatarDirExists = await existsAsync(avatarsPath)
    if (!avatarDirExists) {
      await this.logger.information({
        message: 'Avatar Store path does not exists, trying to create it...',
        data: { path: avatarsPath },
      })
      await promises.mkdir(avatarsPath, { recursive: true })
    } else {
      const oldAvatarPath = await this.getFullAvatarPath(user)
      const oldAvatarExists = oldAvatarPath && (await existsAsync(oldAvatarPath))
      if (oldAvatarPath && oldAvatarExists) {
        await promises.unlink(oldAvatarPath)
      }
    }
    await promises.copyFile(tempFilePath, fullPath)
    await this.injector
      .getInstance(StoreManager)
      .getStoreFor(User, 'username')
      .update(user.username, { avatarFile: fileName })
    // Remove from temp file
    promises.unlink(tempFilePath)
  }

  private getAvatarFileName(user: User) {
    return user.username.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }

  public async hasAvatar(user: User) {
    const fullPath = await this.getFullAvatarPath(user)
    return fullPath && (await existsAsync(fullPath))
  }

  public async getFullAvatarPath(user: User) {
    if (!user.avatarFile) {
      return null
    }
    const avatarsPath = await this.getAvatarsPath()
    return join(avatarsPath, user.avatarFile)
  }

  constructor(private readonly injector: Injector) {
    this.logger = injector.logger.withScope(this.constructor.name)
  }
}
