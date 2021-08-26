import { User, GithubAccount, GoogleAccount, Organization, Profile, UserSettings, Settings } from 'common'
import '@furystack/filesystem-store'
import { Constructable, Injector } from '@furystack/inject'
import { DefaultSession } from '@furystack/rest-service'
import { join } from 'path'

const STORE_TICK_MS = 30 * 1000
const getFileName = (model: Constructable<any>) => {
  const name = join(process.cwd(), 'data', `${model.name}.json`)
  return name
}

export const setupStores = (i: Injector) => {
  i.setupStores((sm) => {
    sm.useFileSystem({
      model: User,
      primaryKey: 'username',
      tickMs: STORE_TICK_MS,
      fileName: getFileName(User),
    })
      .useFileSystem({
        model: DefaultSession,
        primaryKey: 'sessionId',
        tickMs: STORE_TICK_MS,
        fileName: getFileName(DefaultSession),
      })
      .useFileSystem({
        model: GithubAccount,
        primaryKey: 'id',
        fileName: getFileName(GithubAccount),
        tickMs: STORE_TICK_MS,
      })
      .useFileSystem({
        model: GoogleAccount,
        primaryKey: 'id',
        fileName: getFileName(GoogleAccount),
        tickMs: STORE_TICK_MS,
      })
      .useFileSystem({
        model: Organization,
        primaryKey: 'id',
        fileName: getFileName(Organization),
        tickMs: STORE_TICK_MS,
      })
      .useFileSystem({
        model: Profile,
        primaryKey: 'id',
        fileName: getFileName(Profile),
        tickMs: STORE_TICK_MS,
      })
      .useFileSystem({
        model: UserSettings,
        primaryKey: 'username',
        fileName: getFileName(UserSettings),
        tickMs: STORE_TICK_MS,
      })
      .useFileSystem({
        model: Settings,
        primaryKey: 'type',
        fileName: getFileName(Settings),
        tickMs: STORE_TICK_MS,
      })
  })
}
