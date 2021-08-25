import { VerboseConsoleLogger } from '@furystack/logging'
import { Injector } from '@furystack/inject'
import { render } from 'react-dom'
import './index.css'
import { Main } from './app-root/main'

export const rootInjector = new Injector()

export const environmentOptions = {
  appVersion: process.env.APP_VERSION as string,
  buildDate: new Date(process.env.BUILD_DATE as string),
}

rootInjector.useLogging(VerboseConsoleLogger)

rootInjector.logger.withScope('Startup').verbose({
  message: 'Initializing Flake Frontend...',
  data: { environmentOptions },
})

const rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement

render(<Main />, rootElement)
