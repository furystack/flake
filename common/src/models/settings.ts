export type SystemSettings = {
  type: 'SYSTEM'
  value: {
    avatarsPath: string
    subtitlesPath: string
    tempPath: string
  }
}

export type GithubSettings = {
  type: 'GITHUB'
  value: {
    clientId: string
    clientSecret: string
  }
}

export type GoogleSettings = {
  type: 'GOOGLE'
  value: {
    clientId: string
  }
}

export type OmdbSettings = {
  type: 'OMDB'
  value: {
    apiKey: string
  }
}

export type RapidApi = {
  type: 'RAPID_API'
  value: {
    key: string
    host: string
  }
}

export type SettingsType = SystemSettings | GithubSettings | GoogleSettings | OmdbSettings

export class Settings {
  type!: SettingsType['type']
  value!: SettingsType['value']
}
