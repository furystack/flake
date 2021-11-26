import { Injector } from '@furystack/inject'
import { VerboseConsoleLogger } from '@furystack/logging'
import './extensions'
import { setupStores } from './stores'
import { setupRepository } from './repository'

export const injector = new Injector()

setupStores(injector)
setupRepository(injector)
injector.useLogging(VerboseConsoleLogger)
