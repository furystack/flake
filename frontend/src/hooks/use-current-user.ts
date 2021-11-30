import { Role, User } from 'common'
import { createContext, useContext, useMemo } from 'react'

export const visitor: User = {
  roles: [],
  password: '',
  username: 'Visitor',
  registrationDate: null as any,
}

export const CurrentUserContext = createContext<User>(visitor)

export const useCurrentUser = () => {
  const user = useContext(CurrentUserContext)

  const returnUser = useMemo(
    () => ({
      ...user,
      hasRole: (role: Role) => {
        return user.roles.includes(role)
      },
      hasAllRoles: (...roles: Role[]) => {
        return roles.every((requiredRole) => user.roles.includes(requiredRole))
      },
      hasOneRole: (...roles: Role[]) => {
        return roles.some((requiredRole) => user.roles.includes(requiredRole))
      },
    }),
    [user],
  )

  return returnUser
}
