import { roles } from './roles'

export class User {
  public username!: string
  public password!: string
  public registrationDate!: string
  public avatarFile?: string
  public roles!: Array<typeof roles[number]>
}
