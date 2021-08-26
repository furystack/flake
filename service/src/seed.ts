import { PhysicalStore, StoreManager, FindOptions, WithOptionalId } from '@furystack/core'
import { HttpAuthenticationSettings } from '@furystack/rest-service'
import { Injector } from '@furystack/inject'
import { Profile, User } from 'common'
import { setupStores } from './stores'
import { VerboseConsoleLogger } from '@furystack/logging'

/**
 * gets an existing instance if exists or create and return if not. Throws error on multiple result
 *
 * @param filter The filter term
 * @param instance The instance to be created if there is no instance present
 * @param store The physical store to use
 * @param i The Injector instance
 * @returns The retrieved or created object
 */
export const getOrCreate = async <T, TKey extends keyof T>(
  filter: FindOptions<T, Array<keyof T>>,
  instance: WithOptionalId<T, TKey>,
  store: PhysicalStore<T, TKey>,
  i: Injector,
): Promise<T> => {
  const result = await store.find(filter)
  const logger = i.logger.withScope('seeder')
  if (result.length === 1) {
    return result[0]
  } else if (result.length === 0) {
    logger.verbose({
      message: `Entity '${store.model.name}' not exists, adding: '${JSON.stringify(instance)}'`,
    })
    const createResult = await store.add(instance)
    return createResult.created[0]
  } else {
    const message = `Seed filter contains '${result.length}' results for ${JSON.stringify(filter)}`
    logger.warning({ message })
    throw Error(message)
  }
}

/**
 * Seeds the databases with predefined values
 *
 * @param i The injector instance
 */
export const seed = async (i: Injector): Promise<void> => {
  const logger = i.logger.withScope('seeder')
  logger.verbose({ message: 'Seeding data...' })
  const sm = i.getInstance(StoreManager)
  const userStore = sm.getStoreFor(User, 'username')
  const profileStore = sm.getStoreFor(Profile, 'id')
  const testUser = await getOrCreate(
    { filter: { username: { $eq: 'testuser@gmail.com' } } },
    {
      username: 'testuser@gmail.com',
      password: i.getInstance(HttpAuthenticationSettings).hashMethod('password'),
      roles: [],
      registrationDate: new Date().toISOString(),
    },
    userStore,
    i,
  )
  await getOrCreate(
    { filter: { username: { $eq: testUser.username } } },
    { username: testUser.username, userSettings: { theme: 'dark' }, description: '', displayName: 'Test User' },
    profileStore,
    i,
  )

  logger.verbose({ message: 'Seeding data completed.' })
}

const injector = new Injector().useLogging(VerboseConsoleLogger).disposeOnProcessExit()

setupStores(injector)
seed(injector).then(async () => {
  await injector.getInstance(StoreManager).dispose()
  await injector.dispose()
})
