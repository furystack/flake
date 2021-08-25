import { User } from 'common'
import { createContext, useContext } from 'react'

export const CurrentUserContext = createContext<User>(null as any)

export const useCurrentUser = () => useContext(CurrentUserContext)
