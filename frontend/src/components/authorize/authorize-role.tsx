import { Role } from 'common'
import { useCurrentUser } from '../../hooks/use-current-user'

export interface AuthorizeProps {
  role: Role
  unauthorized?: JSX.Element
}

export const AuthorizeRole: React.FC<AuthorizeProps> = ({ role, unauthorized, children }) => {
  const user = useCurrentUser()
  if (user.hasRole(role)) {
    return <>{children}</>
  }
  return unauthorized || null
}
