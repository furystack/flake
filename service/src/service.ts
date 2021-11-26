import '@furystack/repository'
import { injector } from './config'
import { attachShutdownHandler } from './shutdown-handler'
import { useApis } from './apis'

useApis(injector)

attachShutdownHandler(injector)
