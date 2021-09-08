import { PathHelper } from '@furystack/utils'
export const environmentOptions = {
  appVersion: process.env.APP_VERSION as string,
  buildDate: new Date(process.env.BUILD_DATE as string),
  serviceUrl: process.env.SERVICE_URL || PathHelper.joinPaths(window.location.origin, 'api'),
}
