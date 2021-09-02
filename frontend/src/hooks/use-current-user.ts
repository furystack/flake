import { Role, User } from 'common'
import { createContext, useContext } from 'react'

export const CurrentUserContext = createContext<User>({
  roles: [],
  password: '',
  username: 'Visitor',
  registrationDate: null as any,
})

export const useCurrentUser = () => {
  const user = useContext(CurrentUserContext)

  return {
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
  }
}
