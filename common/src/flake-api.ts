import { RestApi } from '@furystack/rest'
import { User } from './models/user'
export interface FlakeApi extends RestApi {
  GET: {
    '/currentUser': { result: User }
  }
  POST: {
    '/login': { result: User; body: { username: string; password: string } }
    '/logout': { result: unknown }
  }
}
