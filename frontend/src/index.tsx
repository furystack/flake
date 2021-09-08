import 'reflect-metadata'
import { VerboseConsoleLogger } from '@furystack/logging'
import { Injector } from '@furystack/inject'
import { render } from 'react-dom'
import './index.css'
import { Main } from './app-root/main'
import { environmentOptions } from './environment-options'

export const rootInjector = new Injector()

rootInjector.useLogging(VerboseConsoleLogger)

rootInjector.logger.withScope('Startup').verbose({
  message: 'Initializing Flake Frontend...',
  data: { environmentOptions },
})

const rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement

render(<Main />, rootElement)
