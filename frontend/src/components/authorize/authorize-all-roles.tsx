import { Role } from 'common'
import { FC } from 'react'
import { useCurrentUser } from '../../hooks/use-current-user'

export interface AuthorizeAllRolesProps {
  roles: Role[]
  unauthorized?: JSX.Element
}

export const AuthorizeAllRoles: FC<AuthorizeAllRolesProps> = ({ roles, children, unauthorized }) => {
  const user = useCurrentUser()
  if (user.hasAllRoles(...roles)) {
    return <>{children}</>
  }
  return unauthorized || null
}
