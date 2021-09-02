import { Role } from 'common'
import { FC } from 'react'
import { useCurrentUser } from '../../hooks/use-current-user'

export interface AuthorizeOneRole {
  roles: Role[]
  unauthorized?: JSX.Element
}

export const AuthorizeOneRole: FC<AuthorizeOneRole> = ({ roles, children, unauthorized }) => {
  const user = useCurrentUser()
  if (user.hasOneRole(...roles)) {
    return <>{children}</>
  }
  return unauthorized || null
}
