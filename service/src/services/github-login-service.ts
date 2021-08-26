import { Injectable, Injector } from '@furystack/inject'
import got from 'got'
import { ScopedLogger } from '@furystack/logging'
import { GithubApiPayload } from 'common'
import { MissingSettingError } from '../errors/missing-setting-error'

@Injectable()
export class GithubAuthService {
  public authUrl = 'https://api.github.com/user'

  public readonly logger: ScopedLogger

  private async getSettings() {
    const settings = await this.injector.getSettings('GITHUB')
    if (!settings) {
      throw new MissingSettingError('GITHUB')
    }
    return settings
  }

  public async getGithubUserData(options: { code: string; clientId: string }): Promise<GithubApiPayload> {
    const settings = await this.getSettings()
    const { clientSecret } = settings.value
    if (!clientSecret) {
      await this.logger.error({
        message: `Github Client secret has not been set up in the GITHUB_CLIENT_SECRET env. variable.`,
        data: {
          sendToSlack: true,
        },
      })
      throw Error('Github Authentication failed')
    }
    const body = JSON.stringify({
      code: options.code,
      client_id: options.clientId,
      client_secret: clientSecret,
    })
    const response = await got.post('https://github.com/login/oauth/access_token', {
      body,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    })
    const accessToken = JSON.parse(response.body).access_token
    const currentUserResponse = await got.get({
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
    return JSON.parse(currentUserResponse.body) as GithubApiPayload
  }

  constructor(private readonly injector: Injector) {
    this.logger = injector.logger.withScope('GithubAuthService')
  }
}
