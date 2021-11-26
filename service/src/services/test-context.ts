import { InMemoryStore, StoreManager } from '@furystack/core'
import { Injectable, Injector } from '@furystack/inject'
import { Disposable } from '@furystack/utils'
import { createClient } from '@furystack/rest-client-got'
import { AuthApi, Settings, SettingsApi, User } from 'common'
import { useApis } from '../apis'
import { setupRepository } from '../repository'
import { DefaultSession, HttpAuthenticationSettings } from '@furystack/rest-service'
import { ToughCookieJar } from 'got'
import '@furystack/logging'

@Injectable()
export class TestContext implements Disposable {
  private cookieString = ''
  public cookieJar: ToughCookieJar = {
    setCookie: (cookie) => (this.cookieString = (cookie as string).split(';')[0]),
    getCookieString: () => this.cookieString,
  }

  public static create = () => new Injector().getInstance(TestContext)
  public async dispose() {
    await this.injector.dispose()
  }

  public seedTestUser = async (user: User) => {
    const hashedPassword = this.injector.getInstance(HttpAuthenticationSettings).hashMethod(user.password)
    return await this.injector
      .getInstance(StoreManager)
      .getStoreFor(User, 'username')
      .add({ ...user, password: hashedPassword })
  }

  private setupStores() {
    this.injector.setupStores((s) => s.addStore(new InMemoryStore({ model: DefaultSession, primaryKey: 'sessionId' })))
    this.injector.setupStores((s) => s.addStore(new InMemoryStore({ model: User, primaryKey: 'username' })))
    this.injector.setupStores((s) => s.addStore(new InMemoryStore({ model: Settings, primaryKey: 'type' })))
  }

  public callAuthClient = createClient<AuthApi>({
    endpointUrl: 'http://localhost:9090/api/auth',
    gotOptions: {
      cookieJar: this.cookieJar,
    },
  })

  public callSettingsClient = createClient<SettingsApi>({ endpointUrl: 'http://localhost:9090/api/settings' })

  constructor(public injector: Injector) {
    this.injector.useLogging()
    this.setupStores()
    setupRepository(this.injector)
    useApis(this.injector)
  }
}
