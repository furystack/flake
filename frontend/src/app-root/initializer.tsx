import { ResponseError } from '@furystack/rest-client-fetch'
// import { CircularProgress } from '@mui/material'
import { User } from 'common'
import { CurrentUserContext } from '../hooks/use-current-user'
import { useCurrentUserFetcher } from '../hooks/use-current-user-fetcher'
import { ErrorPage } from '../pages/error'
import { LoginPage } from '../pages/login'
import { FlakeApplicationLayout } from './flake-application-layout'

export const Initializer = () => {
  const currentUser = useCurrentUserFetcher()

  if (!currentUser.data || (currentUser.error instanceof ResponseError && currentUser.error.response.status === 401)) {
    return <LoginPage />
  }

  if (currentUser.error) {
    return <ErrorPage error={currentUser.error} />
  }

  return (
    <CurrentUserContext.Provider value={currentUser.data?.result as User}>
      <FlakeApplicationLayout />
    </CurrentUserContext.Provider>
  )
}
