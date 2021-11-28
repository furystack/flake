import { GithubApiPayload } from './github-api-payload'

export class GithubAccount {
  public githubId!: number
  public githubApiPayload!: GithubApiPayload
  public username!: string
  public accountLinkDate!: string
}
