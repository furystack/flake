import { SettingsType } from 'common'

export class MissingSettingError extends Error {
  constructor(public readonly settingType: SettingsType['type']) {
    super(`Setting missing: ${settingType}`)
  }
}
